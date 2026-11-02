# D-AminGrow — Risk Register, Assumptions & Unresolved Questions
**Document Ref:** DAG-DISC-009  
**Version:** 1.0.0  
**Date:** 2026-10-26  
**Auditor:** Principal Risk Architect & Governance Lead  
**Status:** Completed & Open for Client Review  

---

## 1. Risk Register & Mitigation Matrix

To ensure the long-term viability of D-AminGrow, risks across technical, operational, regulatory, and biological domains have been catalogued with concrete mitigations.

| Risk ID | Risk Domain | Description & Potential Impact | Likelihood | Impact | Severity | Mitigation Strategy | Owner |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **RSK-01** | **Regulatory** | **NAFDAC Sanctions for Unapproved Drug Ads:** Displaying veterinary antibiotics or prescription drugs without NAFDAC registration numbers or prior advertising clearance could trigger agency fines or product confiscation. | Medium | Critical | **HIGH** | Enforce database validation requiring NAFDAC registration numbers before publishing pharmaceutical SKUs. Gating prescription drugs behind veterinary consultation notices. | Veterinary Lead / Client |
| **RSK-02** | **Biological** | **Cold-Chain Failure in Vaccine Delivery:** Live poultry vaccines (Newcastle, Gumboro) exposed to ambient tropical heat (+30°C to +38°C) during transit lose viability, leading to total vaccine failure on customer farms. | High | Critical | **HIGH** | Restrict vaccine dispatch to Mon–Wed via express courier with insulated Styrofoam packaging and frozen ice packs. Prohibit weekend carrier holds. | Logistics Lead |
| **RSK-03** | **Commercial** | **Day-Old Chicks Price & Supply Volatility:** Hatcheries adjust chick prices weekly or face hatch failures, causing customer complaints if website displays outdated rates. | High | Moderate | **MEDIUM** | Remove hardcoded fixed prices for chicks. Use "Call / Chat for Today's Market Price" with a 1-click weekly bulk price update tool in the admin panel. | Sales Lead |
| **RSK-04** | **Operational** | **WhatsApp Sales Desk Bottleneck:** High inquiry volume from marketing spikes overwhelming the single phone number (`+2348139169402`), leading to delayed responses and lost sales. | High | High | **HIGH** | Phase 1: Deploy WhatsApp Business multi-agent web linking. Phase 2: Integrate CRM webhook auto-responders or official WhatsApp Cloud API to distribute chats across multiple sales staff. | Operations Lead |
| **RSK-05** | **Technical** | **Edge Deployment Drift on Cloudflare Workers:** Next.js App Router updates introducing features not yet supported by `@opennextjs/cloudflare`. | Low | High | **MEDIUM** | Pin exact package versions in `package.json`. Avoid experimental Next.js canary flags. Standardize on stable LTS Node/Next releases. | Software Architect |
| **RSK-06** | **Legal / NDPA** | **Data Protection Non-Compliance:** Storing customer farm names, phone numbers, and addresses without explicit NDPA consent or privacy retention limits. | Medium | Moderate | **MEDIUM** | Implement explicit opt-in consent checkboxes on WhatsApp checkout modals; define 180-day automated purging of uncompleted inquiry logs in Supabase. | Cybersecurity Lead |
| **RSK-07** | **Logistical** | **Transit Mortality on Live Day-Old Chicks:** Overheating, crushing, or delays during commercial motor-park transport resulting in dead-on-arrival chicks. | Medium | High | **HIGH** | Transparent "2 Extra Chicks per Carton" policy; mandatory terminal inspection upon receipt; clear 2-hour claim notification window with video proof. | Operations Director |
| **RSK-08** | **Digital Assets** | **Image Quality & Aspect Ratio Inconsistency:** Missing category assets (Vaccines) and distorted non-square product shots hurting buyer trust. | High | Low | **LOW** | Enforce 1200x1200px square canvas standardization; commission professional studio photography for missing vaccines before public launch. | Content Lead |

---

## 2. Explicit Unverified Assumptions

In accordance with strict discovery rules, the following items are currently classified as **assumptions** requiring validation:

1. **Brand Trademark & Business Registration:**  
   *Assumption:* "D-AminGrow" is a registered business name with the Corporate Affairs Commission (CAC) of Nigeria.  
   *Risk if Unverified:* Inability to open corporate merchant bank accounts or register for formal NAFDAC advertisement permits.
2. **Hatchery Distributorship Agreements:**  
   *Assumption:* D-AminGrow holds authorized distributor or booking agent status with major Nigerian hatcheries (e.g., AMO, CHI, Zartech, Agrited).  
   *Risk if Unverified:* Inability to guarantee chick delivery dates or secure wholesale allocation during peak festive demand.
3. **Veterinary Licensure / Supervision:**  
   *Assumption:* D-AminGrow has an in-house or retained licensed Veterinary Doctor (registered with the Veterinary Council of Nigeria) to oversee prescription product inquiries and advisory articles.  
   *Risk if Unverified:* Providing unlicensed veterinary advice carries civil and criminal liability under Nigerian law.
4. **Physical Operational Depot:**  
   *Assumption:* D-AminGrow maintains a physical dispatch base equipped with refrigeration facilities (+2°C to +8°C) and backup power (inverter/generator) for vaccine storage.  
   *Risk if Unverified:* Inability to store vaccines safely in regions prone to national grid instability.
5. **Geographic Delivery Coverage:**  
   *Assumption:* Initial logistics will cover Southwest and North-Central Nigeria via established inter-state transport networks (motor parks and dedicated couriers) before nationwide scaling.

---

## 3. Unresolved Questions Requiring Client Input

The following critical business and technical questions remain open and must be resolved prior to the commencement of Phase 01 implementation:

### Business & Operational Questions:
1. **Physical Location:** What is the exact registered physical address and depot location of D-AminGrow for inclusion in the website footer, legal terms, and Google Business Profile?
2. **Authorized Hatchery Partners:** Which specific hatchery brands does D-AminGrow officially sell (e.g. Amo, Zartech, CHI, Sayed, Agrited)?
3. **Vaccine Sourcing & Storage:** Does D-AminGrow currently stock vaccines in its own refrigerated facilities, or are vaccines drop-shipped directly from pharmaceutical manufacturers (e.g., NVRI Vom, Animal Care / Indovax)?
4. **Product Pricing Structure:** What are the baseline retail prices for the 32 inventoried products, and how frequently do prices fluctuate?
5. **Staff Allocation:** Who will be the primary operator of the `+2348139169402` WhatsApp line? What are their official operating hours (e.g., Mon–Sat 8:00 AM – 6:00 PM)?

### Technical & Creative Questions:
6. **Vector Brand Identity:** Does D-AminGrow possess the original vector source file (`.ai`, `.eps`, or `.svg`) for the logo, or must the design team redraw the vector master?
7. **Missing Vaccine Photographs:** When will physical samples of core vaccines (Newcastle, Gumboro, Marek's) be available for product photography?
8. **Corporate Domain Name:** Has `damingrow.com` or `damingrow.ng` been officially registered, or is domain procurement required?
