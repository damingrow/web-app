# D-AMINGROW — CORRECTED ROUTE AND DATABASE INVENTORY
## Phase 00B: Definitive Source-of-Truth Inventory & Reconciliation
**Verification Date:** November 3, 2026  
**Auditor:** Principal Software Architect & QA Engineer  
**Target Repository:** `/Users/mac/Projects/Damingrow`  

---

## 1. Discrepancy Reconciliation Summary

Previous audit documents contained slight numerical discrepancies regarding route counts (40 vs 42), product counts (28 vs 33), and sitemap entries (78 vs 72). This document establishes the exact, verified physical counts across all source files, database migrations, and static assets.

| Category | Previously Reported | Reconciled Source of Truth | Verification Method |
|---|---|---|---|
| **Public Storefront Pages** | 32 | **29** | `find src/app/\(storefront\) -name "page.tsx"` |
| **Administrative Pages** | 6 | **6** | `find src/app/admin -name "page.tsx"` |
| **API Route Handlers** | 4 | **4** | `find src/app/api -name "route.ts"` |
| **Total Route Endpoints** | 40 / 42 | **39** | Physical file system count (29 + 6 + 4) |
| **Database Tables** | 17 | **17** | `grep -n "CREATE TABLE" supabase/migrations/*.sql` |
| **Database Migrations** | 1 | **1** | `ls supabase/migrations/` (1 comprehensive migration file) |
| **Product Inventory** | 28 | **33** | `grep -c "id:" src/data/products.ts` (33 active items) |
| **Product Categories** | 4 / 5 | **5 Categories in code** | `chicks`, `point-of-lay`, `drugs`, `vaccines`, `accessories` |
| **Knowledge Articles** | 14 | **14** | `grep -c "slug:" src/data/articles.ts` |
| **Sitemap Generated URLs** | 78 | **72** | `src/app/sitemap.ts` (25 static + 33 products + 14 articles) |
| **Agricultural Calculators** | 5 | **5** | Physical pages under `src/app/(storefront)/calculators/` |
| **Automated Test Files** | 9 | **9** | `tests/unit/*.ts` and `tests/rls/*.ts` |
| **Automated Test Cases** | 37 | **37** | Vitest execution run (100% passing) |

---

## 2. Complete Verified Route Inventory

### 2.1 Public Storefront Pages (29 Total)
Located in `src/app/(storefront)/`:

