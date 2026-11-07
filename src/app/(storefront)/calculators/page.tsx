import { Metadata } from 'next';
import { CalculatorsHubClient } from './calculators-hub-client';

// ============================================================
// FAQ JSON-LD SCHEMA
// ============================================================
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What free poultry farming calculators does D-AminGrow provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'D-AminGrow provides 5 free clinical agricultural calculators: (1) FCR & Feed Margin Calculator — feed efficiency and profit per bird; (2) Hen-Day Egg Production (HDP) Calculator — laying curve and monthly egg margin; (3) Livestock Disease Symptom Triager — clinical questionnaire matching symptoms to probable diseases; (4) Brooder Floor Space & Gas Heating Calculator — gas brooders needed, floor area, feeders, drinkers; (5) Poultry Vaccination Timetable Generator — day-by-day immunization schedule from flock placement date.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Feed Conversion Ratio (FCR) calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The FCR calculator takes your total feed consumed (kg), live weight gain (kg), and feed cost per kg. It outputs your FCR rating, cost of feed per kg of live bird weight, comparison against international breed benchmarks (Ross 308, Arbor Acres), and calculates the cost of feed wastage. For every 0.1 improvement in FCR on a 1,000-bird flock, you typically save ₦150,000–₦180,000 per cycle.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Hen-Day Egg Production (HDP) and how is it calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hen-Day Production (HDP) = (eggs laid in a day ÷ number of hens present that day) × 100. D-AminGrow\'s HDP calculator tracks your laying curve against ISA Brown and Lohmann White breed standards, calculates daily egg crates harvested, feed cost per crate, and net monthly gross egg margin so you can identify production dips caused by nutritional deficits, disease onset, or lighting irregularities.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the brooder sizing calculator work for Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The D-AminGrow brooder calculator asks for flock size, housing dimensions (length × width), and local ambient temperature. It calculates required floor space in m² and ft², number of LPG canopy brooders (BTU-adjusted for Nigerian tropical climate), bell drinkers, feeding trays, and starter feed bags for the first 21 days. It is calibrated for Nigeria\'s harmattan cold nights and wet season ambient temperatures to keep first-week mortality under 1.5%.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the disease symptom triager work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Livestock Disease Symptom Triager is a clinical questionnaire that matches your observed symptoms (bloody droppings, snicking, twisted neck, egg drops, sudden death, laboured breathing) to probable poultry diseases with risk severity levels and emergency farm protocols. It helps farmers avoid indiscriminate antibiotic misuse and triggers rapid biosecure containment within minutes of symptom onset.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can the vaccination timetable calculator generate a printable schedule?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The D-AminGrow vaccination timetable generator produces a day-by-day immunization schedule based on your flock placement date — for broilers (Day 1 to market), layers (Day 1 to 22-week pre-lay), or turkeys. Each event shows exact calendar dates, vaccine strain, administration route, and cold-chain protocol. The full printable version is available at /vaccination-program.',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Free Poultry Farming Calculators | FCR, Brooder & Layer Tools | D-AminGrow',
  description:
    'Free clinical poultry farming calculators for Nigerian farmers: Feed Conversion Ratio (FCR), Hen-Day Egg Production (HDP), Brooder Equipment Sizing, Vaccination Timetable, and Disease Symptom Triager. No registration required.',
  openGraph: {
    title: 'Free Poultry Farming Calculators | FCR, Brooder & Layer Tools',
    description: 'Professional interactive decision tools: FCR calculator, egg production margin, brooding space sizing, vaccination timetable generator, and clinical symptom matching.',
    type: 'website',
  },
};

export default function CalculatorsHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <CalculatorsHubClient />
    </>
  );
}
