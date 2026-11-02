# ADR-001: Next.js Platform Architecture & Cloudflare Edge Deployment
**Status:** Approved  
**Date:** 2026-10-26  
**Deciders:** Principal Software Architect, Senior Next.js Engineer, Supabase Database Architect, Infrastructure Lead  
**Context:** Phase 01 Architecture & Technical Foundation  

---

## 1. Context & Business Drivers

D-AminGrow requires a modern, high-performance, SEO-optimized, and secure digital platform to serve Nigerian commercial livestock farmers, smallholders, and regional agricultural investors.

Key technical mandates:
1. **Frontend Framework:** React 19 and Next.js 15 (App Router).
2. **Hosting / CDN / Edge Compute:** Cloudflare (Workers with Workers Assets).
3. **Backend / Database / Auth / Storage:** Supabase (Managed PostgreSQL, Row Level Security, Auth, Storage).
4. **Primary Initial Channel:** WhatsApp order generation (`+2348139169402`).
5. **Scale Target:** Up to 500,000 monthly visits at sub-second response times across Nigerian mobile networks, starting at $0/month initial OpEx.

---

## 2. Framework & Runtime Decision: Next.js 15 on Cloudflare Workers

### Evaluated Approaches:
1. **Legacy `@cloudflare/next-on-pages` (Deprecated):**
   - *Analysis:* Cloudflare officially archived and deprecated `next-on-pages`. It relied on forcing Next.js into Cloudflare Pages' Edge runtime, resulting in severe incompatibilities with Node.js APIs, Server Actions, and Next.js 15 features.
   - *Decision:* **REJECTED.**
2. **`vinext` (Vite Compatibility Layer):**
   - *Analysis:* `vinext` is an innovative, Cloudflare-backed open-source Vite plugin that re-implements the Next.js API surface on top of Vite and targets Cloudflare Workers. It delivers extremely fast build times and lightweight bundles. However, because it is an independent re-implementation of Next.js rather than the official Next.js compiler, it exhibits edge-case deviations on advanced App Router features (streaming metadata, complex layout nesting, certain Server Action boundaries) and is currently in early development.
   - *Decision:* **REJECTED for Phase 01 Core Production Foundation.** Kept under active architectural observation for future micro-frontends or standalone utilities.
3. **OpenNext (`@opennextjs/cloudflare`) on Cloudflare Workers (Selected):**
   - *Analysis:* Cloudflare actively collaborates with and recommends the OpenNext project (`@opennextjs/cloudflare`) as the premier pathway for running full-stack Next.js applications on Cloudflare Workers. It takes the genuine build artifacts output by Next.js's own compiler and transforms them into standard Cloudflare Worker code accompanied by Workers Static Assets.
   - *Decision:* **ADOPTED as the Official Platform Standard.**

---

## 3. Cloudflare Workers vs. Cloudflare Pages Architectural Distinction

Cloudflare Pages and Cloudflare Workers have distinct operational models:

| Dimension | Cloudflare Pages (Legacy Model) | Cloudflare Workers (Modern OpenNext Model) |
| :--- | :--- | :--- |
| **Runtime Model** | Static asset hosting with supplementary `/functions` directory. | Full V8 isolate edge compute with first-class Workers Static Assets binding. |
| **Node.js Compatibility** | Limited legacy edge runtime polyfills. | Full Node.js runtime flag (`nodejs_compat_v2` / `nodejs_compat`). |
| **Next.js 15 Features** | Fails on React Server Components streaming and Server Actions. | **Full support for RSC streaming, Server Actions, Route Handlers, and App Router.** |
| **Deployment Mechanism** | Git push triggering Cloudflare Pages build. | `opennextjs-cloudflare` build output deployed via Wrangler CLI (`wrangler deploy`). |
| **Limits & Scaling** | Constrained to Pages project quotas and function timeouts. | Scales seamlessly to 10M+ requests/month with sub-millisecond edge cold starts. |

**Architectural Decision:** D-AminGrow is deployed as a **Cloudflare Worker with Workers Static Assets** configured via `wrangler.toml` and `@opennextjs/cloudflare`.

---

## 4. Feature Compatibility & Edge Limitations Matrix

| Next.js Feature | Status on Cloudflare Workers (OpenNext) | Architectural Strategy & Mitigation |
| :--- | :---: | :--- |
| **React Server Components (RSC)** | **Supported** | Native edge rendering delivering streaming HTML to browsers. |
| **Server Actions** | **Supported** | Secure mutations execute in Worker isolates; CSRF tokens verified. |
| **Dynamic Routes (`[slug]`)** | **Supported** | Parameterized routing evaluated at edge in $<10$ms. |
| **Metadata API (`generateMetadata`)** | **Supported** | Emits complete OpenGraph, Twitter Cards, and canonical tags before HTML stream begins. |
| **Route Handlers (`app/api/...`)** | **Supported** | Used for search indices, WhatsApp quotation webhooks, and health endpoints. |
| **Incremental Static Regeneration (ISR)** | **Supported** | Backed by Cloudflare Workers KV or Cache API for stale-while-revalidate caching. |
| **Image Optimization (`next/image`)** | **Architected via CDN** | Node.js `sharp` cannot run within Worker RAM limits. Images are stored in Supabase Storage with dynamic URL transformations (`/render/image/public/...`) and cached at Cloudflare edge permanently. |
| **Direct TCP Database Pools** | **Prohibited** | Serverless edge isolates rapidly exhaust PostgreSQL connection pools. All edge queries use **HTTPS PostgREST** via `@supabase/ssr`. |
| **Background Cron Tasks** | **Supported** | Configured via `wrangler.toml` Cron Triggers; zero long-running daemon servers needed. |

