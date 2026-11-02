# D-AminGrow — Technology Decision Record (TDR)
**Document Ref:** DAG-DISC-008  
**Version:** 1.0.0  
**Evaluation Date:** 2026-10-26  
**Auditor:** Principal Software Architect & Infrastructure Engineer  
**Status:** Decided & Architecturally Benchmarked  

---

## 1. Executive Context & Technology Mandates

The business requirements dictate:
- **Frontend Framework:** React & Next.js
- **Global Edge / CDN / Hosting:** Cloudflare
- **Backend / Database / Auth / Storage:** Supabase (PostgreSQL)
- **Target Scale:** Architecture capable of supporting sub-second response times for up to 500,000 monthly visits at minimal operational cost.

---

## 2. Workstream F: Next.js Deployment on Cloudflare Evaluation

Deploying full-stack Next.js outside of Vercel onto Cloudflare has undergone rapid evolutionary shifts. We evaluated three architectural pathways against official Cloudflare engineering documentation:

```text
+---------------------------------------------------------------------------------------+
|                               Next.js on Cloudflare                                  |
+---------------------------------------------------------------------------------------+
|  1. @cloudflare/next-on-pages  -->  ARCHIVED / DEPRECATED by Cloudflare (Do NOT use)  |
|  2. Vinext (Vite compatibility) -->  EXPERIMENTAL / REIMPLEMENTATION (High Risk)      |
|  3. OpenNext (@opennextjs/cf)  -->  OFFICIAL RECOMMENDED PRODUCTION ROUTE (Adopted)   |
+---------------------------------------------------------------------------------------+
```

---

### Comparative Evaluation of Deployment Adapters

| Criteria | 1. `@cloudflare/next-on-pages` | 2. `vinext` (Vite Plugin) | 3. OpenNext (`@opennextjs/cloudflare`) |
| :--- | :--- | :--- | :--- |
| **Official Status** | **Deprecated & Archived** by Cloudflare. | Actively developed experimental alternative. | **Official Recommended Standard** supported by Cloudflare. |
| **Underlying Engine** | Forced Edge Runtime on Pages. | Bypasses Next compiler; reimplements API on Vite. | Adapts official Next.js output to Cloudflare Workers. |
| **Next.js Compatibility** | Limited; fails on Node.js native packages. | Partial; risk of API drift on complex App Router features. | **High;** supports Server Actions, RSC, Route Handlers, App Router. |
| **Production Stability** | Deprecated / No new features. | Early adopter / Breaking changes likely. | **Proven in Production** on high-traffic sites. |
| **Image Optimization** | Requires external image service. | Requires custom Vite asset handling. | Native binding to Cloudflare Images or Supabase Transform. |
| **Architectural Decision** | **REJECTED** | **REJECTED for Phase 1** (Monitor for future) | **ADOPTED AS PRIMARY DEPLOYMENT ADAPTER** |

---

### In-Depth Compatibility Analysis for Required Next.js Features

1. **Server-Side Rendering (SSR) & Streaming:**
   - *Status:* **Fully Compatible** via OpenNext.
   - *Implementation:* Executes within Cloudflare Workers standard V8 isolate. Responses stream HTML chunks directly from edge points of presence (PoPs) in Lagos and regional African nodes.
2. **Dynamic Routes (`/products/[slug]`, `/knowledge/[slug]`):**
   - *Status:* **Fully Compatible**.
   - *Implementation:* Cloudflare Worker routing matches dynamic slugs instantaneously against edge-cached HTML or fetches fresh data from Supabase over HTTPS.
3. **Next.js Metadata API (Dynamic SEO Tags & Canonical URLs):**
   - *Status:* **Fully Compatible**.
   - *Implementation:* `generateMetadata()` executes on the worker before streaming HTML, ensuring complete OpenGraph and Schema.org tags are present for Googlebot and WhatsApp scrapers.
4. **Image Optimization (`next/image`):**
   - *Challenge:* Cloudflare Workers runtime cannot run heavy Node.js image processing libraries like `sharp` within worker memory limits.
   - *Architectural Solution:*  
     Configure `next.config.js` with remote image patterns pointing to **Supabase Storage**. Supabase handles automated WebP/AVIF transformations on-the-fly (`/render/image/public/...`), while Cloudflare edge caches transformed images permanently at zero additional compute cost.
5. **Route Handlers & API Webhooks:**
   - *Status:* **Fully Compatible**.
   - *Implementation:* Route handlers (`app/api/...`) run as standard serverless endpoints handling search indexing, WhatsApp quote persistence, and revalidation hooks.
6. **Background Tasks & Operational Queues:**
   - *Status:* **Supported via Cloudflare Workers Ecosystem**.
   - *Implementation:* Scheduled Cron triggers (`wrangler.toml` crons) handle daily database cleanliness and price synchronization tasks without requiring long-running Node.js daemon servers.

---

## 3. Supabase Backend Architecture & Database Schema

Supabase provides the managed PostgreSQL engine, Row Level Security, Storage, and Authentication.

### Connection Strategy in Serverless Edge Environments:
- **Avoid Traditional Direct TCP Connections:** Serverless edge workers create and destroy instances rapidly, which can exhaust PostgreSQL's max connections (e.g. 60–100 connections on standard tiers) in seconds under traffic spikes.
- **Adopted Strategy:**  
  1. For frontend reads and user mutations: Use `@supabase/ssr` and `@supabase/supabase-js` communicating over **HTTPS (PostgREST)**. This requires zero open connection pooling and is natively resilient to 500,000 monthly visits.
  2. For migrations and schema management: Use Supabase Transaction Pooler (Supavisor on port 6543) via the Supabase CLI.

