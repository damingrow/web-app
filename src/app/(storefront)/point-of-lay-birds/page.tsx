import React from 'react';
import type { Metadata } from 'next';
import PointOfLayClient from './point-of-lay-client';

export const metadata: Metadata = {
  title: 'Point-of-Lay Birds for Sale in Nigeria | 16-18 Weeks Vaccinated Layers',
  description:
    'Point-of-lay birds for sale in Nigeria. Buy fully vaccinated 16–18 weeks ISA Brown, Hy-Line & Black Shaver pullets. 1.45kg–1.60kg verified weights, 310–325 brown egg potential, 10-bird ventilated crate delivery across Nigeria.',
  keywords: [
    'point of lay birds for sale in nigeria',
    '16 weeks pullets',
    '18 weeks layers',
    'fully vaccinated laying birds',
    'brown egg layers',
    'bypassed brooding risks',
    'point of lay birds price in nigeria',
    'point of lay chickens for sale in ibadan lagos',
    'cost of 1000 point of lay birds in nigeria',
    'where to buy point of lay birds in nigeria',
    'isa brown point of lay nigeria',
    'hy-line brown point of lay',
    'commercial layers for sale',
  ],
  alternates: {
    canonical: 'https://damingrow.com/point-of-lay-birds',
  },
  openGraph: {
    title: 'Point-of-Lay Birds for Sale in Nigeria | 16-18 Weeks Vaccinated Layers - D-AminGrow',
    description:
      'Order commercial 16–18 week-old Point-of-Lay brown layer pullets ready to start laying within 14–28 days. Fully vaccinated against Newcastle, Gumboro, Marek’s, Fowl Pox, Coryza, and EDS. Transported in 10-bird ventilated crates.',
    url: 'https://damingrow.com/point-of-lay-birds',
    siteName: 'D-AminGrow Agro-Allied Solution Center',
    images: [
      {
        url: '/products/Chicks/Point of Lay.jpeg',
        width: 1200,
        height: 630,
        alt: 'Point-of-Lay Birds for Sale in Nigeria - 16 to 18 Weeks Vaccinated Pullets',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Point-of-Lay Birds for Sale in Nigeria | 16-18 Weeks Vaccinated Layers',
    description:
      'Buy verified 16–18 weeks Point-of-Lay brown layer pullets in Nigeria. 1.45kg–1.60kg body weight, fully vaccinated, bypass 4 months of brooding risk.',
    images: ['/products/Chicks/Point of Lay.jpeg'],
  },
};

export default function PointOfLayBirdsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://damingrow.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Commercial Poultry',
            item: 'https://damingrow.com/day-old-chicks',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Point-of-Lay Birds',
            item: 'https://damingrow.com/point-of-lay-birds',
          },
        ],
      },
      {
        '@type': 'Product',
        name: 'Commercial Point-of-Lay Birds (16–18 Weeks Vaccinated Pullets)',
        image: 'https://damingrow.com/products/Chicks/Point%20of%20Lay.jpeg',
        description:
          'Fully vaccinated 16–18 week-old commercial Point-of-Lay brown layer pullets (ISA Brown, Hy-Line Brown, Dominant Black). Documented 1.45kg–1.60kg body weight, 310–325 egg production potential, crated at 10 birds per ventilated crate with signed veterinary immunization card.',
        brand: {
          '@type': 'Brand',
          name: 'D-AminGrow Agro-Allied Solution Center',
        },
        sku: 'POL-LAYER-16-18W',
        offers: [
          {
            '@type': 'Offer',
            name: 'Commercial ISA Brown Point-of-Lay Pullets (16–18 Weeks)',
            priceCurrency: 'NGN',
            price: '14500',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://damingrow.com/point-of-lay-birds',
            seller: {
              '@type': 'Organization',
              name: 'D-AminGrow Agric Ltd',
            },
          },
          {
            '@type': 'Offer',
            name: 'Commercial Hy-Line Brown Point-of-Lay Pullets (16–18 Weeks)',
            priceCurrency: 'NGN',
            price: '14500',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://damingrow.com/point-of-lay-birds',
            seller: {
              '@type': 'Organization',
              name: 'D-AminGrow Agric Ltd',
            },
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much are point-of-lay birds in Nigeria today?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In Nigeria, vaccinated 16–18 week commercial point-of-lay pullets generally range between ₦13,500 and ₦15,000 per bird depending on the breed (ISA Brown, Hy-Line Brown, Dominant Black), current age, and feed costs incurred during rearing. Prices reflect full viral immunization, 16 weeks of professional feed management, and verified body weight standards (1.45kg–1.60kg). Exact batch quotes are confirmed via our WhatsApp desk.',
            },
          },
          {
            '@type': 'Question',
            name: 'When do 16–18 week point-of-lay pullets start laying eggs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'When healthy 16–18 week pullets are moved into well-ventilated battery cages or deep-litter pens with correct 14-to-16 hour lighting and clean layer mash, the first "point eggs" (pullet eggs) typically appear within 14 to 28 days (at 19–21 weeks of age). The flock reaches 50% production by weeks 22–24 and ramps up to 90%+ peak production around weeks 26–30.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the minimum order quantity (MOQ) for point-of-lay birds?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The minimum order quantity is 50 birds, which fills 5 standard commercial plastic poultry crates (10 birds per crate). We do not dispatch retail quantities below 50 birds because specialized crate logistics require dedicated compartment spacing to prevent heat stress and road mortality.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the 50% commitment deposit protect my flock reservation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Point-of-lay pullets are grown in biosecure pen batches under veterinary monitoring. Because mature birds cannot be held indefinitely in grower pens without initiating laying, farms only crate and allocate birds to confirmed reservations. A 50% commitment deposit transferred to our corporate Zenith Bank account (1017894562, D-AminGrow Agric Ltd) locks your crate allocation. The remaining balance clears prior to vehicle departure on dispatch day.',
            },
          },
          {
            '@type': 'Question',
            name: 'What vaccinations have the birds received before delivery?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every batch undergoes a complete 16-week viral immunization schedule: subcutaneous Marek’s HVT at hatch; Gumboro (IBD) on Days 10 and 18; Newcastle (HB1, LaSota, and Week 8 booster); Fowl Pox (wing-web puncture); Infectious Bronchitis (IB Mass); Infectious Coryza; and an inactivated Egg Drop Syndrome (EDS + ND) oil-emulsion injection at weeks 15–16. A signed veterinary administration card accompanies every delivery.',
            },
          },
          {
            '@type': 'Question',
            name: 'How are point-of-lay birds transported safely across states?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mature pullets are transported in specialized heavy-duty ventilated plastic poultry crates holding exactly 10 birds each. Transit vehicles depart exclusively during cool evening or early dawn hours to eliminate tropical heat stress. We coordinate direct farm gate deliveries across Oyo, Ogun, Osun, Lagos, Ondo, Ekiti, Edo, Delta, Kwara, and Abuja transport corridors.',
            },
          },
          {
            '@type': 'Question',
            name: 'What should I prepare in my pens before the point-of-lay birds arrive?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ensure your battery cages or deep-litter pens have been washed with disinfectant and rested for at least 7 days. Check all nipple drinkers for proper water pressure. Fill drinkers with fresh water containing anti-stress vitamins and electrolytes 2 hours before bird placement. Provide Grower/Pre-lay mash on day 1, and gradually transition to 16.5%–17.5% crude protein Layer Mash over a 7-day period.',
            },
          },
          {
            '@type': 'Question',
            name: 'What happens if a bird dies during transport to my farm?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Transit mortality is rare when birds are crated at 10 birds per crate during cool hours. In the rare event of transit mortality, birds are inspected directly during crate offloading at your farm. Record a continuous video of the uncrating process showing intact vehicle seals and dead birds to receive immediate compensation or credit adjustments.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PointOfLayClient />
    </>
  );
}
