import { Metadata } from 'next';
import BrooderCalculatorClient from './brooder-calculator-client';

export const metadata: Metadata = {
  title: 'Poultry Brooder Equipment Calculator | D-AminGrow Nigeria',
  description:
    'Calculate exact brooding space, radiant gas heating units, starter feeding trays, drinkers, and estimated equipment cost for your flock of day-old chicks in Nigeria.',
  openGraph: {
    title: 'Poultry Brooder Equipment Calculator | D-AminGrow',
    description:
      'Interactive farm planning utility to size gas brooders, feeders, and floor space for broilers and pullets.',
    type: 'website',
  },
};

export default function BrooderCalculatorPage() {
  return <BrooderCalculatorClient />;
}
