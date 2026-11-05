import { createAdminClient } from '@/lib/supabase/admin';
import { env } from '@/lib/env';
import { PRODUCTS } from '@/data/products';
import { normalizeNigerianPhone, calculateCustomerTier } from '@/lib/crm/customer-utils';

export interface DbEnquiry {
  id: string;
  enquiry_ref: string;
  customer_name: string;
  customer_phone: string;
  farm_name?: string | null;
  delivery_state: string;
  delivery_city: string;
  enquiry_type: string;
  items?: unknown;
  estimated_subtotal_ngn?: number | null;
  user_notes?: string | null;
  status: string;
  priority?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  created_at: string;
}

export interface DbAuditLog {
  id: string;
  actor_id?: string | null;
  actor_role?: string | null;
  action: string;
  resource_type: string;
  resource_id?: string | null;
  changes_json?: Record<string, unknown> | null;
  created_at: string;
}

export interface DbHatchery {
  id: string;
  code: string;
  name: string;
  slug: string;
  headquarters_location: string;
  default_packaging_rule: string;
  contact_phone?: string | null;
  is_active: boolean;
}

export interface DbQuota {
  id: string;
  hatchery_id: string;
  hatchery_name?: string;
  hatchery_code?: string;
  breed_type: string;
  dispatch_date: string;
  dispatch_day: 'Monday' | 'Tuesday' | 'Thursday' | 'Special_Run';
  total_cartons_quota: number;
  reserved_cartons: number;
  confirmed_cartons: number;
  available_cartons: number;
  estimated_price_per_carton: number;
  status: 'open' | 'limited' | 'closed' | 'dispatched';
}

export interface DbBooking {
  id: string;
  booking_ref: string;
  customer_phone: string;
  customer_name: string;
  farm_name?: string | null;
  delivery_state: string;
  destination_hub: string;
  breed_type: string;
  hatchery_name?: string;
  cartons_count: number;
  birds_per_carton: number;
  total_birds_count: number;
  estimated_rate_per_carton: number;
  estimated_total_ngn: number;
  required_deposit_ngn: number;
  verified_deposit_ngn: number;
  booking_status: string;
  deposit_status: string;
  held_until?: string | null;
  assigned_waybill_ref?: string | null;
  created_at: string;
}

export interface DbCustomer {
  id: string;
  phone_normalized: string;
  raw_phone: string;
  full_name: string;
  farm_name?: string | null;
  primary_state?: string | null;
  primary_city?: string | null;
  total_orders_count: number;
  total_bookings_count: number;
  lifetime_value_ngn: number;
  customer_tier: 'bronze' | 'silver' | 'gold' | 'vip_commercial';
  staff_notes?: string | null;
  last_activity_at: string;
  created_at: string;
}

export interface ReservationParams {
  customerName: string;
  customerPhone: string;
  farmName?: string;
  deliveryState: string;
  destinationHub: string;
  breedType: string;
  hatcheryCode: string;
  cartonsCount: number;
  estimatedRatePerCarton?: number;
}

export interface ReservationResult {
  success: boolean;
  bookingRef: string;
  heldUntil: string;
  cartonsCount: number;
  totalBirdsCount: number;
  estimatedTotalNgn: number;
  requiredDepositNgn: number;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  errorMessage?: string;
}

function withTimeout<T>(promise: PromiseLike<T>, ms = 1200, fallback: T): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

/**
 * Fetch live enquiries from Supabase database with error safety and timeout protection.
 */
