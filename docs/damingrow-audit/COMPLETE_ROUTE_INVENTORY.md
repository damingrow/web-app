# D-AminGrow — Complete Route & Module Inventory
**Document Ref:** DAG-AUDIT-002  
**Audit Date:** November 3, 2026  
**Framework:** Next.js 15.5.28 App Router (Node.js & Edge Runtime)  
**Total Identified Routes:** 40 Route Endpoints (32 Public, 6 Admin, 4 API Handlers)

---

## 1. Storefront & Public Routes (`src/app/(storefront)/`)

| Route Path | Source File | Type | Data Source | Primary Purpose | Implementation Status |
|---|---|---|---|---|---|
| `/` | `src/app/(storefront)/page.tsx` | Server (SSG) | `PRODUCTS`, `ARTICLES` | Main conversion homepage with hero, value props, services showcase, calculators teaser, trust badges | **Fully Implemented and Verified** |
| `/about` | `src/app/(storefront)/about/page.tsx` | Server (SSG) | Static JSX | Company mission, vision, core leadership, 20+ years livestock heritage, NAFDAC & cold-chain commitment | **Fully Implemented and Verified** |
| `/contact` | `src/app/(storefront)/contact/page.tsx` | Client ('use client') | Static info + POST `/api/enquiries` | Physical addresses (Ibadan, Lagos), interactive contact form, WhatsApp quick-routing, operating hours | **Implemented but Incomplete** (API insert fails silently) |
| `/chicks` | `src/app/(storefront)/chicks/page.tsx` | Server (SSG) + Client subcomponent | `PRODUCTS`, `ChickBookingForm` | Day-old chick catalog, Tuesday/Thursday dispatch schedule, live interactive booking slip generator | **Fully Implemented and Verified** |
| `/drugs` | `src/app/(storefront)/drugs/page.tsx` | Server (SSG) | `PRODUCTS` | NAFDAC-registered veterinary antibiotics, probiotics, anticoccidials, and nutritional supplements | **Fully Implemented and Verified** |
| `/vaccines` | `src/app/(storefront)/vaccines/page.tsx` | Server (SSG) | `PRODUCTS` | Cold-chain biologicals catalog, 2°C–8°C storage protocols, viral/bacterial vaccines list | **Fully Implemented and Verified** |
| `/accessories` | `src/app/(storefront)/accessories/page.tsx` | Server (SSG) | `PRODUCTS` | Gas brooders, automatic battery cages, nipple drinker systems, feeders, defeathering machines | **Fully Implemented and Verified** |
| `/point-of-lay` | `src/app/(storefront)/point-of-lay/page.tsx` | Server (SSG) | `PRODUCTS` | 17–20 week vaccinated layer pullets catalog, POL vs DOC risk/cash-flow comparison | **Fully Implemented and Verified** |
| `/[category]` | `src/app/(storefront)/[category]/page.tsx` | Dynamic SSG (`generateStaticParams`) | `PRODUCTS` | Dynamic category listings (`chicks`, `drugs`, `vaccines`, `accessories`, `point-of-lay`) | **Fully Implemented and Verified** |
| `/[category]/[slug]` | `src/app/(storefront)/[category]/[slug]/page.tsx` | Dynamic SSG (`generateStaticParams`) | `PRODUCTS`, `ProductClientActions` | Detailed product specifications, NAFDAC info, withdrawal periods, image gallery, WhatsApp inquiry button | **Fully Implemented and Verified** |

---

## 2. Dedicated Service Landing Funnels (`src/app/(storefront)/services/`)

