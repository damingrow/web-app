# D-AMINGROW — ADMIN & CRM IMPLEMENTATION SPECIFICATION
## Phase 00B: Enterprise Agricultural Operations Portal & Customer Relationship Architecture
**Verification Date:** November 3, 2026  
**Auditor:** Principal Enterprise UX & CRM Solutions Architect  
**Target Repository:** `/Users/mac/Projects/Damingrow`  

---

## 1. Architectural Transformation

The current administrative interface (`src/app/admin/*`) consists of static mock arrays and disconnected pages. This specification designs the complete transformation into an **integrated, real-time agricultural operations portal** powered by Supabase PostgreSQL, role-based access control (RBAC), and customer deduplication.

```
+-----------------------------------------------------------------------------------------+
|                               D-AMINGROW OPERATIONS PORTAL                              |
+---------------------+-------------------------------------------------------------------+
| NAVIGATION (12 Sec) | WORKSPACE AREA                                                    |
| 01. Overview        | [LIVE METRICS] Pending Inquiries: 14 | Hatchery Quota Held: 32 Cartons   |
| 02. Bookings        | ----------------------------------------------------------------- |
| 03. Products        | [REAL-TIME DISPATCH MANIFEST & QUOTA ALLOCATION]                  |
| 04. Services        |  - Chi Hatchery (Tuesday): 120 / 150 Cartons Allocated            |
| 05. CRM / Farmers   |  - Amo Hatchery (Tuesday):  80 /  80 Cartons [SOLD OUT]           |
| 06. Content & SEO   | ----------------------------------------------------------------- |
| 07. Marketing       | [CUSTOMER TRIAGE & WHATSAPP DESK]                                 |
| 08. Tools & Calc    |  DAG-20261103-902 | Alhaji Musa Ibrahim | Kano Luxury Depot        |
| 09. Customer Care   |  Items: 10 Cartons Broiler (510 chicks) | Status: Deposit Pending     |
| 10. Reports         |  [Verify Deposit]  [Open WhatsApp (+2348031234567)]  [Reallocate] |
| 11. Staff & RBAC    |                                                                   |
| 12. Settings        |                                                                   |
+---------------------+-------------------------------------------------------------------+
```

---

## 2. The 12 Strategic Administrative Modules

