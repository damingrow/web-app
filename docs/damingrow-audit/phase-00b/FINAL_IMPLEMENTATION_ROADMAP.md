# D-AMINGROW — FINAL IMPLEMENTATION ROADMAP
## Phase 00B: Strategic 8-Phase Platform Evolution, Governance & Release Control
**Verification Date:** November 3, 2026  
**Auditor:** Principal Software Architect, Next.js Technical Lead & Enterprise Security Specialist  
**Target Repository:** `/Users/mac/Projects/Damingrow`  
**Execution Status:** READ-ONLY Verification Complete — Awaiting Explicit Approval to Implement

---

## 1. Executive Implementation Manifesto

D-AminGrow possesses an exceptional frontend foundation tailored specifically to the Nigerian agro-allied marketplace. **The platform does not require a rewrite; it requires a disciplined, backend-led operational evolution.**

The roadmap structured below transforms D-AminGrow into a secure, market-leading agricultural enterprise by executing fixes in strict dependency sequence. No marketing campaigns or visual redesigns will occur while backend security vulnerabilities and data loss defects persist.

```
+===================================================================================================+
|                              D-AMINGROW 8-PHASE IMPLEMENTATION TIMELINE                           |
+===================================================================================================+
| [Phase 1] Security, Authentication Hardening & Enquiry Recovery            ─── HARD PREREQUISITE   |
| [Phase 2] Database Integration, Real Admin Operations & Live Catalog       ─── BACKEND FOUNDATION  |
| [Phase 3] Transactional Chick Booking Engine, Quotas & Manifests           ─── CORE REVENUE ENGINE |
| [Phase 4] Point-of-Lay Batches & Professional Veterinary Triage            ─── SERVICE ACQUISITION |
| [Phase 5] Deduplicated Farmer CRM & Customer Relationship Timeline         ─── RETENTION & LTV     |
| [Phase 6] Multi-Tier Editorial CMS, Structured Schemas & 500k SEO Hub     ─── ORGANIC DOMINANCE   |
| [Phase 7] Agricultural Calculator Exports, Turnstile Shield & Analytics    ─── CONVERSION OPT      |
| [Phase 8] Cloudflare Workers Edge Optimization, E2E QA & Production Launch ─── ENTERPRISE GO-LIVE  |
+===================================================================================================+
```

---

## 2. Phase-by-Phase Implementation Specifications

### PHASE 1: Security Hardening, Authentication & Enquiry Recovery
*Goal: Eliminate P0 vulnerabilities, close administrative backdoors, and ensure 100% of customer inquiries are saved in the database.*

- **Target Files & Deliverables:**
  - `src/lib/supabase/middleware.ts`: Remove `damingrow_staff_demo` cookie backdoor and non-production bypass (lines 60–68).
  - `src/lib/auth/server-guard.ts`: Implement `requireStaffSession` server-side authentication and RBAC guard.
  - `src/app/api/admin/enquiries/route.ts`: Enforce authentication guard on PATCH handler before executing service-role updates.
  - `src/app/api/admin/chicks-pricing/route.ts`: Enforce `super_admin` authentication guard on POST handler.
  - `src/app/api/enquiries/route.ts`: Reconcile column names (`enquiry_ref`), split consent into `consent_records`, and return HTTP 500 on database failures with fallback WhatsApp URLs.
- **Automated Verification Tests:**
  - `tests/security/auth-guards.test.ts`: Verify cookie bypass is blocked and unauthenticated API calls return 401.
  - `tests/integration/enquiry-pipeline.test.ts`: Verify valid inquiries create rows in `enquiries` and `consent_records`.
- **Release Condition:** All security and integration tests pass with zero console errors.

---

### PHASE 2: Database Integration & Live Administrative Operations
*Goal: Replace all static mock data inside the admin portal with live Supabase SSR queries.*

- **Target Files & Deliverables:**
  - `src/app/admin/(dashboard)/page.tsx`: Replace hardcoded KPIs (e.g. "12 Pending Contacts") and `RECENT_ENQUIRIES` mock array with live Supabase queries.
  - `src/app/admin/(dashboard)/enquiries/page.tsx`: Replace `INITIAL_ENQUIRIES` array with real-time Supabase table query.
  - `src/app/admin/(dashboard)/audit/page.tsx`: Query live `public.audit_events` table.
  - `src/app/admin/(dashboard)/products/page.tsx`: Connect catalogue table to Supabase `products` and `product_variants` tables, replacing static imports.
- **Automated Verification Tests:**
  - Admin SSR data loading test verifying live database records render correctly in the UI.
- **Release Condition:** Full frontend/backend traceability verified; zero mock arrays remain in admin views.

---

### PHASE 3: Transactional Chick Booking Engine, Quotas & Manifests
*Goal: Implement D-AminGrow's signature commercial feature: a race-condition-proof Day-Old Chick booking system.*

- **Target Files & Deliverables:**
  - `supabase/migrations/20261103000001_chick_booking_engine.sql`: Deploy `partner_hatcheries`, `hatchery_quotas`, `chick_bookings`, and `deposit_reconciliations` tables.
  - Deploy stored procedure `reserve_chick_quota` utilizing PostgreSQL `SELECT FOR UPDATE` row locking.
  - Deploy stored procedure `release_expired_chick_holds` (120-minute reservation TTL worker).
  - `src/app/(storefront)/chicks/chick-booking-form.tsx`: Connect multi-step booking form to new `/api/bookings` endpoint.
  - Build Admin modules:
    - Quota Allocation Workspace (manage weekly carton limits per hatchery).
    - Deposit Reconciliation Desk (manual staff bank verification with audit attribution).
    - Interstate Dispatch Manifest Generator (printable waybills grouped by destination motor parks).
