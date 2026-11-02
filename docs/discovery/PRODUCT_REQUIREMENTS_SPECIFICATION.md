# D-AminGrow — Product Requirements Specification (PRS)
**Document Ref:** DAG-DISC-003  
**Version:** 1.0.0  
**Date:** 2026-10-26  
**Auditor:** Principal Software Architect & Product Strategist  
**Status:** Completed & Prioritized (MoSCoW)  

---

## 1. Product Vision & Scope Overview

D-AminGrow is an agricultural and livestock e-commerce platform designed to bridge the trust and distribution deficit in Nigeria's agro-allied sector. The platform combines high-performance edge web technologies (Next.js on Cloudflare) with relational data integrity (Supabase PostgreSQL) and low-friction mobile commerce channels (WhatsApp Order Generation).

---

## 2. MoSCoW Prioritization Framework Definition

- **Must Have (M):** Non-negotiable core features required for initial Phase 1 MVP commercial launch. Without these, the site cannot operate safely or legally.
- **Should Have (S):** High-impact capabilities planned for Phase 2 that significantly improve conversion, automation, and content publishing.
- **Could Have (C):** Desirable enhancements for Phase 3 (e.g. self-serve automated debit-card checkout, customer accounts, multi-language).
- **Won't Have (W):** Features intentionally excluded from initial phases to prevent architectural bloat (e.g. complex multi-vendor marketplace, third-party logistics API integrations).

---

## 3. Detailed Feature Specifications (16 Modules)

---

### Module 1: Public Website & Brand Experience

- **Users:** Commercial livestock farmers, smallholders, agro-investors, veterinarians, diaspora farm sponsors.
- **Purpose:** Present an authoritative, blazing-fast, and trustworthy brand storefront showcasing D-AminGrow's four core divisions and consulting capabilities.
- **Business Value:** Establishes commercial credibility, captures organic search traffic, and drives inbound sales inquiries.
- **Dependencies:** Brand identity assets, Tailwind CSS design system with Poppins (headings) and Inter (body).
- **Launch Priority:** **Must Have (M)**
- **Acceptance Criteria:**
  1. Header navigation displays D-AminGrow logo with transparent background, navigation links (Day-Old Chicks, Drugs, Vaccines, Accessories, Consultation, Knowledge Centre), and a persistent WhatsApp button (`+2348139169402`).
  2. Hero section highlights the brand promise: *"Your Satisfaction Is Our Priority"* with clear primary CTA ("Browse Catalogue") and secondary CTA ("Request Farm Consultation").
  3. Homepage renders featured products across all 4 categories with real pricing or "Request Quote" badges.
  4. Global footer displays physical business location, CAC registration status, NAFDAC advisory disclaimer, privacy policy link, and social channels.
  5. Core Web Vitals pass with LCP < 1.5s and CLS < 0.05 on standard 4G mobile emulation.

---

### Module 2: Product Catalogue & Faceted Search

- **Users:** Farmers looking for specific veterinary drugs, brooder heating equipment, feeding trays, or chick breeds.
- **Purpose:** Enable fast discovery of products through intuitive category trees, species tags, and live search.
- **Business Value:** Prevents catalog abandonment and increases average items added to order inquiry.
- **Dependencies:** Supabase `categories`, `products`, and `product_tags` tables.
- **Launch Priority:** **Must Have (M)**
- **Acceptance Criteria:**
  1. Category landing pages for: `/accessories`, `/drugs`, `/vaccines`, and `/chicks`.
  2. Real-time client-side instant filtering by: Category, Subcategory, Target Animal (Poultry, Ruminants, Swine), In-Stock status, and Price Range.
  3. Search bar provides autocomplete suggestions within 100ms as the user types.
  4. Empty search states show helpful suggestions and direct link to WhatsApp assistance.

---

### Module 3: Product Detail Pages (PDP)

- **Users:** Farmers evaluating equipment specs, drug dosage, chick strains, or vaccine requirements.
- **Purpose:** Deliver exhaustive technical, biological, and logistical product specifications to answer all customer questions prior to ordering.
- **Business Value:** Dramatically lowers customer hesitation, prevents misuse of veterinary drugs, and drives qualified purchase intent.
- **Dependencies:** Supabase storage image URLs, Markdown parser for technical descriptions.
- **Launch Priority:** **Must Have (M)**
- **Acceptance Criteria:**
  1. Displays multi-image gallery with pinch-to-zoom on mobile and modal lightbox on desktop.
  2. Clearly displays Product Name, SKU, Category, Price in Nigerian Naira (₦) or "Contact for Daily Market Price" for day-old chicks.
  3. Specialized compliance badges rendered dynamically:
     - For Drugs: NAFDAC Reg Number, Active Ingredients, Indications, Administration Route, Meat/Egg Withdrawal Periods.
     - For Vaccines: Cold-chain warning badge (+2°C to +8°C) and non-returnable notice.
     - For Chicks: Hatchery partner name, expected hatch/dispatch days, and minimum order carton quantities (50 birds/carton).
  4. Quantity selector with automated price calculation.
  5. Prominent primary CTA: "Order via WhatsApp" and secondary CTA: "Add to Inquiry List".

