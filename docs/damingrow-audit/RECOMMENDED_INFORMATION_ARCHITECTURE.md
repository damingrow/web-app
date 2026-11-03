# D-AminGrow — Target Information & Entity Architecture
**Document Ref:** DAG-AUDIT-015  
**Audit Date:** November 3, 2026  
**Objective:** Define the enterprise information hierarchy, administrative navigation, and relational database model to scale D-AminGrow to 500,000 monthly visitors.

---

## 1. Storefront Information Architecture

```mermaid
graph TD
    Root["D-AminGrow Storefront (damingrow.com)"]
    
    Root --> Products["Products Hub (Price on Request)"]
    Products --> DOC["Day-Old Chicks (/chicks)"]
    Products --> POL["Point-of-Lay Birds (/point-of-lay)"]
    Products --> Drugs["Veterinary Drugs (/drugs)"]
    Products --> Vac["Livestock Vaccines (/vaccines)"]
    Products --> Acc["Housing & Equipment (/accessories)"]
    Products --> PDP["Product Detail Pages (/[category]/[slug])"]

    Root --> Services["Services Funnels (/services)"]
    Services --> S_Tech["Technical Services (/services/technical)"]
    Services --> S_Cons["Farm Consultation (/services/consultation)"]
    Services --> S_DOC["Chick Booking Service (/services/chicks)"]
    Services --> S_Vac["Vaccine Distribution (/services/vaccines)"]
    Services --> S_Drugs["Veterinary Drugs (/services/drugs)"]
    Services --> S_POL["Point-of-Lay Sales (/services/point-of-lay)"]

    Root --> Calculators["Farm Decision Suite (/calculators)"]
    Calculators --> Calc_Brood["Brooder Space Calculator (/calculators/brooder)"]
    Calculators --> Calc_Vac["Vaccination Timetable Generator (/calculators/vaccination)"]
    Calculators --> Calc_FCR["FCR & Feed Margin Calculator (/calculators/fcr)"]
    Calculators --> Calc_HDP["Hen-Day Egg Production Tool (/calculators/egg-production)"]
    Calculators --> Calc_Symp["Disease Symptom Triager (/calculators/symptom-checker)"]

    Root --> Knowledge["Knowledge Centre (/knowledge)"]
    Knowledge --> Articles["12+ Clinical Guides (/knowledge/[slug])"]
    Knowledge --> Authors["Expert Veterinarians (/authors/[slug])"]

    Root --> Company["Company & Legal"]
    Company --> About["About D-AminGrow (/about)"]
    Company --> Contact["Contact & Regional Depots (/contact)"]
    Company --> Policies["Terms, Privacy, Shipping (/policies/*)"]
```

---

## 2. Target Administrative Back-Office Navigation

```mermaid
graph LR
    Admin["D-AminGrow Admin Back-Office (/admin)"]
    
    Admin --> M_Ops["Operations & Leads"]
    M_Ops --> Ops_Dash["Executive Dashboard (/admin)"]
    M_Ops --> Ops_Enq["Customer Enquiries (/admin/enquiries)"]
    M_Ops --> Ops_Quotes["Quotation Manager (/admin/quotations)"]
    M_Ops --> Ops_Tech["Technical Service Dispatch (/admin/services)"]

    Admin --> M_Chicks["Chick Booking & Dispatch"]
    M_Chicks --> Chk_Book["Booking Pipeline (/admin/chicks/bookings)"]
    M_Chicks --> Chk_Cal["Dispatch Calendar (/admin/chicks/calendar)"]
    M_Chicks --> Chk_Alloc["Hatchery Quota Allocations (/admin/chicks/allocations)"]
    M_Chicks --> Chk_Price["Weekly Rate Sync (/admin/chicks-pricing)"]

    Admin --> M_CRM["Customer CRM"]
    M_CRM --> CRM_Cust["Farmer Directory (/admin/customers)"]
    M_CRM --> CRM_360["Customer 360 View (/admin/customers/[id])"]

    Admin --> M_Cat["Catalog & Inventory"]
    M_Cat --> Cat_Prod["Products Management (/admin/products)"]
    M_Cat --> Cat_Media["Media Library (/admin/media)"]

    Admin --> M_Gov["Governance & Security"]
    M_Gov --> Gov_Staff["Staff & RBAC Roles (/admin/staff)"]
    M_Gov --> Gov_Audit["Audit Trail (/admin/audit)"]
```

---

## 3. Relational Entity-Relationship Model (Target ERD)

```mermaid
erDiagram
    customers ||--o{ enquiries : submits
    customers ||--o{ chick_bookings : places
    customers ||--o{ service_requests : books
    
    staff_profiles ||--o{ enquiries : assigned_to
    staff_profiles ||--o{ chick_bookings : manages
    staff_profiles ||--o{ service_requests : assigned_technician
    staff_profiles ||--o{ audit_events : triggers

    product_categories ||--o{ products : categorizes
    products ||--o{ product_variants : contains
    products ||--o{ product_media : displays

    authors ||--o{ articles : writes

    chick_bookings ||--o{ booking_status_history : tracks

    customers {
        uuid id PK
        text customer_code UK
        text primary_phone UK
        text full_name
        text farm_name
        text primary_state
        text primary_city
        integer total_orders_count
        numeric total_spend_ngn
        text customer_tier
    }

    chick_bookings {
        uuid id PK
        text booking_ref UK
        uuid customer_id FK
        text breed
        text preferred_hatchery
        integer carton_count
        integer total_chicks
        date dispatch_date
        text destination_state
        text destination_city
        text destination_motor_park
        text waybill_number
        numeric quoted_price_per_carton
        numeric deposit_paid
        text status
    }

    enquiries {
        uuid id PK
        text enquiry_ref UK
        uuid customer_id FK
        text enquiry_type
        text delivery_state
        text delivery_city
        jsonb items
        text user_notes
        text status
    }

    service_requests {
        uuid id PK
        text request_ref UK
        uuid customer_id FK
        text service_type
        text farm_location
        text urgency_level
        text clinical_symptoms
        uuid assigned_technician_id FK
        text status
        text report_url
    }
```
