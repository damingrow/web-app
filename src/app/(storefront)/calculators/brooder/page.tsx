import { Metadata } from 'next';
import BrooderCalculatorClient from './brooder-calculator-client';

// ============================================================
// FAQ JSON-LD SCHEMA
// ============================================================
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What temperature should a chick brooder be in Celsius for Weeks 1 through 4?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The standard poultry brooding temperature schedule in Celsius is: Week 1 (Days 1–7): 32°C to 35°C at chick height; Week 2 (Days 8–14): 29°C to 30°C; Week 3 (Days 15–21): 26°C to 27°C; Week 4 (Days 22–28): 22°C to 24°C. As a general rule, reduce temperature by approximately 3°C per week until chicks are fully feathered or ambient room temperature is reached.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can you tell if day-old chicks are too cold, too hot, or comfortable in the brooder?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Observe chick spatial distribution: (1) Comfortable: Chicks are evenly dispersed across the brooder floor, actively feeding, drinking, and vocalizing softly; (2) Too Cold: Chicks crowd tightly directly under the heat source, piling on top of each other and chirping shrilly; (3) Too Hot: Chicks retreat to the perimeter walls, panting with open beaks and wings extended away from their bodies; (4) Drafty: Chicks huddle on one side of the pen away from air drafts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many chicks can one LPG radiant canopy gas brooder heat in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A standard 20,000–25,000 BTU infrared radiant canopy gas brooder comfortably heats between 500 and 900 day-old chicks in a controlled tropical brooding ring. During cold harmattan nights in Northern and Central Nigeria, limit capacity to 500–600 chicks per brooder. During warm wet season conditions in Southern Nigeria, a single unit can support up to 900 chicks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much brooding floor space is required per chick?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'During the first 14 days of brooding, allow 0.05 square meters (approx. 0.54 square feet) per chick inside the circular brooder guard ring. This equals roughly 20 chicks per square meter. As chicks grow into Week 3 and 4, expand the ring outwards to double the floor space (0.09–0.10 m² per bird) to prevent overcrowding and wet litter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why are circular brooder guard rings recommended instead of square corners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Circular brooder rings made of cardboard, corrugated plastic, or hardboard prevent 90-degree corners. When chicks feel a sudden drop in temperature or get startled, they naturally run into corners and pile on top of each other. In square corners, bottom chicks quickly suffocate and die. Curved walls eliminate crush corners entirely.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long before chick arrival should the brooder be pre-heated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pre-heat the brooder pen for at least 4 to 6 hours before day-old chicks arrive. It is not enough for the air to be warm — the floor concrete and wood shaving litter must absorb heat to reach 32°C. Placing day-old chicks on cold litter causes rapid hypothermia, delayed yolk sac absorption, and elevated first-week mortality.',
      },
    },
  ],
};

// ============================================================
// PAGE METADATA
// ============================================================
export const metadata: Metadata = {
  title: 'Brooder Temperature Chart & Calculator | Weekly Chick Heat Guide | D-AminGrow',
  description:
    'Calculate chick brooding space, gas brooder units, feeding trays, and weekly Celsius temperature schedule. Keep first-week chick mortality below 1.5% with D-AminGrow.',
  openGraph: {
    title: 'Brooder Temperature Calculator & Weekly Heat Management Guide',
    description:
      'Interactive farm engineering utility: calculate floor area, radiant gas brooders, starter feed, and Celsius temperature schedule for day-old broilers and pullets in Nigeria.',
    type: 'website',
  },
};

export default function BrooderCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <BrooderCalculatorClient />
    </>
  );
}
