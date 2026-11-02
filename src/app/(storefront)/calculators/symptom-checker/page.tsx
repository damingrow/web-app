import { Metadata } from 'next';
import SymptomCheckerClient from './symptom-checker-client';

export const metadata: Metadata = {
  title: 'Poultry Disease Symptom Triaging Assistant & Diagnostic Tool | D-AminGrow',
  description:
    'Interactive clinical poultry disease symptom triager for Nigerian & African farmers. Match observed flock signs (bloody droppings, snicking, twisted neck, egg drops) to probable diseases with biosecure emergency protocols.',
  openGraph: {
    title: 'Poultry Disease Symptom Checker & Emergency Guide | D-AminGrow',
    description:
      'Triages respiratory, enteric, neurological, and reproductive poultry symptoms to Coccidiosis, Newcastle Disease, IBD (Gumboro), CRD, and EDS-76.',
    type: 'website',
  },
};

export default function SymptomCheckerPage() {
  return <SymptomCheckerClient />;
}
