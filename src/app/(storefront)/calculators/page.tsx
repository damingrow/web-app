import { Metadata } from 'next';
import { CalculatorsHubClient } from './calculators-hub-client';

export const metadata: Metadata = {
  title: 'Poultry Farm Planning Calculators & Diagnostic Tools | D-AminGrow Nigeria',
  description:
    'Free clinical agricultural utilities for Nigerian & African poultry farmers: Feed Conversion Ratio (FCR), Hen-Day Egg Production (HDP), Brooder Equipment Sizing, Vaccination Timetable, and Disease Symptom Triager.',
  openGraph: {
    title: 'Poultry Calculators & Disease Diagnostic Triager | D-AminGrow',
    description:
      'Professional interactive decision tools to calculate brooding space, FCR, egg margins, vaccination schedules, and clinical symptom matching.',
    type: 'website',
  },
};

export default function CalculatorsHubPage() {
  return <CalculatorsHubClient />;
}
