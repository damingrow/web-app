import { Metadata } from 'next';
import ServicesClient from './services-client';

export const metadata: Metadata = {
  title: 'Poultry Farm Management Services Nigeria | D-AminGrow Agro-Allied',
  description:
    'Professional commercial poultry farm management in Nigeria. Turnkey farm design, biosecurity auditing, feed formulation, veterinary oversight, and day-to-day operational supervision.',
  keywords: [
    'poultry farm management services nigeria',
    'commercial livestock services',
    'farm operational supervision',
    'technical veterinary consultation',
    'poultry input procurement',
    'turnkey farm engineering',
    'poultry farm management company in nigeria',
    'poultry farm supervision services lagos ibadan',
  ],
  alternates: {
    canonical: 'https://damingrow.com/services',
  },
  openGraph: {
    title: 'Poultry Farm Management Services Nigeria | D-AminGrow Agro-Allied',
    description:
      'Turnkey commercial poultry farm management, technical veterinary advisory, and certified livestock inputs across Nigeria.',
    url: 'https://damingrow.com/services',
    siteName: 'D-AminGrow Agro-Allied',
    type: 'website',
  },
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is included in D-AminGrow’s poultry farm management services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our comprehensive management encompasses turnkey farm engineering layout, daily flock health oversight, biosecurity barrier enforcement, least-cost feed formulation, cold-chain vaccine administration, farm staff training, and rigorous digital yield auditing for broilers and commercial layers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can D-AminGrow manage my poultry farm if I live in the diaspora (UK, US, Canada)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Over 40% of our enterprise clients are diaspora-based Nigerian investors. We provide transparent weekly flock telemetry reports, video site audits, biometric feed consumption reconciliation, and direct bank disbursement tracking to eliminate remote mismanagement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you control mortality and disease outbreaks on client farms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We implement the 4-Pillar Biosecurity Standard: physical entry barriers with footbaths, water pipeline acidification and halogen disinfection, 100% cold-chain biological administration, and immediate post-mortem differential triage within 2 hours of any abnormal flock mortality.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the typical return on investment (ROI) for commercial broiler or layer farms under professional supervision?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'By depressing broiler FCR below 1.55 (saving 300g feed per kg live weight) and maintaining layer peak production above 90% with flock mortality kept strictly under 3%, our client farms typically realize 25% to 38% higher net margins compared to unmanaged facilities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you supply the day-old chicks, feed ingredients, and vaccines for managed farms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. As an integrated agro-allied distributor, D-AminGrow supplies certified day-old chicks (Zartech, Amo, Sayed), NAFDAC-registered veterinary pharmaceuticals, cold-chain vaccines from NVRI Vom, and high-protein feed supplements directly at wholesale institutional rates.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do we get started with an initial farm audit or management contract?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can request an on-site feasibility evaluation or operational diagnostic through our online booking desk or via direct WhatsApp connection. Our lead veterinary consultant will review your flock capacity, location, and operational goals within 2 hours.',
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <ServicesClient />
    </>
  );
}
