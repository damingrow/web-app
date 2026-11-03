# D-AMINGROW — SEO & CONTENT GROWTH SPECIFICATION
## Phase 00B: 500,000 Monthly Organic Traffic Strategy, E-E-A-T Architecture & Publishing Engine
**Verification Date:** November 3, 2026  
**Auditor:** Principal Technical SEO Architect & Content Strategy Director  
**Target Repository:** `/Users/mac/Projects/Damingrow`  

---

## 1. Growth Strategy: Achieving 500,000 Monthly Farmers

To establish D-AminGrow as the foremost agricultural portal across Nigeria and West Africa, the platform must transition from simple keyword targeting to **topical authority dominance**. 

In the agricultural and veterinary sector, content directly impacts animal livability and farm capital. Consequently, search engines apply rigorous **E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)** standards. Mass-produced, superficial AI content will result in algorithmic penalties. Success requires actionable, locally verified, veterinary-reviewed guides addressing the specific challenges of tropical poultry farming in Nigeria.

```
       ┌─────────────────────────────────────────────────────────────┐
       │              TOPICAL AUTHORITY HUB ARCHITECTURE             │
       └──────────────────────────────┬──────────────────────────────┘
                                      │
     ┌───────────────┬────────────────┼───────────────┬──────────────┐
     ▼               ▼                ▼               ▼              ▼
[Pillar 1:      [Pillar 2:       [Pillar 3:      [Pillar 4:     [Pillar 5:
Day-Old Chicks] Disease Control] Nutrition/FCR]  Farm Setup]    Calculators]
     │               │                │               │              │
     └───────────────┴────────────────┼───────────────┴──────────────┘
                                      │
                                      ▼
                        [HIGH-INTENT CONVERSION ENGINE]
              (WhatsApp Consultation | Chick Booking Form | Price Inquiry)
```

---

## 2. Six Interconnected Content Authority Pillars

| Pillar ID | Content Pillar | Core Farmer Search Queries (Nigeria/Africa) | Cornerstone Guide Target |
|---|---|---|---|
| **P-1** | **Day-Old Chicks & Sourcing** | • "Price of day old chicks in Nigeria today"<br>• "Best broiler breed for fast growth"<br>• "How to brood day old chicks in rainy season"<br>• "Amo vs Zartech vs Chi broiler comparison" | *The Definitive Nigerian Day-Old Chick Brooding & Sourcing Handbook (2026 Edition)* |
| **P-2** | **Vaccination & Disease Control** | • "Newcastle disease symptoms and treatment in broilers"<br>• "Gumboro vaccine schedule for chickens in Nigeria"<br>• "How to treat bloody poop in chickens (Coccidiosis)"<br>• "Infectious coryza swollen head cure" | *The Commercial Poultry Vaccination & Biosecurity Master Protocol (NAFDAC Aligned)* |
| **P-3** | **Feed Management & FCR Optimization** | • "Broiler feed intake per week in kg"<br>• "How to reduce feed conversion ratio in broilers"<br>• "Formulating broiler starter feed with local maize & soya"<br>• "Layer feed formulation for 95% egg production" | *The Nigerian Poultry Nutrition & Feed Margin Optimization Manual* |
| **P-4** | **Farm Setup & Housing Equipment** | • "Cost of building 1,000 capacity poultry pen in Nigeria"<br>• "Battery cage vs deep litter system profit comparison"<br>• "How many drinkers and feeders for 500 broilers"<br>• "Gas brooder vs charcoal pot brooding cost" | *Commercial Poultry House Construction & Equipment Sizing Blueprint* |
| **P-5** | **Point-of-Lay & Egg Production** | • "How to manage point of lay birds before first egg"<br>• "Why are my layers dropping egg production?"<br>• "Brown layer vs white layer profitability in Nigeria"<br>• "Peak egg production duration and molting" | *Commercial Layer Farm Management: From 16 Weeks to 90 Weeks of Lay* |
| **P-6** | **Poultry Business & Profitability** | • "Is poultry farming profitable in Nigeria in 2026?"<br>• "Profit on 500 broilers after 6 weeks"<br>• "Turkey rearing profit and Christmas market guide"<br>• "Managing heat stress during dry season in Kano/Oyo" | *The Commercial Poultry Farm Financial Model & Risk Management Strategy* |

---

## 3. Four Content Quality Classifications & Review Workflows

To preserve scientific accuracy and prevent harmful veterinary advice, all published material must pass through defined review tiers:

```
[Tier 1: General Agriculture] ---> Staff Writer ---> Content Editor ---> [Published]
[Tier 2: Technical Husbandry] ---> Senior Writer ---> Field Specialist ---> [Published]
[Tier 3: Veterinary & Health] ---> Veterinary Writer ---> Registered Vet (VCN#) ---> [Published]
[Tier 4: Product Commercials] ---> Product Specialist ---> Sales Director ---> [Published]
```

