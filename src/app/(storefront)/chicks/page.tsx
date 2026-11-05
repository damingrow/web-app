import React from 'react';
import type { Metadata } from 'next';
import { getNextDispatchDate } from '@/lib/booking/booking-service';
import ChicksClient from './chicks-client';

export const metadata: Metadata = {
  title: 'Book Day-Old Chicks Online | Secure Hatchery Reservation Form',
  description:
    'Book day-old chicks online in Nigeria. Direct allocations of Ross 308, Cobb 500 broilers, ISA Brown pullets & foreign turkeys from Chi, Amo, Zartech & Supreme. 50+1 packaging guarantee, Marek\'s pre-vaccinated, Monday & Thursday dispatch.',
  keywords: [
    'book day old chicks online nigeria',
    'chick allocation form',
    'hatch date reservation',
    'carton deposit payment',
    'minimum order quantity',
    'prompt dispatch notification',
    'reserve day old chicks online',
    'hatchery booking form nigeria',
    'how to book day old chicks from hatcheries',
    'pre-order day old chicks ibadan lagos',
    'day old chicks price today nigeria',
    'day old broilers booking',
    'day old pullets booking',
  ],
  alternates: {
    canonical: 'https://damingrow.com/chicks',
  },
  openGraph: {
    title: 'Book Day-Old Chicks Online | Secure Hatchery Reservation Form - D-AminGrow',
    description:
      'Book commercial day-old broiler chicks, layer pullets, and turkeys online in Nigeria. Guaranteed direct hatchery allocations from Chi, Amo, Zartech & Supreme with nationwide Monday & Thursday dispatch.',
    url: 'https://damingrow.com/chicks',
    siteName: 'D-AminGrow Agro-Allied Solution Center',
    images: [
      {
        url: '/products/Chicks/day old broiler.jpeg',
        width: 1200,
        height: 630,
        alt: 'Book Day-Old Chicks Online Nigeria - Direct Hatchery Allocation & Dispatch',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Day-Old Chicks Online | Secure Hatchery Reservation Form',
    description:
      'Secure commercial day-old chick allocations from certified Nigerian hatcheries. 50+1 packaging rule, Marek\'s pre-vaccinated, nationwide Monday & Thursday dispatch.',
    images: ['/products/Chicks/day old broiler.jpeg'],
  },
};

export default function ChicksPage() {
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
            item: 'https://damingrow.com/chicks',
          },
        ],
      },
      {
        '@type': 'Service',
        name: 'Commercial Day-Old Chicks Hatchery Reservation & Dispatch Service',
        serviceType: 'Livestock Supply and Hatchery Allocation',
        description:
          'Direct parent-stock day-old chick allocation and nationwide temperature-controlled dispatch service from Chi Farms, Amo Farms, Zartech, and Supreme Hatcheries across all 36 Nigerian states and FCT.',
        provider: {
          '@type': 'Organization',
          name: 'D-AminGrow Agric Ltd',
          url: 'https://damingrow.com',
          telephone: '+2348139169402',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'NG',
            addressLocality: 'Ibadan',
            addressRegion: 'Oyo State',
          },
        },
        areaServed: {
          '@type': 'Country',
          name: 'Nigeria',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Day-Old Poultry Breeds',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Commercial Day-Old Broilers (Carton of 50+1)',
                description: 'Certified Ross 308, Cobb 500, and Arbor Acres Plus day-old broiler chicks.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Commercial Day-Old Layer Pullets (Carton of 50+1)',
                description: 'Certified ISA Brown, Hy-Line Brown, and Zartech Black Shaver layer pullets.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Foreign Hybrid Turkey Poults (Carton of 30)',
                description: 'Nicholas White and Hybrid Converter commercial day-old turkey poults.',
              },
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I book day-old chicks online through D-AminGrow?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can book your chicks directly through our online Chick Allocation Form on this page or via our WhatsApp booking desk (+2348139169402). Simply select your preferred breed, specify your hatchery brand preference, indicate the number of cartons needed, and enter your delivery destination. You will receive an instant invoice summary detailing total costs and the 50% commitment deposit required to lock your hatch slot.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the minimum order quantity (MOQ) for day-old chicks?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The minimum order quantity is one (1) commercial carton. For broilers, layer pullets, cockerels, and Noilers, each carton contains 50 chicks plus 1 extra chick (51 total birds) as a certified livability buffer. For day-old turkeys, each carton contains 30 poults. We do not sell retail quantities below one carton because hatcheries package exclusively in tamper-evident, climate-ventilated commercial boxes.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the 50% commitment deposit payment work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Commercial hatcheries operate strict advance incubation cycles: parent eggs are set 21 days before hatch day. To guarantee your carton allotment from partner hatcheries (CHI, Zartech, Amo, Supreme), a 50% commitment deposit is paid to our corporate account (Zenith Bank Plc, 1017894562, D-AminGrow Agric Ltd). The remaining 50% balance is cleared prior to waybill departure on the morning of dispatch.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which days are chicks dispatched and what are the order cutoff times?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nationwide dispatch occurs twice weekly: every Monday and Thursday morning. For Monday dispatches, bookings and commitment deposits close on Saturday at 12:00 PM. For Thursday dispatches, bookings close on Tuesday at 5:00 PM. Bookings submitted after these cutoffs roll automatically into the subsequent hatch cycle.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I collect my chicks from the motor park depot?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Upon dispatch from the hatchery corridor in Ibadan or Ogun State, our logistics desk sends you a Prompt Dispatch Notification containing the driver’s phone number, motor park depot name, waybill tracking receipt number, and bus registration number. You are advised to arrive at the designated motor park depot 15–30 minutes before bus arrival to minimize waiting time in fluctuating ambient temperatures.',
            },
          },
          {
            '@type': 'Question',
            name: 'What happens if I experience chick mortality during transit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every carton includes 1 bonus chick (51 chicks packed) to absorb ordinary transit stress. In the rare event of mortality exceeding this buffer due to vehicle delay or mechanical failure, you must record a clear, continuous 360-degree unboxing video at the motor park depot within 2 hours of arrival showing intact hatchery seals and dead birds. Send this video immediately to our WhatsApp desk for verification and compensatory credit.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are the day-old chicks vaccinated against Marek’s Disease before dispatch?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. All day-old broiler and layer pullet chicks allocated through D-AminGrow receive subcutaneous Marek’s Disease vaccine (HVT strain, 0.2 ml per chick) administered via automated hatchery injection systems immediately after hatch before carton crating. You will receive an official vaccination guide to continue subsequent Newcastle and Gumboro pen protocols.',
            },
          },
          {
            '@type': 'Question',
            name: 'What should I prepare in my brooding pen before the chicks arrive?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Your brooding pen must be thoroughly washed, disinfected, and pre-heated to 32°C–35°C at chick height at least 2 to 4 hours before carton arrival. Prepare clean drinkers with glucose anti-stress water (or electrolyte solution) at room temperature. Provide fresh wood shavings (never sawdust) and ensure proper ventilation without direct cold drafts.',
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
      <ChicksClient nextMonday={nextMonday} nextThursday={nextThursday} />
    </>
  );
}
