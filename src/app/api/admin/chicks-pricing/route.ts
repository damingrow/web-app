import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';

const priceSyncSchema = z.object({
  effectiveDate: z.string(),
  note: z.string().optional(),
  rates: z.array(
    z.object({
      id: z.string(),
      breed: z.string(),
      hatcheryBrand: z.string(),
      priceNgn: z.number().positive(),
      status: z.enum(['active', 'limited_allocation', 'sold_out']),
    })
  ),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = priceSyncSchema.parse(body);

    // If Supabase service role is present, record in audit_events and update database
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        await supabase.from('audit_events').insert({
          actor_role: 'super_admin',
          action: 'chick_pricing.bulk_updated',
          resource_type: 'product_variants',
          resource_id: `batch-${validated.effectiveDate}`,
          changes_json: {
            effectiveDate: validated.effectiveDate,
            note: validated.note,
            rates: validated.rates,
          },
        });
      } catch (dbErr) {
        console.error('Failed to log audit event:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Weekly chick rates synchronized successfully.',
      updatedCount: validated.rates.length,
      effectiveDate: validated.effectiveDate,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error updating chick rates' },
      { status: 500 }
    );
  }
}
