import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limiter';

const enquiryInputSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().min(10).max(25),
  state: z.string().min(2).max(50),
  city: z.string().max(100).optional(),
  farmName: z.string().max(100).optional(),
  flockType: z.string().max(50).optional(),
  flockSize: z.union([z.number(), z.string()]).optional(),
  placementDate: z.string().max(50).optional(),
  enquiryType: z
    .enum([
      'whatsapp_order',
      'bulk_quote',
      'veterinary_consultation',
      'farm_setup_inquiry',
      'vaccination_program',
      'general',
    ])
    .default('whatsapp_order'),
  notes: z.string().max(4000).optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  consentMarketing: z.boolean().default(true),
});

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`enquiries:${clientIp}`, { maxRequests: 10, windowMs: 60000 });
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please wait a moment before trying again or message us on WhatsApp.',
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
    const validated = enquiryInputSchema.parse(body);

    const referenceNumber = `DAG-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      100 + Math.random() * 900
    )}`;

    // Build emergency fallback WhatsApp link in case of network or database downtime
    const fallbackWhatsAppUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\+/g, '')}?text=Hello%20D-AminGrow,%20my%20name%20is%20${encodeURIComponent(validated.fullName)}%20(${encodeURIComponent(validated.phone)})%20from%20${encodeURIComponent(validated.state)}.%20I%20am%20inquiring%20about%20${encodeURIComponent(validated.enquiryType.replace(/_/g, ' '))}.%20Ref:%20${referenceNumber}`;

    // If Supabase service role is configured, persist transactionally into the database
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();

        // Compile structured notes if vaccination program
        let userNotes = validated.notes || null;
        if (validated.enquiryType === 'vaccination_program') {
          const details = [
            `[VACCINATION PROGRAM LEAD]`,
            `Flock Type: ${validated.flockType || 'Unspecified'}`,
            `Flock Size: ${validated.flockSize || 'Not specified'}`,
            `Placement Date: ${validated.placementDate || 'Not specified'}`,
            validated.notes ? `Notes: ${validated.notes}` : '',
          ]
            .filter(Boolean)
            .join(' | ');
          userNotes = details;
        }

        // Map enum safely to prevent Postgres custom enum mismatch
        const dbEnquiryType =
          validated.enquiryType === 'vaccination_program'
            ? 'veterinary_consultation'
            : validated.enquiryType;

        // 1. Insert enquiry with aligned database schema (enquiry_ref)
        const { error: insertError } = await supabase.from('enquiries').insert({
          enquiry_ref: referenceNumber,
          enquiry_type: dbEnquiryType,
          customer_name: validated.fullName,
          customer_phone: validated.phone,
          farm_name: validated.farmName || null,
          delivery_state: validated.state,
          delivery_city: validated.city || validated.state,
          delivery_country: 'Nigeria',
          user_notes: userNotes,
          status: 'pending_contact',
          priority:
            validated.priority ||
            (validated.enquiryType === 'veterinary_consultation' ||
            validated.enquiryType === 'vaccination_program'
              ? 'high'
              : 'normal'),
        });

        if (insertError) {
          console.error('Critical database enquiry insert error:', insertError);
          return NextResponse.json(
            {
              success: false,
              message: 'Database storage error. Please contact our desk directly on WhatsApp.',
              fallbackWhatsAppUrl,
            },
            { status: 500 }
          );
        }

        // 2. Persist consent in consent_records if agreed
        if (validated.consentMarketing) {
          try {
            await supabase.from('consent_records').insert({
              user_identifier: validated.phone,
              consent_type: 'marketing_communication',
              consented: true,
            });
          } catch (consentErr) {
            console.warn('Consent record non-fatal logging warning:', consentErr);
          }
        }

        // 3. Auto-sync to CRM customer table
        try {
          await supabase.rpc('sync_customer_from_activity', {
            p_phone: validated.phone,
            p_name: validated.fullName,
            p_farm: validated.farmName || null,
            p_state: validated.state,
            p_city: validated.city || validated.state,
            p_order_value: 0,
            p_is_booking: false,
          });
        } catch (crmErr) {
          console.warn('CRM sync non-fatal warning in /api/enquiries:', crmErr);
        }
      } catch (dbErr) {
        console.error('Database connection exception in /api/enquiries:', dbErr);
        return NextResponse.json(
          {
            success: false,
            message: 'Unable to connect to database. Please use direct WhatsApp ordering.',
            fallbackWhatsAppUrl,
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
      enquiryRef: referenceNumber,
      message: 'Enquiry received successfully.',
      fallbackWhatsAppUrl,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error processing enquiry' },
      { status: 500 }
    );
  }
}
