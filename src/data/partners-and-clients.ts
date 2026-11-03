/**
 * D-AminGrow Partner Hatcheries and Commercial Client Farms
 * Authoritative directory for verified partner hatcheries and commercial poultry clients across Nigeria.
 */

export interface HatcheryPartner {
  id: string;
  name: string;
  shortName: string;
  location: string;
  specialtyBreeds: string[];
  description: string;
  establishedRole: string;
  badge: string;
}

export interface ClientFarm {
  id: string;
  name: string;
  ownerOrManager?: string;
  location: string;
  flockType: string;
  flockCapacity: string;
  relationshipYears: string;
  testimonialSnippet: string;
  rating: number;
}

export const HATCHERY_PARTNERS: HatcheryPartner[] = [
  {
    id: 'chi-farms',
    name: 'CHI Farms Limited',
    shortName: 'CHI Farms',
    location: 'Ajanla, Ibadan, Oyo State',
    specialtyBreeds: ['Arbor Acres Plus Broilers', 'ISA Brown Commercial Layers'],
    description:
      'Premier commercial hatchery operating state-of-the-art Petersime bio-secure incubation facilities in Oyo State with certified grandparent parent stock.',
    establishedRole: 'Grandparent & Parent Stock Day-Old Chick Distribution Partner',
    badge: 'Certified Grandparent Lineage',
  },
  {
    id: 'amo-farms',
    name: 'Amo Farm Sieberer Hatchery Ltd',
    shortName: 'Amo Farms / Amo ByNG',
    location: 'Awe / Oyo, Oyo State',
    specialtyBreeds: ['Amo Commercial Broilers', 'Noiler Dual-Purpose Birds'],
    description:
      'Pioneering poultry breeding conglomerate renowned for high-vigor commercial broilers and rural empowerment breeds with robust tropical adaptability.',
    establishedRole: 'Official Hatchery Allocation & Waybill Dispatch Partner',
    badge: 'High Tropical Hardiness',
  },
  {
    id: 'zartech-farms',
    name: 'Zartech Farms Limited',
    shortName: 'Zartech Farms',
    location: 'Oluyole Industrial Estate, Ibadan, Oyo State',
    specialtyBreeds: ['Cobb 500 Broilers', 'Black & Brown Layer Pullets'],
    description:
      'Decades of proven breeding excellence delivering high-uniformity, fast-feathering commercial broilers with superior feed conversion ratios.',
    establishedRole: 'Direct Primary Hatchery Allotment Partner',
    badge: 'Optimized FCR Genetics',
  },
  {
    id: 'supreme-farms',
    name: 'Supreme Poultry Farms Limited',
    shortName: 'Supreme Farms',
    location: 'Oyo / Ogun Commercial Poultry Corridor',
    specialtyBreeds: ['Supreme Broiler Chicks', 'Commercial Pullets'],
    description:
      'Modern automated hatchery delivering day-old chicks with strict Pasgar chick quality scores, excellent navel closure, and verified maternal antibody transfer.',
    establishedRole: 'Commercial Broiler & Pullet Supply Partner',
    badge: 'Pasgar Score Verified (>9.0)',
  },
  {
    id: 'agrited',
    name: 'AGRITED (Agricultural and Technology Development Ltd)',
    shortName: 'AGRITED',
    location: 'Oyo State & Western Operations',
    specialtyBreeds: ['Ross 308 Broilers', 'Cobb 500 Broilers', 'Novogen Brown Layers'],
    description:
      'Internationally certified hatchery operation supplying millions of premium commercial day-old chicks weekly across Nigeria with biometric biosecurity safeguards.',
    establishedRole: 'Authorized Commercial Day-Old Distribution Partner',
    badge: 'ISO-Standard Biosecurity',
  },
];

export const CLIENT_FARMS: ClientFarm[] = [
  {
    id: 'ajila-farm',
    name: 'Ajila Farm',
    location: 'Oyo State Poultry Belt',
    flockType: 'Commercial Broilers & Pullets',
    flockCapacity: '4,000+ Birds',
    relationshipYears: '3+ Years',
    testimonialSnippet:
      'D-AminGrow delivers our day-old chicks with consistent 98%+ brooding livability and authentic hatchery vaccination documentation.',
    rating: 5,
  },
  {
    id: 'owenaze-farm',
    name: 'Owenaze Farm',
    location: 'Lagos / Ogun Agricultural Corridor',
    flockType: 'Commercial Layers & Point-of-Lay',
    flockCapacity: '5,000+ Layers',
    relationshipYears: '2+ Years',
    testimonialSnippet:
      'Vaccine cold-chain delivery is flawless. Every ice-pack arrives frozen solid, keeping our Newcastle and IBD immunization schedules intact.',
    rating: 5,
  },
  {
    id: 'loveday-farm',
    name: 'Loveday Farm',
    location: 'South-West Commercial Corridor',
    flockType: 'Broilers & Commercial Turkeys',
    flockCapacity: '3,500+ Birds',
    relationshipYears: '3+ Years',
    testimonialSnippet:
      'Their dynamic chick pricing desk is completely transparent. We get real-time price updates on WhatsApp and on-time motor park dispatch.',
    rating: 5,
  },
  {
    id: 'dr-austin-farm',
    name: 'Dr. Austin Farm',
    location: 'Edo / Mid-Western Belt',
    flockType: 'Commercial Layers & Brooding Unit',
    flockCapacity: '6,000+ Birds',
    relationshipYears: '4+ Years',
    testimonialSnippet:
      'Whenever we encounter respiratory or digestive challenges, D-AminGrow veterinary desk provides clinical dosage advice within minutes.',
    rating: 5,
  },
  {
    id: 'grace-farm',
    name: 'Grace Farm',
    location: 'Ogun State Poultry Belt',
    flockType: 'Commercial Broilers',
    flockCapacity: '2,500+ Broilers',
    relationshipYears: '2+ Years',
    testimonialSnippet:
      'Genuine NAFDAC-certified medications. No counterfeit products. Their anticoccidials and water vitamins keep our FCR below 1.55.',
    rating: 5,
  },
  {
    id: 'anita-farm',
    name: 'Anita Farm',
    location: 'Ibadan / Oyo State',
    flockType: 'Broilers & Cockerels',
    flockCapacity: '3,000+ Birds',
    relationshipYears: '3+ Years',
    testimonialSnippet:
      'From brooder guard equipment to automatic bell drinkers, D-AminGrow supplied commercial-grade hardware that has lasted years without leaks.',
    rating: 5,
  },
  {
    id: 'vivian-farm',
    name: 'Vivian Farm',
    location: 'Delta / South-South Region',
    flockType: 'Commercial Layers & Point-of-Lay',
    flockCapacity: '4,500+ Layers',
    relationshipYears: '2+ Years',
    testimonialSnippet:
      'Reliable waybill dispatch to our interstate terminal. Waybill receipts and driver contacts are shared immediately upon dispatch.',
    rating: 5,
  },
  {
    id: 'taghini-farm',
    name: 'Taghini Farm',
    location: 'Western Commercial Agro-Zone',
    flockType: 'Commercial Broilers & Hatching Operations',
    flockCapacity: '7,000+ Birds',
    relationshipYears: '4+ Years',
    testimonialSnippet:
      'We partner with D-AminGrow for scheduled weekly chick placements. Parent-stock vigor and body weight uniformity are always top-tier.',
    rating: 5,
  },
];