export async function getLiveEnquiries(limit = 50): Promise<DbEnquiry[]> {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    return [];
  }

  try {
    const supabase = createAdminClient();
    const query = supabase
      .from('enquiries')
      .select(`
        id,
        enquiry_ref,
        customer_name,
        customer_phone,
        farm_name,
        delivery_state,
        delivery_city,
        enquiry_type,
        items,
        estimated_subtotal_ngn,
        user_notes,
        status,
        priority,
        utm_source,
        utm_medium,
        utm_campaign,
        created_at
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data, error } = await withTimeout(
      query as unknown as Promise<{ data: DbEnquiry[] | null; error: { message: string } | null }>,
      1500,
      { data: [], error: null }
    );

    if (error) {
      console.warn('Failed to fetch live enquiries from Supabase:', error.message);
      return [];
    }

    return (data as DbEnquiry[]) || [];
  } catch (err) {
    console.warn('Exception querying enquiries:', err);
    return [];
  }
}

/**
 * Fetch live audit events from Supabase audit_events table with timeout protection.
 */
export async function getLiveAuditLogs(limit = 50): Promise<DbAuditLog[]> {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    return [];
  }

  try {
    const supabase = createAdminClient();
    const query = supabase
      .from('audit_events')
      .select('id, actor_id, actor_role, action, resource_type, resource_id, changes_json, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data, error } = await withTimeout(
      query as unknown as Promise<{ data: DbAuditLog[] | null; error: { message: string } | null }>,
      1500,
      { data: [], error: null }
    );

    if (error) {
      console.warn('Failed to fetch audit events from Supabase:', error.message);
      return [];
    }

    return (data as DbAuditLog[]) || [];
  } catch (err) {
    console.warn('Exception querying audit logs:', err);
    return [];
  }
}

/**
 * Fetch operational dashboard metrics from live database with parallelized queries.
 */
export async function getDashboardMetrics(): Promise<{
  pendingCount: number;
  totalCatalogCount: number;
  recentEnquiries: DbEnquiry[];
}> {
  let pendingCount = 0;
  let liveEnquiries: DbEnquiry[] = [];

  if (env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createAdminClient();
      const countPromise = supabase
        .from('enquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending_contact');

      const enquiriesPromise = supabase
        .from('enquiries')
        .select(`
          id,
          enquiry_ref,
          customer_name,
          customer_phone,
          farm_name,
          delivery_state,
          delivery_city,
          enquiry_type,
          items,
          estimated_subtotal_ngn,
          user_notes,
          status,
          created_at
        `)
        .order('created_at', { ascending: false })
        .limit(6);

      const [countRes, enquiriesRes] = await Promise.all([
        withTimeout(
          countPromise as unknown as Promise<{ count: number | null; error: unknown }>,
          1200,
          { count: 0, error: null }
        ),
        withTimeout(
          enquiriesPromise as unknown as Promise<{ data: DbEnquiry[] | null; error: unknown }>,
          1200,
          { data: [], error: null }
        ),
      ]);

      pendingCount = countRes.count || 0;
      liveEnquiries = (enquiriesRes.data as DbEnquiry[]) || [];
    } catch (err) {
      console.warn('Could not retrieve live dashboard metrics:', err);
    }
  }

  return {
    pendingCount,
    totalCatalogCount: PRODUCTS.length,
    recentEnquiries: liveEnquiries,
  };
}

/**
 * Fetch partner hatcheries with fallback to premier Nigerian partners.
 */
export async function getPartnerHatcheries(): Promise<DbHatchery[]> {
  const fallbackHatcheries: DbHatchery[] = [
    {
      id: 'hatch-chi',
      code: 'CHI',
      name: 'Chi Hatchery Ltd',
      slug: 'chi-hatchery',
      headquarters_location: 'Ibadan, Oyo State',
      default_packaging_rule: '50+1',
      contact_phone: '+2348002444282',
      is_active: true,
    },
    {
      id: 'hatch-zar',
      code: 'ZAR',
      name: 'Zartech Farms & Hatcheries',
      slug: 'zartech-farms',
      headquarters_location: 'Ibadan, Oyo State',
      default_packaging_rule: '50+1',
      contact_phone: '+2348039780000',
      is_active: true,
    },
    {
      id: 'hatch-amo',
      code: 'AMO',
      name: 'Amo Hatchery (Farm Support)',
      slug: 'amo-hatchery',
      headquarters_location: 'Awe, Oyo State',
      default_packaging_rule: '50+1',
      contact_phone: '+2348055551234',
      is_active: true,
    },
    {
      id: 'hatch-say',
      code: 'SAY',
      name: 'Sayed Farms Hatchery',
      slug: 'sayed-farms',
      headquarters_location: 'Ibadan, Oyo State',
      default_packaging_rule: '50+1',
      contact_phone: '+2348023004567',
      is_active: true,
    },
    {
      id: 'hatch-val',
      code: 'VAL',
      name: 'Valentine Chicks Hatchery',
      slug: 'valentine-chicks',
      headquarters_location: 'Ogun State',
      default_packaging_rule: '50+1',
      contact_phone: '+2348077778901',
      is_active: true,
    },
  ];

  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    return fallbackHatcheries;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('partner_hatcheries')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error || !data || data.length === 0) {
      return fallbackHatcheries;
    }

    return data as DbHatchery[];
  } catch {
    return fallbackHatcheries;
  }
}

/**
 * Fetch live or upcoming dispatch quotas.
 */
export async function getUpcomingQuotas(breedType = 'broiler'): Promise<DbQuota[]> {
  const nextMonday = getNextDispatchDate('Monday');
  const nextThursday = getNextDispatchDate('Thursday');

  const fallbackQuotas: DbQuota[] = [
    {
      id: 'quota-mon-chi',
      hatchery_id: 'hatch-chi',
      hatchery_name: 'Chi Hatchery Ltd',
      hatchery_code: 'CHI',
      breed_type: breedType,
      dispatch_date: nextMonday,
      dispatch_day: 'Monday',
      total_cartons_quota: 150,
      reserved_cartons: 42,
      confirmed_cartons: 88,
      available_cartons: 20,
      estimated_price_per_carton: 100000,
      status: 'open',
    },
    {
      id: 'quota-mon-zar',
      hatchery_id: 'hatch-zar',
      hatchery_name: 'Zartech Farms',
      hatchery_code: 'ZAR',
      breed_type: breedType,
      dispatch_date: nextMonday,
      dispatch_day: 'Monday',
      total_cartons_quota: 100,
      reserved_cartons: 15,
      confirmed_cartons: 60,
      available_cartons: 25,
      estimated_price_per_carton: 100000,
      status: 'open',
    },
    {
      id: 'quota-thu-amo',
      hatchery_id: 'hatch-amo',
      hatchery_name: 'Amo Hatchery',
      hatchery_code: 'AMO',
      breed_type: breedType,
      dispatch_date: nextThursday,
      dispatch_day: 'Thursday',
      total_cartons_quota: 120,
      reserved_cartons: 10,
      confirmed_cartons: 70,
      available_cartons: 40,
      estimated_price_per_carton: 100000,
      status: 'open',
    },
  ];

  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    return fallbackQuotas;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('hatchery_quotas')
      .select(`
        id,
        hatchery_id,
        breed_type,
        dispatch_date,
        dispatch_day,
        total_cartons_quota,
        reserved_cartons,
        confirmed_cartons,
        estimated_price_per_carton,
        status,
        partner_hatcheries ( name, code )
      `)
      .gte('dispatch_date', new Date().toISOString().slice(0, 10))
      .order('dispatch_date', { ascending: true })
      .limit(10);

    if (error || !data || data.length === 0) {
      return fallbackQuotas;
    }

    return (data as Array<{
      id: string;
      hatchery_id: string;
      breed_type: string;
      dispatch_date: string;
      dispatch_day: 'Tuesday' | 'Thursday' | 'Special_Run';
      total_cartons_quota: number;
      reserved_cartons: number;
      confirmed_cartons: number;
      estimated_price_per_carton: number;
      status: 'open' | 'limited' | 'closed' | 'dispatched';
      partner_hatcheries?: { name?: string; code?: string } | null;
    }>).map((q) => ({
      id: q.id,
      hatchery_id: q.hatchery_id,
      hatchery_name: q.partner_hatcheries?.name || 'Partner Hatchery',
      hatchery_code: q.partner_hatcheries?.code || 'HATCH',
      breed_type: q.breed_type,
      dispatch_date: q.dispatch_date,
      dispatch_day: q.dispatch_day,
      total_cartons_quota: q.total_cartons_quota,
      reserved_cartons: q.reserved_cartons,
      confirmed_cartons: q.confirmed_cartons,
      available_cartons: Math.max(0, q.total_cartons_quota - (q.reserved_cartons + q.confirmed_cartons)),
      estimated_price_per_carton: Number(q.estimated_price_per_carton),
      status: q.status,
    }));
  } catch {
    return fallbackQuotas;
  }
}

/**
 * Fetch live chick bookings for staff operations.
 */
export async function getLiveBookings(limit = 50): Promise<DbBooking[]> {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    return [];
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('chick_bookings')
      .select(`
        id,
        booking_ref,
        customer_phone,
        customer_name,
        farm_name,
        delivery_state,
        destination_hub,
        breed_type,
        cartons_count,
        birds_per_carton,
        total_birds_count,
        estimated_rate_per_carton,
        estimated_total_ngn,
        required_deposit_ngn,
        verified_deposit_ngn,
        booking_status,
        deposit_status,
        held_until,
        assigned_waybill_ref,
        created_at,
        partner_hatcheries ( name )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !data) {
      return [];
    }

    return (data as Array<{
      id: string;
      booking_ref: string;
      customer_phone: string;
      customer_name: string;
      farm_name?: string | null;
      delivery_state: string;
      destination_hub: string;
      breed_type: string;
      cartons_count: number;
      birds_per_carton: number;
      total_birds_count: number;
      estimated_rate_per_carton: number;
      estimated_total_ngn: number;
      required_deposit_ngn: number;
      verified_deposit_ngn: number;
      booking_status: string;
      deposit_status: string;
      held_until?: string | null;
      assigned_waybill_ref?: string | null;
      created_at: string;
      partner_hatcheries?: { name?: string } | null;
    }>).map((b) => ({
      id: b.id,
      booking_ref: b.booking_ref,
      customer_phone: b.customer_phone,
      customer_name: b.customer_name,
      farm_name: b.farm_name,
      delivery_state: b.delivery_state,
      destination_hub: b.destination_hub,
      breed_type: b.breed_type,
      hatchery_name: b.partner_hatcheries?.name || 'Partner Hatchery',
      cartons_count: b.cartons_count,
      birds_per_carton: b.birds_per_carton,
      total_birds_count: b.total_birds_count,
      estimated_rate_per_carton: Number(b.estimated_rate_per_carton),
      estimated_total_ngn: Number(b.estimated_total_ngn),
      required_deposit_ngn: Number(b.required_deposit_ngn),
      verified_deposit_ngn: Number(b.verified_deposit_ngn),
      booking_status: b.booking_status,
      deposit_status: b.deposit_status,
      held_until: b.held_until,
      assigned_waybill_ref: b.assigned_waybill_ref,
      created_at: b.created_at,
    }));
  } catch (err) {
    console.warn('Exception querying chick bookings:', err);
    return [];
  }
}

