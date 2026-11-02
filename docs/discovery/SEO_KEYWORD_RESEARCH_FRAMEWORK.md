# D-AminGrow — Technical SEO & Keyword Research Architecture
**Document Ref:** DAG-DISC-006  
**Version:** 1.0.0  
**Research Date:** 2026-10-26  
**Auditor:** Technical SEO Lead & Digital Growth Strategist  
**Status:** Completed & Grounded in Search Evidence  

---

## 1. Growth Strategy & Ambition Framing (Roadmap to 500,000 Visits)

Attracting 500,000 monthly website visits in the West African livestock sector is an ambitious multi-year milestone. To achieve this sustainably without resorting to paid traffic burn, D-AminGrow must execute a **Programmatic Topic Cluster & High-Intent Commercial Architecture**.

### The Traffic Distribution Model:
- **Core Product E-Commerce (15% of Traffic / 70% of Direct Revenue):** High-intent, transactional commercial queries (e.g., "buy day old chicks in lagos", "automatic poultry feeder price nigeria").
- **Interactive Calculators & Decision Tools (25% of Traffic / High Retention):** Utility-driven organic traffic (e.g., "poultry feed consumption calculator", "broiler vaccination schedule pdf").
- **Knowledge Centre & Veterinary Education (60% of Traffic / Top-of-Funnel Authority):** Informational queries addressing acute livestock health crises (e.g., "gumboro symptoms in broilers", "how to cure coccidiosis in poultry without antibiotics"). These visitors convert into buyers of preventative accessories, bio-security equipment, and farm consultation.

---

## 2. Research Methodology & Metric Definitions

To comply with the non-negotiable research rules:
- **No Fabricated Data:** We do not invent arbitrary search volumes (e.g., "82,410 exact searches"). Where external third-party API volume is unverified, search intent and relative demand tiers are derived from observed Google Search Suggest, Google Trends Nigeria data, competitor ranking pages, and regional poultry trade volume.
- **Metric Definitions:**
  - **Search Intent:**  
    - `Transactional (T)`: Immediate purchase intent.  
    - `Commercial Investigation (CI)`: Comparing brands, strains, prices, or equipment specs before buying.  
    - `Informational (I)`: Problem diagnosis, disease treatment, dosage calculation, or farming guides.
  - **Competition / Difficulty Tier:**  
    - `Low`: Minimal authoritative local competition; quick ranking potential with fast, schema-rich Next.js pages.  
    - `Medium`: Domestic competition present (e.g., Afrimash, Farmsquare); requires dedicated topical authority and backlinks.  
    - `High`: Dominated by international sites or heavy aggregators; requires pillar content and programmatic tools.

---

## 3. Thematic Keyword Matrices (9 Core Clusters)

---

### Cluster 1: Day-Old Chick Purchasing & Hatchery Booking

| Query Candidate | Intent | Target Country | Observed Demand Evidence | Competition Tier | Relevant Competitor Pages | Proposed Target Page | Conversion Relevance | Outstanding Questions / Assumptions |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `buy day old chicks in nigeria` | T | Nigeria | Primary commercial query across Nigeria; consistent year-round search volume with peak ahead of festive cycles (Easter, Christmas). | Medium | `afrimash.com/category/livestock/day-old-chicks/` | `/chicks` (Category Page) | **High** | Requires clear indication of weekly booking cycles and delivery hubs. |
| `day old broilers price today in nigeria` | CI | Nigeria | Extremely high daily query frequency on Google Nigeria; drives high daily recurring organic traffic. | Medium | `farmpays.com`, `htsfarms.ng` | `/chicks/broilers` (with Dynamic Market Price Widget) | **High** | Price changes weekly based on hatchery costs; requires CMS price update protocol. |
| `day old pullets for sale` | T | Nigeria / Ghana | High commercial intent from egg-production farmers looking for commercial egg layers (Isa Brown, Shaver). | Low-Med | `afrimash.com/shop/livestock/day-old-chicks/pullets/` | `/chicks/pullets` | **High** | Verify which specific layer breeds D-AminGrow sources consistently. |
| `zartech day old chicks price` | CI | Nigeria | Branded hatchery queries carry immense trust and ready-to-buy intent. | Medium | `htsfarms.ng`, `jiji.ng` | `/chicks/brands/zartech` (Partner Hatchery Landing Page) | **High** | Confirmation required: Does D-AminGrow officially distribute Zartech birds? |
| `amo day old chicks booking` | T | Nigeria | Hatchery-specific query reflecting high farmer loyalty to Amo brand genetics. | Medium | `afrimash.com` | `/chicks/brands/amo` | **High** | Must confirm supply agreements before creating dedicated brand landing pages. |

