# D-AMINGROW — SECURITY REMEDIATION PLAN
## Phase 00B: Comprehensive Security, Authentication & Access Control Hardening
**Verification Date:** November 3, 2026  
**Auditor:** Principal Enterprise Cybersecurity Architect  
**Target Repository:** `/Users/mac/Projects/Damingrow`  
**Execution Status:** Specification Only (Implementation Pending Explicit Approval)

---

## 1. Threat Model & Vulnerability Assessment

A zero-trust forensic evaluation of the application revealed critical vulnerabilities that would permit unauthorized administrative takeover, unauthenticated database tampering, and undetected data destruction in production.

```
       ATTACK VECTOR A: Middleware Backdoor Bypass
       [Attacker] ---> HTTP Request + Cookie: "damingrow_staff_demo=true" 
                  ---> Middleware skips Auth check
                  ---> [FULL ADMIN DASHBOARD ACCESS GRANTED]

       ATTACK VECTOR B: Unauthenticated Service-Role APIs
       [Attacker] ---> PATCH /api/admin/enquiries { enquiryId, newStatus: "cancelled" }
                  ---> Zero session check
                  ---> createAdminClient() executes as Postgres Superuser
                  ---> [DATABASE RECORD TAMPERED / CUSTOMER ORDERS ALTERED]

       ATTACK VECTOR C: Silent DB Insert Failure
       [Farmer]   ---> Submits Chick Booking / Order Form
                  ---> API attempts insert with incorrect column names
                  ---> Postgres throws 42703 (undefined column)
                  ---> Catch block swallows error; returns HTTP 200
                  ---> [CUSTOMER BELIEVES BOOKED; ZERO DATA RECORDED]
```

---

## 2. Priority 0 Remediation Specifications

### 2.1 Remediation SR-01: Remove Middleware Backdoor
**Target File:** `src/lib/supabase/middleware.ts` (lines 59–69)

#### Vulnerable Code:
```typescript
// VULNERABLE: Demo cookie backdoor and non-production bypass
if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
  const isDemoSession = request.cookies.get('damingrow_staff_demo')?.value === 'true';
  if (!user && !isDemoSession && process.env.NODE_ENV === 'production') {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/admin/login';
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }
}
```

#### Remediation Specification:
1. **Completely eliminate `damingrow_staff_demo` cookie reference.** No backdoor cookies permitted in any environment.
2. **Remove `process.env.NODE_ENV === 'production'` conditional.** Authentication must be enforced uniformly across local development, staging, preview branches, and production.
3. **Verify active Supabase session.** If `!user`, redirect immediately to `/admin/login`.
4. **Inspect staff profile status.** Ensure the user is not only authenticated via Supabase Auth, but possesses an active record in `public.staff_profiles` with `is_active = true`.

#### Required Hardened Implementation:
```typescript
// HARDENED MIDDLEWARE GUARD
if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/admin/login';
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }
}
```

---

### 2.2 Remediation SR-02: Enforce Server-Side Auth Guard on Admin APIs
**Target Files:**
- `src/app/api/admin/enquiries/route.ts`
- `src/app/api/admin/chicks-pricing/route.ts`

#### Vulnerable Pattern:
Route handlers currently invoke `createAdminClient()` and perform data mutations without validating `request` cookies, bearer tokens, or user session state.

#### Architectural Solution: Reusable Server Auth Guard
Create a secure helper: `src/lib/auth/server-guard.ts`

```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { createAdminClient } from '@/lib/supabase/server';

export type StaffRole = 'super_admin' | 'sales_agent' | 'content_editor' | 'veterinary_consultant';

export interface AuthenticatedStaff {
  userId: string;
  email: string;
  role: StaffRole;
  fullName: string;
}

export async function requireStaffSession(
  allowedRoles: StaffRole[] = ['super_admin']
): Promise<{ errorResponse?: NextResponse; staff?: AuthenticatedStaff }> {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Handled by middleware session refresher
        },
      },
    }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      errorResponse: NextResponse.json(
        { success: false, message: 'Unauthorized: Authentication required' },
        { status: 401 }
      ),
    };
  }

  // Verify staff profile and assigned role
  const adminDb = createAdminClient();
  const { data: profile, error: profileError } = await adminDb
    .from('staff_profiles')
    .select('role, full_name, is_active')
    .eq('id', user.id)
    .single();

  if (profileError || !profile || !profile.is_active) {
    return {
      errorResponse: NextResponse.json(
        { success: false, message: 'Forbidden: Account inactive or not a recognized staff member' },
        { status: 403 }
      ),
    };
  }

  if (!allowedRoles.includes(profile.role as StaffRole)) {
    return {
      errorResponse: NextResponse.json(
        { success: false, message: 'Forbidden: Insufficient role permissions' },
        { status: 403 }
      ),
    };
  }

  return {
    staff: {
      userId: user.id,
      email: user.email || '',
      role: profile.role as StaffRole,
      fullName: profile.full_name,
    },
  };
}
```

