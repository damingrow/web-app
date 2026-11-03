import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';
import { calculatePackagingBirds } from '@/lib/supabase/data-access';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limiter';

const bookingInputSchema = z.object({
  customerName: z.string().min(2).max(100),
  customerPhone: z.string().min(10).max(25),
  farmName: z.string().max(100).optional(),
  deliveryState: z.string().min(2).max(50),
  destinationHub: z.string().min(2).max(100),
  breedType: z.enum(['broiler', 'pullet', 'turkey', 'duckling', 'pol']).default('broiler'),
  hatcheryCode: z.string().min(2).max(10).default('CHI'),
  cartonsCount: z.number().int().min(1).max(500),
  notes: z.string().max(1000).optional(),
});

const DEFAULT_RATES: Record<string, number> = {
  broiler: 48000,
  pullet: 52000,
  turkey: 65000,
  duckling: 45000,
  pol: 140000, // POL crate rate
};

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`bookings:${clientIp}`, { maxRequests: 10, windowMs: 60000 });
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many booking reservation requests. Please wait a moment before trying again or message us on WhatsApp.',
          retryAfterSeconds: rateCheck.resetInSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.resetInSeconds),
            'X-RateLimit-Limit': String(rateCheck.limit),
            'X-RateLimit-Remaining': String(rateCheck.remaining),
          },
        }
      );
    }

    const body = await request.json();
    const validated = bookingInputSchema.parse(body);

    const { birdsPerCarton, totalBirds } = calculatePackagingBirds(
      validated.cartonsCount,
      validated.breedType
    );

    const ratePerCarton = DEFAULT_RATES[validated.breedType] || 48000;
    const estimatedTotalNgn = validated.cartonsCount * ratePerCarton;
    const requiredDepositNgn = Math.round(estimatedTotalNgn * 0.5); // 50% commitment deposit

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
    const bookingRef = `DOC-${dateStr}-${validated.hatcheryCode.toUpperCase()}-${randomHex}`;

    const heldUntil = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); // 2 hours hold TTL

    const bankDetails = {
      bankName: 'Zenith Bank Plc',
      accountNumber: '1017894562',
      accountName: 'D-AminGrow Agro-Allied Services',
      narration: bookingRef,
    };

    const whatsappConfirmationUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\+/g, '')}?text=Hello%20D-AminGrow,%20I%20have%20submitted%20a%20chick%20reservation.%20Ref:%20${bookingRef}%20|%20${validated.cartonsCount}%20cartons%20(${totalBirds}%20birds)%20of%20${validated.breedType.toUpperCase()}%20from%20${validated.hatcheryCode}%20Hatchery%20to%20${encodeURIComponent(validated.deliveryState)}.%20Name:%20${encodeURIComponent(validated.customerName)}%20(${encodeURIComponent(validated.customerPhone)}).`;

    // Persist into Supabase database if configured
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();

        // 1. Attempt transactional reservation RPC if available
        let rpcSucceeded = false;
        try {
          const { data: rpcData, error: rpcError } = await supabase.rpc('reserve_chick_quota', {
            p_quota_id: '00000000-0000-0000-0000-000000000000', // Default or dynamic quota
            p_cartons_count: validated.cartonsCount,
            p_customer_phone: validated.customerPhone,
            p_customer_name: validated.customerName,
            p_farm_name: validated.farmName || null,
            p_delivery_state: validated.deliveryState,
            p_destination_hub: validated.destinationHub,
            p_hold_duration_minutes: 120,
          });
          if (!rpcError && rpcData && rpcData.length > 0 && rpcData[0].success) {
            rpcSucceeded = true;
          }
        } catch {
          rpcSucceeded = false;
        }

        // 2. Direct insert fallback into chick_bookings or enquiries
        if (!rpcSucceeded) {
          // Attempt insert into chick_bookings table
          const { error: bookingError } = await supabase.from('chick_bookings').insert({
            booking_ref: bookingRef,
            customer_phone: validated.customerPhone,
            customer_name: validated.customerName,
            farm_name: validated.farmName || null,
            delivery_state: validated.deliveryState,
            destination_hub: validated.destinationHub,
            breed_type: validated.breedType,
            cartons_count: validated.cartonsCount,
            birds_per_carton: birdsPerCarton,
            total_birds_count: totalBirds,
            estimated_rate_per_carton: ratePerCarton,
            estimated_total_ngn: estimatedTotalNgn,
            required_deposit_ngn: requiredDepositNgn,
            booking_status: 'quota_held',
            deposit_status: 'unpaid',
            held_until: heldUntil,
          });

          if (bookingError) {
            console.warn('chick_bookings direct insert warning, recording in enquiries:', bookingError.message);
          }

          // Ensure the inquiry appears on the central admin enquiry queue
          await supabase.from('enquiries').insert({
            enquiry_ref: bookingRef,
            enquiry_type: 'whatsapp_order',
            customer_name: validated.customerName,
            customer_phone: validated.customerPhone,
            farm_name: validated.farmName || null,
            delivery_state: validated.deliveryState,
            delivery_city: validated.destinationHub,
            delivery_country: 'Nigeria',
            user_notes: `DAY-OLD CHICK RESERVATION: ${validated.cartonsCount} Cartons (${totalBirds} chicks) of ${validated.breedType.toUpperCase()} from ${validated.hatcheryCode} Hatchery. Deposit Required: ₦${requiredDepositNgn.toLocaleString()}. Notes: ${validated.notes || 'None'}`,
            status: 'pending_contact',
            priority: 'urgent',
          });
        }

        // 3. Auto-sync to CRM customer table
        try {
          await supabase.rpc('sync_customer_from_activity', {
            p_phone: validated.customerPhone,
            p_name: validated.customerName,
            p_farm: validated.farmName || null,
            p_state: validated.deliveryState,
            p_city: validated.destinationHub,
            p_order_value: estimatedTotalNgn,
            p_is_booking: true,
          });
        } catch (crmErr) {
          console.warn('CRM sync non-fatal warning in /api/bookings:', crmErr);
        }
      } catch (dbErr) {
        console.error('Database logging warning for booking reservation:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      bookingRef,
      cartonsCount: validated.cartonsCount,
      birdsPerCarton,
      totalBirdsCount: totalBirds,
      breedType: validated.breedType,
      hatcheryCode: validated.hatcheryCode,
      estimatedTotalNgn,
      requiredDepositNgn,
      heldUntil,
      bankDetails,
      whatsappConfirmationUrl,
      message: 'Reservation held successfully. Please confirm deposit within 2 hours.',
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error creating chick reservation' },
      { status: 500 }
    );
  }
}
