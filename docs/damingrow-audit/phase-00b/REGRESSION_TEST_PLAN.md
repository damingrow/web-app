# D-AMINGROW — REGRESSION TEST PLAN
## Phase 00B: Quality Assurance, Automated Testing & Capability Preservation Strategy
**Verification Date:** November 3, 2026  
**Auditor:** Principal QA Engineer & Test Automation Specialist  
**Target Repository:** `/Users/mac/Projects/Damingrow`  

---

## 1. Principles of Preservation

A primary mandate of Phase 00B is ensuring that existing working features are **never degraded, broken, or inadvertently removed** during backend security and logic expansion.

### Non-Negotiable Protected Capabilities:
1. **The 37 Existing Passing Unit Tests:** Must continue executing with 100% success rate across all 9 test files.
2. **The 5 Agricultural Calculators:** Brooder Space, Vaccination Schedule, FCR & Feed Margins, Hen-Day Egg Production, and Symptom Checker must retain 100% mathematical accuracy and client interactivity.
3. **Price-on-Request Enforcement:** Public catalog items must never display fixed checkout prices or shopping carts.
4. **WhatsApp Direct Routing:** Official contact number `+2348139169402` and pre-filled URL generators must function flawlessly across desktop and mobile browsers.
5. **6 Dedicated Service Landing Funnels:** Preserving high-converting layouts under `/services/*`.
6. **Edge Performance Baseline:** Total shared first-load JS bundle must remain under 120 KB for rapid loading on Nigerian 3G/4G networks.

---

## 2. Test Suite Expansion Matrix

To bridge the gap between existing in-memory tests and real-world backend durability, the test suite will expand into four distinct testing tiers:

```
+---------------------------------------------------------------------------+
| TIER 4: END-TO-END BROWSER AUTOMATION (Playwright / Chromium)             |
| Chick Booking Multi-Step Form | Admin Login | Deposit Evidence Upload    |
+---------------------------------------------------------------------------+
| TIER 3: CONCURRENCY & INTEGRATION TESTS (Node.js & Supabase Test DB)      |
| 5 Concurrent Quota Reservations | Atomic Transaction Row Lock Verification|
+---------------------------------------------------------------------------+
| TIER 2: API SECURITY & CONTRACT TESTS (Supertest / Next Route Handlers)   |
| Cookie Bypass Block | Unauthenticated PATCH 401 | DB Schema Insert Check  |
+---------------------------------------------------------------------------+
| TIER 1: CORE UNIT & REGULATORY TESTS (Vitest - 37 Existing Tests)         |
| Zod Schemas | AMR Warnings | Cold-Chain Flags | Calculator Formulae       |
+---------------------------------------------------------------------------+
```

---

## 3. New Automated Test Specifications

### 3.1 Security & Access Control Test Suite (`tests/security/auth-guards.test.ts`)
- **Test SC-01:** Verifies that setting cookie `damingrow_staff_demo=true` without a valid Supabase Auth session returns an HTTP 307 redirect to `/admin/login`.
- **Test SC-02:** Verifies that unauthenticated PATCH requests to `/api/admin/enquiries` return HTTP 401 Unauthorized.
- **Test SC-03:** Verifies that a user with role `sales_agent` attempting to perform `super_admin` pricing synchronization is denied with HTTP 403 Forbidden.
- **Test SC-04:** Verifies that Supabase service-role key is never leaked into client HTML, headers, or client bundle responses.

### 3.2 Database Integration Test Suite (`tests/integration/enquiry-pipeline.test.ts`)
- **Test DB-01:** Submits a valid customer inquiry payload to `/api/enquiries` and asserts that:
  - Response returns HTTP 200 with format `DAG-XXXXXXXX-XXX`.
  - Exactly one row is created in `public.enquiries` with matching `enquiry_ref`.
  - If `consentMarketing: true`, exactly one row is created in `public.consent_records`.
- **Test DB-02:** Simulates a database connection failure and verifies that:
  - Error is caught and logged.
  - API returns HTTP 500 with a direct fallback WhatsApp URL so the customer can still complete their inquiry.

