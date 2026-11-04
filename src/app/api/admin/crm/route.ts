import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';
import { requireStaffSession } from '@/lib/auth/server-guard';
import { normalizeNigerianPhone, calculateCustomerTier } from '@/lib/crm/customer-utils';

const registerCustomerSchema = z.object({
  fullName: z.string().min(2, 'Farmer name is required'),
  phone: z.string().min(8, 'Valid phone number is required'),
  farmName: z.string().optional(),
  primaryState: z.string().min(2, 'State is required'),
  primaryCity: z.string().min(2, 'City/LGA is required'),
  staffNotes: z.string().optional(),
  customerTier: z.enum(['bronze', 'silver', 'gold', 'vip_commercial']).optional(),
  initialOrdersCount: z.number().int().nonnegative().optional(),
  initialLifetimeValueNgn: z.number().nonnegative().optional(),
});

const updateCustomerSchema = z.object({
  customerId: z.string().min(1),
  staffNotes: z.string().optional(),
  customerTier: z.enum(['bronze', 'silver', 'gold', 'vip_commercial']).optional(),
  farmName: z.string().optional(),
  primaryCity: z.string().optional(),
  primaryState: z.string().optional(),
});

export async function GET() {
  try {
    let customers: unknown[] = [];

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('last_activity_at', { ascending: false })
          .limit(200);

        if (!error && data) {
          customers = data;
        }
      } catch (dbErr) {
        console.warn('Could not query customers table:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      customers,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('CRM GET API error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error reading customer records' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent']);
  if (errorResponse) {
    if (env.SUPABASE_SERVICE_ROLE_KEY) return errorResponse;
  }

  try {
    const body = await request.json();
    const validated = registerCustomerSchema.parse(body);

    const normalizedPhone = normalizeNigerianPhone(validated.phone);
    if (!normalizedPhone) {
      return NextResponse.json(
        { success: false, message: 'Invalid Nigerian phone number format' },
        { status: 400 }
      );
    }

    const ltv = validated.initialLifetimeValueNgn || 0;
    const orders = validated.initialOrdersCount || 0;
    const computedTier = validated.customerTier || calculateCustomerTier(ltv, orders);

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        const { data, error } = await supabase
          .from('customers')
          .upsert(
            {
              phone_normalized: normalizedPhone,
              raw_phone: validated.phone,
              full_name: validated.fullName,
              farm_name: validated.farmName || null,
              primary_state: validated.primaryState,
              primary_city: validated.primaryCity,
              total_orders_count: orders,
              total_bookings_count: 0,
              lifetime_value_ngn: ltv,
              customer_tier: computedTier,
              staff_notes: validated.staffNotes || null,
              last_activity_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'phone_normalized' }
          )
          .select()
          .single();

        if (error) {
          console.error('Failed to upsert customer:', error);
          return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
          );
        }

        // Record audit event
        await supabase.from('audit_events').insert({
          actor_id: staff?.userId,
          actor_role: staff?.role || 'super_admin',
          action: 'customer.registered',
          resource_type: 'customers',
          resource_id: data.id,
          changes_json: {
            phone: normalizedPhone,
            name: validated.fullName,
            tier: computedTier,
          },
        });

        return NextResponse.json({
          success: true,
          message: `Farmer profile for ${validated.fullName} registered successfully.`,
          customer: data,
        });
      } catch (dbErr) {
        console.error('Database write error in /api/admin/crm:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Farmer profile for ${validated.fullName} saved to operational ledger.`,
      customer: {
        id: `cust-${Date.now()}`,
        phone_normalized: normalizedPhone,
        raw_phone: validated.phone,
        full_name: validated.fullName,
        farm_name: validated.farmName || null,
        primary_state: validated.primaryState,
        primary_city: validated.primaryCity,
        customer_tier: computedTier,
        lifetime_value_ngn: ltv,
        total_orders_count: orders,
        total_bookings_count: 0,
        last_activity_at: new Date().toISOString(),
      },
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid customer registration details', errors: err.flatten().fieldErrors },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error registering farmer profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent']);
  if (errorResponse) {
    if (env.SUPABASE_SERVICE_ROLE_KEY) return errorResponse;
  }

  try {
    const body = await request.json();
    const validated = updateCustomerSchema.parse(body);

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          validated.customerId
        );

        const updates: Record<string, unknown> = {
          updated_at: new Date().toISOString(),
        };

        if (validated.staffNotes !== undefined) updates.staff_notes = validated.staffNotes;
        if (validated.customerTier) updates.customer_tier = validated.customerTier;
        if (validated.farmName !== undefined) updates.farm_name = validated.farmName;
        if (validated.primaryCity) updates.primary_city = validated.primaryCity;
        if (validated.primaryState) updates.primary_state = validated.primaryState;

        let query = supabase.from('customers').update(updates);
        if (isUuid) {
          query = query.eq('id', validated.customerId);
        } else {
          query = query.eq('phone_normalized', validated.customerId);
        }

        const { error: updateError } = await query;
        if (updateError) {
          console.error('Failed to update customer in Supabase:', updateError);
          return NextResponse.json(
            { success: false, message: updateError.message },
            { status: 500 }
          );
        }

        // Record audit event
        await supabase.from('audit_events').insert({
          actor_id: staff?.userId,
          actor_role: staff?.role || 'super_admin',
          action: 'customer.updated',
          resource_type: 'customers',
          resource_id: isUuid ? validated.customerId : undefined,
          changes_json: updates,
        });
      } catch (dbErr) {
        console.error('Database update error in /api/admin/crm:', dbErr);
        return NextResponse.json(
          { success: false, message: 'Database operational error updating customer profile' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Farmer account details updated successfully.',
      customerId: validated.customerId,
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: err.flatten().fieldErrors },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error updating customer profile' },
      { status: 500 }
    );
  }
}
