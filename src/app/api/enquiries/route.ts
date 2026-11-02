import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';

const enquiryInputSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().min(10).max(25),
  state: z.string().min(2).max(50),
  city: z.string().max(100).optional(),
  farmName: z.string().max(100).optional(),
  enquiryType: z
    .enum(['whatsapp_order', 'bulk_quote', 'veterinary_consultation', 'farm_setup_inquiry', 'general'])
    .default('whatsapp_order'),
  notes: z.string().max(2000).optional(),
  consentMarketing: z.boolean().default(true),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = enquiryInputSchema.parse(body);

    const referenceNumber = `DAG-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      100 + Math.random() * 900
    )}`;

    // If Supabase service role or client is configured and live, persist into database
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        await supabase.from('enquiries').insert({
          reference_number: referenceNumber,
          enquiry_type: validated.enquiryType,
          customer_name: validated.fullName,
          customer_phone: validated.phone,
          farm_name: validated.farmName || null,
          delivery_state: validated.state,
          delivery_city: validated.city || validated.state,
          user_notes: validated.notes || null,
          consent_given: validated.consentMarketing,
          status: 'pending_contact',
        });
      } catch (dbErr) {
        // Log error but do not fail customer WhatsApp experience
        console.error('Database enquiry insert error:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: 'Enquiry received successfully.',
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