---

### Cluster 2: Poultry Farming Supplies & Brooding Accessories

| Query Candidate | Intent | Target Country | Observed Demand Evidence | Competition Tier | Relevant Competitor Pages | Proposed Target Page | Conversion Relevance | Outstanding Questions / Assumptions |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `poultry farming equipment in nigeria` | CI | Nigeria | Broad commercial query covering smallholders and new farm startups. | Medium | `farmsquare.ng/farm-equipment/`, `afrimash.com` | `/accessories` (Category Hub) | **High** | Hub page must link clearly to feeders, drinkers, cages, and heating units. |
| `gas brooder heater price in nigeria` | T | Nigeria | High commercial purchase intent during brooding seasons (harmattan / rainy season). | Low | `htsfarms.ng`, local classifieds | `/accessories/gas-brooder-heater` (PDP) | **High** | Directly mapped to `./products/Acessories/Gas brooder.jpeg`. |
| `chick feeding trays price` | T | Nigeria | High-volume consumable equipment bought alongside day-old chicks. | Low | `farmsquare.ng` | `/accessories/chick-feeder-tray` (PDP) | **High** | Directly mapped to `./products/Acessories/chicks feeder.jpeg`. |
| `egg crates wholesale price nigeria` | T | Nigeria | High-frequency repeat commercial search from poultry egg producers. | Low | Local B2B listings | `/accessories/plastic-egg-crates` (PDP) | **Medium** | Directly mapped to `./products/Acessories/egg crates.jpeg`. |
| `live bird transport crates nigeria` | T | Nigeria | Searched by poultry merchants, slaughterhouses, and commercial broiler farmers. | Low | `farmsquare.ng` | `/accessories/poultry-transport-cage` (PDP) | **High** | Directly mapped to `./products/Acessories/birds transfer cage.jpeg`. |

---

### Cluster 3: Veterinary Drugs & Vaccines

| Query Candidate | Intent | Target Country | Observed Demand Evidence | Competition Tier | Relevant Competitor Pages | Proposed Target Page | Conversion Relevance | Outstanding Questions / Assumptions |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `poultry vaccines list and schedule in nigeria` | I / CI | Nigeria | One of the most common informational queries searched by Nigerian poultry farmers. | Low-Med | `animalcare-ng.com`, agricultural blogs | `/knowledge/poultry-vaccination-schedule` | **High (Lead Gen)** | Massive traffic generator; funnels directly into vaccine and syringe sales. |
| `oxytetracycline for poultry dosage` | I | Nigeria / Regional | High search volume; farmers search for exact dosage protocols when respiratory illness strikes. | Low | International vet sites | `/drugs/oxytetracycline-hcl` (PDP + Dosage Guide) | **High** | Directly mapped to `./products/Drugs/oxytet drug.jpeg`. Regulatory disclaimer required. |
| `lasota vaccine for chickens price` | T | Nigeria | Standard Newcastle disease booster vaccine; high repeat local purchase query. | Low | `farmerscentre.com.ng` | `/vaccines/newcastle-lasota` (PDP) | **High** | Requires cold-chain delivery policy warning. |
| `best coccidiosis drug for broilers` | CI | Nigeria / Regional | Farmers looking for effective anticoccidial medications when birds show bloody droppings. | Low-Med | Forum threads, vet blogs | `/knowledge/how-to-treat-coccidiosis` | **High** | Directly links to `cocci-ton drug.jpeg` product page. |
| `cipo zen oral solution veterinary` | T | Nigeria | High-intent product query from farmers with active bacterial infections. | Low | `farmerscentre.com.ng` | `/drugs/cipo-zen` (PDP) | **High** | Directly mapped to `./products/Drugs/cipo zen drug.jpeg`. |

