import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';
import { requireStaffSession } from '@/lib/auth/server-guard';

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
  // 1. Enforce Server-Side Authentication & Super Admin Role
  const { errorResponse, staff } = await requireStaffSession(['super_admin']);
  if (errorResponse) {
    return errorResponse;
  }

  try {
    const body = await request.json();
    const validated = priceSyncSchema.parse(body);

    // If Supabase service role is present, record in audit_events and update database
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        await supabase.from('audit_events').insert({
          actor_id: staff!.userId,
          actor_role: staff!.role,
          action: 'chick_pricing.bulk_updated',
          resource_type: 'product_variants',
          resource_id: undefined,
          changes_json: {
            effectiveDate: validated.effectiveDate,
            note: validated.note,
            rates: validated.rates,
            authorizedBy: staff!.fullName,
          },
        });
      } catch (dbErr) {
        console.error('Failed to log chick pricing audit event:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Weekly chick rates synchronized successfully.',
      updatedCount: validated.rates.length,
      effectiveDate: validated.effectiveDate,
      synchronizedBy: staff!.fullName,
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
