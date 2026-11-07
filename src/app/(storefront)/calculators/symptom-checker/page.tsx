import { Metadata } from 'next';
import SymptomCheckerClient from './symptom-checker-client';

// ============================================================
// FAQ JSON-LD SCHEMA
// ============================================================
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the Poultry Disease Symptom Checker work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Poultry Disease Symptom Checker is an algorithmic clinical triage tool. You select observed symptoms across respiratory, enteric, neurological, and reproductive categories (such as bloody droppings, gasping, twisted neck, or sudden mortality). The algorithm matches these against our clinical database of major tropical avian pathogens (Coccidiosis, Newcastle Disease, Gumboro IBD, CRD, EDS-76) and ranks probable diseases by match percentage, providing immediate 60-minute emergency containment protocols.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do immediately if I see bloody droppings in my broiler pen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bloody droppings typically indicate acute Caecal Coccidiosis (Eimeria tenella). Take these immediate steps: (1) Isolate affected birds and remove all damp, caked litter from beneath drinkers; (2) Stop multi-vitamins containing B-complex (thiamine accelerates coccidial multiplication); (3) Administer an approved anticoccidial such as Toltrazuril or Amprolium (e.g. Cocci-Ton) in drinking water; (4) Contact D-AminGrow\'s veterinary desk via WhatsApp for dosage verification.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why should I never treat suspected Newcastle Disease with antibiotics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Newcastle Disease is caused by Avian Paramyxovirus Serotype 1 (a virus). Antibiotics have zero biological effect against viral pathogens. Administering heavy doses of antibiotics to a flock with active Newcastle Disease damages the already-inflamed liver and kidneys, accelerating dehydration and drastically increasing mortality. Flocks require supportive electrolytes, Vitamin C, and emergency ring vaccination of unexposed pens.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes sudden high mortality in 3 to 5-week-old broilers in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common culprits for sudden mortality spikes in 3 to 5-week-old broilers are: (1) Velogenic Newcastle Disease (green watery diarrhea, twisted neck, mortality up to 80%); (2) Infectious Bursal Disease / Gumboro (shivering, vent pecking, whitish diarrhea, enlarged Bursa of Fabricius on post-mortem); (3) Acute Caecal Coccidiosis with necrotic enteritis; (4) Acute heat stress exceeding 34°C with high pen humidity.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can this tool replace a physical veterinary post-mortem necropsy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This symptom checker is a clinical triage and emergency decision support tool designed to help farmers avoid catastrophic errors (like treating viruses with antibiotics) during the critical first 2 hours of symptom onset. Definitive diagnosis requires physical post-mortem examination (necropsy) and laboratory confirmation by a registered Veterinary Council of Nigeria (VCN) clinician.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I send my symptom report to D-AminGrow’s duty veterinarians?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After selecting your symptoms in the tool, click "Send Clinical Triage to Vet Desk on WhatsApp". The tool formats your flock size, bird age, selected signs, and top probable match into a pre-filled clinical message delivered directly to our duty veterinary clinician for rapid response.',
      },
    },
  ],
};

// ============================================================
// PAGE METADATA
// ============================================================
export const metadata: Metadata = {
  title: 'Poultry Disease Symptom Checker | Instant Flock Health Triage Tool | D-AminGrow',
  description:
    'Diagnose sick chickens online with D-AminGrow’s clinical poultry disease symptom checker. Match bloody droppings, snicking, twisted neck, and sudden deaths to Coccidiosis, Newcastle & Gumboro.',
  openGraph: {
    title: 'Poultry Disease Symptom Checker: Clinical Triage & Differential Diagnosis',
    description:
      'Triages respiratory, enteric, neurological, and reproductive poultry symptoms to Coccidiosis, Newcastle Disease, IBD (Gumboro), CRD, and EDS-76 with emergency farm protocols.',
    type: 'website',
  },
};

export default function SymptomCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <SymptomCheckerClient />
    </>
  );
}
