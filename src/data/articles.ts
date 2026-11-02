export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Disease Management' | 'Brooding & Housing' | 'Immunology & Vaccines';
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
  };
  summary: string;
  content: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedProductSlugs: string[];
}

export const ARTICLES: ArticleItem[] = [
  {
    id: 'art-001',
    slug: 'poultry-vaccination-schedule-nigeria',
    title: 'Complete Poultry Vaccination Schedule in Nigeria: Broilers & Layers Timetable',
    subtitle: 'A clinical day-by-day immunization timetable designed for the Nigerian epidemiological zone.',
    category: 'Immunology & Vaccines',
    readTime: '6 min read',
    publishedDate: '2026-10-28',
    author: {
      name: 'Dr. K. A. Adeleke, DVM',
      role: 'Principal Veterinary Advisory Lead',
    },
    summary:
      'Viral diseases such as Newcastle, Gumboro (IBD), and Marek’s pose catastrophic risks to poultry operations. This comprehensive schedule details correct timing, strains, and water administration protocols for maximum antibody titers.',
    content: `
### Why Vaccination Timing Is Non-Negotiable

In tropical poultry environments, maternal antibodies protect chicks during the first week of life but gradually wane. If a vaccine is administered too early, circulating maternal antibodies neutralize the vaccine virus; if administered too late, field challenge strains infect unprotected birds.

Following a calibrated schedule ensures that active immunization begins exactly when passive maternal protection declines.

---

### Key Vaccine Protocols in Nigeria

#### 1. Marek's Disease (Day 1 at Hatchery)
Marek’s disease causes paralysis, visceral tumors, and high mortality in growing birds. In Nigeria, commercial day-old chicks must be pre-vaccinated at the hatchery with HVT (Herpesvirus of Turkeys) via subcutaneous neck injection. Always demand confirmation of Marek’s vaccination from your day-old chick distributor.

#### 2. Newcastle Disease (Day 7 Prime & Day 24 Booster)
Newcastle disease is caused by virulent avian paramyxovirus-1. In Nigeria, the lentogenic Hitchner B1 or LaSota strains are used:
- **Day 7:** Hitchner B1 or LaSota prime in clean, unchlorinated drinking water.
- **Day 24:** LaSota booster to sustain humoral immunity through market slaughter age (6–8 weeks).

#### 3. Infectious Bursal Disease / Gumboro (Day 10–12 & Day 18–20)
Due to endemic very virulent IBD (vvIBD) strains across Nigerian poultry belts, **Intermediate Plus** strains (such as 228E or equivalent) are recommended over mild strains to break through residual maternal antibody levels.

---

### Crucial Drinking-Water Administration Rules

1. **Chlorine Neutralization:** Chlorine kills live freeze-dried vaccine viruses. Always add **2g of skimmed milk powder per litre** of water 20 minutes before dissolving the vaccine. The milk proteins bind and neutralize chlorine.
2. **Water Deprivation (Thirsting):** Deprive birds of drinking water for **1.5 to 2 hours** prior to vaccination so that all birds drink vigorously.
3. **Consumption Window:** Ensure all vaccine water is consumed within **90 minutes** of reconstitution. Never allow vaccine solution to sit under ambient heat.
4. **Anti-Stress Support:** Provide water-soluble Vitamin C (Ascorbic Acid) for 48 hours post-vaccination to minimize febrile stress.
    `,
    faqs: [
      {
        question: 'Can I vaccinate sick chickens that are already showing disease symptoms?',
        answer:
          'Never vaccinate clinically sick birds. Vaccines stimulate an immune response in healthy birds; administering a live viral vaccine to an already compromised flock will exacerbate mortality.',
      },
      {
        question: 'Why must skimmed milk powder be added to vaccine water?',
        answer:
          'Skimmed milk powder contains proteins that neutralize residual chlorine and chloramines in well or tap water, protecting the fragile live virus from being killed before birds drink it.',
      },
    ],
    relatedProductSlugs: [
      'newcastle-disease-vaccine-lasota-strain',
      'infectious-bursal-disease-gumboro-vaccine',
      'ascorbic-acid-vitamin-c-anti-stress-powder',
    ],
  },
  {
    id: 'art-002',
    slug: 'how-to-treat-coccidiosis-poultry',
    title: 'Coccidiosis in Nigerian Poultry: Symptoms, Diagnosis, Treatment & Withdrawal Periods',
    subtitle: 'Clinical diagnosis and therapeutic eradication of Eimeria outbreaks on deep litter.',
    category: 'Disease Management',
    readTime: '7 min read',
    publishedDate: '2026-10-29',
    author: {
      name: 'Dr. K. A. Adeleke, DVM',
      role: 'Principal Veterinary Advisory Lead',
    },
    summary:
      'Coccidiosis remains one of the costliest protozoan diseases in Nigerian poultry. Learn how to identify bloody droppings early, choose between Amprolium and Sulfa combinations, and observe mandatory withdrawal periods.',
    content: `
### Understanding the Coccidiosis Lifecycle

Coccidiosis is caused by microscopic protozoan parasites of the genus *Eimeria* (predominantly *E. tenella*, *E. necatrix*, and *E. acervulina*). In Nigeria's humid climate, oocysts sporulate rapidly in moist litter around leaking drinkers, reaching infective states within 24 to 48 hours.

When young broilers or pullets ingest sporulated oocysts, the parasites invade epithelial cells of the intestinal and caecal mucosa, causing cell rupture, bleeding, and impaired nutrient absorption.

---

### Clinical Symptoms to Watch For

- **Bloody or Mucoid Droppings:** Bright red blood in droppings indicates caecal coccidiosis (*Eimeria tenella*). Orange or caramel mucus indicates intestinal coccidiosis.
- **Flock Huddling & Ruffled Feathers:** Chilled, lethargic birds clustering around brooders or corners even when pen temperature is adequate.
- **Pale Combs & Wattles:** Severe anemia caused by extensive internal hemorrhaging.
- **Sharp Feed Drop:** Immediate 30% to 50% decrease in daily feed consumption.

---

### Therapeutic Protocol

1. **Immediate Medication:** At the first sign of bloody droppings, administer a synergistic anticoccidial formulation such as **Cocci-Ton** (Amprolium 20% + Sulfaquinoxaline 20% + Vitamin K3).
2. **Dosage Regimen:** 1g per 2 Litres of clean drinking water for 3 consecutive days, followed by 2 days of plain water with vitamins, and an additional 2 days of treatment (3-2-2 protocol).
3. **Vitamin K3 Importance:** Vitamin K3 accelerates blood clotting, curbing fatal internal bleeding in the caecal pouches.
4. **Mandatory Withdrawal Period:** Observe a minimum **5-day withdrawal period** before broilers are slaughtered for human food consumption.

---

### Prevention & Litter Management

- Never allow drinkers to leak or overflow onto wood shavings.
- Install 360-degree stainless steel nipple drinkers with drip cups to maintain dry litter.
- Remove caked or wet litter patches immediately and replenish with fresh, dry wood shavings.
    `,
    faqs: [
      {
        question: 'Why do birds get coccidiosis again after successful treatment?',
        answer:
          'If the underlying cause—wet litter and poor drainage—is not corrected, birds continuously reinfect themselves by pecking at sporulated oocysts in the moist bedding.',
      },
      {
        question: 'Is coccidiosis transmissible to humans?',
        answer:
          'No. Eimeria parasites are host-specific and cannot infect humans. However, secondary bacterial infections like Salmonella from damaged bird intestines can cause food poisoning if meat is mishandled.',
      },
    ],
    relatedProductSlugs: [
      'cocci-ton-anticoccidial-treatment',
      '360-stainless-steel-poultry-nipple-drinker',
      'ascorbic-acid-vitamin-c-anti-stress-powder',
    ],
  },
  {
    id: 'art-003',
    slug: 'day-old-chick-brooding-guide',
    title: 'Brooding Day-Old Chicks in Nigeria: Temperature, Lighting & First 7-Day Care',
    subtitle: 'A practical commercial guide to achieving under 1.5% brooding mortality in tropical conditions.',
    category: 'Brooding & Housing',
    readTime: '8 min read',
    publishedDate: '2026-10-30',
    author: {
      name: 'Engr. D. Aminu, FNIAE',
      role: 'Livestock Agricultural Engineering Director',
    },
    summary:
      'The first 168 hours of a chick’s life dictate its lifetime broiler harvest weight and layer performance. Master pre-heating, brooder guard setup, crop fill monitoring, and infrared gas heating.',
    content: `
### The First 168 Hours Determine Flock Profitability

Day-old chicks cannot self-regulate their body temperature during the first 7 to 10 days of life. Chilling during transit or within the first 48 hours permanently damages internal organ development, reduces antibody absorption, and leads to stunted growth.

---

### Step-by-Step Brooding Preparation

#### 1. Pre-Heating the Brooder Pen
Turn on infrared canopy gas brooders at least **2 hours before** chick arrival. The floor shavings must reach a warm **32°C to 34°C** before chicks touch the litter. If the floor is cold, chicks lose body heat through their foot pads, causing gut paralysis.

#### 2. Circular Brooder Guards
Use corrugated cardboard brooder guards formed into circles (3-metre diameter per 800–1,000 chicks). Avoid sharp square pen corners, which cause frightened chicks to pile on top of each other and suffocate.

#### 3. Starter Feeding & Drinker Placement
- Spread shallow **day-old chick feeding trays** alongside paper sheets across 50% of the brooding area.
- Position drinkers and feeders in alternating radial rings around the central gas brooder heater.
- Add glucose and water-soluble Vitamin C (Ascorbic Acid) to drinking water for the first 24 hours to rapidly replenish energy expended during transit.

---

### Reading Chick Behavior: The True Thermometer

Do not rely solely on wall thermometers; observe chick distribution under the gas brooder:
- **Evenly Dispersed & Chirping Contentedly:** Ideal temperature (33°C).
- **Crowded Tightly Directly Under Heater:** Chilled chicks — raise heater heat output or lower canopy.
- **Pushed Against Outer Guard Panting:** Overheated — raise canopy or reduce gas pressure.
- **Clustered in One Corner:** Draft from pen curtain — check and seal wind entry points.

---

### The 24-Hour Crop Fill Benchmark

Check 50 random chicks 24 hours after placement:
- **Target:** At least **95% of chicks** must have soft, full, rounded crops containing both feed and water.
- If crops are empty or hard, check water access and lighting intensity immediately.
    `,
    faqs: [
      {
        question: 'Why is gas brooding preferred over charcoal pots in Nigeria?',
        answer:
          'Charcoal pots produce toxic carbon monoxide fumes, generate uneven heat spikes, and carry severe fire hazards. LPG infrared gas brooders emit radiant, clean warmth that warms chicks directly without polluting pen air.',
      },
      {
        question: 'When should brooding temperature be reduced?',
        answer:
          'Brooding temperature should be reduced by approximately 2.5°C to 3°C each week starting from Day 7 until birds are fully feathered at week 4.',
      },
    ],
    relatedProductSlugs: [
      'infrared-radiant-gas-brooder-heater',
      'day-old-chick-brooding-feeding-tray',
      'commercial-day-old-broiler-chicks',
    ],
  },
];

export function getArticleBySlug(slug: string): ArticleItem | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
