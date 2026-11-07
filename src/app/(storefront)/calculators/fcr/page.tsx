import { Metadata } from 'next';
import FcrCalculatorClient from './fcr-calculator-client';

// ============================================================
// FAQ JSON-LD SCHEMA
// ============================================================
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you calculate Feed Conversion Ratio (FCR) in poultry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Feed Conversion Ratio (FCR) is calculated by dividing the total feed consumed (in kilograms) by the total live weight gained by the flock (in kilograms): FCR = Total Feed Consumed (kg) ÷ Total Live Weight Gained (kg). For example, if 1,000 broilers consume 3,300 kg of feed and reach an average live weight of 2.2 kg (2,200 kg total live weight), the FCR is 3,300 ÷ 2,200 = 1.50.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good FCR for commercial broilers in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Nigeria, a good commercial broiler FCR at 6 weeks (42 days) is between 1.55 and 1.65 for fast-growing breeds like Cobb 500 and Ross 308 under proper environmental control. An FCR below 1.50 indicates exceptional efficiency. An FCR above 1.85 at 6 weeks indicates severe profit leakage, typically caused by feed spillage into litter, gut enteritis, subclinical coccidiosis, or poor quality feed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much money does a 0.1 improvement in broiler FCR save?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Feed represents 70% to 75% of total broiler production cost in Nigeria. A 0.1 reduction in FCR (for instance, dropping from 1.75 to 1.65) on a 1,000-bird flock harvesting at 2.2 kg saves 220 kg of feed — approximately 8.8 bags of 25kg feed. At current average feed prices of ₦23,500 per bag, this saves between ₦180,000 and ₦205,000 in net profit per 1,000 birds every 6-week cycle.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes poor FCR on Nigerian poultry farms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The primary drivers of poor FCR in Nigeria are: (1) Feeder height and lip misadjustment causing 8–15% direct feed spillage into litter; (2) Subclinical coccidiosis and necrotic enteritis damaging intestinal villi and preventing nutrient absorption; (3) High pen temperatures causing heat stress, where birds pant and burn energy without gaining weight; (4) Sub-standard or adulterated commercial feed lacking required amino acid levels (Lysine and Methionine).',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does broiler FCR increase as the birds get older?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As broilers age, their basal metabolic body mass increases, meaning a larger proportion of daily feed intake is used simply for maintenance (keeping organs functioning and maintaining body heat) rather than building new muscle tissue. Beyond 6 to 7 weeks, muscle growth slows while fat deposition and maintenance requirements surge, driving FCR rapidly from 1.60 up to 2.10+.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can gut probiotics and enzymes improve poultry FCR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Multi-strain gut probiotics (Bacillus subtilis, Lactobacillus) and exogenous enzymes (phytase, xylanase) improve nutrient digestibility and strengthen the intestinal mucosal barrier. Clinical field trials demonstrate an average FCR improvement of 0.05 to 0.12 points when probiotics are administered in drinking water during vaccination, post-antibiotic recovery, and stress periods.',
      },
    },
  ],
};

// ============================================================
// PAGE METADATA
// ============================================================
export const metadata: Metadata = {
  title: 'Feed Conversion Ratio (FCR) Calculator | Poultry Feed Efficiency Tool | D-AminGrow',
  description:
    'Calculate exact poultry FCR, feed cost per kg of meat, and money lost to feed wastage for broilers, turkeys, and cockerels in Nigeria. Compare against Cobb 500 & Ross 308 benchmarks.',
  openGraph: {
    title: 'Poultry Feed Conversion Ratio (FCR) Calculator & Feed Efficiency Analyzer',
    description:
      'Scientifically evaluate feed intake vs live weight gain. Discover whether your flock meets international commercial broiler benchmarks and eliminate profit leaks.',
    type: 'website',
  },
};

export default function FcrCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <FcrCalculatorClient />
    </>
  );
}
