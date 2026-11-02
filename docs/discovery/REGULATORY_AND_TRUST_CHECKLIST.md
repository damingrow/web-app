# D-AminGrow — Regulatory, Compliance & Trust Architecture
**Document Ref:** DAG-DISC-007  
**Version:** 1.0.0  
**Research Date:** 2026-10-26  
**Auditor:** Cybersecurity Engineer, Compliance Lead & Principal Architect  
**Status:** Completed & Legally Framed  

---

## 1. Regulatory Context & Legal Disclaimer

> [!IMPORTANT]
> **LEGAL & PROFESSIONAL NOTICE:**  
> This document outlines technical and architectural requirements based on publicly available Nigerian statutes, official NAFDAC directives, NDPA 2023 guidelines, and veterinary industry practices as of October 2026. The platform software architecture and product catalogue schema do **NOT** constitute legal advice, veterinary licensure, or official authorization to dispense prescription medications. Full operational launch requires formal retainers with a registered Nigerian Legal Practitioner, a registered Veterinary Doctor (VCN licensed), and a certified Data Protection Compliance Organisation (DPCO).

---

## 2. Statutory Framework in Nigeria

The digital operation of D-AminGrow falls under multiple Nigerian regulatory bodies:

1. **National Agency for Food and Drug Administration and Control (NAFDAC):**
   - *Statute:* NAFDAC Act Cap N1 Laws of the Federation of Nigeria (LFN) 2004.
   - *Enforcement Directorate:* Veterinary Medicine and Allied Products (VMAP) Directorate and Drug Registration & Regulatory Affairs (DR&R).
   - *Scope:* Manufacture, import, export, advertisement, sale, and distribution of veterinary drugs, biologicals, premixes, and agrochemicals.
2. **Veterinary Council of Nigeria (VCN):**
   - *Statute:* Veterinary Surgeons Act Cap V3 LFN 2004.
   - *Scope:* Regulation of veterinary practice, clinical consultation, disease diagnosis, and prescription authorization.
3. **Federal Ministry of Agriculture and Rural Development (FMARD) / Department of Veterinary & Pest Control Services:**
   - *Statute:* Animal Diseases (Control) Act 2022.
   - *Scope:* Control of animal diseases, interstate movement of livestock, hatchery biosecurity accreditation, and import/export phytosanitary certification.
4. **Nigeria Data Protection Commission (NDPC):**
   - *Statute:* Nigeria Data Protection Act (NDPA) 2023.
   - *Scope:* Lawful processing, consent management, storage limitation, and security of user personal data.
5. **Federal Competition and Consumer Protection Commission (FCCPC):**
   - *Statute:* FCCPA 2018.
   - *Scope:* Truth in advertising, consumer pricing transparency, and e-commerce return disclosures.

---

## 3. Deep-Dive Compliance Requirements by Operational Domain

### Domain 1: Veterinary Medicines & Antibiotic Stewardship (AMR)

#### Regulatory Directives:
- **Zero Promotion as Growth Promoters:** Under NAFDAC VMAP directives and the National Action Plan on Antimicrobial Resistance (AMR), **it is strictly prohibited to market or advertise antibiotics as animal growth promoters (AGPs) or routine flock boosters.**
- **Prescription vs. Over-the-Counter (OTC) Separation:**
  - *Prescription-Only Medicines (POM):* Injectable antibiotics, systemic therapeutics, controlled biologicals. Under NAFDAC *Drug and Related Products Advertisement Regulations*, POMs cannot be advertised to the general public via mass marketing, open social media ads, or unrestricted consumer promotions.
  - *Permitted Presentation:* Informational catalogue listings restricted to registered trade names, active chemical compositions, approved indications, and explicit instructions that administration requires a licensed veterinary prescription.
- **Mandatory Food Safety Disclosures:**
  - Any pharmaceutical administered to food-producing animals (broilers for meat, layers for table eggs) **must explicitly display the Meat Withdrawal Period (days) and Egg Withdrawal Period (days).**
  - Failure to disclose withdrawal times violates consumer food safety laws and exposes commercial farms to illegal chemical residue penalties.