### Section 01: Overview & Executive Dashboard
- **Live KPI Counters:**
  - Total Active Chick Bookings (This Week's Tuesday/Thursday dispatches)
  - Pending WhatsApp Quotations & Inquiries
  - Unverified Bank Deposits Awaiting Reconciliation
  - Active Products in Catalog (by category & compliance status)
- **Urgent Action Alerts:**
  - "3 Bookings have unverified deposits expiring within 30 minutes"
  - "Vaccine batch VAC-ND-01 requires cold-chain repackaging verification"

### Section 02: Bookings & Hatchery Management
- **Sub-views:**
  1. `All Bookings`: Searchable data table with filters by status (`quota_held`, `confirmed`, `dispatched`, etc.)
  2. `Dispatch Calendar`: Interactive weekly calendar showing Tuesday/Thursday runs.
  3. `Hatchery Allocations`: Partner hatchery quota management (Chi, Zartech, Amo, Sayed, Valentine).
  4. `Interstate Manifests`: Printable waybill manifests grouped by destination motor parks and drivers.
  5. `Deposit Reconciliation`: Bank teller and NIP session ID review desk.

### Section 03: Products & Inventory Management
- **Connected to Supabase `products` and `product_variants` tables.**
- **Features:**
  - Live CRUD: Add, edit, archive products.
  - Price-on-Request governance: Enable/disable public display notice.
  - Veterinary Regulatory Desk: Tag NAFDAC registration numbers, cold-chain temperature thresholds (2°C–8°C), withdrawal periods, and antimicrobial warnings.
  - Image Asset Management: Upload to Supabase Storage bucket `product-media`.

### Section 04: Services & Consultations Management
- **Triage Desk for 6 Service Funnels:**
  - Day-Old Chick Sourcing
  - Cold-Chain Vaccine Distribution
  - Veterinary Drug & Nutritional Consultation
  - Point-of-Lay Pullet Sourcing
  - On-Site Technical Services
  - Commercial Poultry Farm Setup
- **Features:**
  - Clinical symptom intake review.
  - Assign inquiries to staff veterinarian (`veterinary_consultant`).
  - Schedule farm inspection visits.

### Section 05: CRM & Customer Directory
- **Single-view Farmer Profiles:**
  - Consolidated view of all orders, inquiries, farm size, location, and preferred breeds.
  - Automated deduplication algorithm (specified in Section 3 below).

### Section 06: Content & Editorial CMS
- **Articles & Guides Management:**
  - Rich markdown/HTML editor for Knowledge Hub.
  - Multi-tier editorial status: `draft` -> `veterinary_review` -> `approved` -> `published`.
  - Author and reviewer profile linking with official Veterinary Council of Nigeria (VCN) numbers.
  - FAQ schema builder for Google rich snippets.

### Section 07: Marketing & Growth
- **Attribution & Campaign Tracking:**
  - UTM source, medium, and campaign tracking on all incoming leads.
  - Lead conversion rate per channel (WhatsApp direct, organic search, Facebook ads).
  - NDPA 2023 compliant newsletter subscriber registry.

### Section 08: Tools & Calculator Governance
- **Agricultural Parameters Configuration:**
  - Brooder stocking density constants (sq. ft per 100 chicks).
  - Target broiler feed conversion ratio benchmarks by week.
  - Standard vaccination protocol templates.

### Section 09: Customer Support Desk
- **Inquiry Queue:**
  - Triage unassigned WhatsApp inquiries.
  - Shared canned responses for common delivery and chick price questions.
  - Escalation flags for disease outbreaks or shipment mortalities.

### Section 10: Reports & Business Intelligence
- **Operational Metrics:**
  - Weekly cartons dispatched vs hatchery quota fulfillment rate.
  - Inquiry-to-confirmed-booking conversion ratios.
  - Top destination states (Kano, Ogun, Oyo, Kaduna, Enugu).

### Section 11: Staff & Permissions (RBAC)
- **Role Governance:**
  - `super_admin`: Full operational, financial, and user management control.
  - `sales_agent`: Customer inquiries, order quotations, and deposit review.
  - `veterinary_consultant`: Clinical inquiries, prescription review, and educational content.
  - `content_editor`: Knowledge hub, articles, and SEO metadata.
- **Audit Log Inspector:**
  - Immutable viewing of `audit_events` with actor IP, role, and delta payloads.

### Section 12: Settings & Integrations
- **Configurations:**
  - Business profile (Official WhatsApp numbers, physical depot addresses).
  - Cloudflare edge caching settings.
  - Supabase database connection health metrics.

---

## 3. CRM Customer Deduplication Specification

In Nigeria, agricultural customers frequently place inquiries across multiple channels (direct calls, WhatsApp messages, web forms), causing fragmented records. The CRM must enforce **phone-first customer deduplication**.

### 3.1 Database Relational Structure:
```sql
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_normalized TEXT NOT NULL UNIQUE, -- E.164 formatted: '+2348031234567'
    full_name TEXT NOT NULL,
    email TEXT,
    farm_name TEXT,
    primary_state TEXT NOT NULL,
    primary_city TEXT,
    farm_type TEXT DEFAULT 'commercial_broiler', -- 'broiler', 'layer', 'turkey', 'mixed'
    estimated_capacity INTEGER DEFAULT 1000,
    total_bookings_count INTEGER DEFAULT 0,
    total_lifetime_cartons INTEGER DEFAULT 0,
    first_seen_at TIMESTAMPTZ DEFAULT NOW(),
    last_contacted_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT
);

CREATE INDEX idx_customers_phone ON customers(phone_normalized);
```

### 3.2 Deduplication & Auto-Link Algorithm:
When an inquiry or booking arrives:
1. **Normalize Phone Number:**
   - Remove spaces, dashes, parentheses.
   - Convert `08031234567` or `2348031234567` to E.164: `+2348031234567`.
2. **Lookup Existing Profile:**
   - Execute `SELECT id FROM customers WHERE phone_normalized = :normalizedPhone`.
   - If found: Link `customer_id` on the inquiry or booking record; update `last_contacted_at = NOW()`.
   - If not found: Insert new row in `customers` and link the foreign key.
3. **Consolidated Lead View:**
   - The admin staff can view the customer's entire history in one screen: prior chick bookings, past mortality complaints, vaccine inquiries, and payment reliability score.

---

## 4. Live Supabase Data Integration Architecture

All mock data arrays (`RECENT_ENQUIRIES`, `INITIAL_ENQUIRIES`, `RECENT_AUDIT_LOGS`) in `src/app/admin/*` will be replaced with **Server Components and Supabase SSR Client Queries**:

```typescript
// Pattern for src/app/admin/(dashboard)/enquiries/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { EnquiriesDataTable } from './enquiries-data-table';

export default async function EnquiriesManagementPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(...);

  const { data: enquiries, error } = await supabase
    .from('enquiries')
    .select(`
      id,
      enquiry_ref,
      customer_name,
      customer_phone,
      delivery_state,
      delivery_city,
      farm_name,
      enquiry_type,
      items,
      estimated_subtotal_ngn,
      user_notes,
      status,
      created_at
    `)
    .order('created_at', { ascending: false })
    .limit(50);

  return <EnquiriesDataTable initialData={enquiries || []} />;
}
```

This guarantees 100% server-side authentication, eliminates data leakage, and provides instant data rendering on Cloudflare edge infrastructure.