---

### Module 4: Structured WhatsApp Order Generation

- **Users:** Nigerian farmers who prefer the immediacy, familiarity, and conversational security of WhatsApp over automated credit-card forms.
- **Purpose:** Convert the web shopping cart into a clean, pre-formatted, and URI-encoded WhatsApp message sent directly to D-AminGrow's official business line (`+2348139169402`).
- **Business Value:** Matches Nigerian agricultural trading reality, yielding up to 3x higher completion rates than mandatory automated card gateways for high-ticket agro-inputs.
- **Dependencies:** Web Cart State (Zustand/LocalStorage), WhatsApp Click-to-Chat API.
- **Launch Priority:** **Must Have (M)**
- **Acceptance Criteria:**
  1. User can review selected items, quantities, and estimated subtotal in a floating cart drawer.
  2. Checkout modal collects: Customer Full Name, Farm/Business Name, Delivery City/State, and Preferred Delivery Date.
  3. On clicking "Submit Order via WhatsApp", the system:
     - Saves an `order_inquiry` record in Supabase with status `pending_contact`.
     - Automatically generates and launches the WhatsApp URI: `https://wa.me/2348139169402?text=...`.
  4. The generated message is formatted cleanly:
     ```text
     *NEW ORDER INQUIRY — D-AMINGROW*
     Order Ref: DAG-20261026-XXXX
     Customer: [Name] | [Phone]
     Location: [City, State]
     
     *ITEMS REQUESTED:*
     • 2x Commercial Day-Old Broiler Chicks (Carton of 50) — Est. ₦[Amount]
     • 1x Gas Brooder Heater (Canopy Type) — ₦[Amount]
     • 2x Ascorbic Acid Vitamin C 100g — ₦[Amount]
     
     *ESTIMATED TOTAL:* ₦[Amount]
     *Notes:* Please confirm today's chick price and delivery logistics to my location.
     ```
  5. Gracefully handles desktop (launches WhatsApp Web) and mobile (opens native WhatsApp app).

---

### Module 5: Quote & Consultation Enquiries

- **Users:** Commercial farm developers, investors, and farmers facing complex disease outbreaks or farm construction challenges.
- **Purpose:** Structured lead capture forms for bespoke agricultural services and veterinary consultations.
- **Business Value:** Unlocks high-margin professional service revenue and turnkey farm equipment setup contracts.
- **Dependencies:** Supabase `consultation_inquiries` table, email notification trigger.
- **Launch Priority:** **Must Have (M)**
- **Acceptance Criteria:**
  1. Dedicated `/services` landing page detailing: Livestock Housing Construction, Disease Diagnostic Consultation, Farm Audits & Feasibility, and Bio-security Implementation.
  2. Multi-step enquiry form capturing: Farm Type, Current Flock/Herd Size, Problem Description, Location, and Urgency.
  3. Immediate confirmation banner with option to immediately notify the veterinary desk via WhatsApp.
  4. Admin dashboard alerts staff of new incoming consultation requests in real-time.

---

### Module 6: Educational Blog & Knowledge Centre

- **Users:** Farmers seeking disease prevention protocols, vaccination schedules, feed formulation tips, and brooding guides.
- **Purpose:** High-authority content hub designed to attract top-of-funnel organic search traffic and establish D-AminGrow as the leading livestock authority.
- **Business Value:** Drives sustainable organic search acquisition toward the 500,000 monthly visit target while lowering customer acquisition costs.
- **Dependencies:** Next.js dynamic routing (`/knowledge/[slug]`), Markdown/MDX parser, Supabase `articles` table.
- **Launch Priority:** **Must Have (M)**
- **Acceptance Criteria:**
  1. Categorized articles: Brooding Management, Poultry Diseases, Equipment Maintenance, Vaccination Protocols.
  2. Interactive embed: Downloadable PDF Broiler & Layer Vaccination Calendars.
  3. Embedded "Recommended Products" widget inside articles (e.g., an article on Coccidiosis automatically embeds `Cocci-Ton` and sanitized drinker links).
  4. Author attribution box showcasing certified veterinary credentials and review dates.
  5. Fully valid `Article` and `FAQPage` JSON-LD schema generated on every post.