| # | Route URL | Physical File Path | Purpose & Function |
|---|---|---|---|
| 1 | `/` | `src/app/(storefront)/page.tsx` | Main Homepage: Hero, Pillars, Calculators, Products, CTA |
| 2 | `/about` | `src/app/(storefront)/about/page.tsx` | Company Mission, Vision, Slogan, and Operations overview |
| 3 | `/accessories` | `src/app/(storefront)/accessories/page.tsx` | Category Page: Poultry cages, feeders, drinkers, brooder canopies |
| 4 | `/calculators` | `src/app/(storefront)/calculators/page.tsx` | Calculators Directory Hub (access to all 5 tools) |
| 5 | `/calculators/brooder` | `src/app/(storefront)/calculators/brooder/page.tsx` | Brooder space, feeder, drinker & heat requirements calculator |
| 6 | `/calculators/egg-production` | `src/app/(storefront)/calculators/egg-production/page.tsx` | Hen-Day Egg Production & laying curve efficiency calculator |
| 7 | `/calculators/fcr` | `src/app/(storefront)/calculators/fcr/page.tsx` | Feed Conversion Ratio (FCR) & Feed Margin calculator |
| 8 | `/calculators/symptom-checker` | `src/app/(storefront)/calculators/symptom-checker/page.tsx` | Poultry Health Symptom Guidance & triage advisory tool |
| 9 | `/calculators/vaccination` | `src/app/(storefront)/calculators/vaccination/page.tsx` | Custom Poultry Vaccination Schedule Generator |
| 10 | `/chicks` | `src/app/(storefront)/chicks/page.tsx` | Day-Old Chicks Booking Hub & interactive booking form |
| 11 | `/contact` | `src/app/(storefront)/contact/page.tsx` | Customer Contact page, WhatsApp routing & office directions |
| 12 | `/drugs` | `src/app/(storefront)/drugs/page.tsx` | Category Page: Antibiotics, anticoccidials, vitamins, acidifiers |
| 13 | `/knowledge` | `src/app/(storefront)/knowledge/page.tsx` | Knowledge Centre: Searchable poultry farming guides |
| 14 | `/knowledge/[slug]` | `src/app/(storefront)/knowledge/[slug]/page.tsx` | Dynamic Article Template (14 active articles) |
| 15 | `/point-of-lay` | `src/app/(storefront)/point-of-lay/page.tsx` | Category Page: Point-of-lay brown & white pullet birds |
| 16 | `/policies/privacy` | `src/app/(storefront)/policies/privacy/page.tsx` | Privacy Policy (compliant with NDPA 2023) |
| 17 | `/policies/shipping` | `src/app/(storefront)/policies/shipping/page.tsx` | Cold-Chain Shipping & Interstate Transit Guarantee policy |
| 18 | `/policies/terms` | `src/app/(storefront)/policies/terms/page.tsx` | Commercial Terms of Service & chick booking terms |
| 19 | `/privacy` | `src/app/(storefront)/privacy/page.tsx` | Legacy privacy redirect/wrapper |
| 20 | `/services` | `src/app/(storefront)/services/page.tsx` | Core Services Hub (Overview of 6 commercial services) |
| 21 | `/services/chicks` | `src/app/(storefront)/services/chicks/page.tsx` | Dedicated Day-Old Chick Sourcing & Booking service funnel |
| 22 | `/services/consultation` | `src/app/(storefront)/services/consultation/page.tsx` | Dedicated Farm Consultancy & setup service funnel |
| 23 | `/services/drugs` | `src/app/(storefront)/services/drugs/page.tsx` | Dedicated Veterinary Drug & Nutritional Supply service funnel |
| 24 | `/services/point-of-lay` | `src/app/(storefront)/services/point-of-lay/page.tsx` | Dedicated Point-of-Lay Pullet Sourcing service funnel |
| 25 | `/services/technical` | `src/app/(storefront)/services/technical/page.tsx` | Dedicated On-Site Technical & Veterinary Support funnel |
| 26 | `/services/vaccines` | `src/app/(storefront)/services/vaccines/page.tsx` | Dedicated Cold-Chain Vaccine Distribution funnel |
| 27 | `/terms` | `src/app/(storefront)/terms/page.tsx` | Legacy terms redirect/wrapper |
| 28 | `/vaccines` | `src/app/(storefront)/vaccines/page.tsx` | Category Page: Cold-chain livestock vaccines |
| 29 | `/[category]/[slug]` | `src/app/(storefront)/[category]/[slug]/page.tsx` | Dynamic Product Detail Template (33 active products) |

### 2.2 Administrative Pages (6 Total)
Located in `src/app/admin/`:

| # | Route URL | Physical File Path | Purpose & Function | Current Backend State |
|---|---|---|---|---|
| 30 | `/admin` | `src/app/admin/(dashboard)/page.tsx` | Administrative Operations Dashboard | Hardcoded Mock KPIs (12 pending) |
| 31 | `/admin/audit` | `src/app/admin/(dashboard)/audit/page.tsx` | Administrative Security & Audit Trail | Hardcoded Mock Logs (3 rows) |
| 32 | `/admin/chicks-pricing` | `src/app/admin/(dashboard)/chicks-pricing/page.tsx` | Weekly Chick Rates Synchronization Desk | In-memory React state |
| 33 | `/admin/enquiries` | `src/app/admin/(dashboard)/enquiries/page.tsx` | Customer Enquiries & Lead Management Desk | Hardcoded Mock Enquiries (4 rows) |
| 34 | `/admin/products` | `src/app/admin/(dashboard)/products/page.tsx` | Product Catalog Inventory & Compliance Desk | Reads static `PRODUCTS` array |
| 35 | `/admin/login` | `src/app/admin/login/page.tsx` | Supabase Authentication Login Interface | Live Supabase Auth Form |

### 2.3 API Route Handlers (4 Total)
Located in `src/app/api/`:

| # | Route Path | Method | Handler File Path | Security Check | Current Operational Status |
|---|---|---|---|---|---|
| 36 | `/api/admin/chicks-pricing` | POST | `src/app/api/admin/chicks-pricing/route.ts` | **NONE (Vulnerable)** | Writes audit event via service-role |
| 37 | `/api/admin/enquiries` | PATCH | `src/app/api/admin/enquiries/route.ts` | **NONE (Vulnerable)** | Updates enquiry status via service-role |
| 38 | `/api/enquiries` | POST | `src/app/api/enquiries/route.ts` | Public Rate-limited | **BROKEN: Fails DB insert silently** |
| 39 | `/api/products` | GET | `src/app/api/products/route.ts` | Public Read | Reads static `src/data/products.ts` |

