# D-AminGrow — Test Coverage, Quality Assurance & Verification Audit
**Document Ref:** DAG-AUDIT-017  
**Audit Date:** November 3, 2026  
**Test Framework:** Vitest v3.2.7 + Testing Library + jsdom  
**Current Test Suite Status:** 9 Test Files, 37 Tests, 100% Passing

---

## 1. Current Test Suite Evaluation

Running `npm run test` executes the complete test suite in **3.04 seconds**:

```
 RUN  v3.2.7 /Users/mac/Projects/Damingrow

 ✓ tests/rls/rls-policies.test.ts (4 tests)
 ✓ tests/unit/design-tokens.test.ts (3 tests)
 ✓ tests/unit/whatsapp.test.ts (3 tests)
 ✓ tests/unit/env.test.ts (2 tests)
 ✓ tests/unit/catalog.test.ts (5 tests)
 ✓ tests/unit/validation.test.ts (5 tests)
 ✓ tests/unit/admin.test.ts (6 tests)
 ✓ tests/unit/knowledge-and-calculators.test.ts (5 tests)
 ✓ tests/unit/policies.test.ts (4 tests)

 Test Files  9 passed (9)
      Tests  37 passed (37)
```

---

## 2. Test Coverage & Gap Analysis

| Layer | Existing Tests | What is Tested | Critical Gap |
|---|---|---|---|
| **Pure Unit Logic** | **Good (37 tests)** | Role permission functions, WhatsApp link encoding, Zod schema validation rules, calculator formulas, static catalog helpers | None |
| **API Route Handlers** | **Zero Tests (0%)** | None | No tests verifying HTTP response status codes, payload parsing, or error states for `/api/enquiries` or `/api/admin/*` |
| **Database & RLS** | **Simulated Only** | `tests/rls/rls-policies.test.ts` tests in-memory JS helpers | No real SQL tests executing against a Supabase test container; schema mismatches went undetected |
| **React Components** | **Zero Tests (0%)** | None | No component tests rendering `ChickBookingForm`, `CartDrawer`, `ProductCard`, or admin tables |
| **End-to-End (E2E)** | **Zero Tests (0%)** | None | No automated browser tests verifying that a farmer can book chicks, open WhatsApp, or sign into the admin portal |

---

## 3. Recommended Automated Test Expansion Matrix

To ensure that future implementations preserve existing working functionality and prevent regressions, the following test suites must be added:

### A. API Integration Test Suite (`tests/integration/api/`)
1. **`enquiries.test.ts`**:
   - Verify that POST `/api/enquiries` with a valid payload returns `200 OK` and persists into the `enquiries` table.
   - Verify that missing required fields (`fullName`, `phone`, `state`) return `400 Bad Request` with structured Zod errors.
   - Verify that telephone numbers are validated against Nigerian formats (`+234...` or `080...`).
2. **`admin-auth-guard.test.ts`**:
   - Verify that unauthenticated requests to `/api/admin/enquiries` and `/api/admin/chicks-pricing` return `401 Unauthorized`.
   - Verify that a valid `sales_agent` token can update status, but cannot access super-admin endpoints.

### B. Database & Schema Test Suite (`tests/database/`)
1. **`schema-alignment.test.ts`**:
   - Introspect the database schema to ensure all columns referenced by TypeScript types match PostgreSQL column names (e.g. `enquiry_ref` vs `reference_number`).
2. **`rls-enforcement.test.ts`**:
   - Attempt to read `enquiries` with an anonymous client; verify zero rows returned.
   - Attempt to read `enquiries` with an authenticated `sales_agent` client; verify rows returned.

### C. End-to-End (E2E) Test Suite with Playwright (`tests/e2e/`)
1. **`chick-booking-journey.spec.ts`**:
   - Load `/chicks`.
   - Select breed, hatchery, and adjust carton count.
   - Verify dynamic chick total calculation (e.g. 10 cartons = 510 chicks).
   - Submit form and verify WhatsApp link generation.
2. **`calculator-engines.spec.ts`**:
   - Load `/calculators/fcr`.
   - Input feed weight and bird weight; verify calculated FCR matches expected biological benchmarks.
3. **`admin-auth-flow.spec.ts`**:
   - Attempt to load `/admin` directly; verify redirect to `/admin/login`.
   - Enter credentials; verify successful authentication and dashboard render.
