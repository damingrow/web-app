import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireStaffSession } from '@/lib/auth/server-guard';
import { verifyBookingDeposit } from '@/lib/booking/booking-service';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';

const verifyDepositSchema = z.object({
  bookingRef: z.string().min(5),
  bankName: z.string().default('Zenith Bank Plc'),
  paymentReference: z.string().min(3, 'Bank transfer session ID or teller number is required'),
  depositorName: z.string().min(2, 'Name of depositor is required'),
  amountPaidNgn: z.number().positive('Deposit amount must be greater than zero'),
  paymentDate: z.string().optional(),
  staffNotes: z.string().optional(),
});

export async function POST(request: Request) {
  // Enforce staff authentication (Super Admin or Sales Agent)
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent']);
  if (errorResponse) {
    return errorResponse;
  }

  try {
    const body = await request.json();
    const validated = verifyDepositSchema.parse(body);

    const result = await verifyBookingDeposit({
      bookingRef: validated.bookingRef,
      bankName: validated.bankName,
      paymentReference: validated.paymentReference,
      depositorName: validated.depositorName,
      amountPaidNgn: validated.amountPaidNgn,
      paymentDate: validated.paymentDate,
      verifiedByStaffId: staff?.userId,
      staffNotes: validated.staffNotes,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error || 'Failed to verify deposit.',
        },
        { status: 400 }
      );
    }

    // Log audit event
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        await supabase.from('audit_events').insert({
          actor_id: staff!.userId,
          actor_role: staff!.role,
          action: 'chick_booking.deposit_verified',
          resource_type: 'chick_bookings',
          resource_id: validated.bookingRef,
          changes_json: {
            bookingRef: validated.bookingRef,
            amountPaidNgn: validated.amountPaidNgn,
            paymentReference: validated.paymentReference,
            depositorName: validated.depositorName,
            bankName: validated.bankName,
            verifiedBy: staff!.fullName,
          },
        });
      } catch (auditErr) {
        console.warn('Audit event warning for deposit verification:', auditErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Deposit of ₦${validated.amountPaidNgn.toLocaleString()} successfully verified for booking ${validated.bookingRef}. Status updated to CONFIRMED.`,
        bookingRef: result.bookingRef,
        bookingStatus: result.bookingStatus,
        depositStatus: result.depositStatus,
        confirmedCartons: result.confirmedCartons,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid deposit verification submission',
          errors: error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    console.error('Unexpected error in deposit verification:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error processing deposit verification.',
      },
      { status: 500 }
    );
  }
}
