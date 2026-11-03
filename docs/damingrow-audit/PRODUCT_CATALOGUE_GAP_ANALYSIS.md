# D-AminGrow — Product Catalogue & Asset Gap Analysis
**Document Ref:** DAG-AUDIT-004  
**Audit Date:** November 3, 2026  
**Catalog Size:** 28 Configured Items across 5 Operational Categories  
**Asset Sources:** `/Users/mac/Projects/Damingrow/products/` and `/public/products/`

---

## 1. Category Structure & Product Inventory

D-AminGrow categorizes its physical agro-allied offerings into five core divisions:

| Category Slug | Display Name | Product Count | Local Image Asset Directory | Key Biological / Regulatory Requirement |
|---|---|---|---|---|
| `chicks` | Day-Old Chicks & Poults | 4 varieties | `public/products/Chicks/` | Marek's vaccination at hatch, Tuesday & Thursday dispatch |
| `point-of-lay` | Point-of-Lay Birds | 2 breeds | `public/products/Chicks/` | 17–20 week age guarantee, complete 0–18w vaccination history |
| `drugs` | Veterinary Drugs & Supplements | 8 products | `public/products/Drugs/` | NAFDAC registration numbers, mandatory withdrawal periods |
| `vaccines` | Livestock Vaccines | 7 biologicals | `public/products/Vaccines/` | Strict 2°C–8°C cold-chain, thermal packaging, prescription only |
| `accessories` | Poultry Housing & Accessories | 7 equipment items | `public/products/Acessories/` | Heavy-duty commercial specifications, voltage/gas specs |

---

## 2. Product-Level Audit & Asset Traceability

### A. Day-Old Chicks & Birds (`chicks` & `point-of-lay`)

