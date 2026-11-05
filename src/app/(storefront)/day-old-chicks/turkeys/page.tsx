import React from 'react';
import type { Metadata } from 'next';
import { getNextDispatchDate } from '@/lib/booking/booking-service';
import TurkeyLandingClient from './turkey-client';

export const metadata: Metadata = {
  title: 'Turkey Poults Price in Nigeria | Foreign & Hybrid Day-Old Turkeys',
  description:
    'Current turkey poults price in Nigeria. Certified Nicholas White foreign & hybrid day-old turkeys. Direct parent-stock allocations, 35°C brooding guide, nationwide Monday & Thursday dispatch.',
  keywords: [
    'turkey poults price in nigeria',
    'foreign turkey poults',
    'Nicholas White day-old',
    'broad breasted bronze',
    'commercial turkey fattening',
    'festive season turkey rearing',
    'day old turkey price in nigeria today',
    'foreign day old turkey price in nigeria',
    'where to buy turkey poults in lagos ibadan',
    'carton of day old turkey price in nigeria',
  ],
  alternates: {
    canonical: 'https://damingrow.com/day-old-chicks/turkeys',
  },
  openGraph: {
    title: 'Turkey Poults Price in Nigeria | Foreign & Hybrid Day-Old Turkeys - D-AminGrow',
    description:
      'Order commercial day-old turkey poults in Nigeria. Genuine Nicholas White foreign genetics (10kg-14kg toms) & hardy local bronze turkeys. Dispatched nationwide every Monday & Thursday.',
    url: 'https://damingrow.com/day-old-chicks/turkeys',
    siteName: 'D-AminGrow Agro-Allied Solution Center',
    images: [
      {
        url: '/products/Chicks/Day old Turkey.jpeg',
        width: 1200,
        height: 630,
        alt: 'Day Old Turkey Poults in Nigeria - D-AminGrow',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turkey Poults Price in Nigeria | Foreign & Hybrid Day-Old Turkeys',
    description:
      'Direct parent-stock allocations from certified hatcheries. 35°C brooding protocol, 28% CP nutrition support, nationwide Monday & Thursday dispatch.',
    images: ['/products/Chicks/Day old Turkey.jpeg'],
  },
};

export default function TurkeyPage() {
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
            name: 'Turkey Poults',
            item: 'https://damingrow.com/day-old-chicks/turkeys',
          },
        ],
      },
      {
        '@type': 'Product',
        name: 'Day-Old Turkey Poults (Foreign Nicholas White & Local Bronze)',
        image: 'https://damingrow.com/products/Chicks/Day old Turkey.jpeg',
        description:
          'High-performance commercial day-old turkey poults allocated directly from certified parent-stock hatcheries. Nicholas White exotic lines capable of reaching 10kg to 14kg carcass weights.',
        brand: {
          '@type': 'Brand',
          name: 'D-AminGrow Agro-Allied Solution Center',
        },
        sku: 'DOC-TRKY-NG',
        offers: [
          {
            '@type': 'Offer',
            name: 'Foreign Nicholas White Turkey Poults (Carton of 30)',
            priceCurrency: 'NGN',
            price: '210000',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://damingrow.com/day-old-chicks/turkeys',
            seller: {
              '@type': 'Organization',
              name: 'D-AminGrow Agro-Allied Solution Center',
            },
          },
          {
            '@type': 'Offer',
            name: 'Local & Hybrid Bronze Turkey Poults (Carton of 40)',
            priceCurrency: 'NGN',
            price: '145000',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://damingrow.com/day-old-chicks/turkeys',
            seller: {
              '@type': 'Organization',
              name: 'D-AminGrow Agro-Allied Solution Center',
            },
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.91',
          reviewCount: '118',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the current day-old turkey poults price in Nigeria today?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Foreign Nicholas White poults in cartons of 30 trade between ₦165,000 and ₦275,000. Local Bronze turkeys in cartons of 40 trade between ₦120,000 and ₦175,000. Prices update weekly for Monday and Thursday dispatches.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why are Foreign Turkey poults packed in 30s while Local Turkeys are packed in 40s?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Foreign broad-breasted poults have larger bone frames and higher metabolic oxygen consumption. Welfare standards restrict ventilated cartons to 30 poults to prevent transit heat exhaustion and smothering.',
            },
          },
          {
            '@type': 'Question',
            name: 'What brooding temperature is mandatory for day-old turkey poults?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Turkey poults require 35°C to 37°C during Week 1, approximately 3°C to 4°C higher than broiler chicks. Temperature is gradually stepped down by 2.5°C per week.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why must turkey poults be fed 28% Crude Protein starter instead of broiler feed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Turkeys rapidly build large skeletal bone mass and breast muscles. Feeding 20%-22% broiler starter leads to bone mineral starvation, rickets, and slipped tendon syndrome (perosis). 28% CP pre-starter is mandatory for the first 4 weeks.',
            },
          },
          {
            '@type': 'Question',
            name: 'What causes spraddle or splayed legs in young poults and how do I prevent it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Spraddle leg occurs when poults are reared on smooth, slippery surfaces like newspapers or nylon. Brooding must only use rough burlap sacks, corrugated anti-skid carton paper, or coarse dry wood shavings.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I stock turkey poults to target Christmas market sales?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Foreign toms require 20 to 22 weeks to attain heavy 11kg to 14kg carcass weights. To hit the December 15-25 market, poults must be stocked between late June and mid-July.',
            },
          },
          {
            '@type': 'Question',
            name: 'What days are turkey poults dispatched nationwide?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Shipments depart verified partner hatcheries every Monday and Thursday morning. Orders and payments must clear 48 hours in advance.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I pay securely for my turkey reservation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All official payments clear strictly to Zenith Bank Plc, Account Number: 1017894562, Account Name: D-AminGrow Agric Ltd.',
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
      <TurkeyLandingClient nextMonday={nextMonday} nextThursday={nextThursday} />
    </>
  );
}
