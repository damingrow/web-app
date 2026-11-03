import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limiter';
import { reserveChickBooking } from '@/lib/booking/booking-service';

const bookingInputSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  customerPhone: z.string().min(10, 'Valid phone number is required').max(25),
  farmName: z.string().max(100).optional(),
  deliveryState: z.string().min(2, 'Delivery state is required').max(50),
  destinationHub: z.string().min(2, 'Destination motor park or depot hub is required').max(100),
  breedType: z.enum(['broiler', 'pullet', 'turkey', 'duckling', 'pol']).default('broiler'),
  hatcheryCode: z.string().min(2).max(10).default('CHI'),
  cartonsCount: z.number().int().min(1, 'Minimum order is 1 carton').max(500),
  dispatchDate: z.string().optional(),
  quotaId: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

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

    const result = await reserveChickBooking({
      customerName: validated.customerName,
      customerPhone: validated.customerPhone,
      farmName: validated.farmName,
      deliveryState: validated.deliveryState,
      destinationHub: validated.destinationHub,
      breedType: validated.breedType,
      hatcheryCode: validated.hatcheryCode,
      cartonsCount: validated.cartonsCount,
      dispatchDate: validated.dispatchDate,
      quotaId: validated.quotaId,
      notes: validated.notes,
    });

    if (!result.success) {
      const statusCode = result.errorCode === 'INSUFFICIENT_QUOTA' ? 409 : 400;
      return NextResponse.json(
        {
          success: false,
          message: result.error || 'Unable to hold reservation for requested cartons.',
          errorCode: result.errorCode,
          availableCartons: result.availableCartons,
        },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      {
        success: true,
        bookingRef: result.bookingRef,
        bookingId: result.bookingId,
        heldUntil: result.heldUntil,
        breedType: result.breedType,
        cartonsCount: result.cartonsCount,
        birdsPerCarton: result.birdsPerCarton,
        totalBirdsCount: result.totalBirdsCount,
        estimatedRatePerCarton: result.estimatedRatePerCarton,
        estimatedTotalNgn: result.estimatedTotalNgn,
        requiredDepositNgn: result.requiredDepositNgn,
        bankDetails: result.bankDetails,
        whatsappConfirmationUrl: result.whatsappConfirmationUrl,
        message: `Reservation hold confirmed. Reference: ${result.bookingRef}. 50% deposit hold expires in 2 hours.`,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed for chick reservation.',
          errors: error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    console.error('Unexpected error in chick booking reservation:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An internal error occurred while processing your chick reservation. Please contact our sales desk directly on WhatsApp.',
      },
      { status: 500 }
    );
  }
}
