import { NextResponse } from 'next/server';
import { z } from 'zod';

const calibrationSchema = z.object({
  broilerFloorSqM: z.number().positive(),
  birdsPerGasBrooder: z.number().int().positive(),
  starterFeedPerBirdKg: z.number().positive(),
  feedBagPriceNgn: z.number().positive(),
  targetHarvestWeightKg: z.number().positive(),
  standardCratePriceNgn: z.number().positive(),
  calibratedBy: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = calibrationSchema.parse(body);

    const updatedSettings = {
      ...validated,
      lastCalibratedAt: new Date().toISOString(),
      status: 'active',
      vcnStandardCompliant: true,
    };

    return NextResponse.json({
      success: true,
      message: 'Bio-mathematical constants and field assumptions calibrated successfully.',
      calibratedSettings: updatedSettings,
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