---

### Cluster 4: Poultry & Livestock Capital Equipment

| Query Candidate | Intent | Target Country | Observed Demand Evidence | Competition Tier | Relevant Competitor Pages | Proposed Target Page | Conversion Relevance | Outstanding Questions / Assumptions |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `poultry battery cage price in nigeria` | T / CI | Nigeria | Extremely high-ticket commercial query (capital equipment ₦500k–₦5m+). | Medium | `afrimash.com`, `htsfarms.ng` | `/accessories/automated-battery-cage` | **Very High** | Directly mapped to `./products/Acessories/automated battery cage.jpeg`. |
| `chicken defeathering machine price in nigeria` | T | Nigeria | Commercial processors and slaughterhouses searching for automated pluckers. | Low | `farmsquare.ng`, local machinery importers | `/accessories/chicken-defeathering-machine` | **High** | Directly mapped to `./products/Acessories/defeathering machine.jpeg`. |
| `automatic nipple drinking system for poultry` | CI | Nigeria | Searched by modernizing farms upgrading from manual drinkers to reduce labor and disease. | Low | `htsfarms.ng` | `/accessories/poultry-nipple-drinker-system` | **High** | Directly mapped to `./products/Acessories/nipple drinker.jpeg`. |

---

### Cluster 5: Poultry Management & Biosecurity

| Query Candidate | Intent | Target Country | Observed Demand Evidence | Competition Tier | Relevant Competitor Pages | Proposed Target Page | Conversion Relevance | Outstanding Questions / Assumptions |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `how to brood day old chicks in nigeria` | I | Nigeria | Foundational informational query for every entering poultry farmer. | Low | `afrimash.com/blog/`, YouTube | `/knowledge/complete-brooding-guide-for-beginners` | **High (Organic Inflow)** | Guides reader step-by-step; embeds gas brooder, chick feeder tray, and anti-stress vitamins. |
| `poultry farm biosecurity protocol` | I | Nigeria / Regional | Commercial farm managers and investors seeking technical disease prevention. | Low | Academic papers, FAO publications | `/knowledge/poultry-biosecurity-checklist` | **Medium** | Funnels into farm accessories, footbaths, and disinfectants. |
| `how to prevent coccidiosis in deep litter` | I | Nigeria | Practical problem-solving search for small and medium poultry producers. | Low | International blogs | `/knowledge/coccidiosis-prevention-litter-management` | **High** | Educational content linking directly to drinker hygiene and anticoccidials. |

---

### Cluster 6: Livestock Health Education & Disease Control

| Query Candidate | Intent | Target Country | Observed Demand Evidence | Competition Tier | Relevant Competitor Pages | Proposed Target Page | Conversion Relevance | Outstanding Questions / Assumptions |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `gumboro disease symptoms and treatment` | I | Nigeria / Regional | High anxiety crisis search when mortality spikes in 3-6 week old flocks. | Low-Med | Agricultural forums | `/knowledge/gumboro-ibd-symptoms-prevention` | **High** | Positions D-AminGrow as authority; promotes preventative IBD vaccines and oral rehydration. |
| `crds in broilers treatment` | I | Nigeria | Chronic Respiratory Disease (CRD) is endemic across Nigerian poultry farms. | Low | Vet supply blogs | `/knowledge/crd-poultry-treatment-guide` | **High** | Links directly to Norflogen and Oxytetracycline product listings. |
| `fowl pox in chickens treatment and vaccine` | I | Nigeria / Regional | Recurring viral disease causing scabs on comb and wattles. | Low | Vet extension portals | `/knowledge/fowl-pox-prevention-wing-web` | **High** | Links to Fowl Pox vaccine and wing-web needle applicator. |

---

### Cluster 7: Farm Consultation & Technical Services

