# D-AMINGROW — IMPLEMENTATION DEPENDENCY MAP
## Phase 00B: Critical Path Architecture, Prerequisites & Dependency Modeling
**Verification Date:** November 3, 2026  
**Auditor:** Principal Enterprise Software Architect  
**Target Repository:** `/Users/mac/Projects/Damingrow`  

---

## 1. Architectural Dependency Philosophy

A frequent failure mode in platform development is prioritizing high-visibility marketing pages or visual redesigns while underlying security, authentication, and database insertion mechanisms remain compromised.

In D-AminGrow's verified state:
- **Phase 1 (Security & Recovery) is a hard prerequisite for all subsequent phases.** Developing advanced booking engines or CRM systems while `/api/admin/*` is open to unauthenticated writes or `/api/enquiries` silently drops records would compound production liabilities.
- **Phase 2 (Database Integration) is required before transactional bookings (Phase 3) or CRM deduplication (Phase 5).**
- **Phase 3 (Chick Booking Engine) forms the commercial backbone** that feeds real customer records into Phase 5 (CRM).

```
                  ┌─────────────────────────────────────────┐
                  │      PHASE 1: SECURITY & RECOVERY       │
                  │  (Middleware Fix, API Guards, DB Align) │
                  └────────────────────┬────────────────────┘
                                       │
                                       ▼
                  ┌─────────────────────────────────────────┐
                  │    PHASE 2: REAL SUPABASE ADMIN DATA    │
                  │   (Live Queries, SSR Client, Catalog)   │
                  └─────────┬─────────────────────┬─────────┘
                            │                     │
             ┌──────────────┴──────┐              │
             ▼                     ▼              │
┌─────────────────────────┐  ┌───────────┐        │
│    PHASE 3: BOOKINGS    │  │  PHASE 6: │        │
│  (Quotas, Concurrency,  │  │  CMS/SEO  │        │
│   Deposits, Manifests)  │  │  (Schema, │        │
└────────────┬────────────┘  │  Content) │        │
             │               └─────┬─────┘        │
     ┌───────┴───────┐             │              │
     ▼               ▼             │              │
┌───────────┐  ┌───────────┐       │              │
│  PHASE 4: │  │  PHASE 5: │       │              │
│  POL/VET  │  │    CRM    │       │              │
│  TRIAGE   │  │  (Dedup)  │       │              │
└─────┬─────┘  └─────┬─────┘       │              │
      │              │             │              │
      └──────────────┼─────────────┘              │
                     │                            │
                     ▼                            ▼
              ┌─────────────────────────────────────────┐
              │   PHASE 7: MARKETING & CONVERSION OPT   │
              │   (Calculator Exports, Turnstile Shield)│
              └────────────────────┬────────────────────┘
                                   │
                                   ▼
              ┌─────────────────────────────────────────┐
              │  PHASE 8: RELEASE GATES & CLOUDFLARE    │
              │  (E2E Verification, Edge Optimization)  │
              └─────────────────────────────────────────┘
```

---

## 2. Phase-by-Phase Dependency Specifications

### Phase 1: Security Hardening & Enquiry Persistence
- **Prerequisites:** None.
- **Unlocks:** All subsequent phases.
- **Core Deliverables:**
  - Remove demo cookie backdoor in `src/lib/supabase/middleware.ts`.
  - Remove non-production authentication bypass in middleware.
  - Implement `requireStaffSession` guard on `/api/admin/enquiries` and `/api/admin/chicks-pricing`.
  - Fix column mapping in `/api/enquiries/route.ts` (`enquiry_ref` and `consent_records`).
- **Regression Risk:** Low. Only impacts unauthenticated or improperly structured API requests.

---

### Phase 2: Database Integration & Live Administrative Operations
- **Prerequisites:** Phase 1 (Must have authenticated API routes).
- **Unlocks:** Phase 3, Phase 4, Phase 5, Phase 6.
- **Core Deliverables:**
  - Replace mock arrays (`RECENT_ENQUIRIES`, `INITIAL_ENQUIRIES`) with Supabase SSR queries.
  - Connect `/admin/products` to live database `products` and `product_variants` tables.
  - Connect `/admin/audit` to live `audit_events` table.
- **Regression Risk:** Low. Eliminates fake data; maintains existing UI layout and Tailwind styling.

---

### Phase 3: Transactional Chick Booking Engine & Logistics
- **Prerequisites:** Phase 1 and Phase 2.
- **Unlocks:** Phase 4 (POL uses booking logic) and Phase 5 (Bookings populate CRM).
- **Core Deliverables:**
  - Execute migration `20261103000001_chick_booking_engine.sql` (`partner_hatcheries`, `hatchery_quotas`, `chick_bookings`, `deposit_reconciliations`).
  - Implement PostgreSQL stored procedure `reserve_chick_quota` with `SELECT FOR UPDATE`.
  - Connect storefront `chick-booking-form.tsx` to transactional booking API.
  - Build Admin modules: Quota Manager, Deposit Reconciliation Desk, and Interstate Dispatch Manifests.
