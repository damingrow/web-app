# D-AminGrow — Admin Dashboard & Operations Gap Analysis
**Document Ref:** DAG-AUDIT-007  
**Audit Date:** November 3, 2026  
**Scope:** Administrative Back-Office, Operations, and Staff Tooling (`src/app/admin/`)  
**Existing Routes:** 5 Implemented Pages (`/admin`, `/admin/enquiries`, `/admin/chicks-pricing`, `/admin/products`, `/admin/audit`)  
**Evaluation Standard:** 26 Enterprise Back-Office Modules (Phase F Audit Requirements)

---

## 1. Executive Summary: Admin Dashboard Status

The current administrative dashboard presents a polished, modern visual interface built with Tailwind CSS, Lucide icons, and responsive layouts. However, a forensic inspection of the underlying data flows reveals that **the dashboard is primarily a static prototype**:

1. **4 out of 5 pages render hardcoded static arrays** or in-memory React state (`useState`) that resets upon page reload.
2. **Zero Create, Update, or Delete (CRUD) operations** are connected to the Supabase database.
3. **21 out of 26 enterprise modules** required for commercial poultry and agro-allied operations are completely unimplemented.
4. **Administrative API endpoints lack session authentication**, allowing unauthorized HTTP calls.

---

## 2. Forensic Module-by-Module Evaluation (26 Modules)

| # | Enterprise Module | Implemented? | Connected to Real DB? | CRUD Operations | Auth Guard on Server? | Current Status & Forensic Evidence |
|---|---|---|---|---|---|---|
| **1** | **Dashboard Analytics** | Partial (UI only) | No (Hardcoded) | Read-only | Missing on API | **Implemented but Broken**. Displays hardcoded metrics ("12 Pending Contacts", "Tuesday Departure") in `src/app/admin/(dashboard)/page.tsx`. |
| **2** | **Product Management** | Partial (UI only) | No (Static array) | Read-only list | N/A | **Implemented but Incomplete**. Renders `src/data/products.ts` directly. No Add Product form, Edit modal, or image uploader. |
| **3** | **Product Category Management** | No | No | None | None | **Not Implemented**. Categories cannot be added, renamed, or reordered via admin UI. |
| **4** | **Product Enquiries** | Partial (UI only) | No (Hardcoded array) | In-memory update | Missing | **Implemented but Broken**. `enquiries/page.tsx` uses `INITIAL_ENQUIRIES` in `useState`. Status updates do not persist to Supabase. |
| **5** | **Chick Booking Management** | No | No | None | None | **Not Implemented**. No dedicated interface to track chick carton allocations, hatch dates, or motor park waybills. |
| **6** | **Booking Calendar** | No | No | None | None | **Not Implemented**. No visual calendar for Tuesday and Thursday hatchery dispatch scheduling. |
| **7** | **Availability & Allocation** | No | No | None | None | **Not Implemented**. No carton quota tracker across partner hatcheries (Zartech, Amo, Chi, Sayed). |
| **8** | **Quotation Management** | No | No | None | None | **Not Implemented**. Staff cannot generate, calculate, or send official D-AminGrow PDF/WhatsApp price quotes. |
| **9** | **Consultation Requests** | No | No | None | None | **Not Implemented**. Consultation requests are mixed into generic inquiries with no clinical review workflow. |
| **10**| **Technical Support Requests** | No | No | None | None | **Not Implemented**. No technician dispatch queue or autopsy reporting interface. |
| **11**| **CRM & Customer Profiles** | No | No | None | None | **Not Implemented**. No unified customer view aggregating orders, farm size, location, and inquiry history. |
| **12**| **Enquiry Pipeline** | Partial (Tabs only) | No (Local state) | In-memory filter | None | **Implemented but Incomplete**. UI has status filter buttons, but records are mock data. |
| **13**| **Article & Guide Management** | No | No | None | None | **Not Implemented**. Articles are hardcoded in `src/data/articles.ts`. No web CMS to publish or edit guides. |
| **14**| **Editorial Review Workflow** | No | No | None | None | **Not Implemented**. No review/approve stage for veterinary articles or drug dosage guides. |
| **15**| **Expert Author Profiles** | No | No | None | None | **Not Implemented**. Authors are hardcoded in static article objects without separate author management. |
| **16**| **Landing-Page Management** | No | No | None | None | **Not Implemented**. Service landing pages are hardcoded Next.js JSX files. |
| **17**| **SEO Management** | No | No | None | None | **Not Implemented**. Meta tags, titles, and OpenGraph descriptions cannot be edited via admin UI. |
| **18**| **Media Library** | No | No | None | None | **Not Implemented**. No interface to browse, upload, or organize product photos in Supabase Storage. |
| **19**| **Notification Templates** | No | No | None | None | **Not Implemented**. WhatsApp and SMS message templates are hardcoded in `src/lib/whatsapp.ts`. |
| **20**| **WhatsApp Integrations** | Partial (Client URL) | No | Client generation | N/A | **Implemented but Incomplete**. Generates `wa.me` links on client, but lacks WhatsApp Business Cloud API sync. |
| **21**| **Email Integrations** | No | No | None | None | **Not Implemented**. No Resend/SendGrid/SES integration configured for email notifications. |
| **22**| **Marketing Analytics** | No | No | None | None | **Not Implemented**. No lead conversion rates, campaign UTM tracking, or search keyword analytics. |
| **23**| **Reports & Exports** | No | No | None | None | **Not Implemented**. Staff cannot export inquiries, chick bookings, or customer lists to CSV or Excel. |
| **24**| **User & Role Management** | Partial (DB only) | Table in DB | None in UI | Server client | **Backend Only**. `staff_profiles` table exists in Supabase, but there is no admin UI to invite or manage staff. |
| **25**| **Audit Logs** | Partial (UI only) | Partial (Audit insert) | Read mock / Write DB | Partial | **Implemented but Broken**. UI displays static `RECENT_AUDIT_LOGS` array; does not query `audit_events`. |
| **26**| **System Settings** | No | Table in DB | None in UI | None | **Backend Only**. `application_settings` table exists in Supabase, but has no admin settings interface. |

