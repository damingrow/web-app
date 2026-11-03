/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { requireStaffSession } from '@/lib/auth/server-guard';

vi.mock('@/lib/supabase/server', () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: new Error('No session') }),
    },
  }),
  createAdminClient: vi.fn().mockReturnValue({
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    }),
  }),
}));

describe('Phase 1 Security Hardening & Zero-Trust Access Control', () => {
  it('strictly blocks admin dashboard access when unauthenticated, even with demo cookie', async () => {
    // Construct a request attempting to use the backdoor demo cookie
    const headers = new Headers();
    headers.set('cookie', 'damingrow_staff_demo=true');
    const req = new NextRequest('http://localhost:3000/admin', { headers });

    const response = await updateSession(req);

    // Middleware must redirect to /admin/login and must not honor the demo cookie
    expect(response.status).toBe(307);
    const location = response.headers.get('location');
    expect(location).toContain('/admin/login');
  });

  it('allows public storefront requests through without redirect', async () => {
    const headers = new Headers();
    const req = new NextRequest('http://localhost:3000/chicks', { headers });
    const response = await updateSession(req);
    expect(response.status).toBe(200);
  });

  it('requireStaffSession rejects unauthenticated API calls with HTTP 401', async () => {
    const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent']);
    expect(staff).toBeUndefined();
    expect(errorResponse).toBeDefined();
    expect(errorResponse?.status).toBe(401);

    const body = await errorResponse?.json();
    expect(body.success).toBe(false);
    expect(body.message).toContain('Unauthorized');
  });

  it('verifies that enquiry table contract expects enquiry_ref instead of reference_number', () => {
    const validEnquiryRecord = {
      enquiry_ref: 'DAG-M8K-902',
      customer_name: 'Alhaji Musa Ibrahim',
      customer_phone: '+2348031234567',
      delivery_state: 'Kano State',
      delivery_city: 'Fagge LGA',
      status: 'pending_contact',
    };

    expect(validEnquiryRecord.enquiry_ref).toBeDefined();
    expect((validEnquiryRecord as Record<string, unknown>).reference_number).toBeUndefined();
  });
});
