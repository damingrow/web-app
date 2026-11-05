import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';
import { requireStaffSession } from '@/lib/auth/server-guard';
import { getPartnerHatcheries, getUpcomingQuotas } from '@/lib/supabase/data-access';

export const revalidate = 0;

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

export async function GET() {
  const { errorResponse } = await requireStaffSession(['super_admin', 'sales_agent']);
  if (errorResponse) {
    return errorResponse;
  }

  try {
    const [hatcheries, quotas] = await Promise.all([
      getPartnerHatcheries().catch(() => []),
      getUpcomingQuotas('broiler').catch(() => []),
    ]);

    let latestAudit = null;
    let savedRates = null;
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        const [{ data: auditData }, { data: settingsData }] = await Promise.all([
          supabase
            .from('audit_events')
            .select('*')
            .eq('action', 'chick_pricing.bulk_updated')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle(),
          supabase
            .from('application_settings')
            .select('value_json')
            .eq('key', 'chick_pricing_rates')
            .maybeSingle(),
        ]);

        if (auditData) {
          latestAudit = auditData;
        }
        if (settingsData && settingsData.value_json) {
          savedRates = settingsData.value_json;
        }
      } catch {
        // non-blocking
      }
    }

    return NextResponse.json({
      success: true,
      hatcheries,
      quotas,
      latestAudit,
      savedRates,
      serverTime: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error fetching chick pricing data:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error fetching chick pricing data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // 1. Enforce Server-Side Authentication & Super Admin or Sales Agent Role
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent']);
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
        await Promise.all([
          supabase.from('audit_events').insert({
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
          }),
          supabase.from('application_settings').upsert({
            key: 'chick_pricing_rates',
            value_json: validated.rates,
            updated_at: new Date().toISOString(),
          }),
        ]);
      } catch (dbErr) {
        console.error('Failed to log chick pricing audit event or settings:', dbErr);
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
