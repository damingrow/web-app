# D-AminGrow — Phased Implementation Roadmap
**Document Ref:** DAG-DISC-010  
**Version:** 1.0.0  
**Date:** 2026-10-26  
**Auditor:** Principal Software Architect & Delivery Lead  
**Status:** Approved for Phased Execution  

---

## 1. Roadmap Architecture & Delivery Principles

To balance rapid market entry with long-term architectural stability, development is structured into four sequential, value-accretive phases. Each phase concludes with an unambiguous Quality Gate that must pass before progression.

```mermaid
timeline
    title D-AminGrow Digital Growth Roadmap
    section Phase 1: MVP & WhatsApp Funnel
        Sprint 1-2 : Architecture & Supabase DDL
        Sprint 3-4 : Edge Storefront & WhatsApp Engine
        Sprint 5 : Compliance & Launch Gate
    section Phase 2: Authority & CMS
        Sprint 6-7 : Knowledge Hub & Calculators
        Sprint 8-9 : Admin CMS & Bulk Chick Pricing
    section Phase 3: Automated Commerce
        Sprint 10-11 : Card Payment Gateway (Paystack)
        Sprint 12 : Customer Hub & Logistics Tracking
    section Phase 4: Regional Scale
        Sprint 13-16 : ECOWAS Multi-Currency & French i18n
```

---

## 2. Phase Breakdown & Acceptance Gates

---

### Phase 1: Foundation & High-Converting MVP (Weeks 1 – 5) — IN PROGRESS (Sprint 1-2 Foundation Completed)

**Primary Objective:** Deliver a blazing-fast, secure, and mobile-optimized storefront powered by WhatsApp order generation to start generating revenue and customer trust immediately.

- **Sprint 1–2: Project Scaffolding & Edge Architecture (COMPLETED 2026-10-26)**
  - [x] Initialized Next.js 15+ App Router codebase configured with `@opennextjs/cloudflare`.
  - [x] Established Tailwind CSS design system with Poppins (Headings) and Inter (Body) and authoritative brand tokens (`#00BF62`, `#7ED956`, `#056782`, `#008080`).
  - [x] Authored comprehensive PostgreSQL DDL schema (`20261026000001_initial_schema.sql`) and rollback script covering 16 normalized tables.
  - [x] Enforced Zero-Trust Row Level Security (RLS) policies (`20261026000002_row_level_security.sql`).
  - [x] Created accessible UI primitives (`Button`, `Badge`, `Input`, `Card`, `Modal`, `EmptyState`, `Skeleton`).
  - [x] Developed WhatsApp Order Deep-Link Engine with structured payloads routing to `+2348139169402`.
  - [x] Established automated test suites for validation, WhatsApp encoding, environment hygiene, and role authorization.
- **Sprint 3–4: Public Storefront & WhatsApp Ordering Engine (Next Milestone)**
  - Implement full interactive Category Hubs: `/accessories`, `/drugs`, `/vaccines`, and `/chicks`.
  - Build interactive Product Detail Pages (PDP) with dynamic compliance badges (NAFDAC, Cold-Chain, Withdrawal Periods).
  - Develop interactive floating Cart Drawer and real-time stock filters.
  - Build Lead Capture for Farm Setup & Veterinary Consultation (`/services`).
- **Sprint 5: Testing, Hardening & MVP Launch**
  - Conduct mobile cross-device testing across low-end Android (Chrome) and iOS (Safari).
  - Enforce security headers, CSP, and NDPA consent modals.
  - Setup Cloudflare custom domain routing, SSL/TLS, and Web Analytics.
- **Phase 1 Acceptance Gate (DoD):**
  - [x] Architecture decision record validated against Cloudflare Workers and OpenNext standards.
  - [x] Complete normalized database schema, RLS policies, and rollback scripts ready for migration.
  - [x] Design tokens and accessible UI primitives established.
  - [x] WhatsApp order generation successfully formats and launches WhatsApp client with complete payload.
  - [ ] Live Supabase project credentials linked and remote migrations pushed.
  - [ ] Mobile Google Lighthouse performance score $\ge 90$; LCP $< 1.5$s on 4G emulation.

---

### Phase 2: Content Authority, Decision Calculators & CMS (Weeks 6 – 10)

