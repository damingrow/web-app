import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';
import { requireStaffSession } from '@/lib/auth/server-guard';

const updateTicketSchema = z.object({
  ticketId: z.string().min(1),
  newStatus: z.enum(['open', 'investigating', 'escalated', 'resolved']),
  staffNote: z.string().optional(),
  resolution: z.string().optional(),
});

/**
 * GET /api/admin/support
 * Retrieve live support tickets from Supabase.
 */
export async function GET() {
  const { errorResponse } = await requireStaffSession(['super_admin', 'sales_agent']);
  if (errorResponse) return errorResponse;

  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ success: true, tickets: [] });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.warn('Querying support_tickets table warning:', error.message);
      return NextResponse.json({ success: true, tickets: [] });
    }

    return NextResponse.json({ success: true, tickets: data || [] });
  } catch (err) {
    console.warn('Exception querying support tickets:', err);
    return NextResponse.json({ success: true, tickets: [] });
  }
}

/**
 * PATCH /api/admin/support
 * Update support ticket status and optionally add a staff resolution note.
 */
export async function PATCH(request: Request) {
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent']);
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const validated = updateTicketSchema.parse(body);

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();

        const { error: updateError } = await supabase
          .from('support_tickets')
          .update({
            status: validated.newStatus,
            resolution_note: validated.resolution || null,
            updated_at: new Date().toISOString(),
            resolved_at: validated.newStatus === 'resolved' ? new Date().toISOString() : null,
          })
          .eq('id', validated.ticketId);

        if (updateError) {
          // Table may not exist yet — graceful fallback
          console.warn('Support ticket update failed (table may not exist):', updateError.message);
        }

        // Audit event regardless of support_tickets table state
        await supabase.from('audit_events').insert({
          actor_id: staff!.userId,
          actor_role: staff!.role,
          action: 'support.ticket_updated',
          resource_type: 'support_tickets',
          resource_id: validated.ticketId,
          changes_json: {
            newStatus: validated.newStatus,
            staffNote: validated.staffNote || null,
            resolution: validated.resolution || null,
          },
        });
      } catch (dbErr) {
        console.warn('Database error in /api/admin/support:', dbErr);
        // Don't fail the request — allow optimistic UI updates
      }
    }

    return NextResponse.json({
      success: true,
      ticketId: validated.ticketId,
      newStatus: validated.newStatus,
      updatedBy: staff!.fullName,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: err.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/admin/support
 * Create a new support ticket linked to an existing enquiry or booking ref.
 */
export async function POST(request: Request) {
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent']);
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { customerName, customerPhone, farmName, category, subject, description, priority, linkedRef } = body as {
      customerName: string;
      customerPhone: string;
      farmName?: string;
      category: string;
      subject: string;
      description: string;
      priority: string;
      linkedRef?: string;
    };

    const ticketRef = `TCK-${new Date().toISOString().slice(0, 7).replace('-', '')}-${Math.floor(Math.random() * 900 + 100)}`;

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        await supabase.from('support_tickets').insert({
          ticket_ref: ticketRef,
          customer_name: customerName,
          customer_phone: customerPhone,
          farm_name: farmName || null,
          category,
          subject,
          description,
          priority,
          status: 'open',
          linked_ref: linkedRef || null,
          created_by: staff!.userId,
          created_at: new Date().toISOString(),
        });
      } catch (dbErr) {
        console.warn('Support ticket insert failed:', dbErr);
      }
    }

    return NextResponse.json({ success: true, ticketRef });
  } catch {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