/**
 * Calculate packaging birds count according to hatchery rules.
 */
export function calculatePackagingBirds(cartons: number, breedType: string): {
  birdsPerCarton: number;
  totalBirds: number;
} {
  const isTurkey = breedType.toLowerCase().includes('turkey');
  const isPol = breedType.toLowerCase().includes('pol');
  const birdsPerCarton = isPol ? 10 : isTurkey ? 25 : 51; // POL: 10 per crate; Turkey: 25; Broiler/Pullet/Duck: 50+1
  return {
    birdsPerCarton,
    totalBirds: cartons * birdsPerCarton,
  };
}

/**
 * Helper to compute upcoming Monday, Tuesday, or Thursday in YYYY-MM-DD.
 */
export function getNextDispatchDate(targetDay: 'Monday' | 'Tuesday' | 'Thursday'): string {
  const d = new Date();
  const dayIndex = targetDay === 'Monday' ? 1 : targetDay === 'Tuesday' ? 2 : 4;
  const currentDay = d.getDay();
  let daysUntil = dayIndex - currentDay;
  if (daysUntil <= 0) {
    daysUntil += 7;
  }
  d.setDate(d.getDate() + daysUntil);
  return d.toISOString().slice(0, 10);
}

/**
 * Fetch deduplicated farmer CRM records.
 * Queries Supabase `customers` table with timeout protection,
 * and if the table is not yet migrated, dynamically derives deduplicated
 * customer accounts from live enquiries and chick bookings.
 */