- **Regression Risk:** Medium. Requires careful verification of concurrency locks and timezone handling for Tuesday/Thursday schedules.

---

### Phase 4: Point-of-Lay Batches & Veterinary Clinical Triage
- **Prerequisites:** Phase 2 and Phase 3.
- **Unlocks:** High-ticket commercial egg layer farm client acquisition.
- **Core Deliverables:**
  - Point-of-lay batch management (bird age in weeks, vaccination certificates, crate sizing).
  - Veterinary clinical triage modal capturing flock mortality, age, symptoms, and photos.
  - Role-based routing assigning clinical inquiries to licensed staff veterinarians.
- **Regression Risk:** Low. Builds upon established service funnels.

---

### Phase 5: Deduplicated Farmer CRM & Customer Directory
- **Prerequisites:** Phase 2 and Phase 3 (Needs incoming inquiries and confirmed bookings).
- **Unlocks:** Repeat purchase automation and customer lifetime value reporting.
- **Core Deliverables:**
  - Create `customers` table with unique constraint on E.164 normalized phone numbers.
  - Build background auto-linking trigger associating inquiries and bookings with farmer profiles.
  - Admin single-view customer profile displaying lifetime carton volume, farm location, and notes.
- **Regression Risk:** Low. Read-only aggregation on existing customer datasets.

---

### Phase 6: Editorial CMS, Structured Schemas & 500k Traffic Hub
- **Prerequisites:** Phase 2 (Needs database connection for CMS).
- **Unlocks:** Long-term organic search dominance across Nigeria and West Africa.
- **Core Deliverables:**
  - Build Admin CMS with multi-tier approvals (`draft` -> `veterinary_review` -> `published`).
  - Embed official Veterinary Council of Nigeria (VCN) author credentials.
  - Deploy comprehensive JSON-LD schemas (`Product`, `FAQPage`, `LocalBusiness`, `BreadcrumbList`).
  - Initiate 90-day publishing programme targeting high-intent farming keywords.
- **Regression Risk:** Low. Purely additive to SEO metadata and knowledge hub content.

---

### Phase 7: Conversion Optimization, Calculator Exports & Edge Protection
- **Prerequisites:** Phase 1, Phase 3, Phase 6.
- **Unlocks:** High conversion efficiency and zero bot spam.
- **Core Deliverables:**
  - Implement PDF export and printable brooding charts on agricultural calculators.
  - Add WhatsApp calculation sharing deep-links.
  - Integrate Cloudflare Turnstile bot protection on booking and inquiry forms.
  - Enforce sliding-window rate limiting on public API endpoints.
- **Regression Risk:** Low. Enhances existing calculators without altering underlying algorithms.

---

### Phase 8: Production Release, OpenNext Edge Verification & Final Auditing
- **Prerequisites:** All prior phases (Phase 1 through Phase 7).
- **Core Deliverables:**
  - Full end-to-end Playwright browser automation verification.
  - Run complete 37-test unit suite and new integration suites.
  - Verify OpenNext Cloudflare Workers build and edge asset caching.
  - Execute cold-chain logistics checklist sign-off.
  - Promote to production with zero-downtime DNS cutover.

---

## 3. Critical Failure & Risk Prevention Matrix

| If This Rule Is Violated... | Catastrophic Failure Mode | Mandated Prevention Strategy |
|---|---|---|
| **Marketing pages deployed before Phase 1** | New traffic floods broken `/api/enquiries`, dropping hundreds of customer leads silently into console errors. | **Hard Gate:** Zero marketing spend or public launch until Phase 1 passes database integration tests. |
| **Chick booking launched without `SELECT FOR UPDATE` (Phase 3)** | Simultaneous farmer reservations overbook Tuesday hatchery allocations, risking millions in customer default. | **Hard Gate:** Booking form disabled until transactional concurrency test `tests/integration/chick-concurrency.test.ts` passes. |
| **Bank deposit auto-verified by screenshot** | Fraudulent actors upload photoshopped transfer receipts and receive confirmed carton allocations. | **Hard Gate:** Status `'confirmed'` can only be set by manual staff approval against live bank portal. |
| **Fabricated "20 years" claim published** | Potential NAFDAC, FCCPC, or advertising standards regulatory violation for deceptive claims. | **Hard Gate:** Copy explicitly adjusted to *"Backed by over 20 years of combined agricultural leadership and veterinary expertise"*. |
