import React from 'react';
import type { Metadata } from 'next';
import { getNextDispatchDate } from '@/lib/booking/booking-service';
import CockerelLandingClient from './cockerel-client';

export const metadata: Metadata = {
  title: 'Day-Old Cockerel Chicks Price in Nigeria | Hardy Heavy Strains',
  description:
    'Current day-old cockerel chicks price in Nigeria. Certified commercial white & heavy black cockerels from Amo, Zartech & Sayed. Rugged livability, low medication costs, and nationwide Monday & Thursday dispatch.',
  keywords: [
    'day old cockerel chicks price in nigeria',
    'white cockerel chicks',
    'black cockerels',
    'hardy rustic poultry',
    'low mortality birds',
    'festive rearing cockerels',
    'price of carton of cockerel in nigeria',
    'zartech cockerel price today',
    'amo cockerel day old chicks price',
    'cockerel farming business in nigeria',
  ],
  alternates: {
    canonical: 'https://damingrow.com/day-old-chicks/cockerels',
  },
  openGraph: {
    title: 'Day-Old Cockerel Chicks Price in Nigeria | Hardy Heavy Strains - D-AminGrow',
    description:
      'Order vigorous day-old cockerels in Nigeria. Direct allocations from certified hatcheries, 97%+ livability, low feed overhead, nationwide Monday & Thursday dispatch.',
    url: 'https://damingrow.com/day-old-chicks/cockerels',
    siteName: 'D-AminGrow Agro-Allied Solution Center',
    images: [
      {
        url: '/products/Chicks/day old pullet.jpeg',
        width: 1200,
        height: 630,
        alt: 'Day Old Cockerel Chicks in Nigeria - D-AminGrow',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day-Old Cockerel Chicks Price in Nigeria | Hardy Heavy Strains',
    description:
      'Direct allocations from Amo, Zartech & Sayed. Rugged livability, low medication costs, nationwide Monday & Thursday dispatch.',
    images: ['/products/Chicks/day old pullet.jpeg'],
  },
};

export default function CockerelPage() {
  const nextMonday = getNextDispatchDate('Monday');
  const nextThursday = getNextDispatchDate('Thursday');

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
            name: 'Day-Old Chicks',
            item: 'https://damingrow.com/day-old-chicks',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Cockerels',
            item: 'https://damingrow.com/day-old-chicks/cockerels',
          },
        ],
      },
      {
        '@type': 'Product',
        name: 'Day-Old Cockerel Chicks (White Commercial & Heavy Black Strains)',
        image: 'https://damingrow.com/products/Chicks/day old pullet.jpeg',
        description:
          'Hardy, low-mortality commercial day-old cockerels allocated directly from certified hatcheries (Amo, Zartech, Sayed). Ideal for festive market sales with low feeding and medication overhead.',
        brand: {
          '@type': 'Brand',
          name: 'D-AminGrow Agro-Allied Solution Center',
        },
        sku: 'DOC-CKRL-NG',
        offers: [
          {
            '@type': 'Offer',
            name: 'White Commercial Cockerel (Carton of 50)',
            priceCurrency: 'NGN',
            price: '14500',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://damingrow.com/day-old-chicks/cockerels',
            seller: {
              '@type': 'Organization',
              name: 'D-AminGrow Agro-Allied Solution Center',
            },
          },
          {
            '@type': 'Offer',
            name: 'Black / Colored Heavy Cockerel (Carton of 50)',
            priceCurrency: 'NGN',
            price: '42000',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://damingrow.com/day-old-chicks/cockerels',
            seller: {
              '@type': 'Organization',
              name: 'D-AminGrow Agro-Allied Solution Center',
            },
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.88',
          reviewCount: '142',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the current price of day-old cockerel chicks per carton in Nigeria?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'White commercial cockerels average between ₦10,000 and ₦18,500 per carton of 50 chicks. Heavy black and colored cockerels average between ₦30,000 and ₦55,000 per carton of 50 chicks. Rates fluctuate weekly based on breeder egg supply.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the main difference between White Cockerels and Black/Heavy Cockerels?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'White cockerels are male layer chicks with high active foraging ability, reaching 1.8kg to 2.3kg at 20-24 weeks. Heavy black/colored cockerels have broader breast musculature, reaching 2.6kg to 3.4kg, and command premium live-market prices.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which hatcheries do you allot cockerels from?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We allot directly from certified parent-stock hatcheries including Amo Sieberer Hatchery, Zartech Limited, Sayed Farms, and Supreme Hatcheries.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do cockerels achieve much lower mortality than broilers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cockerels have rugged skeletal density and natural thermotolerance. Unlike rapid-growth broilers, their cardiovascular and immune systems develop evenly, resulting in typical field mortality under 4%.',
            },
          },
          {
            '@type': 'Question',
            name: 'What days are cockerel shipments dispatched nationwide?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All chick dispatches run strictly on Mondays and Thursdays. Orders and payments must clear 48 hours in advance for guaranteed hatchery allotment.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the minimum order quantity for day-old cockerels?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The minimum booking is 1 full carton containing 50 chicks (plus standard 1-2 hatchery extra buffer chicks).',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I reduce cockerel feeding costs without stunting growth?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use complete 20% CP Chick Starter for the first 4 to 6 weeks. From week 7 onwards, transition to a 15% CP Grower Mash and incorporate economical grain by-products like maize offal, wheat offal, and brewery spent grains.',
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
      <CockerelLandingClient nextMonday={nextMonday} nextThursday={nextThursday} />
    </>
  );
}