---

## 3. Database Schema Inventory (Supabase PostgreSQL)

Migration file: `supabase/migrations/20261026000001_initial_schema.sql` (466 lines).  
Total Tables: **17 Tables**.

| # | Table Name | Purpose | Current App Usage | Missing Required Fields / Tables |
|---|---|---|---|---|
| 1 | `staff_profiles` | RBAC roles: `super_admin`, `sales_agent`, `content_editor`, `veterinary_consultant` | Connected to Auth | None |
| 2 | `suppliers` | Hatchery & pharmaceutical manufacturer records | Unused by frontend | Needs dispatch schedules |
| 3 | `product_categories` | Hierarchical product classification | Unused (static code) | None |
| 4 | `products` | Core catalog with NAFDAC & cold-chain flags | Unused (static code) | Needs regulatory status enum |
| 5 | `product_variants` | SKUs, package sizes, and prices | Unused (static code) | Needs carton size attributes |
| 6 | `product_media` | Image assets and CDN URLs | Unused (static code) | None |
| 7 | `authors` | Expert credentials, veterinarian profiles | Unused (static code) | Needs VCN registration # |
| 8 | `articles` | SEO educational articles & clinical guides | Unused (static code) | Needs review status enum |
| 9 | `landing_pages` | Campaign-specific marketing pages | Unused | None |
| 10 | `content_sections` | Modular content blocks | Unused | None |
| 11 | `redirects` | 301/302 URL redirection table | Unused | None |
| 12 | `enquiries` | Customer inquiries and order tickets | **Fails DB Insert** | Column `reference_number` vs `enquiry_ref` |
| 13 | `enquiry_status_history`| Audit log of enquiry transitions | Unused | None |
| 14 | `enquiry_notes` | Staff internal notes on inquiries | Unused | None |
| 15 | `consent_records` | NDPA 2023 compliance consent trail | Unused | None |
| 16 | `audit_events` | Immutable security audit trail | Partially called | Needs actor_id population |
| 17 | `application_settings` | Global business profile & dispatch days | Unused by frontend | None |

### Tables Missing from Existing Schema (To Be Added in Phase 3):
- `chick_bookings` (Transactional booking records with lock tokens)
- `partner_hatcheries` (Hatchery brands: Chi, Zartech, Amo, Sayed, Valentine, etc.)
- `hatchery_quotas` (Weekly carton allocations per hatchery and dispatch day)
- `dispatch_batches` (Tuesday/Thursday dispatch runs and driver/waybill info)
- `deposit_reconciliations` (Manual bank deposit verification records)
- `customers` (Deduplicated farmer directory with phone-based uniqueness)

---

## 4. Product Catalog Inventory Breakdown

Total Active Products in `src/data/products.ts`: **33 Products**.

| Category Slug | Category Display Name | Product Count | Primary Regulated Attributes |
|---|---|---|---|
| `chicks` | Day-Old Chicks | 5 items | Broilers, Pullets, Turkeys, Ducklings, POL |
| `point-of-lay` | Point-of-Lay Birds | 2 items | Brown Layer (17–18 wk), White Layer (18–20 wk) |
| `drugs` | Veterinary Drugs & Supplements | 9 items | Oxytetracycline, Cocci-Ton, Cipo-Zen, Norflogen, Ascorbic Acid, Ecto-Zap, DL-Methionine, Multivitamins, Water Treatment |
| `vaccines` | Livestock Vaccines | 8 items | Newcastle LaSota, Gumboro Inter-Plus, Newcastle Killed, Coryza Trivalent, Fowl Pox, Marek's, IBD Blen, ND Clone 30 |
| `accessories` | Poultry Accessories & Equipment | 9 items | Layer Cages, Bell Drinkers, Tube Feeders, Gas Brooders, Automatic Syringes, Egg Crates, Debeaking Machine, Transport Crates, Digital Scales |
| **Total** | | **33 Products** | **100% price-on-request compliant** |

---

## 5. Educational Content Inventory (Knowledge Centre)

Total Articles in `src/data/articles.ts`: **14 Articles**.
All articles feature:
- Targeted focus keywords
- Structured clinical FAQs for Google FAQPage schema
- Verified veterinary author attribution
- Cross-linked related catalog products
- Reading times and estimated difficulty ratings

---

## 6. Inventory Integrity Sign-Off

The inventory numbers documented above represent the exact verified state of the D-AminGrow codebase. All future technical specifications, database migrations, and testing plans in this Phase 00B suite are calibrated against this exact baseline.