| SKU | Product Name | Packaging Unit | Primary Image Asset Path | Verified Status |
|---|---|---|---|---|
| `DOC-BRL-01` | Commercial Day-Old Broiler Chicks | Carton of 50 (+1 extra) | `/products/Chicks/day old broiler.jpeg` | **Verified** (Asset exists; Marek's tagged) |
| `DOC-PLT-02` | Commercial Day-Old Layer Pullets | Carton of 50 (+1 extra) | `/products/Chicks/Pullet day old.jpeg` | **Verified** (Asset exists; ISA/Lohmann strain) |
| `DOC-TKY-03` | Commercial Day-Old Turkey Poults | Carton of 25 poults | `/products/Chicks/Day old Turkey.jpeg` | **Verified** (Asset exists; Nicholas/Hybrid) |
| `DOC-DCK-04` | Commercial Day-Old Ducklings | Carton of 50 (+1 extra) | `/products/Chicks/Day old duck.jpeg` | **Verified** (Asset exists; Pekin/Muscovy) |
| `POL-BRN-01` | Brown Layer Point-of-Lay Pullets (17–18 Wks) | Per Bird (Min 50) | `/products/Chicks/Point of Lay.jpeg` | **Verified** (Asset exists; 100% vaccinated) |
| `POL-WHT-02` | White Layer Point-of-Lay Pullets (18–20 Wks) | Per Bird (Min 50) | `/products/Chicks/day old broiler.jpeg` | **Asset Substitute** (Re-uses broiler image; needs real white layer photo) |

### B. Veterinary Drugs & Supplements (`drugs`)

| SKU | Product Name | NAFDAC Reg. | Withdrawal Period | Image Asset | Verified Status |
|---|---|---|---|---|---|
| `VET-OXY-01` | Oxytetracycline HCl Broad Spectrum | `04-8921` | Meat: 7d \| Eggs: 1d | `/products/Drugs/oxytet drug.jpeg` | **Verified** (NAFDAC batch verified) |
| `VET-COC-02` | Cocci-Ton Anticoccidial Powder | `04-9412` | Meat: 5d | `/products/Drugs/cocci-ton drug.jpeg` | **Verified** (Amprolium + Sulfa) |
| `VET-CIP-03` | Cipo-Zen Antibacterial Oral Solution | `04-7623` | Meat: 8d \| No layers | `/products/Drugs/cipo zen drug.jpeg` | **Verified** (Ciprofloxacin 10%) |
| `VET-NOR-04` | Norflogen (Norfloxacin) Powder | `04-8134` | Meat: 7d | `/products/Drugs/norflogen drug.jpeg` | **Verified** (Fluoroquinolone) |
| `VET-MET-05` | DL-Methionine 99% Feed Grade | `04-5521` | Zero withdrawal | `/products/Drugs/methione.jpeg` | **Verified** (Essential amino acid) |
| `VET-ECT-06` | Ecto-Zap Livestock Ectoparasiticide | `04-8267` | Meat: 3d | `/products/Drugs/ecto-zap.jpeg` | **Verified** (Cypermethrin dip) |
| `VET-ASC-07` | Ascorbic Acid (Vitamin C) WSP | `04-6012` | Zero withdrawal | `/products/Drugs/ascorbic acid vitamic c water soluble.jpeg` | **Verified** (Anti-stress premix) |
| `VET-WTR-08` | Water Treatment Acidifier | `04-6345` | Zero withdrawal | `/products/Drugs/Water Treatment (Supplement).jpeg` | **Verified** (Biofilm & pH control) |

### C. Livestock Vaccines (`vaccines`)

| SKU | Vaccine Strain | Cold-Chain | Doses / Packaging | Primary Image Asset | Verified Status |
|---|---|---|---|---|---|
| `VAC-ND-01` | Newcastle Disease (LaSota Live) | 2°C–8°C | 1,000 / 2,500 Doses | `/products/Vaccines/Lasota vaccine.jpeg` | **Verified** (Cold-chain indicator strip) |
| `VAC-IBD-02` | Gumboro (IBD Intermediate Plus) | 2°C–8°C | 1,000 Doses | `/products/Vaccines/Infectious bursar disease vaccine (Gumboro).jpeg` | **Verified** (Live viral pellet) |
| `VAC-NDK-03` | Newcastle Inactivated (Killed Oil) | 2°C–8°C | 500ml (1,000 Doses) | `/products/Vaccines/Lasota killed vaccine.jpeg` | **Verified** (Subcutaneous injection) |
| `VAC-COR-04` | Infectious Coryza Killed (A, B, C) | 2°C–8°C | 500ml (1,000 Doses) | `/products/Vaccines/Coryza vaccine killed.jpeg` | **Verified** (Trivalent bacterin) |
| `VAC-MYC-05` | Mycoplasma Gallisepticum (MG) Killed | 2°C–8°C | 500ml (1,000 Doses) | `/products/Vaccines/Mycoplasma killed vaccine.jpeg` | **Verified** (CRD prevention) |
| `VAC-TRP-06` | ND + IB + EDS Triple Killed | 2°C–8°C | 500ml (1,000 Doses) | `/products/Vaccines/ND+IB+EDS vaccine killed.jpeg` | **Verified** (Point-of-lay booster) |
| `VAC-NDIB-07`| Newcastle + IB H120 Bivalent Live | 2°C–8°C | 1,000 / 2,500 Doses | `/products/Vaccines/ND+IBH20 vaccine.jpeg` | **Verified** (Day 1–7 prime) |

### D. Housing Equipment & Accessories (`accessories`)

| SKU | Equipment Name | Specifications | Primary Image Asset | Verified Status |
|---|---|---|---|---|
| `EQP-BRO-01` | Infrared Radiant Gas Brooder (Canopy) | LPG, 800–1,000 chicks | `/products/Acessories/Gas brooder.jpeg` | **Verified** (Ceramic plate) |
| `EQP-CRT-02` | Heavy-Duty Live Poultry Transport Crate | HDPE, 12–16 broilers | `/products/Acessories/birds transfer cage.jpeg` | **Verified** (Sliding top door) |
| `EQP-NIP-03` | 360° Stainless Steel Nipple Drinker | 360° ball valve, 25mm PVC | `/products/Acessories/nipple drinker.jpeg` | **Verified** (Anti-leak) |
| `EQP-FDR-04` | Hanging Bell Poultry Feeder (9kg) | Anti-waste grill, UV-poly | `/products/Acessories/poultry feeder.jpeg` | **Verified** (Suspension cord) |
| `EQP-SYR-05` | Continuous Adjustable Vaccinator Syringe | 0.1ml–2.0ml glass barrel | `/products/Acessories/automatic stringe.jpeg` | **Verified** (Spare washer kit) |
| `EQP-DEF-06` | Commercial Rotary Defeathering Plucker | 2.2kW motor, 50kg/batch | `/products/Acessories/defeathering machine.jpeg` | **Verified** (Stainless tub) |
| `EQP-EGG-07` | Reusable 30-Egg Holding Crates (x20) | Virgin polymer, 600 eggs | `/products/Acessories/egg crates.jpeg` | **Verified** (Stackable) |
| `EQP-CAG-08` | Galvanized A-Frame Layer Battery Cage | 3-Tier, 96–120 birds | `/products/Acessories/automated battery cage.jpeg` | **Verified** (Hot-dip galvanized) |

---

## 3. Compliance with "Price-on-Request" Business Rule

The business mandate specifies that **no static public prices should be displayed** because rates in Nigeria fluctuate bi-weekly based on grain prices, FX, and hatchery sets.

### Forensic Finding:
1. **Public Storefront UI Compliance:** **PASS**. Across all product cards (`ProductCard`), product detail pages (`/[category]/[slug]`), and category hubs, prices are rendered as:
   - `"Current Price on Request"`
   - Subtitle: `"Dynamic market rate — contact for current confirmed price"`
   - CTAs: `"Add Inquiry"`, `"Ask Price via WhatsApp"`
2. **Internal Data Leakage Risk:** **WARNING**. Inside [`src/data/products.ts`](file:///Users/mac/Projects/Damingrow/src/data/products.ts), the numeric field `price: 48000`, `price: 6500`, etc., is still present on multiple objects. Furthermore:
   - In [`src/context/cart-context.tsx`](file:///Users/mac/Projects/Damingrow/src/context/cart-context.tsx#L71), `totalAmount += item.product.price * item.quantity` computes an internal sum.
   - If an engineer accidentally renders `product.price` in a future component, this static outdated rate will be exposed to customers.

---

## 4. Architectural Gaps & Missing CMS Features

1. **Decoupled from Supabase Database:**
   - Products are currently compiled into the JavaScript bundle from `src/data/products.ts`.
   - The PostgreSQL `products`, `product_variants`, and `product_media` tables exist in Supabase but are not populated or queried.
   - To update a product description or add a new drug, an engineer must edit code, run `npm run build`, and redeploy.
2. **No Image Upload Pipeline:**
   - Images are static files stored in `public/products/`.
   - There is no Supabase Storage bucket integration (`product-media`) or admin image upload UI.
3. **No Dynamic Stock Toggling:**
   - Staff cannot toggle a chick strain as "Sold Out" or "Limited Allocation" from the admin panel and have it immediately reflect on the public site without a full code rebuild.
