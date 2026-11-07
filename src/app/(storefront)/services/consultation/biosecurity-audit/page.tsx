import React from 'react';
import { Metadata } from 'next';
import { BiosecurityAuditClient } from './biosecurity-audit-client';

export const metadata: Metadata = {
  title: 'Poultry Farm Biosecurity Audit | 10-Point Disease Barrier Scorecard | D-AminGrow',
  description:
    'Evaluate your poultry farm biosecurity defences with our interactive 10-point scorecard. Protect your flock from Newcastle, Gumboro, and Avian Influenza with certified VCN clinical protocols.',
  keywords: [
    'poultry farm biosecurity audit',
    'poultry biosecurity checklist',
    'disease barrier protocol',
    'farm disinfection standards',
    'wild bird exclusion netting',
    'footbath disinfectant dilution',
    'poultry biosecurity audit checklist pdf',
    'how to prevent disease outbreaks on poultry farms',
    'poultry farm disinfection and sanitation protocol',
    'farm bio security inspection nigeria',
  ],
  alternates: {
    canonical: 'https://damingrow.com/services/consultation/biosecurity-audit',
  },
  openGraph: {
    title: 'Poultry Farm Biosecurity Audit | 10-Point Disease Barrier Scorecard | D-AminGrow',
    description:
      'Prevent devastating viral and bacterial flock outbreaks with systematic veterinary biosecurity audits and barrier protocols across Nigeria.',
    url: 'https://damingrow.com/services/consultation/biosecurity-audit',
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
      name: 'What is a poultry farm biosecurity audit and why is it necessary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A poultry farm biosecurity audit is a systematic clinical evaluation of all physical barriers, operational workflows, water treatment protocols, and sanitation practices on your livestock facility. It identifies pathogen transmission routes (rodents, wild birds, visitor shoes, dirty crates, untreated water) before they cause deadly outbreaks like Newcastle disease, Gumboro, or Avian Influenza.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should footbath disinfectant be replaced in a poultry pen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Footbaths must be emptied, scrubbed, and refilled with fresh disinfectant solution at least every 48 hours in dry conditions, and daily during wet or high-traffic periods. Organic matter like poultry litter, mud, and feces rapidly neutralizes active chemical disinfectants (such as quaternary ammonium compounds or glutaraldehyde), turning old footbaths into bacterial reservoirs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is untreated borehole water dangerous for commercial broilers and layers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Even clear borehole water often carries elevated microbial loads, including coliforms, E. coli, and Salmonella, along with dissolved iron and calcium. Inside drinking waterlines, bacteria form a protective slime matrix known as biofilm. Biofilm shields pathogens from antibiotics, causing chronic gut inflammation, watery droppings, and poor nutrient absorption.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does "all-in, all-out" flock management mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All-in, all-out management means rearing only birds of the exact same age in a given farm facility or pen sector, and dispatching all of them together before cleaning and resting the pen. Mixing different ages (e.g. brooding day-old chicks next to 6-week broilers or adult layers) is disastrous because older carrier birds shed virulent pathogens that devastate younger chicks with immature immune systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does D-AminGrow conduct an on-farm biosecurity audit in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our registered veterinary clinicians visit your farm to conduct a thorough 10-point barrier inspection. We test drinking water pH and microbial quality, inspect fence integrity, evaluate mortality disposal pits, assess staff footbath protocols, and produce a formal VCN Biosecurity Scorecard with prioritized corrective action steps.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can improving biosecurity reduce my farm medication costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Commercial farms that achieve an institutional biosecurity index of 85%+ routinely experience an 80% reduction in antibiotic expenditures. Because viral and severe bacterial challenges are prevented from entering the farm, birds do not require frequent prophylactic antibiotic treatments, lowering cost-per-kg of meat produced.',
      },
    },
  ],
};

export default function BiosecurityAuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <BiosecurityAuditClient />
    </>
  );
}