---

### Domain 2: Biologicals, Vaccines & Cold-Chain Logistics

#### Regulatory Directives:
- **Biological Integrity & Storage:**
  - Most poultry vaccines (Newcastle, Gumboro, Marek's) are live or attenuated freeze-dried biological agents requiring continuous cold-chain maintenance at **+2°C to +8°C**.
  - Any breach of temperature deactivates the live viral antigen, rendering the vaccine ineffective and causing catastrophic flock mortality upon field challenge.
- **Distribution Policies:**
  - The platform must state that vaccines are packaged in thermal insulated foam boxes with frozen coolant gel packs.
  - **Scheduled Dispatch Days:** Shipping biologicals must be restricted to days when logistics carriers can deliver within 24–48 hours (e.g., Monday through Wednesday only), avoiding weekend depot stagnation.
  - **Absolute Non-Returnable Policy:** For biosecurity and biological safety, vaccines and biologicals are strictly non-returnable once dispatched.

---

### Domain 3: Day-Old Chicks Distribution & Animal Welfare

#### Regulatory Directives:
- **Live Transit Biosecurity:**
  - Day-old chicks (DOCs) must originate from hatcheries complying with FMARD biosecurity standards.
  - Chicks must be transported within 24–36 hours of hatching (prior to yolk sac depletion).
  - Clear hatchery origin disclosure (e.g., AMO, CHI, Zartech, Agrited, or D-AminGrow verified partner hatcheries) and Marek's vaccination status at hatchery must be recorded.
- **Mortality & Claims Protocol:**
  - Standard industry practice requires farmers to inspect chick boxes at the collection terminal or farm gate, reporting transit mortalities immediately with timestamped photographic/video evidence.
  - Clear "Extra Chicks" policy (industry standard 1–2 extra chicks per carton of 50 to offset statistical transit loss).

---

### Domain 4: Data Protection & NDPA 2023 Compliance

#### Regulatory Directives:
- **Consent Mechanism:**
  - Section 26 of the NDPA 2023 requires freely given, specific, informed, and unambiguous consent.
  - **No Pre-Ticked Checkboxes:** Marketing opt-ins or newsletter subscriptions must be actively selected by the user.
- **WhatsApp Order Handoff Transparency:**
  - When the web application transfers cart contents, customer name, phone number, and delivery city to WhatsApp (`+2348139169402`), the user must see an explicit notice:  
    *"By clicking 'Send Order via WhatsApp', you agree that D-AminGrow processes your contact details to fulfill your order in accordance with our Privacy Policy."*
- **Data Minimisation & Retention:**
  - Enquiries and quotation records stored in Supabase must have defined retention windows (e.g., purge uncompleted WhatsApp quote records older than 180 days).

---

### Domain 5: Cross-Border & Regional Expansion (ECOWAS Corridor)

#### Regulatory Directives:
- **Sanitary & Phytosanitary (SPS) Measures:**
  - Exporting day-old chicks, biologicals, or pharmaceuticals across ECOWAS borders (e.g., Ghana, Benin, Cameroon, Togo) requires:
    1. Official FMARD Veterinary International Health Certificate.
    2. Import permit issued by the destination country's Ministry of Agriculture/Veterinary Services.
    3. IATA Live Animals Regulations (LAR) compliance for air cargo dispatch.
- **Architectural Safeguard:**
  - The Phase 1 MVP must restrict automated checkout/booking to domestic Nigerian states.
  - International visitors must be routed to a dedicated "International & Regional B2B Trade Enquiry" form requiring manual documentation clearance.

---

## 4. Product-Level Database Fields & Compliance Schema

To enforce regulatory compliance programmatically, the Supabase PostgreSQL database must implement dedicated compliance columns on the `products` table:

```sql
-- Architectural Snippet: Compliance columns for products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS regulatory_status TEXT DEFAULT 'unregistered' 
    CHECK (regulatory_status IN ('nafdac_registered', 'pending_registration', 'exempt_accessory', 'not_applicable'));
ALTER TABLE products ADD COLUMN IF NOT EXISTS nafdac_reg_number TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_prescription_required BOOLEAN DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_antimicrobial BOOLEAN DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_cold_chain_required BOOLEAN DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS storage_temperature_min_celsius NUMERIC(4, 1);
ALTER TABLE products ADD COLUMN IF NOT EXISTS storage_temperature_max_celsius NUMERIC(4, 1);
ALTER TABLE products ADD COLUMN IF NOT EXISTS meat_withdrawal_period_days INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS egg_withdrawal_period_days INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS active_ingredients JSONB DEFAULT '[]'::jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS administration_route TEXT; -- oral, injection, spray, water
ALTER TABLE products ADD COLUMN IF NOT EXISTS legal_disclaimer TEXT;
```

---

## 5. Administrative Warnings & Enforcement Guardrails

The administrative dashboard must contain hard validation rules preventing non-compliant data entry:

```mermaid
flowchart TD
    A[Admin Submits Product Record] --> B{Category == 'Drugs' or 'Vaccines'?}
    B -- No --> Z[Allow Publication]
    B -- Yes --> C{Is NAFDAC Reg Number Provided?}
    C -- No --> D[BLOCK: Flag Warning 'NAFDAC Reg No Required for Public Sale']
    C -- Yes --> E{Is Antimicrobial Checked?}
    E -- Yes --> F{Check Description for Banned Terms: 'growth promoter', 'weight booster', 'fattening'}
    F -- Term Found --> G[BLOCK: AMR Violation 'Antibiotics cannot be marketed for growth promotion']
    F -- Term Clean --> H{Withdrawal Period Specified?}
    H -- No --> I[BLOCK: 'Meat/Egg withdrawal period must be defined for livestock drugs']
    H -- Yes --> J{Category == 'Vaccines'?}
    J -- Yes --> K{Cold-Chain Flagged True and Storage Temps Defined?}
    K -- No --> L[BLOCK: 'Vaccines must enforce cold-chain specifications (+2°C to +8°C)']
    K -- Yes --> Z[Allow Publication with Mandatory Compliance Badges]
```

---

## 6. Actionable Compliance Checklist for Launch

| Compliance Area | Action Item | Responsible Party | Platform Feature Required | Status |
| :--- | :--- | :--- | :--- | :---: |
| **NAFDAC Registration** | Audit every pharmaceutical and vaccine SKU for valid NAFDAC Reg. No. | Veterinary Lead / Client | Display "NAFDAC Reg. No: 04-XXXX" on PDP | Pending Client Input |
| **Prescription Gating** | Mark POM drugs with "Veterinary Prescription Required" badge | Software Architect | WhatsApp message prepends "[PRESCRIPTION REQUIRED]" notice | Ready in Specs |
| **AMR Content Audit** | Screen all product descriptions and blog articles against banned growth-promoter claims | Content Lead | Automated content linter on CMS | Ready in Specs |
| **Cold-Chain Protocol** | Formulate cold-chain transit advisory and non-returnable biological terms | Logistics / Operations | Checkout warning modal on all vaccine SKUs | Ready in Specs |
| **Privacy & Consent** | Implement cookie consent banner & NDPA privacy notice | Cybersecurity Lead | Explicit opt-in checkbox on enquiry & cart | Ready in Specs |
| **Professional Advice Disclaimer** | Draft veterinary consultation disclaimer on all advisory articles and PDPs | Legal / Vet Counsel | Global footer & PDP contextual disclaimer | Drafted |
| **International SPS Gating** | Disable direct checkout for non-Nigerian IP addresses / delivery destinations | Principal Architect | Country selector gating international orders to B2B inquiry form | Ready in Specs |
