import React from 'react';
import type { Metadata } from 'next';
import { getNextDispatchDate } from '@/lib/booking/booking-service';
import BroilerLandingClient from './broiler-client';

export const metadata: Metadata = {
  title: 'Day-Old Broiler Chicks Price in Nigeria | Ross 308 & Cobb 500',
  description:
    'Current day-old broiler chicks price in Nigeria. Certified Ross 308, Cobb 500 & Arbor Acres Plus from Zartech, Amo, Chi & Supreme. 2.2kg-2.8kg in 6 weeks, FCR 1.60-1.75, 50+1 packaging guarantee, nationwide Monday & Thursday dispatch.',
  keywords: [
    'day old broiler chicks price in nigeria',
    'Ross 308 broilers',
    'Cobb 500 day-old',
    'Arbor Acres Plus',
    '6-week target weight',
    'broiler average daily gain',
    'fast feathering broilers',
    'agrited broiler day old price today',
    'amo broiler chicks price in nigeria',
    'zartech broiler chicks price today',
    'best broiler breed for fast weight gain in nigeria',
    'day old broilers ibadan lagos',
  ],
  alternates: {
    canonical: 'https://damingrow.com/day-old-chicks/broilers',
  },
  openGraph: {
    title: 'Day-Old Broiler Chicks Price in Nigeria | Ross 308 & Cobb 500 - D-AminGrow',
    description:
      'Order commercial day-old broiler chicks in Nigeria. Certified Ross 308, Cobb 500 & Arbor Acres genetics. High livability, rapid feed conversion, 50+1 packaging rule, and nationwide Monday & Thursday dispatch.',
    url: 'https://damingrow.com/day-old-chicks/broilers',
    siteName: 'D-AminGrow Agro-Allied Solution Center',
    images: [
      {
        url: '/products/Chicks/day old broiler.jpeg',
        width: 1200,
        height: 630,
        alt: 'Day Old Broiler Chicks Price in Nigeria - Ross 308 & Cobb 500',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day-Old Broiler Chicks Price in Nigeria | Ross 308 & Cobb 500',
    description:
      'Direct parent-stock allocations from Chi, Amo, Zartech & Supreme. 2.2kg–2.8kg harvest weight at 6 weeks, 50+1 packaging rule, nationwide Monday & Thursday dispatch.',
    images: ['/products/Chicks/day old broiler.jpeg'],
  },
};

export default function BroilerPage() {
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
            name: 'Broilers',
            item: 'https://damingrow.com/day-old-chicks/broilers',
          },
        ],
      },
      {
        '@type': 'Product',
        name: 'Day-Old Broiler Chicks (Ross 308, Cobb 500 & Arbor Acres Plus)',
        image: 'https://damingrow.com/products/Chicks/day%20old%20broiler.jpeg',
        description:
          'Fast-growing commercial day-old broiler chicks allocated directly from certified primary breeding hatcheries (Chi Farms, Amo Farms, Zartech, Supreme). Documented 2.2kg to 2.8kg harvest weight at 42 to 49 days, 1.60 to 1.75 FCR, and 50+1 packaging livability guarantee.',
        brand: {
          '@type': 'Brand',
          name: 'D-AminGrow Agro-Allied Solution Center',
        },
        sku: 'DOC-BRLR-NG',
        offers: [
          {
            '@type': 'Offer',
            name: 'Ross 308 Commercial Broilers (Carton of 50)',
            priceCurrency: 'NGN',
            price: '95000',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://damingrow.com/day-old-chicks/broilers',
            seller: {
              '@type': 'Organization',
              name: 'D-AminGrow Agric Ltd',
            },
          },
          {
            '@type': 'Offer',
            name: 'Cobb 500 Commercial Broilers (Carton of 50)',
            priceCurrency: 'NGN',
            price: '95000',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://damingrow.com/day-old-chicks/broilers',
            seller: {
              '@type': 'Organization',
              name: 'D-AminGrow Agric Ltd',
            },
          },
          {
            '@type': 'Offer',
            name: 'Arbor Acres Plus Commercial Broilers (Carton of 50)',
            priceCurrency: 'NGN',
            price: '90000',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://damingrow.com/day-old-chicks/broilers',
            seller: {
              '@type': 'Organization',
              name: 'D-AminGrow Agric Ltd',
            },
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '720',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the current day-old broiler chicks price in Nigeria today?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Day-old broiler chick prices in Nigeria fluctuate weekly depending on parent-stock supply, grain costs, and seasonal demand (such as festive market preparations). Current market prices range between ₦1,700 and ₦2,200 per chick, which translates to ₦85,000 to ₦110,000 per carton of 50 chicks (+1 bonus). Because hatcheries adjust quotes every Monday and Thursday, message the D-AminGrow booking desk on WhatsApp for today’s confirmed clearing rate.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which is better between Ross 308, Cobb 500, and Arbor Acres Plus in Nigeria?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All three are premier genetic strains suited for different commercial goals. Cobb 500 excels in breast meat yield, uniform growth, and performs outstandingly well on lower-density feeds in hot tropical conditions. Ross 308 has the highest average daily gain (ADG) and robust cardiovascular capacity, reaching 2.5kg faster under high-protein management. Arbor Acres Plus is prized for exceptional leg strength, rustic hardiness, and lower susceptibility to ascites in open-sided Nigerian pens.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much feed does one broiler eat to reach 2.5kg market size?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under standard Nigerian commercial farm conditions with quality parent-stock (FCR 1.65–1.75), a broiler consumes approximately 3.8kg to 4.2kg of feed across 42 days (6 weeks) to reach a live market weight of 2.3kg to 2.6kg. This consists of roughly 1.2kg of Broiler Starter (22%–23% CP) and 2.8kg–3.0kg of Broiler Finisher (19%–20% CP).',
            },
          },
          {
            '@type': 'Question',
            name: 'Why should I never buy cheap day-old broilers from open-market aggregators?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Backyard aggregators frequently hatch uncertified eggs from spent parent-stock or mix low-weight grade-B rejects. These chicks often suffer from poorly absorbed yolk sacs, unhealed navels, and weak bone density. While you may save ₦100 to ₦200 per chick at booking, they stall at 1.4kg to 1.6kg at week 7, consuming ₦1,500+ in extra feed without gaining weight, wiping out your farm profits.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the 50+1 packaging standard for day-old broilers in Nigeria?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Certified hatcheries in Nigeria package commercial broilers in four-quadrant ventilated cartons containing 50 chicks plus 1 free bonus chick (total: 51 chicks per carton). This 50+1 packaging standard provides a mortality buffer during transit so your stocked house starts with 100% of your paid count.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the official dispatch days and booking cutoff times?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'D-AminGrow dispatches day-old broiler chicks nationwide every Monday and Thursday morning. For Monday dispatches, confirmed 50% deposits must clear into our official Zenith Bank account by Saturday 12:00 PM. For Thursday dispatches, deposits must clear by Tuesday 5:00 PM. Waybill receipts and driver tracking details are sent immediately upon dispatch.',
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
      <BroilerLandingClient
        nextMonday={nextMonday}
        nextThursday={nextThursday}
      />
    </>
  );
}
