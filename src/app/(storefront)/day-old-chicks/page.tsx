import React from 'react';
import type { Metadata } from 'next';
import { getNextDispatchDate } from '@/lib/booking/booking-service';
import DayOldChicksClient from './day-old-chicks-client';

export const metadata: Metadata = {
  title: 'Day-Old Chicks Price in Nigeria Today | Live Hatchery Booking',
  description:
    'Current day-old chicks price in Nigeria. Certified commercial broiler chicks (Ross 308, Cobb 500), ISA Brown pullets & foreign turkeys from CHI, Amo, Zartech & Supreme. 50+1 packaging guarantee, nationwide Monday & Thursday dispatch.',
  keywords: [
    'day old chicks price in nigeria',
    'carton of day old chicks',
    'commercial hatchery price list',
    'Monday Thursday hatch dates',
    'genuine genetic parent stock',
    'nationwide chick delivery',
    'day old chick price in nigeria today',
    'current prices of day old chicks in nigeria',
    'price of carton of day old chicks in nigeria',
    'buy day old chicks online nigeria',
    'chi broiler chicks price',
    'zartech pullet price in nigeria',
    'amo noiler chicks price',
  ],
  alternates: {
    canonical: 'https://damingrow.com/day-old-chicks',
  },
  openGraph: {
    title: 'Day-Old Chicks Price in Nigeria Today | Live Hatchery Booking - D-AminGrow',
    description:
      'Live commercial day-old chicks price list in Nigeria. Certified parent-stock broilers, layer pullets, and turkeys. 50+1 packaging rule, Marek\'s pre-vaccinated, nationwide Monday & Thursday dispatch.',
    url: 'https://damingrow.com/day-old-chicks',
    siteName: 'D-AminGrow Agro-Allied Solution Center',
    images: [
      {
        url: '/products/Chicks/day old broiler.jpeg',
        width: 1200,
        height: 630,
        alt: 'Day Old Chicks Price in Nigeria Today - Live Hatchery Booking Hub',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day-Old Chicks Price in Nigeria Today | Live Hatchery Booking',
    description:
      'Direct parent-stock allocations from CHI, Amo, Zartech & Supreme. 50+1 packaging guarantee, Marek\'s pre-vaccinated, nationwide Monday & Thursday dispatch.',
    images: ['/products/Chicks/day old broiler.jpeg'],
  },
};

export default function DayOldChicksPage() {
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
            name: 'Day-Old Chicks Price',
            item: 'https://damingrow.com/day-old-chicks',
          },
        ],
      },
      {
        '@type': 'Service',
        name: 'Commercial Day-Old Chicks Sourcing & Live Hatchery Booking Hub',
        serviceType: 'Livestock Supply and Hatchery Allocation',
        description:
          'Direct parent-stock day-old chick allocation and nationwide temperature-controlled dispatch service from CHI Farms, Amo Farms, Zartech, and Supreme across all 36 Nigerian states and FCT.',
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
          name: 'Commercial Day-Old Poultry Breeds',
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
            name: 'How much is a carton of day-old chicks in Nigeria today?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In Nigeria, day-old chick prices are determined every week by primary hatcheries based on parent stock feed costs and seasonal demand. Currently, commercial broiler cartons (50+1 chicks) range between ₦95,000 and ₦115,000 depending on the breed (Ross 308, Cobb 500, Arbor Acres). Layer pullets (ISA Brown, Hy-Line) average ₦170,000 to ₦185,000 per carton of 51 chicks. Foreign turkey cartons (30 poults) range between ₦160,000 and ₦175,000. Real-time rates are confirmed twice weekly via our live WhatsApp desk.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why do day-old chick prices fluctuate between Monday and Thursday dispatches?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Commercial breeding operations set incubation eggs 21 days in advance. Hatcheries typically run two major pull cycles each week: Monday and Thursday. When weekend demand surges from farmers restocking after slaughter, Monday prices may rise slightly. Conversely, Thursday runs often feature steady pricing. Furthermore, exchange rate shifts impacting imported parent stock vitamins and feed ingredients directly affect weekly hatchery gate prices.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the 50+1 packaging rule and why does it matter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under genuine certified hatchery guidelines, every commercial carton of broilers, pullets, or cockerels contains 50 invoiced birds plus 1 extra chick (51 chicks total). This additional chick serves as an automatic livability buffer to offset minor transit stress. Unlicensed middlemen frequently open cartons before delivery, remove the bonus chick or replace vigorous chicks with undersized runts. D-AminGrow guarantees factory-sealed cartons with intact hatchery tamper tape.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the 50% commitment deposit protect my flock allocation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Primary hatcheries (CHI, Zartech, Amo, Supreme) operate strict bio-secure reservation queues. Because live chicks cannot be stored on shelves after hatching, hatcheries only pull and allocate boxes to verified pre-orders. A 50% commitment deposit transferred to our corporate Zenith Bank account (1017894562, D-AminGrow Agric Ltd) guarantees your slot on the hatch pull list. The remaining balance clears on dispatch morning before vehicle departure.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the order cut-off deadlines for Monday and Thursday nationwide dispatches?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To allow adequate time for veterinary crating and interstate logistics manifest coordination: Monday dispatch bookings and deposits close on Saturday at 12:00 PM (noon). Thursday dispatch bookings close on Tuesday at 5:00 PM. Bookings received after these cut-off deadlines automatically roll over to the next hatch day.',
            },
          },
          {
            '@type': 'Question',
            name: 'How are the chicks transported safely to my state or town?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Chicks depart early in the morning from primary hatchery hubs in Ibadan or Ogun State in specialized, ventilated boxes loaded into dedicated commercial motor park transit vehicles. Our logistics desk provides prompt dispatch notifications containing the driver’s contact, vehicle registration number, and motor park waybill receipt so you can track arrival and collect within two hours.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are the day-old chicks pre-vaccinated against Marek’s Disease?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. All day-old broiler and layer pullet chicks allocated through D-AminGrow receive subcutaneous Marek’s Disease vaccine (HVT strain, 0.2ml per bird) administered via automated hatchery vaccination equipment immediately post-hatch. You will receive an official veterinary calendar detailing subsequent Newcastle Disease (ND) and Gumboro (IBD) drinking water administrations.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the procedure if I notice mortality upon unboxing at the motor park depot?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every carton includes 1 extra chick to absorb normal transit vibration. If mortality exceeds this buffer due to transit mechanical delays, you must record an unbroken, 360-degree unboxing video at the motor park depot within 2 hours of bus arrival showing unbroken carton seals and dead birds. Transmit this video immediately to our WhatsApp desk for verification and compensatory credit.',
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
      <DayOldChicksClient nextMonday={nextMonday} nextThursday={nextThursday} />
    </>
  );
}
