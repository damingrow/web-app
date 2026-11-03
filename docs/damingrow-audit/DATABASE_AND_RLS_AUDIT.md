# D-AminGrow — Supabase Database & Row-Level Security (RLS) Audit
**Document Ref:** DAG-AUDIT-010  
**Audit Date:** November 3, 2026  
**Database Engine:** PostgreSQL 15+ (Supabase Managed Instance)  
**Migration Path:** `/supabase/migrations/`

---

## 1. Executive Summary: Database Architecture Status

The repository contains a sophisticated, enterprise-grade PostgreSQL relational schema defined in 3 SQL migrations:
1. `20261026000001_initial_schema.sql`: 17 relational tables, 6 custom enums, auto-updating timestamp triggers.
2. `20261026000002_row_level_security.sql`: RLS enabled on all 17 tables, custom JWT role helper `get_staff_role()`, 40 granular access policies.
3. `20261026000003_seed_categories.sql`: Seed data for the 5 core product categories.

### Primary Forensic Defect:
While the database schema and RLS policies are **architecturally well-crafted**, there is a **near-complete disconnect between the application code and the database**:
1. Critical column mismatches cause runtime API insert failures (`reference_number` vs `enquiry_ref`).
2. The Next.js application queries static code arrays instead of database tables.
3. Several essential business entities (`customers`, `chick_bookings`, `quotations`) were omitted from the initial migration.

---

## 2. Table-by-Table Schema & RLS Audit

| Table Name | RLS Status | Public Access | Staff Access | Foreign Keys & Integrity | Assessment & Identified Gaps |
|---|---|---|---|---|---|
| `staff_profiles` | **Enabled** | None (Blocked) | View colleagues; Super Admin manages | `REFERENCES auth.users(id)` | **Solid**. Enforces valid role enums (`super_admin`, `sales_agent`, `content_editor`, `veterinary_consultant`). |
| `suppliers` | **Enabled** | None (Blocked) | Super Admin manages; staff views | None | **Good**. Sourcing partner tracking (hatcheries, pharma labs). |
| `product_categories` | **Enabled** | Read active | Editors manage | Self-referencing `parent_id` | **Good**. Widened to `text` to support `point_of_lay`. |
| `products` | **Enabled** | Read active | Editors manage | `category_id`, `supplier_id` | **Unused**. Populated via migrations, but bypassed by static `src/data/products.ts`. |
| `product_variants` | **Enabled** | Read active | Editors manage | `product_id` | **Unused**. Multi-pack dosage and packaging variants. |
| `product_media` | **Enabled** | Read active | Editors manage | `product_id` | **Unused**. Image gallery table, completely bypassed by static `/public/products/`. |
| `authors` | **Enabled** | Read active | Editors manage | None | **Unused**. Intended for author E-E-A-T credentials; currently empty. |
| `articles` | **Enabled** | Read published | Editors manage | `category_id`, `author_id` | **Unused**. Bypassed by static `src/data/articles.ts`. |
| `landing_pages` | **Enabled** | Read published | Editors manage | None | **Unused**. Landing page CMS table; unused. |
| `content_sections` | **Enabled** | Read active | Editors manage | `landing_page_id` | **Unused**. |
| `redirects` | **Enabled** | Read active | Editors manage | None | **Unused**. 301 SEO redirect table; unused. |
| `enquiries` | **Enabled** | Insert only | Sales view/update | `assigned_to_staff_id` | **CRITICAL DEFECT**. Schema expects `enquiry_ref`; API sends `reference_number`. Inserts fail. |
| `enquiry_status_history`| **Enabled** | None (Blocked) | Staff view/insert | `enquiry_id`, `changed_by_staff_id`| **Unused**. Never written to by application code. |
| `enquiry_notes` | **Enabled** | None (Blocked) | Staff view/insert | `enquiry_id`, `author_staff_id` | **Unused**. Never written to by application code. |
| `consent_records` | **Enabled** | Insert only | Staff view | `enquiry_id` | **Unused**. Privacy consent logs; API never writes here. |
| `audit_events` | **Enabled** | Insert only | Super Admin views | None (JSONB payload) | **Partially Used**. `/api/admin/chicks-pricing` writes here, but UI displays mock data. |
| `application_settings` | **Enabled** | Read brand | Super Admin manages | None | **Unused**. Global WhatsApp numbers and metadata; bypassed by `.env`. |

---

## 3. RLS Security Model Analysis

The RLS policy implementation in `20261026000002_row_level_security.sql` relies on a PostgreSQL function:

```sql
CREATE OR REPLACE FUNCTION get_staff_role()
RETURNS staff_role_enum AS $$
BEGIN
    RETURN (
        SELECT role FROM staff_profiles
        WHERE id = auth.uid() AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
```

### Forensic Security Finding:
- **Strengths**: The `SECURITY DEFINER` function correctly pulls the authenticated user's role from `staff_profiles`, preventing client-side JWT role spoofing.
- **Vulnerability**: In [`src/lib/supabase/server.ts`](file:///Users/mac/Projects/Damingrow/src/lib/supabase/server.ts#L41-L52), `createAdminClient()` initializes with `SUPABASE_SERVICE_ROLE_KEY`. When the Next.js API routes call `createAdminClient()`, **Row-Level Security is completely bypassed**. Because the administrative API routes currently lack session validation, any external HTTP request triggers service-role queries that circumvent all RLS policies.

---

## 4. Missing Database Entities (Required for Full Operations)

The initial schema omitted 4 critical business domains:

1. **`customers`**: Required to aggregate repeat farmers across bookings, inquiries, and technical visits.
2. **`chick_bookings`**: Required to track breed, carton count, hatch dates, hatchery allocation quotas, and motor park waybill dispatch details.
3. **`quotations`**: Required to track formal price quotations issued by staff with expiration dates and PDF snapshots.
4. **`service_requests`**: Required to track on-farm veterinary autopsy requests, water testing, and technician dispatch assignments.