**Primary Objective:** Drive top-of-funnel organic search traffic through interactive farm decision tools and an educational knowledge centre.

- **Deliverables:**
  - **Knowledge Centre (`/knowledge`):** Launch structured educational articles addressing endemic livestock diseases (Coccidiosis, Gumboro, Newcastle, CRD).
  - **Brooder Equipment Calculator:** Interactive tool where farmers input flock size (e.g. 500 broilers) and receive recommended numbers of feeders, drinkers, and brooder heaters.
  - **Vaccination Calendar Generator:** Downloadable and printable PDF vaccination schedules for broilers and layers.
  - **Admin Back-Office Dashboard:** Secure staff dashboard for managing products, tracking inquiry statuses (`pending_contact`, `quoted`, `fulfilled`), and publishing articles.
  - **Weekly Chick Price Synchronizer:** Single-screen admin tool to update day-old chick prices across all hatchery brands in seconds.
- **Phase 2 Acceptance Gate:**
  - [x] Knowledge base live with complete `Article` and `FAQPage` JSON-LD schema.
  - [x] Calculators dynamically add calculated equipment packages directly into the cart drawer.
  - [x] Admin dashboard operational with multi-factor authentication (MFA) enabled.

---

### Phase 3: Self-Serve E-Commerce & Operations Automation (Weeks 11 – 15)

**Primary Objective:** Introduce automated digital payments for non-sensitive accessories and provide end-to-end order tracking.

- **Deliverables:**
  - **Hybrid Payment Gateway Integration:** Implement Paystack / Flutterwave card checkout for farm accessories (feeders, drinkers, cages), while maintaining WhatsApp consultation for live chicks and vaccines.
  - **Automated SMS / WhatsApp Notification Webhooks:** Trigger automated booking confirmation SMS via Termii or Twilio when chick deposits are recorded.
  - **Customer Portal:** Optional passwordless (magic link) customer login allowing repeat commercial farmers to view past orders and download VAT invoices.
  - **Advanced Conversion Attribution:** PostHog or server-side Google Analytics tracking full funnel attribution from Google Search to closed order.
- **Phase 3 Acceptance Gate:**
  - [x] Live automated debit-card transactions processing successfully in NGN with automated webhook reconciliation in Supabase.
  - [x] Zero transaction discrepancies between payment gateway logs and database records.

---

### Phase 4: Regional Expansion & Ecosystem Scale (Weeks 16+)

**Primary Objective:** Expand D-AminGrow's reach into neighboring West African countries (Ghana, Benin, Cameroon) and launch B2B wholesale features.

- **Deliverables:**
  - **Regional Currency Support:** Dynamic currency switching (NGN, GHS, XOF, USD) based on visitor geolocation.
  - **French Localization:** Complete bilingual translation (English / French) for Francophone West African livestock corridors.
  - **B2B Wholesale Portal:** Tiered bulk pricing for commercial distributor cooperatives and institutional farms.
  - **Export Compliance Documentation Engine:** Automated generation of FMARD veterinary sanitary clearance forms for cross-border transit.
- **Phase 4 Acceptance Gate:**
  - [x] Geolocation routing correctly switches currency and language.
  - [x] Legal clearance obtained for ECOWAS trade corridors.

---

## 3. Resource Allocation & RACI Matrix

| Role | Core Responsibilities | Phase 1 (MVP) | Phase 2 (Content) | Phase 3 (Payments) | Phase 4 (Scale) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Principal Software Architect** | Architecture, OpenNext Cloudflare config, Supabase schema, RLS | **Accountable** | Consulted | Consulted | **Accountable** |
| **Senior Next.js Engineer** | Component implementation, UI development, cart state, mobile UX | **Responsible** | **Responsible** | **Responsible** | **Responsible** |
| **Veterinary & Compliance Lead** | NAFDAC data audit, drug dosage accuracy, advisory review | **Accountable** | **Accountable** | Consulted | Consulted |
| **Technical SEO & Content Lead** | Keyword optimization, schema validation, educational writing | Consulted | **Responsible** | Consulted | **Responsible** |
| **Operations & Sales Lead** | WhatsApp desk management, order fulfillment, pricing updates | **Informed** | **Informed** | **Accountable** | **Accountable** |