---

### Module 7: CMS & Dynamic Landing Page Builder

- **Users:** D-AminGrow Marketing Team and Content Editors.
- **Purpose:** Easily create, edit, and publish seasonal promotional banners, educational articles, and landing pages without developer intervention.
- **Business Value:** Enables rapid commercial response to market trends (e.g., Christmas broiler booking campaigns).
- **Dependencies:** Supabase Database, Rich Text Editor (TipTap or Markdown Editor).
- **Launch Priority:** **Should Have (S)** (Simple Markdown editor in Phase 1 MVP; visual page builder in Phase 2).
- **Acceptance Criteria:**
  1. Admin can draft, preview, schedule, and publish blog articles.
  2. Admin can edit homepage promotional banners and featured category highlights.
  3. Revalidation hooks clear Cloudflare edge cache automatically upon content publication.

---

### Module 8: Secure Admin Dashboard

- **Users:** Business Owners, Sales Managers, Inventory Clerks.
- **Purpose:** Centralized operational back-office to oversee products, inquiries, and customer communications.
- **Business Value:** Guarantees operational visibility, fast lead turnaround, and data security.
- **Dependencies:** Next.js Protected Routes, Supabase Auth, Row Level Security (RLS).
- **Launch Priority:** **Must Have (M)**
- **Acceptance Criteria:**
  1. Secure authentication via email/password with mandatory multi-factor authentication (MFA/TOTP) for administrators.
  2. Role-based view restricting sensitive pricing/margin controls to Super Admin.
  3. Real-time KPI summary widgets: Total Inquiries (Today/Week/Month), Top Inquired Products, Pending Inquiries.
  4. Fast responsive interface accessible on desktop and mobile browsers.

---

### Module 9: Product & Media Asset Management

- **Users:** Inventory Managers and Store Administrators.
- **Purpose:** Full CRUD (Create, Read, Update, Delete) interface for product listings, pricing updates, inventory statuses, and image uploads.
- **Business Value:** Keeps online availability and market pricing accurate, eliminating farmer frustration over obsolete listings.
- **Dependencies:** Supabase Storage bucket (`product-media`), client-side image compression.
- **Launch Priority:** **Must Have (M)**
- **Acceptance Criteria:**
  1. Add/Edit product modal containing all compliance and technical fields (NAFDAC No, Active Ingredients, Cold Chain, Withdrawal Days).
  2. Multi-image uploader with drag-and-drop, automated WebP conversion, and dimension validation.
  3. Instant toggle for "In Stock", "Out of Stock", "Pre-Order Only", or "Call for Price".
  4. Bulk price update tool for Day-Old Chicks to reflect weekly hatchery price movements in seconds.

---

### Module 10: SEO Management & Metadata Controls

- **Users:** SEO Lead and Marketing Editors.
- **Purpose:** Granular control over on-page SEO elements across all products, categories, and knowledge articles.
- **Business Value:** Maximizes organic search click-through rates (CTR) and search engine crawl efficiency.
- **Dependencies:** Next.js Metadata API.
- **Launch Priority:** **Must Have (M)**
- **Acceptance Criteria:**
  1. Custom fields on every product and article for: Meta Title, Meta Description, Canonical URL override, and Focus Keywords.
  2. Automated XML Sitemap generation at `/sitemap.xml` automatically updating as new products and articles are published.
  3. Automated `robots.txt` disallowing admin routes and staging endpoints.
  4. Automated Open Graph social image generation for dynamic link sharing on WhatsApp and social media.

---

### Module 11: Analytics & Conversion Attribution

- **Users:** Growth Marketers and Platform Architect.
- **Purpose:** Track visitor traffic, funnel drop-offs, and WhatsApp conversion handoffs while respecting user privacy.
- **Business Value:** Provides objective data on marketing ROI and identifies top-performing product categories.
- **Dependencies:** Cloudflare Web Analytics / PostHog or Google Analytics 4 (server-gated).
- **Launch Priority:** **Should Have (S)**
- **Acceptance Criteria:**
  1. Custom event dispatch on: `view_item`, `add_to_cart`, `initiate_whatsapp_checkout`, `submit_consultation`.
  2. Attribution tracking capturing UTM parameters (Source, Medium, Campaign) and saving them in the `order_inquiry` database record.
  3. Fully compliant with NDPA 2023: Zero personal identifiable data transmitted to third-party ad pixels without explicit consent.

