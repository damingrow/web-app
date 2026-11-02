import { Metadata } from 'next';
import EggCalculatorClient from './egg-calculator-client';

export const metadata: Metadata = {
  title: 'Hen-Day Egg Production (HDP) & Layer Margin Calculator | D-AminGrow',
  description:
    'Evaluate commercial layer performance in Nigeria: calculate Hen-Day Production Percentage (HDP), daily egg crates, feed cost per crate, and monthly gross profit margin against ISA Brown and Lohmann benchmarks.',
  openGraph: {
    title: 'Hen-Day Egg Production (HDP) & Layer Profitability Calculator | D-AminGrow',
    description:
      'Scientific layer hen efficiency tool. Detect drop in egg production early and compute crate production costs.',
    type: 'website',
  },
};

export default function EggProductionCalculatorPage() {
  return <EggCalculatorClient />;
}
