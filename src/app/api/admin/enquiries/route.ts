import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';
import { requireStaffSession } from '@/lib/auth/server-guard';

const updateStatusSchema = z.object({
  enquiryId: z.string().min(1),
  newStatus: z.enum([
    'pending_contact',
    'contacted',
    'quoted',
    'deposit_received',
    'dispatched',
    'fulfilled',
    'cancelled',
  ]),
  staffNote: z.string().optional(),
});

export async function PATCH(request: Request) {
  // 1. Enforce Server-Side Authentication & Role Authorization
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent']);
  if (errorResponse) {
    return errorResponse;
  }

  try {
    const body = await request.json();
    const validated = updateStatusSchema.parse(body);

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();

        // Update status using enquiry_ref or id
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          validated.enquiryId
        );

        let updateQuery = supabase
          .from('enquiries')
          .update({
            status: validated.newStatus,
            updated_at: new Date().toISOString(),
          });

        if (isUuid) {
          updateQuery = updateQuery.eq('id', validated.enquiryId);
        } else {
          updateQuery = updateQuery.eq('enquiry_ref', validated.enquiryId);
        }

        const { error: updateError } = await updateQuery;
        if (updateError) {
          console.error('Failed to update enquiry status in Supabase:', updateError);
          return NextResponse.json(
            { success: false, message: updateError.message },
            { status: 500 }
          );
        }

        // Add note if provided
        if (validated.staffNote && isUuid) {
          await supabase.from('enquiry_notes').insert({
            enquiry_id: validated.enquiryId,
            staff_id: staff!.userId,
            note: validated.staffNote,
            is_private: true,
          });
        }

        // Record immutable audit event with verified staff ID
        await supabase.from('audit_events').insert({
          actor_id: staff!.userId,
          actor_role: staff!.role,
          action: 'enquiry.status_updated',
          resource_type: 'enquiries',
          resource_id: isUuid ? validated.enquiryId : undefined,
          changes_json: {
            enquiryRef: validated.enquiryId,
            newStatus: validated.newStatus,
            staffNote: validated.staffNote || null,
          },
        });
      } catch (dbErr) {
        console.error('Database error in /api/admin/enquiries:', dbErr);
        return NextResponse.json(
          { success: false, message: 'Database operational error' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      enquiryId: validated.enquiryId,
      newStatus: validated.newStatus,
      updatedBy: staff!.fullName,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error updating enquiry status' },
      { status: 500 }
    );
  }
}
