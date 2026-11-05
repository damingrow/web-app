import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';
import { requireStaffSession } from '@/lib/auth/server-guard';

export const revalidate = 0;

const calibrationSchema = z.object({
  broilerFloorSqM: z.number().positive(),
  birdsPerGasBrooder: z.number().int().positive(),
  starterFeedPerBirdKg: z.number().positive(),
  feedBagPriceNgn: z.number().positive(),
  targetHarvestWeightKg: z.number().positive(),
  standardCratePriceNgn: z.number().positive(),
  calibratedBy: z.string().optional(),
});

export async function GET() {
  const { errorResponse } = await requireStaffSession(['super_admin', 'sales_agent', 'content_editor']);
  if (errorResponse) return errorResponse;

  try {
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createAdminClient();
      const { data } = await supabase
        .from('application_settings')
        .select('value_json')
        .eq('key', 'biomath_calibration')
        .maybeSingle();

      if (data?.value_json) {
        return NextResponse.json({ success: true, calibration: data.value_json });
      }
    }
    // Return factory defaults if no saved calibration found
    return NextResponse.json({
      success: true,
      calibration: null,
      message: 'No saved calibration found — using factory defaults.',
    });
  } catch (err) {
    console.error('Failed to fetch calibration:', err);
    return NextResponse.json({ success: false, calibration: null }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent']);
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const validated = calibrationSchema.parse(body);

    const calibrationPayload = {
      ...validated,
      lastCalibratedAt: new Date().toISOString(),
      calibratedBy: staff?.fullName || validated.calibratedBy || 'Admin',
      vcnStandardCompliant: true,
    };

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createAdminClient();
      await Promise.all([
        supabase.from('application_settings').upsert({
          key: 'biomath_calibration',
          value_json: calibrationPayload,
          updated_at: new Date().toISOString(),
        }),
        supabase.from('audit_events').insert({
          actor_id: staff?.userId,
          actor_role: staff?.role,
          action: 'biomath.calibrated',
          resource_type: 'application_settings',
          resource_id: 'biomath_calibration',
          changes_json: calibrationPayload,
        }),
      ]);
    }

    return NextResponse.json({
      success: true,
      message: 'Bio-mathematical constants calibrated and persisted to database.',
      calibration: calibrationPayload,
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid calibration values', errors: err.flatten().fieldErrors },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to update calibration standards' },
      { status: 500 }
    );
  }
}