---

### Core Relational Database Schema Design (PostgreSQL DDL)

```sql
-- 1. ENUMS
CREATE TYPE product_category_enum AS ENUM ('accessories', 'drugs', 'vaccines', 'day_old_chicks');
CREATE TYPE inquiry_status_enum AS ENUM ('pending_contact', 'contacted', 'quoted', 'paid', 'fulfilled', 'cancelled');
CREATE TYPE user_role_enum AS ENUM ('super_admin', 'sales_agent', 'content_editor');

-- 2. CATEGORIES TABLE
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS TABLE
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category_slug TEXT NOT NULL REFERENCES categories(slug) ON UPDATE CASCADE,
    sku TEXT UNIQUE,
    description TEXT NOT NULL,
    specifications JSONB DEFAULT '{}'::jsonb,
    price_ngn NUMERIC(12, 2), -- Nullable for dynamic daily chick pricing
    is_price_variable BOOLEAN DEFAULT FALSE,
    is_in_stock BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    
    -- REGULATORY & VETERINARY FIELDS (Workstream C)
    regulatory_status TEXT DEFAULT 'unregistered',
    nafdac_reg_number TEXT,
    is_prescription_required BOOLEAN DEFAULT FALSE,
    is_antimicrobial BOOLEAN DEFAULT FALSE,
    is_cold_chain_required BOOLEAN DEFAULT FALSE,
    storage_temperature_min_celsius NUMERIC(4, 1),
    storage_temperature_max_celsius NUMERIC(4, 1),
    meat_withdrawal_period_days INTEGER DEFAULT 0,
    egg_withdrawal_period_days INTEGER DEFAULT 0,
    active_ingredients JSONB DEFAULT '[]'::jsonb,
    
    -- MEDIA & SEO
    primary_image_url TEXT NOT NULL,
    gallery_image_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    meta_title TEXT,
    meta_description TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ORDER INQUIRIES (WHATSAPP CONVERSION TRACKING)
CREATE TABLE order_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_ref TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    delivery_city TEXT NOT NULL,
    delivery_state TEXT NOT NULL,
    items JSONB NOT NULL, -- Array of {product_id, name, quantity, unit_price}
    estimated_total_ngn NUMERIC(12, 2),
    user_notes TEXT,
    status inquiry_status_enum DEFAULT 'pending_contact',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. KNOWLEDGE ARTICLES (SEO PILLARS)
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    featured_image_url TEXT,
    author_name TEXT NOT NULL DEFAULT 'D-AminGrow Veterinary Team',
    author_credentials TEXT DEFAULT 'B.Tech / DVM',
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    meta_title TEXT,
    meta_description TEXT,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### Row Level Security (RLS) Architecture

To enforce zero-trust data protection compliant with NDPA 2023:

```sql
-- Enable RLS across all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ ACCESS: Anyone can view in-stock products and published articles
CREATE POLICY "Public read products" ON products FOR SELECT USING (is_in_stock = TRUE OR featured = TRUE);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (TRUE);
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (published = TRUE);

-- 2. PUBLIC WRITE ACCESS (GATED): Anyone can submit an order inquiry or quote
CREATE POLICY "Public insert order inquiry" ON order_inquiries FOR INSERT WITH CHECK (TRUE);

-- 3. ADMINISTRATIVE ACCESS: Only authenticated staff with specific JWT claims can read/write
CREATE POLICY "Admin full access products" ON products FOR ALL 
    TO authenticated USING (auth.jwt() ->> 'role' IN ('super_admin', 'content_editor'));

CREATE POLICY "Admin access inquiries" ON order_inquiries FOR ALL 
    TO authenticated USING (auth.jwt() ->> 'role' IN ('super_admin', 'sales_agent'));
```

---

## 4. Cost-Sensitivity Analysis & Paid Dependency Minimization

To maintain maximum financial sustainability for D-AminGrow, the architecture avoids recurring monthly SaaS bloat:

| Layer | Service / Provider | Free Tier Threshold | Estimated Monthly Cost (MVP to 50k Visits) | Cost at 500k Monthly Visits |
| :--- | :--- | :--- | :--- | :--- |
| **Hosting & Edge Compute** | Cloudflare Workers & Pages | 100,000 requests/day free ($0) | **$0.00** (Free Tier) | **$5.00 / month** (Workers Paid plan covers 10M requests) |
| **CDN & DNS & WAF** | Cloudflare | Unlimited bandwidth, global caching, DDoS | **$0.00** | **$0.00** |
| **Database & Auth** | Supabase | 500 MB database, 50,000 monthly active users | **$0.00** (Free Tier) | **$25.00 / month** (Pro Tier: 8GB DB, Daily backups, PITR) |
| **Storage & Image CDN** | Supabase Storage | 1 GB storage, 2 GB bandwidth | **$0.00** | **$10.00 – $25.00 / month** (covers ~50 GB bandwidth) |
| **Messaging Channel** | Native WhatsApp Business | Zero platform fees; uses existing phone plan | **$0.00** | **$0.00** (Manual) / Option to add official Meta Cloud API later |
| **Transactional Email** | Resend / SendGrid | 3,000 emails/month free | **$0.00** | **$20.00 / month** |
| **TOTAL ESTIMATED INFRASTRUCTURE OPEX** | — | — | **$0.00 / month** | **~$60.00 – $80.00 / month** |

> [!TIP]
> **Architectural Victory:**  
> The entire D-AminGrow platform can launch and operate commercially through its initial growth phase at **$0 monthly hosting cost**, scaling up to 500,000 monthly visits for **under $80 USD per month**.