### 3.3 Concurrency & Quota Allocation Test Suite (`tests/integration/chick-concurrency.test.ts`)
- **Test CC-01:** Seeds a partner hatchery quota of 50 cartons for an upcoming Tuesday dispatch.
- **Test CC-02:** Spawns 5 asynchronous promises simulating 5 farmers simultaneously attempting to reserve 20 cartons each (100 cartons total demand against 50 cartons supply).
- **Test CC-03:** Asserts that:
  - Exactly 2 requests succeed (allocating 40 cartons).
  - 3 requests receive clear structured error: "Insufficient quota available".
  - Total `reserved_cartons` on the database row equals exactly 40 (never exceeds 50).
  - Zero deadlocks or uncaught promise rejections occur.

### 3.4 Deposit Reconciliation Workflow Test Suite (`tests/integration/deposit-reconciliation.test.ts`)
- **Test DP-01:** Holds a quota for 2 cartons of broiler chicks. Booking status is `'quota_held'`, deposit is `'unpaid'`.
- **Test DP-02:** Customer uploads payment reference `NIP-20261103-99881`. Booking deposit status transitions to `'evidence_submitted'`.
- **Test DP-03:** Asserts that booking status remains `'quota_held'` (NEVER automatically confirmed by screenshot).
- **Test DP-04:** Authenticated sales staff reviews bank statement and approves deposit. Asserts that:
  - Booking transitions to `'confirmed'`.
  - Quota transitions 2 cartons from `reserved_cartons` to `confirmed_cartons`.
  - `deposit_reconciliations` records staff ID and timestamp.

---

## 4. Calculator Integrity & Regression Verification

Each of the 5 agricultural calculators must be tested against verified poultry industry baseline tables:

| Calculator | Test Input Parameters | Expected Mathematical Output | Allowed Variance |
|---|---|---|---|
| **Brooder Space** | 1,000 Day-Old Broilers, Week 1 (Day 1–7) | Floor Space: 200 sq. ft (50 chicks/sq. m)<br>Feeders: 20 brooding trays<br>Drinkers: 20 mini font drinkers<br>Heat: 2 infrared gas brooders (500-bird rating) | ±0.0% (Exact match) |
| **Vaccination Schedule** | Breed: Commercial Broiler, Flock Start: 2026-11-03 | Day 1: Marek's (Hatchery)<br>Day 7: Newcastle B1 / Hitchner<br>Day 10: Gumboro (IBD Intermediate)<br>Day 18: Gumboro Booster<br>Day 21: Newcastle LaSota Booster | Exact schedule dates |
| **Feed Conversion (FCR)** | 1,000 birds, Total Feed: 3,400 kg, Final Weight: 2,100 kg | FCR: 1.62 (Excellent efficiency)<br>Total Meat Produced: 2,100 kg | ±0.01 FCR |
| **Hen-Day Egg Production** | 2,000 Active Layers, Eggs Collected: 1,840 eggs/day | Hen-Day Lay Rate: 92.0%<br>Total Crates: 61.33 crates | ±0.1% |
| **Symptom Guidance** | Observations: "Bloody diarrhea, huddled posture, ruffled feathers, 3-week broilers" | Primary Triage: Acute Coccidiosis Suspect<br>Action: Immediate veterinary isolation, avoid human contact with feces, consultation CTA | Non-diagnostic disclaimer displayed |

---

## 5. Automated Release Gates

Before promoting any implementation branch to production, the continuous integration (CI) pipeline must pass through four mandatory gates:

```
[PR Submitted] 
     │
     ▼
[GATE 1: Static Code Quality] ──> npm run lint (0 errors) & npm run typecheck (0 errors)
     │
     ▼
[GATE 2: Core Unit Tests]     ──> npm test (37/37 passing in under 5 seconds)
     │
     ▼
[GATE 3: Security & RLS]      ──> Vitest security suite (Cookie backdoor blocked, 401 on APIs)
     │
     ▼
[GATE 4: Production Build]    ──> npm run build (Clean OpenNext Cloudflare bundle, exit code 0)
     │
     ▼
[APPROVED FOR PRODUCTION DEPLOYMENT]
```
