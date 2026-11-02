import { Metadata } from 'next';
import FcrCalculatorClient from './fcr-calculator-client';

export const metadata: Metadata = {
  title: 'Poultry Feed Conversion Ratio (FCR) & Feed Cost Calculator | D-AminGrow',
  description:
    'Calculate exact FCR, feed cost per kilogram of meat, live bird weight efficiency, and money lost to feed wastage for commercial broilers, pullets, and turkeys in Nigeria.',
  openGraph: {
    title: 'Poultry FCR & Feed Cost Margin Calculator | D-AminGrow Nigeria',
    description:
      'Scientifically evaluate feed intake vs meat yield. Discover whether your flock meets Cobb 500, Ross 308, or Arbor Acres international benchmarks.',
    type: 'website',
  },
};

export default function FcrCalculatorPage() {
  return <FcrCalculatorClient />;
}
