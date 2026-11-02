import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';

const updateStatusSchema = z.object({
  enquiryId: z.string(),
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
  try {
    const body = await request.json();
    const validated = updateStatusSchema.parse(body);

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        await supabase
          .from('enquiries')
          .update({
            status: validated.newStatus,
            updated_at: new Date().toISOString(),
          })
          .eq('reference_number', validated.enquiryId);

        await supabase.from('audit_events').insert({
          actor_role: 'sales_agent',
          action: 'enquiry.status_updated',
          resource_type: 'enquiries',
          resource_id: validated.enquiryId,
          changes_json: {
            newStatus: validated.newStatus,
            staffNote: validated.staffNote,
          },
        });
      } catch (dbErr) {
        console.error('Failed to update enquiry in Supabase:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      enquiryId: validated.enquiryId,
      newStatus: validated.newStatus,
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
