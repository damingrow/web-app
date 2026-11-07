import { Metadata } from 'next';
import EggCalculatorClient from './egg-calculator-client';

// ============================================================
// FAQ JSON-LD SCHEMA
// ============================================================
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the formula for calculating Hen-Day Egg Production (HDEP) percentage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hen-Day Egg Production (HDEP) measures the biological efficiency of surviving layers on a given day. The formula is: HDEP (%) = (Total Eggs Collected Today ÷ Total Live Hens Present Today) × 100. For example, if you have 950 surviving hens in your pen today and collect 855 eggs, your Hen-Day Production is (855 ÷ 950) × 100 = 90.0%.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Hen-Day (HDEP) and Hen-Housed (HHEP) egg production?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hen-Day Egg Production (HDEP) divides eggs by the number of currently living hens — reflecting biological laying performance. Hen-Housed Egg Production (HHEP) divides eggs by the original number of pullets placed in the pen at the start of lay (e.g. at 18–20 weeks). HHEP reflects true financial profitability because it penalizes flock mortality. If you have 0% mortality, HDEP equals HHEP.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the peak egg production percentage for commercial layers in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For modern commercial brown egg breeds like ISA Brown and Lohmann Brown, peak egg production typically reaches 92% to 96% between 26 and 32 weeks of age under proper management. Production remains above 85% for roughly 30 weeks before gradually declining by 0.5% to 0.8% per week towards end of lay.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many eggs are in a commercial egg crate in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Nigeria, standard plastic and paper pulp commercial egg crates hold exactly 30 eggs arranged in a 5×6 pocket pattern. When calculating daily farm yields, divide total harvested eggs by 30 to determine crate yield (e.g., 900 eggs = 30 crates).',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes sudden egg production drops on commercial poultry farms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sudden egg drops are triggered by: (1) Light duration reductions — layers require 16 hours of continuous light daily; a 2-hour interruption halts ovulation within 48 hours; (2) Water failure for more than 3–4 hours during hot afternoons; (3) Viral challenges including Egg Drop Syndrome (EDS-76), Newcastle Disease (ND LaSota breach), and Infectious Bronchitis (IB); (4) Calcium/phosphorus feed imbalance; (5) Heat stress above 34°C.',
      },
    },
    {
      '@type': 'Question',
      name: 'At what laying percentage should commercial layer hens be culled or sold as spent hens?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Nigeria, the commercial culling threshold is typically when Hen-Day Production drops below 60% to 65% (usually around 72 to 80 weeks of age), depending on current feed bag prices versus egg crate market rates. Below 60% HDP, daily egg revenue often fails to cover daily layer feed costs, making the flock economically spent.',
      },
    },
  ],
};

// ============================================================
// PAGE METADATA
// ============================================================
export const metadata: Metadata = {
  title: 'Egg Production Percentage Calculator | Hen-Day Laying Efficiency Tool | D-AminGrow',
  description:
    'Calculate Hen-Day (HDEP) and Hen-Housed (HHEP) egg production rates, daily 30-egg crate yields, feed cost per crate, and net monthly gross margin against ISA Brown & Lohmann benchmarks.',
  openGraph: {
    title: 'Egg Production Percentage Calculator: Hen-Day & Hen-Housed Analysis',
    description:
      'Evaluate commercial layer performance in Nigeria. Track egg laying curves against international breed benchmarks, diagnose sudden egg drops, and calculate daily egg crate revenues.',
    type: 'website',
  },
};

export default function EggProductionCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <EggCalculatorClient />
    </>
  );
}