export async function getLiveCustomers(limit = 100): Promise<DbCustomer[]> {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    return [];
  }

  try {
    const supabase = createAdminClient();

    // 1. Try querying customers table
    const { data, error } = await withTimeout(
      supabase
        .from('customers')
        .select('*')
        .order('last_activity_at', { ascending: false })
        .limit(limit) as unknown as Promise<{ data: DbCustomer[] | null; error: { message: string } | null }>,
      1500,
      { data: null, error: null }
    );

    if (!error && data && data.length > 0) {
      return data;
    }

    // 2. Fallback: Aggregate deduplicated customer profiles from enquiries & bookings
    const [enquiries, bookings] = await Promise.all([
      getLiveEnquiries(200),
      getLiveBookings(200),
    ]);

    const customerMap = new Map<string, DbCustomer>();

    for (const enq of enquiries) {
      const normalizedPhone = normalizeNigerianPhone(enq.customer_phone);
      if (!normalizedPhone) continue;

      const orderVal = Number(enq.estimated_subtotal_ngn) || 0;
      const existing = customerMap.get(normalizedPhone);

      if (existing) {
        existing.total_orders_count += 1;
        existing.lifetime_value_ngn += orderVal;
        existing.customer_tier = calculateCustomerTier(
          existing.lifetime_value_ngn,
          existing.total_orders_count + existing.total_bookings_count
        );
        if (new Date(enq.created_at) > new Date(existing.last_activity_at)) {
          existing.last_activity_at = enq.created_at;
        }
      } else {
        customerMap.set(normalizedPhone, {
          id: `crm-${Buffer.from(normalizedPhone).toString('hex').slice(0, 12)}`,
          phone_normalized: normalizedPhone,
          raw_phone: enq.customer_phone,
          full_name: enq.customer_name,
          farm_name: enq.farm_name || null,
          primary_state: enq.delivery_state,
          primary_city: enq.delivery_city,
          total_orders_count: 1,
          total_bookings_count: 0,
          lifetime_value_ngn: orderVal,
          customer_tier: calculateCustomerTier(orderVal, 1),
          staff_notes: null,
          last_activity_at: enq.created_at,
          created_at: enq.created_at,
        });
      }
    }

    for (const b of bookings) {
      const normalizedPhone = normalizeNigerianPhone(b.customer_phone);
      if (!normalizedPhone) continue;

      const bookingVal = Number(b.estimated_total_ngn) || 0;
      const existing = customerMap.get(normalizedPhone);

      if (existing) {
        existing.total_bookings_count += 1;
        existing.lifetime_value_ngn += bookingVal;
        existing.customer_tier = calculateCustomerTier(
          existing.lifetime_value_ngn,
          existing.total_orders_count + existing.total_bookings_count
        );
        if (new Date(b.created_at) > new Date(existing.last_activity_at)) {
          existing.last_activity_at = b.created_at;
        }
      } else {
        customerMap.set(normalizedPhone, {
          id: `crm-${Buffer.from(normalizedPhone).toString('hex').slice(0, 12)}`,
          phone_normalized: normalizedPhone,
          raw_phone: b.customer_phone,
          full_name: b.customer_name,
          farm_name: b.farm_name || null,
          primary_state: b.delivery_state,
          primary_city: b.destination_hub,
          total_orders_count: 0,
          total_bookings_count: 1,
          lifetime_value_ngn: bookingVal,
          customer_tier: calculateCustomerTier(bookingVal, 1),
          staff_notes: null,
          last_activity_at: b.created_at,
          created_at: b.created_at,
        });
      }
    }

    return Array.from(customerMap.values())
      .sort((a, b) => new Date(b.last_activity_at).getTime() - new Date(a.last_activity_at).getTime())
      .slice(0, limit);
  } catch (err) {
    console.warn('Exception querying live customers:', err);
    return [];
  }
}

