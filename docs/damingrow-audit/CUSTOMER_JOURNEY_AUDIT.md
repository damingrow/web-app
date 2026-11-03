# D-AminGrow — Customer Journey & Conversion Friction Audit
**Document Ref:** DAG-AUDIT-013  
**Audit Date:** November 3, 2026  
**Methodology:** Full-funnel tracing across 8 realistic Nigerian farmer customer scenarios  
**Evaluation Standard:** Trust, Clarity, Navigation, Mobile Usability, Conversion Psychology, and Backend Execution

---

## 1. Scenario 1: Beginner Starting a 500-Bird Broiler Farm

- **Customer Profile:** First-time poultry farmer in Osun State with capital to raise 500 broilers. Needs guidance on housing space, brooding equipment, feed, and chick sourcing.
- **Journey Steps:**
  1. Lands on Homepage -> clicks "Brooder Space Calculator" (`/calculators/brooder`).
  2. Inputs 500 birds: Calculator outputs 33.3 m² floor space, 1 Gas Brooder canopy, 10 bell feeders, 10 drinkers, and a day-by-day brooding temperature schedule (33°C down to 21°C).
  3. Clicks "Day-Old Chicks" link -> navigates to `/chicks`.
  4. Interacts with the Chick Booking Engine: selects "Commercial Broilers", "Amo Farm", 10 cartons (510 chicks), "Osun State", "Osogbo", and "Tuesday Morning".
  5. Clicks "Book Chicks via WhatsApp": A pre-filled WhatsApp message opens with reference code.
- **Friction & Gaps Identified:**
  - *Positive:* Excellent educational transition from calculator to chick booking.
  - *Friction:* The calculator does not provide an integrated "Starter Equipment Kit" button (1 Brooder + 10 Feeders + 10 Drinkers + 10 Cartons Broilers) to add the full setup to the inquiry bag in one click.
  - *Backend Gap:* If the user does not open WhatsApp, the booking request is lost because `/api/enquiries` fails to persist.

---

## 2. Scenario 2: Commercial Farmer Reserving 2,000 Pullet Chicks

- **Customer Profile:** Experienced commercial egg producer in Oyo State needing 40 cartons (2,040 chicks) of ISA Brown layer pullets for a planned pen turnaround.
- **Journey Steps:**
  1. Lands on `/chicks` directly via Google search.
  2. Uses the booking engine to select "Layer Pullets (ISA Brown)", 40 cartons, "Oyo State", "Ibadan".
  3. Form displays: "Estimated chicks: 2,040 chicks (Includes 40 bonus chicks)".
  4. Hits "Book Chicks via WhatsApp".
- **Friction & Gaps Identified:**
  - *Friction:* An enterprise farmer buying 40 cartons wants to see hatchery booking lead times (e.g., "ISA Brown requires 2–3 weeks advance reservation"). This lead-time notice is currently absent from the UI.
  - *Backend Gap:* There is no automatic tier classification (`vip_commercial`) in the backend to alert senior account managers.

---

## 3. Scenario 3: Urgent Vaccine Order with Cold-Chain Requirements

- **Customer Profile:** Farm manager in Kaduna State needing 5 vials (5,000 doses) of Newcastle Disease LaSota vaccine and 2 vials of Gumboro Intermediate Plus for upcoming Day 14 and Day 21 vaccinations.
- **Journey Steps:**
  1. Navigates to `/vaccines`.
  2. Sees the prominent "2°C–8°C Cold-Chain Guaranteed" badge and storage protocol.
  3. Locates "Newcastle Disease (LaSota)" and "Gumboro (IBD Intermediate Plus)".
  4. Clicks "Add Inquiry" on both products -> floating inquiry bag shows "2 items listed".
  5. Opens Cart Drawer -> clicks "Submit Inquiry for Today's Price".
  6. Fills in delivery destination (Kaduna) and clicks submit -> WhatsApp opens with both biologicals listed.
- **Friction & Gaps Identified:**
  - *Positive:* Cold-chain trust cues are prominent and reassuring.
  - *Friction:* The user is not asked upfront if they have an active ice-chest or cold-box ready for motor park depot pickup.