---

### Module 12: User Roles & Granular Permissions

- **Users:** D-AminGrow Internal Staff (Super Admin, Sales Representative, Veterinary Editor, Warehouse Clerk).
- **Purpose:** Enforce the principle of least privilege across administrative platform operations.
- **Business Value:** Prevents accidental data deletion, unauthorized pricing modifications, and internal data leaks.
- **Dependencies:** Supabase PostgreSQL Row Level Security (RLS) policies and JWT claims.
- **Launch Priority:** **Must Have (M)**
- **Acceptance Criteria:**
  1. `super_admin`: Unrestricted access across database, user management, and financial settings.
  2. `sales_agent`: Read/Write access to orders and consultation inquiries; read-only access to catalog.
  3. `content_editor`: Read/Write access to knowledge base and marketing banners; zero access to order data.
  4. RLS policies strictly enforced at the PostgreSQL database engine level.

---

### Module 13: Notifications & Follow-Up Operations

- **Users:** Sales Desk Agents and Inquiring Customers.
- **Purpose:** Automated confirmation alerts and internal notifications when a high-value order or consultation request is logged.
- **Business Value:** Reduces lead response time from hours to minutes, directly increasing sales close rates.
- **Dependencies:** Cloudflare Workers, Supabase Database Webhooks, Resend/SendGrid API.
- **Launch Priority:** **Should Have (S)**
- **Acceptance Criteria:**
  1. System sends automated transactional email/SMS alert to D-AminGrow sales desk when a new inquiry is registered.
  2. Admin panel highlights inquiries unattended for more than 30 minutes during business hours.
  3. One-click WhatsApp follow-up button inside admin dashboard to re-engage stalled inquiries.

---

### Module 14: Security, Backups & Audit Trails

- **Users:** Cybersecurity Engineer and Operations Director.
- **Purpose:** Safeguard customer data, maintain continuous uptime, and prevent cyber threats.
- **Business Value:** Protects brand reputation, satisfies NDPA regulatory compliance, and prevents business disruption.
- **Dependencies:** Cloudflare WAF, Supabase Point-in-Time Recovery (PITR), PostgreSQL audit triggers.
- **Launch Priority:** **Must Have (M)**
- **Acceptance Criteria:**
  1. Cloudflare Web Application Firewall (WAF) blocks automated bot scraping, SQL injections, and DDoS attacks.
  2. Supabase Point-in-Time Recovery (PITR) enabled with daily automated database backups.
  3. Audit log table (`audit_logs`) tracking every administrative action (user, timestamp, IP, action, modified record).
  4. Security headers enforced: HSTS, Content-Security-Policy (CSP), X-Frame-Options: DENY, X-Content-Type-Options: nosniff.

---

### Module 15: Accessibility, Mobile Performance & Internationalisation

- **Users:** Rural smallholder farmers using low-cost Android smartphones on 3G networks; future regional buyers across West Africa.
- **Purpose:** Ensure seamless usability across low-spec hardware, low-bandwidth networks, and diverse viewports.
- **Business Value:** Broadens reach into the heart of agricultural production regions where connectivity is constrained.
- **Dependencies:** Next.js Image Optimization, Responsive CSS, ARIA semantic markup.
- **Launch Priority:** **Must Have (M)** (Accessibility & Mobile); **Could Have (C)** (Multi-currency & French i18n).
- **Acceptance Criteria:**
  1. WCAG 2.1 Level AA color contrast compliance across all text and interactive buttons.
  2. Touch targets minimum 44 x 44 px for easy thumb navigation on mobile phones.
  3. Total initial page bundle size < 120 KB gzipped.
  4. Offline fallback or low-bandwidth graceful degradation for image loading.

---

### Module 16: Future Expansion Architecture (Zero Initial Complexity)

- **Users:** Future D-AminGrow technical team.
- **Purpose:** Architect database schemas and API boundaries so that automated card payments (Paystack), real-time logistics tracking, and multi-country currencies can plug in without rewriting the core application.
- **Business Value:** Avoids expensive future technical debt and refactoring costs while keeping MVP launch nimble.
- **Dependencies:** Modular software domain design.
- **Launch Priority:** **Won't Have (W)** for MVP launch; Architected as extensible interfaces.
- **Acceptance Criteria:**
  1. Database `orders` table includes optional fields for `payment_gateway_ref`, `gateway_provider`, `payment_status` without enforcing them in Phase 1.
  2. Currency schema decoupled to allow multi-currency expansion (NGN, GHS, XOF, USD) in Phase 3.