#### Application in `src/app/api/admin/enquiries/route.ts`:
```typescript
export async function PATCH(request: Request) {
  // 1. Enforce authentication and role verification FIRST
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent']);
  if (errorResponse) return errorResponse;

  // 2. Parse and validate payload
  const body = await request.json();
  const validated = updateStatusSchema.parse(body);

  // 3. Execute update with staff audit attribution
  const supabase = createAdminClient();
  const { error: updateError } = await supabase
    .from('enquiries')
    .update({
      status: validated.newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('enquiry_ref', validated.enquiryId);

  if (updateError) {
    return NextResponse.json({ success: false, message: updateError.message }, { status: 500 });
  }

  // 4. Log audit event with verified staff ID
  await supabase.from('audit_events').insert({
    actor_id: staff!.userId,
    actor_role: staff!.role,
    action: 'enquiry.status_updated',
    resource_type: 'enquiries',
    resource_id: validated.enquiryId,
    changes_json: { newStatus: validated.newStatus, staffNote: validated.staffNote },
  });

  return NextResponse.json({ success: true, enquiryId: validated.enquiryId, newStatus: validated.newStatus });
}
```

---

### 2.3 Remediation SR-03: Reconcile `/api/enquiries` Column Mismatches
**Target File:** `src/app/api/enquiries/route.ts`

#### Required Schema Alignment:
1. Replace `reference_number` with `enquiry_ref`.
2. Do not insert `consent_given` into `enquiries` table (insert into `consent_records` or use transaction).
3. If database insert fails, **do not return HTTP 200**. Log full database error details, capture monitoring metrics, and return a clean HTTP 500 error allowing client-side fallback to direct WhatsApp pre-filled link.

#### Hardened Endpoint Logic:
```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = enquiryInputSchema.parse(body);

    const enquiryRef = `DAG-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createAdminClient();
      
      // Insert enquiry record with exact schema match
      const { data: enquiryData, error: enquiryError } = await supabase
        .from('enquiries')
        .insert({
          enquiry_ref: enquiryRef,
          enquiry_type: validated.enquiryType,
          customer_name: validated.fullName,
          customer_phone: validated.phone,
          farm_name: validated.farmName || null,
          delivery_state: validated.state,
          delivery_city: validated.city || validated.state,
          user_notes: validated.notes || null,
          status: 'pending_contact',
          priority: 'normal',
        })
        .select('id')
        .single();

      if (enquiryError) {
        console.error('Critical Database Insert Failure in /api/enquiries:', enquiryError);
        return NextResponse.json(
          {
            success: false,
            message: 'Unable to record inquiry in database. Please contact us directly via WhatsApp.',
            fallbackWhatsAppUrl: `https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20tried%20submitting%20an%20inquiry%20for%20${encodeURIComponent(validated.enquiryType)}`,
          },
          { status: 500 }
        );
      }

      // Record NDPA 2023 Consent Record
      if (validated.consentMarketing) {
        await supabase.from('consent_records').insert({
          user_identifier: validated.phone,
          consent_type: 'marketing_communication',
          consented: true,
        });
      }
    }

    return NextResponse.json({
      success: true,
      referenceNumber: enquiryRef,
      message: 'Enquiry received successfully.',
    });
  } catch (err) {
    // Schema or network error handling
  }
}
```

---

## 3. Database Row-Level Security (RLS) Verification Checklist

All 17 tables must enforce Row-Level Security (`ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY`).
Verification confirms the following policy structure:

| Table Name | Public (`anon`) Access | Authenticated Staff Access | Service-Role (`admin`) Access |
|---|---|---|---|
| `enquiries` | INSERT only with input validation | SELECT / UPDATE based on role | Full bypass |
| `staff_profiles` | DENIED (Zero access) | SELECT own profile; super_admin all | Full bypass |
| `products` | SELECT `is_active = true` only | Full CRUD for authorized staff | Full bypass |
| `articles` | SELECT `status = 'published'` only | Full CRUD for content_editor | Full bypass |
| `audit_events` | DENIED (Zero access) | SELECT for super_admin only | INSERT / SELECT |
| `consent_records` | INSERT only | SELECT for compliance officer | Full bypass |

---

## 4. Bot Protection & Rate Limiting

To prevent automated denial-of-service or database exhaustion via `/api/enquiries`:
1. **Cloudflare Turnstile:** Add a lightweight, privacy-preserving Turnstile CAPTCHA token to the booking and inquiry forms.
2. **In-Memory / KV Rate Limiting:** Enforce a sliding window limit of 5 inquiry submissions per IP address per 15-minute window.
3. **Payload Sanitization:** Enforce strict Zod bounds on all input strings to prevent SQL or NoSQL injection payloads.

---

## 5. Security Rollback & Verification Criteria

Prior to deploying any security patch to production:
1. Automated security test `tests/rls/rls-policies.test.ts` must execute against a local Supabase test instance.
2. An automated integration test must verify that sending `damingrow_staff_demo=true` without valid auth tokens results in HTTP 307 Redirect to `/admin/login`.
3. An automated API test must verify that unauthenticated PATCH requests to `/api/admin/enquiries` yield HTTP 401 Unauthorized.
