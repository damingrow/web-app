import React from 'react';
import { Metadata } from 'next';
import { DiseaseTriageClient } from './disease-triage-client';

export const metadata: Metadata = {
  title: 'Poultry Disease Diagnosis & Treatment | Emergency Flock Triage | D-AminGrow',
  description:
    'Identify and treat acute poultry diseases in Nigeria. Interactive symptom checker, post-mortem differential scoring, and emergency veterinary triage by certified VCN clinicians.',
  keywords: [
    'poultry disease diagnosis and treatment',
    'poultry disease symptoms identification',
    'sudden chicken mortality triage',
    'coccidiosis treatment protocol',
    'newcastle disease emergency response',
    'post-mortem poultry necropsy',
    'how to identify and treat poultry diseases',
    'sudden mortality in broiler chicks causes',
    'chicken disease diagnosis and treatment chart',
    'poultry veterinary emergency triage nigeria',
  ],
  alternates: {
    canonical: 'https://damingrow.com/services/consultation/disease-triage',
  },
  openGraph: {
    title: 'Poultry Disease Diagnosis & Treatment | Emergency Flock Triage | D-AminGrow',
    description:
      'Stop unexplained flock mortality with rapid clinical symptom scoring, veterinary differential diagnosis, and on-farm necropsy support across Nigeria.',
    url: 'https://damingrow.com/services/consultation/disease-triage',
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
      name: 'What should I do immediately if I notice bloody droppings in my broiler pen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bloody droppings are a classic hallmark of acute Caecal Coccidiosis caused by Eimeria tenella. Immediately commence treatment with Toltrazuril (2.5% oral solution at 1ml per liter of drinking water for 2 consecutive days) or Amprolium 20% water-soluble powder. Avoid giving multivitamin preparations containing Vitamin B1 (thiamine) during Amprolium treatment, as thiamine directly antagonizes the action of Amprolium.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a live vaccine like LaSota cure an active outbreak of Newcastle Disease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Administering a live viral vaccine (like LaSota or B1) to a flock that is already actively suffering from Newcastle Disease will accelerate mortality. Vaccines stimulate the immune system and cause a mild stress reaction; introducing live virus into an immunocompromised, viremic bird can trigger acute organ failure. Treatment during an outbreak focuses on supportive care, electrolyte hydration, vitamins, and broad-spectrum antibiotics solely to prevent secondary bacterial complications.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly does D-AminGrow triage an urgent farm disease case?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When you submit clinical symptoms and flock mortality parameters through our digital triage form, our duty veterinary clinician reviews the case file within 2 hours. If your farm is located within Lagos, Ogun, Oyo, Osun, or Kwara states, an on-farm diagnostic technician can be dispatched within 24 to 48 hours for physical post-mortem examination.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes sudden high mortality in 3 to 5-week-old broilers without prior symptoms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sudden, acute mortality in this age bracket is most commonly caused by Very Virulent Infectious Bursal Disease (vvIBD / Gumboro), acute Caecal Coccidiosis, heat prostration (temperatures > 36°C without ventilation), or toxic chemical/feed contamination (such as acute mycotoxicosis from aflatoxin-laden maize). Immediate necropsy is required to inspect the bursa, caeca, and kidneys.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I perform a field post-mortem necropsy safely?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Necropsy should only be conducted using personal protective equipment (rubber boots, disposable gloves, face mask). Select 2 to 3 freshly dead or moribund birds. Disinfect the carcass exterior, soak feathers with disinfectant solution to avoid airborne feather dust, make a midline incision, and systematically inspect the trachea, air sacs, heart, liver, proventriculus, intestines, caecal pouches, and bursa of Fabricius. Always bury carcasses in a deep lime-lined pit afterwards.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Newcastle Disease and Infectious Coryza?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While both produce respiratory signs, Infectious Coryza is a bacterial disease (Avibacterium paragallinarum) characterized by distinctive foul-smelling nasal discharge, severe facial swelling, and eye conjunctivitis with low mortality but severe feed drop. Newcastle Disease is a virulent viral infection causing high mortality, bright greenish diarrhea, and characteristic neurological signs (twisted neck, leg paralysis).',
      },
    },
  ],
};

export default function DiseaseTriagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <DiseaseTriageClient />
    </>
  );
}