| Query Candidate | Intent | Target Country | Observed Demand Evidence | Competition Tier | Relevant Competitor Pages | Proposed Target Page | Conversion Relevance | Outstanding Questions / Assumptions |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `poultry farm consultant in nigeria` | T | Nigeria | High commercial value; searched by diaspora investors and corporate farms. | Low | LinkedIn profiles, general consulting sites | `/services/poultry-farm-consultation` | **Very High** | Leads directly to high-margin retained farm advisory contracts. |
| `livestock farm setup cost in nigeria` | CI | Nigeria | Investors researching feasibility before committing capital. | Low-Med | Nairaland forum threads | `/services/farm-setup-feasibility-calculator` | **High** | Feasibility tool capturing lead contact details and generating turnkey equipment quotes. |
| `poultry house design and construction nigeria` | CI | Nigeria | Searched by farmers planning new pen construction or battery cage houses. | Low | Architecture sites | `/services/poultry-housing-construction` | **High** | Direct upsell for battery cages and ventilation equipment. |

---

### Cluster 8: Wholesale & Commercial Farming Supplies

| Query Candidate | Intent | Target Country | Observed Demand Evidence | Competition Tier | Relevant Competitor Pages | Proposed Target Page | Conversion Relevance | Outstanding Questions / Assumptions |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `wholesale veterinary medicine suppliers in nigeria` | T | Nigeria | B2B input dealers, agro-vets, and large cooperative farms. | Low | B2B directories | `/wholesale` (B2B Distributor Portal) | **Very High** | B2B inquiry form with carton and pallet bulk pricing. |
| `bulk day old chicks distributor lagos ibadan` | T | Nigeria | Regional B2B buyers purchasing 1,000 to 10,000 chicks per batch. | Low | Hatchery agent pages | `/chicks/wholesale-booking` | **Very High** | Direct WhatsApp routing to commercial sales desk. |

---

### Cluster 9: Regional & Country-Specific Demand (West Africa Corridor)

| Query Candidate | Intent | Target Country | Observed Demand Evidence | Competition Tier | Relevant Competitor Pages | Proposed Target Page | Conversion Relevance | Outstanding Questions / Assumptions |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `day old chicks suppliers in accra ghana` | CI | Ghana | Significant regional cross-border poultry interest along the Lagos–Accra corridor. | Low | Local Ghanaian hatcheries | `/international/ghana-livestock-supplies` | **Medium** | Must verify export logistics and SPS permits before active promotion. |
| `poultry equipment supplier benin republic` | CI | Benin / Togo | French-speaking neighboring markets with limited domestic equipment manufacturing. | Low | European exporters | `/international/west-africa-livestock-equipment` | **Medium** | Requires French language landing page in Phase 3. |

---

## 4. Technical SEO Architecture Specifications

To capture and convert this organic search volume, the Next.js platform must implement the following technical SEO standards:

### 1. Dynamic Server-Side Rendering (SSR) & Incremental Static Regeneration (ISR)
- All catalog, product, and knowledge base pages must be rendered server-side on Cloudflare Workers edge nodes.
- **No Client-Only Renders for Search Pages:** Zero reliance on client-side React hydration for critical SEO content. Headings, descriptions, specs, and structured data must exist in the raw HTML payload delivered to Googlebot.

### 2. Comprehensive JSON-LD Structured Data Schema
The platform will emit standard Schema.org structured data on every page type:
- **Product Detail Pages:** `Product`, `Offer`, `AggregateRating`, `Brand`, `MerchantReturnPolicy`.
- **Knowledge Articles:** `Article`, `Author` (with accredited Veterinary Doctor profile), `Publisher`, `FAQPage`.
- **Global Layout:** `Organization`, `WebSite` (with `SearchAction` for Sitelinks search box), `BreadcrumbList`.

### 3. Open Graph & Social Cards
- Automated dynamic OG image generation using Next.js `@vercel/og` or Cloudflare Worker Canvas, rendering product price, category badge, and D-AminGrow logo for social sharing on WhatsApp, Twitter, and Facebook.