---

## 3. Forensic Code Defect Highlights

### Defect 1: Mock Data in Administrative Production Views
- **File:** [`src/app/admin/(dashboard)/enquiries/page.tsx`](file:///Users/mac/Projects/Damingrow/src/app/admin/(dashboard)/enquiries/page.tsx#L28-L88)
- **Code:**
  ```typescript
  const INITIAL_ENQUIRIES: EnquiryRecord[] = [
    { id: 'enq-001', ref: 'DAG-M8K-902', customerName: 'Alhaji Musa Ibrahim', ... },
    { id: 'enq-002', ref: 'DAG-M8K-781', customerName: 'Baraka Farms Ltd', ... },
    { id: 'enq-003', ref: 'DAG-M8K-644', customerName: 'Dr. Chidi Okafor', ... },
    { id: 'enq-004', ref: 'DAG-M8K-512', customerName: 'Mrs. Folake Adeleke', ... },
  ];
  ```
- **Consequence:** Staff viewing this page see the same 4 fake customers every time. Real incoming farmer inquiries never appear here.

### Defect 2: Missing Authentication on Admin API Routes
- **File:** [`src/app/api/admin/enquiries/route.ts`](file:///Users/mac/Projects/Damingrow/src/app/api/admin/enquiries/route.ts#L20)
- **Code:**
  ```typescript
  export async function PATCH(request: Request) {
    try {
      const body = await request.json();
      const validated = updateStatusSchema.parse(body);
      // NO SESSION OR AUTHENTICATION CHECK IS PERFORMED
      if (env.SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createAdminClient();
        await supabase.from('enquiries').update(...)
  ```
- **Consequence:** An unauthenticated third party can craft a `PATCH` request to `/api/admin/enquiries` and modify customer enquiry statuses or flood `audit_events`.

---

## 4. Minimum Operational Back-Office Architecture Required

To support D-AminGrow's revenue targets and scale to 500,000 monthly visits, the following 5 priority admin modules must be built immediately:

1. **Live Enquiries & Booking Manager (`/admin/enquiries`)**:
   - Real-time Supabase query against `enquiries` with pagination, search by phone number, state filter, and status update actions.
2. **Chick Dispatch Calendar (`/admin/chicks/calendar`)**:
   - Visual view of Tuesday and Thursday dispatch commitments, total cartons booked per hatchery, and remaining allocation.
3. **Product Catalog Manager (`/admin/products/new` & `/admin/products/[id]`)**:
   - Full CRUD form with Supabase Storage image upload, NAFDAC number entry, withdrawal period fields, and active/draft toggles.
4. **Customer Profile CRM (`/admin/customers`)**:
   - Phone-indexed customer directory aggregating all inquiries, bookings, and location history for repeat buyers.
5. **Staff User Management (`/admin/staff`)**:
   - UI to invite staff, assign roles (`sales_agent`, `veterinary_consultant`, `content_editor`, `super_admin`), and revoke access.
