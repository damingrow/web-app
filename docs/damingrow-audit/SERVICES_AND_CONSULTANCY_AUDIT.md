# D-AminGrow — Services & Consultancy Forensic Audit
**Document Ref:** DAG-AUDIT-006  
**Audit Date:** November 3, 2026  
**Domain:** Agricultural Technical Services & Professional Consultancy  
**Primary Routes:** `/services`, `/services/technical`, `/services/consultation`, `/services/chicks`, `/services/vaccines`, `/services/drugs`, `/services/point-of-lay`

---

## 1. Scope & Service Architecture Overview

D-AminGrow differentiates itself from basic input retailers by offering **on-farm veterinary and engineering technical services** alongside commercial products. The platform has structured these services into 7 dedicated landing pages:

| Service Stream | Dedicated Route Path | Target Audience | Key Service Deliverables | Conversion Mechanism |
|---|---|---|---|---|
| **On-Farm Technical Services** | `/services/technical` | Operating broiler, layer, and turkey farmers | On-farm vaccination, post-mortem disease necropsy, biosecurity audits, gas brooder calibration, waterline flushing | Pre-filled WhatsApp technician dispatch booking |
| **Commercial Farm Consultation** | `/services/consultation` | Investors, startups, expanding commercial farms | Turnkey pen construction blueprints, ventilation specs, custom flock vaccination programs, feed/FCR optimization, business ROI models | 4-step consultation intake + WhatsApp booking |
| **Day-Old Chick Booking** | `/services/chicks` | Commercial poultry producers | Hatchery selection (Zartech, Amo, Chi, Sayed), Marek's vaccination, Tuesday/Thursday dispatch | Interactive booking slip + WhatsApp |
| **Cold-Chain Vaccine Distribution** | `/services/vaccines` | Farmers, vet clinics, paravets | 2°C–8°C thermal packaging, temperature indicator strips, 7 viral/bacterial vaccines, prescription verification | Order ticket + WhatsApp |
| **Veterinary Drugs & Supplements** | `/services/drugs` | Poultry farm managers | NAFDAC-registered antibiotics, anticoccidials, fluoroquinolones, amino acids, water acidifiers | Product selection + WhatsApp |
| **Point-of-Lay Birds (17–20 Wks)** | `/services/point-of-lay` | Egg producers | Fully vaccinated 17–20w pullets, 100% vaccination timetable, crate dispatch across Nigeria | Bird quantity inquiry + WhatsApp |
| **Main Services Hub & Booking** | `/services` | All agricultural clients | Master overview of all 7 streams + inline consultation appointment request form | Form POST to `/api/enquiries` + WhatsApp |

---

## 2. Forensic Evaluation of Service Landing Pages

### Strengths (World-Standard UI & Conversion Psychology)
1. **Clear Service Differentiation**: Each page clearly communicates the specific technical scope, target species, and physical deliverables (e.g. "Written necropsy report", "Pen layout blueprint", "Material cost estimation").
2. **Authority & Trust Building**: Integrates verified Nigerian agricultural reality (e.g. mention of Newcastle LaSota boosters, Gumboro Intermediate Plus vvIBD field challenge, tropical open-sided pen heat stress).
3. **Structured Comparison Tables**: The Point-of-Lay page features a side-by-side comparison between Day-Old Chicks and POL birds, and Brown Layer vs. White Layer economics, educating farmers before they inquire.

### Critical Backend Gaps
1. **Service Inquiries Do Not Persist**:
   - On [`/services/page.tsx`](file:///Users/mac/Projects/Damingrow/src/app/(storefront)/services/page.tsx#L190), the consultation form calls `fetch('/api/enquiries', POST)`.
   - Due to the schema mismatch bug (`reference_number` vs `enquiry_ref`), the consultation request is **never recorded in Supabase**.
2. **No Field Technician Scheduling System**:
   - When a farmer requests an urgent post-mortem or on-farm vaccination, there is no technician dispatch calendar or staff assignment module in the admin dashboard.
3. **No Consultation Deliverable Storage**:
   - There is no portal or secure document repository where D-AminGrow can upload pen blueprints, feeding programs, or necropsy reports for the farmer to access.

---

## 3. Detailed Audit by Service Category

### A. Livestock Technical Services (`/services/technical`)
- **Implemented Services**:
  1. *On-Farm Vaccination Administration*: Eye-drop, subcutaneous, intramuscular, wing-web, spray routes.
  2. *Post-Mortem Disease Diagnostics*: Field necropsy for sudden mortality spikes.
  3. *Biosecurity Audit & Farm Setup*: Footbath design, vector control, terminal disinfection.
  4. *Gas Brooder Calibration*: Infrared LPG brooder floor heat mapping (32°C–35°C).
  5. *Nipple Drinker Line Flushing*: Acidifier biofilm stripping, water pressure balancing.
  6. *Flock Health Screening*: Clinical bird examinations before production drops peak.
- **Defect/Gap**: Technicians have no mobile field app or admin intake interface to submit necropsy notes or vaccination completion certificates back to the office.

### B. Farm Consultation Services (`/services/consultation`)
- **Implemented Advisory Areas**:
  1. *Poultry Housing & Pen Construction Design*: Open-sided pens, multi-tier cage orientation, gable roof ventilation.
  2. *Custom Vaccination Timetable Development*: Tailored to state/regional endemic disease pressure.
  3. *Flock Health Diagnostics & Clinical Reports*: Laboratory submission coordination.
  4. *Feed & Nutrition Program Optimization*: Raw material analysis (maize, soya, wheat offal, bone meal) and custom premixes.
  5. *Poultry Business Financial Planning & ROI Modeling*: Break-even analysis, feed price sensitivity modeling.
- **Defect/Gap**: Testimonials on this page (`Alhaji Musa Garba`, `Mrs. Adaeze Okonkwo`, `Mr. Biodun Adesanya`) are illustrative placeholders. Per Absolute Rule 11, real customer case studies should be verified and published once authorized by clients.

---

## 4. Recommendations for Technical Services Implementation

1. **Service Request Entity in Database**:
   - Create a dedicated `service_requests` table with fields for `service_type`, `farm_location_coordinates`, `flock_size`, `urgency_level` (Routine vs. Emergency Outbreak), `assigned_technician_id`, and `report_pdf_url`.
2. **Admin Technical Dispatch Queue**:
   - Add `/admin/services` to allow the lead veterinary officer to view pending autopsies and assign field technicians across Oyo, Ogun, Lagos, and northern depots.
3. **Automated WhatsApp Technician Routing**:
   - Format emergency outbreak diagnostic requests with an `[EMERGENCY OUTBREAK]` tag for immediate priority routing to the on-call veterinarian.
