# D-AMINGROW — MISSING FEATURES REGISTER
## Phase 00B: Comprehensive Capability Register & Functional Gap Matrix
**Verification Date:** November 3, 2026  
**Auditor:** Principal Software Architect & Product Systems Analyst  
**Target Repository:** `/Users/mac/Projects/Damingrow`  

---

## 1. Feature Register Overview

This register documents all missing, broken, or partially implemented capabilities identified during the Phase 00B independent forensic investigation. Each feature is catalogued with its current code state, business impact, priority classification, and target implementation phase.

### Priority Classifications:
- **P0 (Critical):** Immediate security risks, authentication backdoors, data loss bugs, or production blockers.
- **P1 (High):** Core revenue-generating business logic, transactional booking, and live administrative operations.
- **P2 (Medium):** Strategic differentiators, customer relationship management, SEO dominance, and calculator enhancements.
- **P3 (Future):** Advanced workflow automation, regional localization, and expanded telemetry.

---

## 2. Comprehensive Missing Features Matrix

| Feature ID | Feature Name & Scope | Current Code State | Priority | Target Phase | Business & Revenue Impact |
|---|---|---|---|---|---|
| **MF-01** | **Admin Authentication Hardening**<br>Remove `damingrow_staff_demo` cookie backdoor and non-production bypass in middleware. | Broken / Insecure (`src/lib/supabase/middleware.ts` line 61) | **P0** | **Phase 1** | Prevents unauthorized takeover of staff administrative dashboards. |
| **MF-02** | **Administrative API Route Guards**<br>Enforce server-side authentication and RBAC checks on `/api/admin/*` endpoints. | Missing (`src/app/api/admin/enquiries/route.ts`) | **P0** | **Phase 1** | Blocks unauthorized callers from mutating order statuses via service-role key. |
| **MF-03** | **Enquiry Database Schema Alignment**<br>Reconcile column mismatch (`enquiry_ref` vs `reference_number`) and eliminate silent errors. | Broken (`src/app/api/enquiries/route.ts` line 33) | **P0** | **Phase 1** | Restores lost customer inquiries, booking submissions, and WhatsApp leads. |
| **MF-04** | **Live Admin Dashboard Integration**<br>Replace mock arrays (`RECENT_ENQUIRIES`, `INITIAL_ENQUIRIES`) with live Supabase SSR queries. | Partial / Mocked (`src/app/admin/(dashboard)/*`) | **P1** | **Phase 2** | Gives staff real-time visibility into customer inquiries and order queues. |
| **MF-05** | **Live Product Catalog Admin CRUD**<br>Connect `/admin/products` to Supabase `products` and `product_variants` tables. | Static file only (`src/data/products.ts`) | **P1** | **Phase 2** | Allows real-time price notices, stock updates, and NAFDAC compliance flags. |
| **MF-06** | **Transactional Chick Booking Engine**<br>Postgres `SELECT FOR UPDATE` concurrency locks to prevent overbooking on Tuesday/Thursday runs. | Missing (No DB tables or logic exist) | **P1** | **Phase 3** | Protects D-AminGrow against catastrophic overbooking and customer capital default. |
| **MF-07** | **Hatchery Quota Management**<br>Weekly quota tracking per partner hatchery brand (Chi, Zartech, Amo, Sayed, Valentine). | Missing | **P1** | **Phase 3** | Enables accurate allocation of finite carton quantities across farmer orders. |
| **MF-08** | **Deposit Verification & Reconciliation**<br>Manual bank teller and NIP session ID review desk with staff audit attribution. | Missing | **P1** | **Phase 3** | Eliminates financial fraud from fake payment screenshots and confirms cash flow. |
| **MF-09** | **Interstate Dispatch Manifest Generator**<br>Printable/exportable waybill manifests grouped by destination motor parks and transit routes. | Missing | **P1** | **Phase 3** | Streamlines Tuesday/Thursday logistics across luxury bus networks nationwide. |
| **MF-10** | **Point-of-Lay Batch Management**<br>Dedicated POL booking with bird age tracking, vaccination certificates, and crate allocation. | Partial (Storefront card only) | **P1** | **Phase 4** | Captures high-ticket commercial egg layer farm entrepreneurs. |
| **MF-11** | **Veterinary Clinical Triage Desk**<br>Structured intake for poultry mortality, clinical symptoms, and assignment to licensed veterinarians. | Missing | **P1** | **Phase 4** | Transforms generic contact forms into high-value professional veterinary consultations. |
| **MF-12** | **Deduplicated Farmer CRM**<br>E.164 phone normalization, consolidated customer profiles, order histories, and farm size records. | Missing | **P2** | **Phase 5** | Enables personalized customer follow-ups and repeat order re-engagement. |
| **MF-13** | **Multi-Tier Editorial CMS**<br>Publishing workflow with mandatory Veterinary Council of Nigeria (VCN) sign-off on health articles. | Missing (Static articles in code) | **P2** | **Phase 6** | Satisfies Google E-E-A-T guidelines for veterinary medical content. |
| **MF-14** | **Rich Structured Data (JSON-LD)**<br>Automated FAQPage, AggregateOffer, VeterinaryCare, and BreadcrumbList schema on all pages. | Partial | **P2** | **Phase 6** | Maximizes Google Search rich snippet visibility to drive 500k monthly farmer visits. |
| **MF-15** | **Calculator PDF & WhatsApp Export**<br>Printable brooding charts and pre-formatted calculation summaries for farmer records. | Missing (Screen view only) | **P2** | **Phase 7** | Increases repeat utility visits and organic farmer-to-farmer sharing. |
| **MF-16** | **Cloudflare Turnstile Bot Shield**<br>Privacy-preserving CAPTCHA to protect `/api/enquiries` and booking forms from spam. | Missing | **P2** | **Phase 7** | Prevents database exhaustion and fraudulent reservation spam. |
| **MF-17** | **Cold-Chain Logistics Checklist**<br>Mandatory pre-dispatch temperature log (2°C–8°C) and ice pack integrity verification. | Missing | **P2** | **Phase 8** | Protects vaccine viability and eliminates customer disputes regarding spoiled biologicals. |
| **MF-18** | **Offline PWA Support for Rural Farmers**<br>Cached access to calculators and disease symptom guide in low-connectivity farm zones. | Missing | **P3** | **Post-Release** | Extends platform reach into remote Nigerian rural farming clusters. |

