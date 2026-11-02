# D-AminGrow — Threat Model & Security Architecture Checklist
**Document Ref:** DAG-SEC-001  
**Version:** 1.0.0  
**Date:** 2026-10-26  
**Auditor:** Principal Cybersecurity & Infrastructure Architect  
**Status:** Approved & Enforced  

---

## 1. Threat Model & Risk Vectors (STRIDE Methodology)

Agricultural ecommerce platforms in emerging markets face targeted threats spanning competitor scraping, counterfeit drug insertion, lead theft, and price manipulation.

| Threat Class (STRIDE) | Threat Description | Attack Vector | Technical Safeguard & Mitigation |
| :--- | :--- | :--- | :--- |
| **Spoofing Identity** | Attacker impersonates veterinary doctor or D-AminGrow sales desk. | Phishing WhatsApp numbers, submitting forged admin session tokens. | Supabase HTTP-only encrypted session cookies, mandatory MFA on staff logins, single verified WhatsApp deep-link number (`+2348139169402`). |
| **Tampering with Data** | Malicious actor modifies day-old chick prices or falsifies NAFDAC approval numbers. | Direct API injection, manipulating client-side state before sending order. | PostgreSQL Row Level Security (RLS) blocks client updates to `products`; server-side Zod validation verifies all fields before writing to DB. |
| **Repudiation** | Staff member deletes customer leads or alters pricing without audit record. | Internal rogue employee action. | Immutable `audit_events` table automatically logs actor ID, IP address, timestamp, and JSON diffs of every administrative mutation. |
| **Information Disclosure** | Competitor scrapes private customer farm names, locations, and order volumes. | Calling public GraphQL / REST endpoints to fetch `enquiries`. | `enquiries` table has **write-only public access**. RLS policy denies `SELECT` to public anonymous roles; only authenticated `sales_agent` or `super_admin` can read. |
| **Denial of Service (DoS)** | Botnet floods WhatsApp order submission endpoint or drains database compute. | Automated HTTP POST scripts on `/api/enquiries`. | Cloudflare WAF, Turnstile bot protection, edge rate limiting (max 10 requests per minute per IP on inquiry submissions). |
| **Elevation of Privilege** | Attacker exploits client-side JWT token to gain `super_admin` rights. | Forging Supabase JWT `staff_role` claim. | Roles are verified server-side against the `staff_profiles` database table and protected by Supabase custom claims. Public users have zero role claims. |

---

## 2. Security Architecture Implementation Checklist

### 1. Authentication & Session Handling
- [x] **HTTP-Only Cookies:** Tokens stored in HTTP-only, secure, SameSite=Lax cookies via `@supabase/ssr`. Never stored in insecure `localStorage` or `sessionStorage`.
- [x] **Multi-Factor Authentication (MFA):** Mandatory TOTP authenticator app enforcement for all users assigned `super_admin` or `sales_agent` roles.
- [x] **Automatic Session Refresh:** Next.js middleware refreshes auth tokens before expiration without user interruption.

### 2. Row Level Security (RLS) & Database Hardening
- [x] **Universal RLS:** RLS enabled on all 16 tables in migration `20261026000002_row_level_security.sql`.
- [x] **Lead Protection:** Public users have `INSERT` permission only on `enquiries`. `SELECT` permission is strictly blocked for unauthenticated callers.
- [x] **Catalog Immutability:** Only authenticated staff with `content_editor` or `super_admin` roles can create, update, or delete products.
- [x] **Service-Role Segregation:** `SUPABASE_SERVICE_ROLE_KEY` is strictly confined to server-side Node.js environments and never bundled into client scripts.

### 3. Server-Side Validation & Abuse Prevention
- [x] **Zod Schema Validation:** All writes to `enquiries` and `products` are validated server-side using strict Zod schemas (`src/lib/validation/`).
- [x] **AMR Compliance Enforcement:** Antibiotic product descriptions are programmatically checked against banned terms ("growth promoter", "weight booster").
- [x] **Vaccine Cold-Chain Validation:** Vaccines cannot be published without setting `isColdChainRequired: true` and defining storage temperatures (+2°C to +8°C).
- [x] **Rate Limiting:** Edge rate limiting applied on API route handlers to prevent automated form submission abuse.

### 4. Image Upload & Media Security
- [x] **MIME-Type & Extension Whitelist:** Supabase Storage bucket policy permits only `image/jpeg`, `image/png`, and `image/webp`. Executables and SVG scripts are blocked.
- [x] **File Size Bounds:** Maximum upload size restricted to 5MB per image.
- [x] **Path Traversal Protection:** Filenames are sanitized and normalized before storage.

### 5. Data Privacy & NDPA 2023 Compliance
- [x] **Explicit Consent:** Unchecked-by-default checkbox required on checkout and consultation forms.
- [x] **Audit Trails:** Administrative actions recorded in `audit_events`.
- [x] **Data Retention:** Policy configured to purge unfulfilled customer inquiry records older than 180 days upon request.

---

## 3. Environment Variable Hygiene

```text
SAFE FOR CLIENT BUNDLE (NEXT_PUBLIC_):
├── NEXT_PUBLIC_SITE_URL
├── NEXT_PUBLIC_WHATSAPP_NUMBER
├── NEXT_PUBLIC_SUPABASE_URL
└── NEXT_PUBLIC_SUPABASE_ANON_KEY

STRICTLY CONFIDENTIAL (SERVER ONLY / CLOUDFLARE SECRETS):
├── SUPABASE_SERVICE_ROLE_KEY  <-- NEVER prefix with NEXT_PUBLIC_!
└── RESEND_API_KEY             <-- Server only
```

A dedicated automated test (`tests/unit/env.test.ts`) verifies that `NEXT_PUBLIC_` prefixes are never attached to privileged secrets.
