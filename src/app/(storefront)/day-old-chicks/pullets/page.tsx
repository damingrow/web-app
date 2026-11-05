import React from 'react';
import type { Metadata } from 'next';
import { getNextDispatchDate } from '@/lib/booking/booking-service';
import PulletLandingClient from './pullet-client';

export const metadata: Metadata = {
  title: 'Day-Old Pullets Price in Nigeria | High-Yield Commercial Layers',
  description:
    'Current day-old pullets price in Nigeria. Certified ISA Brown, Hy-Line Brown & Zartech commercial layers. 94%-96% peak egg production, 310-325 eggs per hen, 50+1 packaging guarantee, and nationwide Monday & Thursday dispatch.',
  keywords: [
    'day old pullets price in nigeria',
    'ISA Brown day-old',
    'Hy-Line Brown layers',
    'Black Shaver pullets',
    'hen-day egg production',
    'point of lay brooding timetable',
    'day old layers price in nigeria today',
    'carton of day old pullets price in nigeria',
    'zartech day old layers price',
    'best day old pullet breed in nigeria',
    'zartech pullet',
    'commercial layer chicks nigeria',
  ],
  alternates: {
    canonical: 'https://damingrow.com/day-old-chicks/pullets',
  },
  openGraph: {
    title: 'Day-Old Pullets Price in Nigeria | High-Yield Commercial Layers - D-AminGrow',
    description:
      'Order commercial day-old pullet chicks in Nigeria. Certified ISA Brown, Hy-Line Brown & Zartech genetics with 310-325 egg potential. 98%+ sexing accuracy, nationwide Monday & Thursday dispatch.',
    url: 'https://damingrow.com/day-old-chicks/pullets',
    siteName: 'D-AminGrow Agro-Allied Solution Center',
    images: [
      {
        url: '/products/Chicks/Pullet day old.jpeg',
        width: 1200,
        height: 630,
        alt: 'Day Old Pullets Price in Nigeria - Commercial Layer Chicks',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day-Old Pullets Price in Nigeria | High-Yield Commercial Layers',
    description:
      'Certified parent-stock day-old layer pullets from Zartech, Amo & Chi. 94%-96% peak egg lay, 50+1 carton rule, nationwide Monday & Thursday dispatch.',
    images: ['/products/Chicks/Pullet day old.jpeg'],
  },
};

export default function PulletsPage() {
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
            name: 'Pullets',
            item: 'https://damingrow.com/day-old-chicks/pullets',
          },
        ],
      },
      {
        '@type': 'Product',
        name: 'Day-Old Pullet Chicks (ISA Brown, Hy-Line Brown & Zartech Strains)',
        image: 'https://damingrow.com/products/Chicks/Pullet%20day%20old.jpeg',
        description:
          'High-producing commercial day-old layer pullets allocated directly from certified primary hatcheries (Zartech, Amo, Chi, Supreme). Documented 310 to 325 brown eggs per hen potential, 94%-96% peak lay efficiency, and 98%+ sexing accuracy guarantee.',
        brand: {
          '@type': 'Brand',
          name: 'D-AminGrow Agro-Allied Solution Center',
        },
        sku: 'DOC-PULT-NG',
        offers: [
          {
            '@type': 'Offer',
            name: 'ISA Brown Commercial Layer Pullet (Carton of 50)',
            priceCurrency: 'NGN',
            price: '135000',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://damingrow.com/day-old-chicks/pullets',
            seller: {
              '@type': 'Organization',
              name: 'D-AminGrow Agric Ltd',
            },
          },
          {
            '@type': 'Offer',
            name: 'Zartech Commercial Brown Pullet (Carton of 50)',
            priceCurrency: 'NGN',
            price: '135000',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: 'https://damingrow.com/day-old-chicks/pullets',
            seller: {
              '@type': 'Organization',
              name: 'D-AminGrow Agric Ltd',
            },
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '480',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the current day-old pullets price in Nigeria today?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Day-old pullet prices in Nigeria fluctuate weekly based on parent-stock availability, grain costs, and hatchery production cycles. Commercial layer pullets (ISA Brown, Zartech Brown, and Hy-Line Brown) typically trade between ₦2,200 and ₦3,000 per chick, which translates to ₦110,000 to ₦150,000 per carton of 50 pullets (+1 bonus). Because hatcheries adjust quotes weekly, contact the D-AminGrow booking desk on WhatsApp for today’s confirmed clearing rate.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the guaranteed sexing accuracy for commercial day-old pullets?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All day-old pullets supplied by D-AminGrow are professionally vent-sexed and feather-sexed by certified hatchery specialists at Zartech, Amo, Chi, and Supreme hatcheries. We guarantee a minimum of 98% female sexing accuracy per carton, ensuring commercial egg producers do not waste expensive feed rearing unwanted male birds.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which is the best day-old pullet breed for commercial egg production in Nigeria?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ISA Brown and Hy-Line Brown are the premier commercial choices in Nigeria. ISA Brown is renowned for exceptional peak lay (94%–96%) and high persistence up to 80 weeks with rich brown eggshell quality. Hy-Line Brown excels in low feed intake (105g–112g/day at peak) and tropical heat tolerance. Zartech Brown offers proven field resilience across both battery cages and deep-litter systems in Nigeria.',
            },
          },
          {
            '@type': 'Question',
            name: 'At what age do commercial pullets start laying eggs in Nigeria?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'When brooded according to standard body weight and lighting targets, commercial brown layer pullets drop their first eggs (point of lay) between Week 18 and Week 20. Peak lay rate of 94%–96% is typically achieved between Week 26 and Week 30, persisting above 85% for over 50 weeks with proper layer ration nutrition.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are day-old pullets vaccinated against Marek’s Disease at the hatchery?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every day-old pullet carton dispatched through D-AminGrow is vaccinated against Marek’s Disease (HVT Subcutaneous / Intraocular) at the primary hatchery on Day 1 before packaging. Subsequent farm vaccinations for Newcastle Disease (Lasota), Gumboro (IBD), and Fowl Pox must be administered following the recommended 20-week layer vaccination timetable.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the 50+1 packaging standard for day-old pullets in Nigeria?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All certified hatcheries in Nigeria package commercial pullets in well-ventilated partitioned cardboard cartons containing 50 chicks plus 1 free bonus chick (total of 51 chicks per carton). This 50+1 packaging rule acts as a transport livability buffer, ensuring your stocked pen starts with 100% of your paid bird count.',
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
      <PulletLandingClient
        nextMonday={nextMonday}
        nextThursday={nextThursday}
      />
    </>
  );
}