1. **Tier 1: General Agricultural Education:** Overview of poultry farming, housing styles, industry news. Requires standard editorial approval.
2. **Tier 2: Technical Poultry Husbandry:** Stocking densities, brooding temperature curves, ventilation physics. Requires verification by experienced farm management staff.
3. **Tier 3: Veterinary & Animal Health (Strict Gate):** Specific drug indications, antibiotic withdrawal times, vaccine administration, post-mortem signs. **MANDATORY:** Must be authored or formally reviewed by a veterinarian registered with the **Veterinary Council of Nigeria (VCN)** with registration number displayed on the article.
4. **Tier 4: Commercial Product & Service Information:** Cold-chain logistics, packaging rules (`50+1`), dispatch arrangements, booking conditions. Requires sales operations approval.

---

## 4. Technical SEO & JSON-LD Structured Data Specification

### 4.1 Product Schema for Price-on-Request Items
Standard ecommerce schema fails on price-on-request products because Google flags `$0` or missing price fields. The platform must implement the following compliant schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Commercial Day-Old Broiler Chicks",
  "image": "https://damingrow.com/products/Chicks/day%20old%20broiler.jpeg",
  "description": "Premium commercial day-old broiler chicks from biosecure certified parent stock hatcheries in Nigeria.",
  "sku": "DOC-BRL-01",
  "brand": {
    "@type": "Brand",
    "name": "D-AminGrow"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "NGN",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31",
    "description": "Dynamic market rate — current confirmed price available on request via official WhatsApp desk."
  }
}
```

### 4.2 Veterinary Guide & FAQPage Schema
Every educational article must bundle structured FAQPage schema to capture Google Search "People Also Ask" rich snippets:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "At what age should Newcastle LaSota vaccine be given to broilers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Newcastle Disease LaSota vaccine is typically administered as an active booster between Day 14 and Day 21 of life, following a primary mild B1 vaccination at Day 1–7."
      }
    }
  ]
}
```

### 4.3 LocalBusiness / AgroAlliedEnterprise Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D-AminGrow Agro-Allied Services",
  "image": "https://damingrow.com/logo.png",
  "telephone": "+2348139169402",
  "email": "info@damingrow.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NG",
    "addressRegion": "Oyo State"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "08:00",
    "closes": "18:00"
  }
}
```

---

## 5. 90-Day Editorial Publishing Programme

| Phase | Duration | Output Target | Primary Focus & Milestones |
|---|---|---|---|
| **Phase A: Foundation** | Days 1–30 | 4 Cornerstone Guides<br>8 Supporting Articles<br>4 Service Landing Enhancements | • Publish the Brooding Master Manual<br>• Publish Newcastle & Gumboro schedules<br>• Link 5 calculators to high-intent guides<br>• Verify all 72 existing URLs indexed in Search Console |
| **Phase B: Authority** | Days 31–60 | 4 Cornerstone Guides<br>12 Supporting Articles<br>4 Downloadable Farm Templates | • Publish Commercial Layer Economics<br>• Target state-level search terms (Kano, Ibadan, Lagos, Enugu poultry supply)<br>• Add downloadable PDF brooding temperature charts<br>• Launch WhatsApp weekly chick rate subscriber channel |
| **Phase C: Scale** | Days 61–90 | 4 Cornerstone Guides<br>12 Supporting Articles<br>6 Clinical Case Studies | • Publish Turkey & Waterfowl management series<br>• Publish Feed Formulation troubleshooting guides<br>• Cross-link articles to live Chick Booking Engine<br>• Expand into French/West African regional keywords |

---

## 6. Non-Vanity Performance Measurement

To ensure traffic growth translates into commercial revenue rather than empty page views:

```
                  ORGANIC TRAFFIC FUNNEL
               [500,000 Monthly Impressions]
                            │
                            ▼
               [40,000 Engaged Farm Readers]
              (Reading Guides & Using Calculators)
                            │
                            ▼
               [6,000 High-Intent Actions]
         (Click to WhatsApp / Booking Form Open)
                            │
                            ▼
             [1,200 Confirmed Orders & Bookings]
               (Chicks, POL, Vaccines, Drugs)
```

The SEO dashboard in Section 10 of the Admin portal must monitor:
1. **Non-Branded Clicks:** Traffic originating from generic agricultural searches (e.g., "gumboro vaccine protocol") vs branded searches ("damingrow").
2. **Calculator Engagement Rate:** Number of farmers completing calculations and clicking "Request Brooder Equipment" or "Order Vaccines".
3. **WhatsApp Deep-Link Conversions:** Clicks on pre-filled `wa.me` links originating from educational article footers.