---

## 5. Supabase Integration Architecture

### 1. Zero-Pool Edge Connection Strategy
- Traditional full-stack applications maintain persistent TCP connection pools (e.g. Prisma or PgBouncer on port 5432). In a globally distributed serverless environment (Cloudflare Workers with 300+ edge data centers), each incoming request can spawn an isolated runtime instance. If 500 edge nodes open 2 connections each, a 1,000-connection surge will crash standard PostgreSQL instances.
- **D-AminGrow Solution:**
  - Client and Server queries execute over **stateless HTTPS REST endpoints (PostgREST)** via `@supabase/supabase-js` and `@supabase/ssr`.
  - Database mutations and reads require **zero persistent connection overhead**.
  - Supabase connection pooler (Supavisor on port 6543) is reserved exclusively for CLI database migrations and schema pushes.

### 2. Row Level Security (RLS) & Auth
- User authentication uses Supabase Auth with cookie-based session handling (`@supabase/ssr`), ensuring tokens are securely transmitted in HTTP-only, SameSite cookies.
- Row Level Security (RLS) is activated on **every table without exception**.
- Public users are granted `SELECT` access strictly to active products, categories, media, and published articles.
- Customer inquiries are write-only (`INSERT`), with read access restricted to authenticated staff with `super_admin` or `sales_agent` roles.

---

## 6. Image Delivery & Edge Optimization Pipeline

```text
[Original Image Upload: JPEG/PNG]
         │
         ▼
[Supabase Storage: /product-media/...] (Encrypted S3 bucket)
         │
         ▼
[Supabase Image Transformation Engine] (Resizes, compresses, converts to WebP/AVIF)
         │
         ▼
[Cloudflare Edge Cache: Global CDN] (Cached for 30 days; Cache-Control: public, max-age=2592000)
         │
         ▼
[Farmer's Mobile Device / WhatsApp Preview] (1:1 Square WebP, sub-50KB payload)
```

1. **Format Normalization:** Every product photograph is centered on a 1:1 square canvas (`1200 x 1200 px`) with neutral background.
2. **Next-Gen Serving:** Browsers supporting AVIF/WebP receive compressed assets directly from Cloudflare edge caches.
3. **No Paid Resizing Middleware:** Avoids expensive third-party image SaaS (Cloudinary/Imgix) by leveraging built-in Supabase Storage transformations combined with free Cloudflare edge caching.

---

## 7. Build & Deployment Lifecycle

### Local Development:
```bash
# 1. Install dependencies
npm install

# 2. Run local Next.js dev server with Turbopack
npm run dev

# 3. Type check & baseline tests
npm run type-check
npm test

# 4. Preview inside local Cloudflare Workers environment
npm run preview
```

### Production Build & Deployment:
```bash
# 1. Build Next.js application using OpenNext Cloudflare adapter
npx @opennextjs/cloudflare

# 2. Deploy Worker bundle and static assets to Cloudflare Global Network
npx wrangler deploy
```

---

## 8. Environments & Infrastructure Configuration

| Configuration | Development (`local`) | Staging (`staging`) | Production (`prod`) |
| :--- | :--- | :--- | :--- |
| **Domain** | `localhost:3000` | `staging.damingrow.com` | `damingrow.com` |
| **Compute** | Next.js Node dev server / Wrangler local | Cloudflare Workers Staging environment | Cloudflare Workers Global Edge |
| **Database** | Local Supabase Docker / Dev Cloud project | Isolated Staging Supabase project | Production Supabase PostgreSQL |
| **Auth Cookies** | `httpOnly`, `secure: false`, `sameSite: lax` | `httpOnly`, `secure: true`, `sameSite: lax` | `httpOnly`, `secure: true`, `sameSite: strict` |
| **WAF / DDoS** | None | Cloudflare Managed Ruleset (Simulate) | Cloudflare WAF High Security + Rate Limiting |

---

## 9. Cost Analysis & Financial Sustainability

| Service Layer | Provider | 0 – 50,000 Monthly Visits | 500,000 Monthly Visits | Cost Risk Mitigation |
| :--- | :--- | :--- | :--- | :--- |
| **Hosting & Edge Compute** | Cloudflare Workers | **$0.00** (Free Tier: 100k req/day) | **$5.00 / month** (Workers Paid covers 10M req) | Edge caching keeps dynamic compute requests minimal. |
| **DNS, CDN & WAF** | Cloudflare | **$0.00** (Free Tier) | **$0.00** (Free Tier) | Included in core Cloudflare platform. |
| **Database & Auth** | Supabase | **$0.00** (Free Tier: 500MB DB) | **$25.00 / month** (Pro Tier: 8GB DB, Daily backups, PITR) | Automated archiving of uncompleted leads older than 180 days. |
| **Storage & Image CDN** | Supabase Storage | **$0.00** (1GB storage free) | **$10.00 – $20.00 / month** | Aggressive Cloudflare caching headers reduce origin egress. |
| **WhatsApp Messaging** | Native WhatsApp Business | **$0.00** (Existing business line) | **$0.00** (Native business app) | Zero API per-message fee during Phase 01/02. |
| **Transactional Email** | Resend | **$0.00** (3,000 emails/month free) | **$20.00 / month** | Strictly transactional alerts; marketing emails managed externally. |
| **TOTAL ESTIMATED OPEX** | — | **$0.00 / month** | **~$60.00 – $70.00 / month** | **Zero ongoing paid lock-in for initial MVP launch.** |
