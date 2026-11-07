import React from 'react';
import { Metadata } from 'next';
import { FarmSetupClient } from './farm-setup-client';

export const metadata: Metadata = {
  title: 'Poultry Farm Setup Cost in Nigeria | Construction & Equipment Blueprint | D-AminGrow',
  description:
    'Comprehensive guide and interactive blueprint calculator for commercial poultry farm setup cost in Nigeria. Detailed pen construction estimates, stocking densities, equipment, and BOQs.',
  keywords: [
    'poultry farm setup cost in nigeria',
    'poultry pen construction cost',
    'commercial broiler farm setup',
    'layer battery cage house design',
    'livestock farm layout plan',
    'cost of setting up a poultry farm in nigeria',
    '1000 broiler farm setup cost nigeria',
    'poultry house construction cost in nigeria',
    'modern poultry farm layout design',
  ],
  alternates: {
    canonical: 'https://damingrow.com/services/consultation/farm-setup',
  },
  openGraph: {
    title: 'Poultry Farm Setup Cost in Nigeria | Construction & Equipment Blueprint | D-AminGrow',
    description:
      'Commercial poultry farm housing blueprints, bill of quantities (BOQ), and real-time setup cost estimates for Nigerian farmers.',
    url: 'https://damingrow.com/services/consultation/farm-setup',
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
      name: 'How much does it cost to set up a 1,000 broiler poultry farm in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In 2026, constructing an open-sided commercial poultry pen for 1,000 broilers in Nigeria typically costs between ₦3,500,000 and ₦4,800,000 for the building (blocks, timber trusses, aluminum roofing, wire mesh, concrete floor). Equipment (feeders, bell drinkers, heating brooders, weighing scales) adds ₦600,000 to ₦900,000. Working capital for day-old chicks, feeds to 6 weeks, vaccines, and medication requires approximately ₦2,600,000 to ₦3,200,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why must poultry pens in Nigeria always face East-to-West?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In tropical Nigeria, the sun travels directly overhead along the east-to-west trajectory. Aligning the long axis of the poultry pen strictly east-to-west ensures that the direct morning and evening sunlight strikes only the narrow gable end walls, keeping the long open wire-mesh sidewalls completely in the shade. This prevents midday greenhouse heat buildup, keeping internal pen temperatures 3°C to 5°C cooler.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the ideal floor space requirement per bird for broilers vs layers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For open-sided deep litter broiler pens in Nigeria, the standard stocking density is 10 birds per square meter (0.1 m² or ~1.1 sq ft per bird). In closed tunnel-ventilated houses with cooling pads, this can increase to 14–15 birds/m². For commercial layers on deep litter, provide 0.15 m² per bird; in multi-tier battery cage systems, cages provide approximately 0.045 m² to 0.05 m² per bird.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take from site clearing to receiving the first batch of chicks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A standard 1,000 to 5,000 bird open-sided poultry house takes between 4 and 7 weeks to construct, cure concrete floors, install equipment, and undergo thorough dry-out, power washing, and chemical disinfection before chick arrival. We recommend an absolute minimum 10-day downtime post-disinfection before introducing day-old chicks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can D-AminGrow engineers supervise my local construction workers on site?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our poultry engineering team provides both complete turnkey construction management and technical site supervisory visits. We inspect foundational leveling, wall height accuracy, roof pitch angle, ridge vent openings, and waterline hydraulic slopes to prevent costly structural contractor errors.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get an architectural pen blueprint and customized bill of quantities (BOQ)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can generate an initial structural floor plan estimate using our interactive blueprint calculator on this page, and submit your inquiry form. Our senior consulting desk will reach out within 2 hours to discuss your land dimensions, soil profile, and provide a full engineering proposal.',
      },
    },
  ],
};

export default function FarmSetupPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <FarmSetupClient />
    </>
  );
}