| Route Path | Source File | Type | Data Source | Primary Purpose | Implementation Status |
|---|---|---|---|---|---|
| `/services` | `src/app/(storefront)/services/page.tsx` | Client ('use client') | Static Data + Form State | High-level services overview, consultation inquiry form, and links to specialized funnels | **Fully Implemented and Verified** |
| `/services/chicks` | `src/app/(storefront)/services/chicks/page.tsx` | Server (SSG) | Static Data | Dedicated booking funnel for day-old broilers, pullets, turkeys, and partner hatcheries | **Fully Implemented and Verified** |
| `/services/vaccines` | `src/app/(storefront)/services/vaccines/page.tsx` | Server (SSG) | Static Data | Dedicated cold-chain distribution funnel, temperature logging, prescription guidelines, and FAQs | **Fully Implemented and Verified** |
| `/services/drugs` | `src/app/(storefront)/services/drugs/page.tsx` | Server (SSG) | Static Data | Veterinary drug categories, NAFDAC compliance commitment, and antimicrobial stewardship | **Fully Implemented and Verified** |
| `/services/point-of-lay` | `src/app/(storefront)/services/point-of-lay/page.tsx` | Server (SSG) | `PRODUCTS` | Complete 0–18 week vaccination schedule table, breed comparison, and POL bird order intake | **Fully Implemented and Verified** |
| `/services/technical` | `src/app/(storefront)/services/technical/page.tsx` | Server (SSG) | Static Data | On-farm clinical vaccination, autopsy/post-mortem, biosecurity setup, and technician dispatch | **Fully Implemented and Verified** |
| `/services/consultation` | `src/app/(storefront)/services/consultation/page.tsx` | Server (SSG) | Static Data | Commercial farm engineering advisory, pen blueprints, nutritional balancing, and business ROI plans | **Fully Implemented and Verified** |

---

## 3. Interactive Calculators & Decision Suite (`src/app/(storefront)/calculators/`)

| Route Path | Source File | Type | Data Source | Primary Purpose | Implementation Status |
|---|---|---|---|---|---|
| `/calculators` | `src/app/(storefront)/calculators/page.tsx` | Server (SSG) | Static Card Matrix | Navigation hub for all 5 interactive farm management calculators | **Fully Implemented and Verified** |
| `/calculators/brooder` | `src/app/(storefront)/calculators/brooder/page.tsx` | Client ('use client') | Dynamic Math Engine | Computes floor area (m²/sq ft), gas brooder units, feeders, drinkers, and temperature schedule for any flock size | **Fully Implemented and Verified** |
| `/calculators/vaccination` | `src/app/(storefront)/calculators/vaccination/page.tsx` | Client ('use client') | Dynamic Date Engine | Generates a calendar-dated flock vaccination schedule based on chick arrival date | **Fully Implemented and Verified** |
| `/calculators/fcr` | `src/app/(storefront)/calculators/fcr/page.tsx` | Server + Client (`FcrCalculatorClient`) | Dynamic Math Engine | Computes Feed Conversion Ratio (FCR), benchmark comparisons (Cobb/Ross), feed cost margin, and money lost to feed waste | **Fully Implemented and Verified** |
| `/calculators/egg-production` | `src/app/(storefront)/calculators/egg-production/page.tsx` | Server + Client (`EggCalculatorClient`) | Dynamic Math Engine | Computes Hen-Day Production (HDP %), daily crates produced, feed cost per crate, and net monthly layer profit | **Fully Implemented and Verified** |
| `/calculators/symptom-checker` | `src/app/(storefront)/calculators/symptom-checker/page.tsx` | Server + Client (`SymptomCheckerClient`) | Clinical Diagnostic Rules Engine | Matches observed flock symptoms (diarrhea, respiratory, neurological, egg defects) against Coccidiosis, Newcastle, Gumboro, CRD, and Heat Stress with emergency SOS triage button | **Fully Implemented and Verified** |

---

## 4. Educational Hub & Knowledge Centre (`src/app/(storefront)/knowledge/`)

| Route Path | Source File | Type | Data Source | Primary Purpose | Implementation Status |
|---|---|---|---|---|---|
| `/knowledge` | `src/app/(storefront)/knowledge/page.tsx` | Server (SSG) | `ARTICLES` | Filterable educational article grid categorized into Health, Management, Brooding, and Business | **Fully Implemented and Verified** |
| `/knowledge/[slug]` | `src/app/(storefront)/knowledge/[slug]/page.tsx` | Dynamic SSG (`generateStaticParams`) | `ARTICLES` | Full-text cornerstone guides with reading times, key takeaways, step-by-step instructions, and author details | **Fully Implemented and Verified** (12 articles) |

---

## 5. Administrative Dashboard (`src/app/admin/`)