- **Automated Verification Tests:**
  - `tests/integration/chick-concurrency.test.ts`: Simulate 5 concurrent reservation attempts competing for limited quota (assert zero overbooking).
  - `tests/integration/deposit-reconciliation.test.ts`: Assert booking transitions only upon manual staff approval.
- **Release Condition:** Concurrency tests pass; Tuesday/Thursday dispatch schedules verified.

---

### PHASE 4: Point-of-Lay Birds & Professional Veterinary Triage
*Goal: Formalize high-ticket commercial layer bird sourcing and build a structured veterinary clinical consultation intake.*

- **Target Files & Deliverables:**
  - `src/app/(storefront)/services/point-of-lay/page.tsx`: Enhance POL booking funnel with flock age indicators (17–18 weeks) and vaccination certificate requests.
  - `src/app/(storefront)/services/consultation/page.tsx`: Add veterinary clinical intake modal capturing flock age, mortality count, clinical signs, and post-mortem photos.
  - Update `enquiries` triage queue in Admin to auto-assign clinical consultation tickets to staff possessing the `veterinary_consultant` role.
- **Automated Verification Tests:**
  - Verification that veterinary consultation tickets route exclusively to authorized veterinary personnel.
- **Release Condition:** Real operational workflows for POL bird bookings and veterinary triage operational.

---

### PHASE 5: Deduplicated Farmer CRM & Customer Directory
*Goal: Unify fragmented farmer touchpoints into single-profile customer records using phone-based deduplication.*

- **Target Files & Deliverables:**
  - `supabase/migrations/20261103000002_crm_customers.sql`: Deploy `customers` table with unique constraint on E.164 phone numbers.
  - Implement automatic profile-linking trigger on new inquiries and chick bookings.
  - `src/app/admin/(dashboard)/crm/page.tsx`: Deploy customer directory showing lifetime bookings, preferred hatchery brands, farm location, and credit reliability scores.
- **Automated Verification Tests:**
  - Unit and integration tests verifying multiple inquiries with variations of the same phone number (e.g. `08031234567` and `+2348031234567`) link to a single customer entity.
- **Release Condition:** Customer deduplication lifecycle functional; repeat inquiries automatically aggregated.

---

### PHASE 6: Multi-Tier Editorial CMS, Structured Schemas & 500k SEO Hub
*Goal: Establish Google E-E-A-T topical authority across West Africa to capture 500,000 monthly farmer visits.*

- **Target Files & Deliverables:**
  - Admin Editorial CMS: Deploy article editor with multi-tier workflow (`draft` -> `veterinary_review` -> `published`).
  - Deploy verified author profiles displaying official Veterinary Council of Nigeria (VCN) accreditation numbers.
  - Deploy JSON-LD structured data components on all storefront pages:
    - `Product` with `AggregateOffer` (price-on-request compliant).
    - `FAQPage` schema on all educational guides.
    - `LocalBusiness` / `AgroAlliedEnterprise` schema.
    - `BreadcrumbList` navigation schema.
  - Launch 90-day publishing calendar targeting high-intent Nigerian poultry search clusters.
- **Automated Verification Tests:**
  - Schema validation test confirming all generated JSON-LD scripts conform to Google Rich Results specifications.
- **Release Condition:** All 72+ URLs validated in Google Search Console test tools; publishing CMS active.

---

### PHASE 7: Agricultural Calculator Exports, Turnstile Shield & Analytics
*Goal: Enhance calculator utility value, block automated spam, and track conversion events.*

- **Target Files & Deliverables:**
  - `src/app/(storefront)/calculators/*`: Add printable PDF brooding charts, vaccination schedules, and WhatsApp calculation summary share buttons.
  - Cloudflare Turnstile: Embed Turnstile CAPTCHA on all booking and inquiry forms to block bot submissions.
  - Public API Rate Limiting: Implement edge rate limiting on `/api/enquiries` and `/api/bookings`.
  - Analytics & Conversion Tracking: Add privacy-compliant event tracking for WhatsApp clicks, booking form opens, and calculator completions.
- **Automated Verification Tests:**
  - Rate limiting tests asserting that automated spam is throttled with HTTP 429 Too Many Requests.
- **Release Condition:** Calculator exports functional; Turnstile verification active on all forms.

---

### PHASE 8: Cloudflare Workers Edge Optimization, E2E QA & Production Launch
*Goal: Conduct exhaustive regression testing, optimize OpenNext edge caching, and execute production release.*

- **Target Files & Deliverables:**
  - Execute full Playwright end-to-end browser test suite covering:
    - Customer chick booking journey.
    - Public catalog price-on-request WhatsApp routing.
    - Admin login and deposit verification.
    - Agricultural calculator accuracy.
  - OpenNext / Cloudflare Workers build verification:
    - Optimize edge caching headers for static assets.
    - Verify server-side streaming responses on edge workers.
  - Cold-Chain Logistics Protocol: Formalize warehouse pre-dispatch temperature verification checklist.
  - Execute production deployment and DNS cutover.
- **Automated Verification Tests:**
  - 100% pass rate across Vitest unit tests (37/37), security tests, integration tests, and Playwright E2E tests.
  - `npm run build` exits code 0 with zero warnings.
- **Release Condition:** All release gates satisfied; executive stakeholder sign-off obtained.

---

## 3. Immediate Recommended Action

Phase 00B is now **completely documented, forensically verified, and locked in a READ-ONLY state**. 

No source code or database modifications have been made. To proceed, the stakeholder should review the verified findings and authorize the commencement of **Phase 1: Security Hardening & Enquiry Persistence**.