---

## 4. Scenario 4: Farm Owner Facing Sudden Mortality (Emergency Autopsy)

- **Customer Profile:** Broiler farmer in Ogun State experiencing 40 dead birds over 48 hours with bloody droppings and gasping. Panicked and needs immediate technical assistance.
- **Journey Steps:**
  1. Searches symptoms -> lands on `/calculators/symptom-checker`.
  2. Selects "Bloody / Reddish Droppings", "Severe Depression", "Mortality Spike".
  3. Triaging Engine flags: **High Probability: Coccidiosis (Caecal)**. Displays typical post-mortem lesions (swollen caeca, clotted blood cores) and recommended active ingredients (Amprolium + Sulfaquinoxaline).
  4. Clicks the pulsing red "Veterinary SOS Dispatch" button.
  5. Form pre-fills WhatsApp message: `🚨 *URGENT FLOCK HEALTH TRIAGE* — Suspected Coccidiosis. Need technical intervention.`
- **Friction & Gaps Identified:**
  - *Positive:* Outstanding clinical triaging UX; provides immediate reassurance and directs straight to veterinary help.
  - *Backend Gap:* Does not trigger an automated SMS/alert to the on-call D-AminGrow veterinarian; relies on staff reading WhatsApp.

---

## 5. Scenario 5: Investor Planning a 10,000-Bird Commercial Layer Farm

- **Customer Profile:** High-net-worth investor in Lagos acquiring 5 acres in Epe to construct a modern commercial layer farm.
- **Journey Steps:**
  1. Lands on `/services/consultation`.
  2. Reads the 5 advisory areas (pen construction blueprints, ventilation, financial modeling).
  3. Clicks "Book Consultation" -> opens WhatsApp message.
- **Friction & Gaps Identified:**
  - *Friction:* High-net-worth investors often prefer an enterprise consultation intake form on the website (requesting site address, land size, timeline, and investment budget) with an option to schedule a scheduled Zoom discovery call, rather than just raw WhatsApp chat.

---

## 6. Scenario 6: Beginner Farmer Seeking Structured Practical Training

- **Customer Profile:** Young graduate in Abuja looking for hands-on poultry farming training and biosecurity certification.
- **Journey Steps:**
  1. Explores navigation -> finds Knowledge Centre (`/knowledge`).
  2. Reads articles on brooding, vaccination schedules, and biosecurity checklists.
- **Friction & Gaps Identified:**
  - *Gap:* D-AminGrow offers consultation, but does not currently feature a dedicated `/training` or `/masterclass` page offering physical or virtual cohort workshops.

---

## 7. Scenario 7: Farmer Comparing Point-of-Lay vs. Day-Old Chicks

- **Customer Profile:** Smallholder in Ekiti State with ₦1.5M capital deciding whether to buy day-old chicks and brood for 18 weeks or buy point-of-lay birds.
- **Journey Steps:**
  1. Visits `/point-of-lay`.
  2. Reviews the "POL vs DOC Comparison Table" comparing rearing risk, time to first egg, vaccination responsibility, and capital outlay.
  3. Reviews the 0–18 week vaccination schedule table.
  4. Clicks "Ask Our Advisory Desk" to seek guidance on cage requirements.
- **Friction & Gaps Identified:**
  - *Positive:* Excellent comparative clarity; addresses the core dilemma of egg producers directly.

---

## 8. Scenario 8: Biosecurity Officer Reviewing Water Sanitation Standards

- **Customer Profile:** Technical farm supervisor checking borehole water chlorination and waterline acidification protocols.
- **Journey Steps:**
  1. Searches "Poultry water sanitation acidifier Nigeria" -> lands on `/knowledge/poultry-water-quality-testing-sanitation-nigeria`.
  2. Reads technical advice on target water pH (5.5–6.2) and biofilm removal.
  3. Embedded CTA links to the "Water Treatment Acidifier" product in the catalog.
- **Friction & Gaps Identified:**
  - *Positive:* Flawless educational content-to-product contextual bridge.
