import React from 'react';
import type { Metadata } from 'next';
import { ContactClient } from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Us | Poultry Support, Chick Booking & Farm Inquiries',
  description:
    'Contact D-AminGrow fast farm support center in Nigeria. Direct day-old chick booking, 2°C–8°C cold-chain vaccines, NAFDAC-approved medications, and farm advisory across Africa.',
  keywords: [
    'poultry farm customer service nigeria',
    'livestock helpdesk',
    'agro allied helpline',
    'chick dispatch depots',
    'veterinary consultation WhatsApp',
    'farm support Ibadan Lagos',
    'damingrow contact number and whatsapp',
    'poultry consultancy phone number nigeria',
    'day old chicks customer care nigeria',
    'livestock medication enquiry line',
    'poultry equipment supplier contact nigeria',
    'chi amo zartech chick booking phone',
  ],
  openGraph: {
    title: 'Contact Us | Poultry Support, Chick Booking & Farm Inquiries',
    description:
      'Direct contact desk for commercial poultry inputs, day-old chick booking, cold-chain vaccines, and veterinary advisory across Nigeria and African markets.',
    url: 'https://damingrow.com/contact',
    siteName: 'D-AminGrow',
    locale: 'en_NG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://damingrow.com/contact',
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact D-AminGrow: Fast Farm Support Center',
    url: 'https://damingrow.com/contact',
    description:
      'Official commercial livestock inputs, day-old chick booking, cold-chain vaccine logistics, and veterinary farm advisory contact desk in Nigeria.',
    mainEntity: {
      '@type': 'AgroAlliedOrganization',
      name: 'D-AminGrow Agric Ltd',
      telephone: '+2348139169402',
      email: 'info@damingrow.com',
      url: 'https://damingrow.com',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: '12 Oluyole Extension',
          addressLocality: 'Ibadan',
          addressRegion: 'Oyo State',
          addressCountry: 'NG',
          description: 'Central Logistics & Technical Headquarters',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: '20 Simarch Street, Agric Bus Stop, Ojo',
          addressLocality: 'Ojo',
          addressRegion: 'Lagos State',
          addressCountry: 'NG',
          description: 'Lagos Operations Hub & Commercial Office',
        },
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+2348139169402',
          contactType: 'Commercial Chick Booking & Allotment Desk',
          contactOption: 'HearingImpairedSupported',
          areaServed: ['NG', 'GH', 'BJ', 'West Africa'],
          availableLanguage: ['English', 'Yoruba', 'Hausa', 'Igbo'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+2348139169402',
          contactType: 'Cold-Chain Biologicals & Inter-State Waybill Desk',
          areaServed: 'NG',
          availableLanguage: ['English', 'Yoruba', 'Pidgin'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+2348139169402',
          contactType: 'Veterinary Clinical Advisory & Farm Emergency Triage',
          areaServed: 'NG',
          availableLanguage: ['English', 'Yoruba'],
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "How do I get today's confirmed chick prices and lock my quota?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Day-old chick prices in Nigeria change weekly based on parent-stock availability, grain inputs, and operational costs. We do not publish speculative prices. Message our booking desk directly on WhatsApp (+234 813 916 9402) to get today's confirmed rates for broilers, pullets, or turkeys, and receive your allocation reference.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cutoff deadline for Monday and Thursday hatch runs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Interstate hatch allocations require strict 48-hour pre-booking. For Monday dispatch, your reservation deposit must be verified before Saturday 2:00 PM WAT. For Thursday dispatch, booking closes Tuesday at 2:00 PM WAT. This ensures chicks move directly from the hatchers into temperature-controlled transit boxes without delay.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I verify I am making payments to the official D-AminGrow account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'D-AminGrow strictly receives commercial deposits into our verified corporate bank account: Zenith Bank Plc, Account Number: 1017894562, Account Name: D-AminGrow Agric Ltd. We will never ask you to transfer funds to any personal account or fintech wallet. If you receive an alternative account from any source, contact our emergency desk immediately.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does interstate motor park waybill dispatch work for day-old chicks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "On Monday and Thursday mornings, chicks leave primary sorting in Ibadan before the intense heat of the afternoon. Immediately upon loading, our logistics desk WhatsApps you the driver's phone number, vehicle plate number, and waybill receipt. You can call the driver directly while tracking estimated arrival at your city's registered motor park.",
        },
      },
      {
        '@type': 'Question',
        name: 'How do you guarantee cold-chain integrity (2°C–8°C) for vaccines sent to distant states?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every biological shipment is packed inside high-density insulated foam containers with pre-chilled commercial ice gel packs and temperature indicator cards. We verify destination transit hours before dispatch to ensure viral viability remains 100% active upon collection at your local depot.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are your veterinary medications and supplements NAFDAC-approved?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. As an authorized agro-allied distributor and reseller, we only source and distribute genuine, tested veterinary pharmaceuticals and premixes from licensed producers. We do not manufacture drugs; every product features verified manufacturer batch dossiers and clear withdrawal timelines.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I speak directly with a veterinary professional if my birds are dying?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our clinical advisory desk is staffed in partnership with licensed Veterinary Council of Nigeria (VCN) professionals. If your flock experiences sudden mortality, unusual droppings, or respiratory distress, WhatsApp photos, videos, and flock history for immediate triage before field medication.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactClient />
    </>
  );
}