| Route Path | Source File | Type | Data Source | Primary Purpose | Implementation Status |
|---|---|---|---|---|---|
| `/admin/login` | `src/app/admin/login/page.tsx` | Client ('use client') | Supabase Auth | Staff credentials sign-in with email & password | **Fully Implemented and Verified** |
| `/admin` | `src/app/admin/(dashboard)/page.tsx` | Server Component | Hardcoded Mock Data | Operations overview, key metrics, recent inquiry summary | **Implemented but Broken** (Displays mock data; no DB connection) |
| `/admin/enquiries` | `src/app/admin/(dashboard)/enquiries/page.tsx` | Client ('use client') | In-Memory `useState` | Customer lead list, status filters, WhatsApp reply links, status update modal | **Implemented but Broken** (Does not fetch or update Supabase DB) |
| `/admin/chicks-pricing` | `src/app/admin/(dashboard)/chicks-pricing/page.tsx` | Client ('use client') | In-Memory `useState` + POST API | Weekly Monday/Thursday chick rate updater | **Implemented but Incomplete** (Logs audit event; does not update product table) |
| `/admin/products` | `src/app/admin/(dashboard)/products/page.tsx` | Client ('use client') | `PRODUCTS` (Static) | Read-only listing of static catalog assets and NAFDAC status | **Implemented but Incomplete** (Read-only, no CRUD operations) |
| `/admin/audit` | `src/app/admin/(dashboard)/audit/page.tsx` | Client ('use client') | Hardcoded Mock Array | Immutable administrative audit log viewer | **Implemented but Broken** (Displays mock data; does not query `audit_events`) |

---

## 6. API Route Handlers (`src/app/api/`)

| Endpoint Path | Source File | HTTP Methods | Auth Guard | Primary Purpose | Implementation Status |
|---|---|---|---|---|---|
| `/api/products` | `src/app/api/products/route.ts` | `GET` | Public | Search and filter catalog items | **Implemented but Incomplete** (Queries static array, not DB) |
| `/api/enquiries` | `src/app/api/enquiries/route.ts` | `POST` | Public (Zod validated) | Ingestion of customer orders and contact messages | **Implemented but Broken** (Schema mismatch causes silent DB insert failure) |
| `/api/admin/enquiries` | `src/app/api/admin/enquiries/route.ts` | `PATCH` | **None (Missing)** | Update inquiry status and log audit trail | **Implemented but Incomplete** (Lacks auth guard; missing `GET` method) |
| `/api/admin/chicks-pricing` | `src/app/api/admin/chicks-pricing/route.ts` | `POST` | **None (Missing)** | Update weekly chick rates | **Implemented but Incomplete** (Lacks auth guard; inserts audit log without updating product prices) |

---

## 7. Policy, Legal & System Routes

| Route Path | Source File | Type | Data Source | Primary Purpose | Status |
|---|---|---|---|---|---|
| `/policies/privacy` | `src/app/(storefront)/policies/privacy/page.tsx` | Server (SSG) | Static Legal Text | NDPR & GDPR compliant privacy policy | **Fully Implemented and Verified** |
| `/policies/terms` | `src/app/(storefront)/policies/terms/page.tsx` | Server (SSG) | Static Legal Text | Commercial sales, dispatch terms, biosecurity disclaimer | **Fully Implemented and Verified** |
| `/policies/shipping` | `src/app/(storefront)/policies/shipping/page.tsx` | Server (SSG) | Static Legal Text | Tuesday/Thursday chick dispatch terms, cold-chain protocol | **Fully Implemented and Verified** |
| `/privacy` | `src/app/(storefront)/privacy/page.tsx` | Server (SSG) | Static Legal Text | Canonical redirect / alias to `/policies/privacy` | **Fully Implemented and Verified** |
| `/terms` | `src/app/(storefront)/terms/page.tsx` | Server (SSG) | Static Legal Text | Canonical redirect / alias to `/policies/terms` | **Fully Implemented and Verified** |
| `/sitemap.xml` | `src/app/sitemap.ts` | Dynamic XML Route | `PRODUCTS`, `ARTICLES` | Complete search engine index of 70+ URLs | **Fully Implemented and Verified** |
| `/robots.txt` | `src/app/robots.ts` | Dynamic Text Route | Static Config | Search crawler directive file | **Fully Implemented and Verified** |
| `/_not-found` | `src/app/not-found.tsx` | Server Component | Static UI | Global 404 error page | **Fully Implemented and Verified** |
