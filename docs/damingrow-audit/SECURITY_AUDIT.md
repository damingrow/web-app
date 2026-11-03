# D-AminGrow — Cybersecurity & Regulatory Compliance Forensic Audit
**Document Ref:** DAG-AUDIT-011  
**Audit Date:** November 3, 2026  
**Auditor:** Principal Enterprise Cybersecurity & Agricultural Regulatory Auditor  
**Scope:** Authentication, Authorisation, API Security, Data Privacy, and NAFDAC Regulatory Compliance

---

## 1. Executive Security Assessment & Risk Profile

| Vulnerability Domain | Risk Level | Current Codebase Status | Immediate Action Required |
|---|---|---|---|
| **Administrative Access Control** | **CRITICAL** | Middleware allows access bypass via `damingrow_staff_demo` cookie | Remove demo bypass cookie logic immediately |
| **Admin API Endpoint Authentication**| **HIGH** | `/api/admin/*` handlers lack session/role validation | Enforce Supabase auth checks on all `/api/admin/*` handlers |
| **Database Data Leakage / RLS** | **MODERATE** | RLS enabled, but bypassed by unauthenticated service-role calls | Gate service-role client behind verified staff roles |
| **Public Endpoint Abuse / Spam** | **MODERATE** | `/api/enquiries` has no rate limiting or Turnstile/CAPTCHA | Add Cloudflare Turnstile & IP-based rate limiting |
| **Input Validation & Injection** | **LOW** | Zod schemas validate data types and string lengths | Expand schema to validate structured chick bookings |
| **Secrets & Credential Management** | **LOW** | Secrets isolated in `.env.local` (not committed to git) | Maintain strict environment variable rotation protocols |
| **NAFDAC Veterinary Compliance** | **LOW** | Drug listings display registration numbers and withdrawal periods | Implement mandatory administrative review before publishing |

---

## 2. In-Depth Forensic Vulnerability Analysis

### Vulnerability 1: Hardcoded Authentication Bypass Cookie (CRITICAL)
- **Location:** [`src/lib/supabase/middleware.ts`](file:///Users/mac/Projects/Damingrow/src/lib/supabase/middleware.ts#L60-L68)
- **Vulnerable Code:**
  ```typescript
  // Protect administrative routes
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
- **Exploitation Vector:** Any external actor who opens browser developer tools and creates a cookie named `damingrow_staff_demo` with value `true` can bypass the login wall and access `/admin`, `/admin/enquiries`, `/admin/products`, `/admin/chicks-pricing`, and `/admin/audit`.
- **Secondary Risk:** When running in non-production environments (`NODE_ENV !== 'production'`), administrative protection is disabled entirely.

### Vulnerability 2: Unauthenticated Administrative Route Handlers (HIGH)
- **Location:** [`src/app/api/admin/enquiries/route.ts`](file:///Users/mac/Projects/Damingrow/src/app/api/admin/enquiries/route.ts#L20) and [`src/app/api/admin/chicks-pricing/route.ts`](file:///Users/mac/Projects/Damingrow/src/app/api/admin/chicks-pricing/route.ts#L20)
- **Vulnerable Code:**
  ```typescript
  export async function PATCH(request: Request) {
    try {
      const body = await request.json();
      const validated = updateStatusSchema.parse(body);

      if (env.SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createAdminClient(); // <--- Service role bypasses RLS
        await supabase.from('enquiries').update(...)
  ```
- **Exploitation Vector:** Route handlers in Next.js App Router do not inherit middleware protection automatically if middleware matchers are misconfigured. These endpoints perform no session token verification, role check, or API key validation. An unauthenticated attacker can send automated HTTP `PATCH` requests to alter customer inquiry statuses.

### Vulnerability 3: Service-Role RLS Circumvention
- **Location:** [`src/lib/supabase/server.ts`](file:///Users/mac/Projects/Damingrow/src/lib/supabase/server.ts#L41-L52)
- **Finding:** The application relies on `createAdminClient()` (which uses `SUPABASE_SERVICE_ROLE_KEY`) for standard inquiry ingestion and price updates. While service role is appropriate for backend cron jobs, using it in public route handlers bypasses all 40 PostgreSQL Row-Level Security policies written in `20261026000002_row_level_security.sql`.
- **Recommendation:** Public inquiry submission should use an anonymous client with an `INSERT`-only RLS policy, rather than the super-privileged service role.

---

## 3. Public Endpoint Abuse & Rate Limiting

- **Endpoint:** `/api/enquiries`
- **Current State:** Anyone on the internet can spam this endpoint with unlimited POST requests.
- **Risks:**
  1. Flooding the database with fake inquiries and distorting analytics.
  2. Potential denial of service or quota exhaustion on Supabase.
- **Recommended Remedy:**
  1. Integrate **Cloudflare Turnstile** (invisible CAPTCHA) on the frontend.
  2. Implement an in-memory or KV-based rate limiter (e.g. maximum 5 inquiries per IP per 10 minutes).

---

## 4. Veterinary Regulatory & Compliance Review (NAFDAC Standards)

As an agro-allied distributor of biologicals and pharmaceuticals in Nigeria, D-AminGrow is governed by the **National Agency for Food and Drug Administration and Control (NAFDAC)**:

### 1. Prescription Verification & Cold-Chain Governance:
- **Vaccines:** The platform correctly identifies that vaccines are prescription biologicals and must be maintained between 2°C and 8°C.
- **Antimicrobial Stewardship:** The platform includes mandatory warnings on oxytetracycline, ciprofloxacin, and norfloxacin regarding withdrawal periods (meat/eggs) and antimicrobial resistance (AMR).
- **Audit Recommendation:** Maintain a mandatory verification step in the admin panel before dispatching veterinary pharmaceuticals. The ordering customer must provide a valid veterinary prescription or practice license number.

### 2. Nigeria Data Protection Regulation (NDPR) & Privacy:
- **Findings:**
  - Customer contact details (full name, phone, state, city) are transmitted to sales agents via WhatsApp.
  - The storefront includes comprehensive NDPR/GDPR privacy policies (`/policies/privacy`).
  - **Gap:** When customer details are submitted via `/api/enquiries`, the consent record is not written to the `consent_records` table due to the schema mismatch bug.