---

## 3. Implementation Phasing Summary

```
+-------------------------------------------------------------------------+
| PHASE 1: SECURITY & RECOVERY                                            |
| [MF-01: Auth Hardening] [MF-02: API Guards] [MF-03: Enquiry DB Fix]     |
+------------------------------------+------------------------------------+
                                     │
+------------------------------------▼------------------------------------+
| PHASE 2: DATABASE & REAL ADMIN DATA                                     |
| [MF-04: Live Admin Dashboard] [MF-05: Product Catalog Live CRUD]        |
+------------------------------------+------------------------------------+
                                     │
+------------------------------------▼------------------------------------+
| PHASE 3: CHICK BOOKING & LOGISTICS ENGINE                              |
| [MF-06: Concurrency Guard] [MF-07: Quotas] [MF-08: Deposits] [MF-09]    |
+------------------------------------+------------------------------------+
                                     │
+------------------------------------▼------------------------------------+
| PHASE 4: POL BIRDS & VETERINARY TRIAGE                                  |
| [MF-10: POL Batch Tracking] [MF-11: Clinical Veterinary Triage]         |
+------------------------------------+------------------------------------+
                                     │
+------------------------------------▼------------------------------------+
| PHASE 5: CRM & DEDUPLICATION                                            |
| [MF-12: Deduplicated Farmer Directory & Customer Timeline]              |
+------------------------------------+------------------------------------+
                                     │
+------------------------------------▼------------------------------------+
| PHASE 6: CMS & SEO ENGINE                                               |
| [MF-13: VCN-Reviewed CMS] [MF-14: Structured JSON-LD Schemas]           |
+------------------------------------+------------------------------------+
                                     │
+------------------------------------▼------------------------------------+
| PHASE 7: MARKETING, CONVERSION & SECURITY                               |
| [MF-15: Calculator Exports] [MF-16: Cloudflare Turnstile Anti-Spam]     |
+------------------------------------+------------------------------------+
                                     │
+------------------------------------▼------------------------------------+
| PHASE 8: PRODUCTION RELEASE & VERIFICATION                             |
| [MF-17: Cold-Chain Verification] [End-to-End Regression Validation]     |
+-------------------------------------------------------------------------+
```
