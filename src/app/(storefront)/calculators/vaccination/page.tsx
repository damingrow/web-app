import { Metadata } from 'next';
import VaccinationCalculatorClient from './vaccination-calculator-client';

export const metadata: Metadata = {
  title: 'Poultry Vaccination Schedule Generator | Personalized Flock Calendar | D-AminGrow',
  description:
    'Generate a customized day-by-day poultry vaccination calendar for your arrival date. Timetables for broilers and commercial layers against Newcastle, Gumboro, and Fowl Pox.',
  keywords: [
    'poultry vaccination schedule generator',
    'custom hatch date vaccine generator',
    'flock immunization calendar tool',
    'automated chicken vaccine schedule generator',
    'broiler vaccination calendar nigeria',
    'layer vaccination chart by age',
    'water administration calculator poultry',
  ],
  alternates: {
    canonical: 'https://damingrow.com/calculators/vaccination',
  },
  openGraph: {
    title: 'Poultry Vaccination Schedule Generator | Personalized Flock Calendar | D-AminGrow',
    description:
      'Generate custom day-by-day poultry vaccination calendars for broilers and layers calibrated to Nigerian tropical farming conditions.',
    url: 'https://damingrow.com/calculators/vaccination',
    siteName: 'D-AminGrow Agro-Allied',
    type: 'website',
  },
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the poultry vaccination schedule generator calculate dates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The generator anchors each immunization milestone to your exact flock hatch or placement date. It calculates chronological bird age and schedules critical live viral and bacterial immunizations (ND, IBD, Fowl Pox, Coryza) according to proven tropical veterinary protocols and antibody clearance curves.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why should live poultry vaccines not be given in chlorinated tap water?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chlorine, heavy metals, and pipe sanitizers destroy live attenuated viral particles instantly, rendering the vaccine useless. Always use untreated deep well or borehole water, or add skimmed milk powder (2g per litre) 20 minutes before vaccine reconstitution to neutralize residual sanitizers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I administer the Gumboro (IBD) vaccine too early?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Administering IBD vaccine before Day 10–14 in parentally immune chicks causes circulating maternal antibodies to bind and neutralize the vaccine virus before it can stimulate the bursa of Fabricius. This leaves birds unprotected when maternal immunity declines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I vaccinate sick, panting, or heat-stressed birds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Never vaccinate clinically depressed, diseased, or heat-stressed flocks. Live vaccines impose biological metabolic stress and require an active immune system to develop protective antibodies. Vaccinating stressed birds can precipitate secondary bacterial outbreaks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the main difference between Broiler and Commercial Layer vaccination calendars?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Broilers have a fast 35–42 day turnaround requiring primary live doses for Newcastle (ND) and Gumboro (IBD). Commercial layers live for 72–80+ weeks and require multiple live boosters, wing-web Fowl Pox, Coryza bacterins, and killed oil-emulsion injections (ND+IB+EDS) prior to point of lay.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does D-AminGrow ensure vaccine potency across Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All biologicals are stored in calibrated 2°C–8°C digital medical freezers with automatic solar backup, certified by NVRI Vom and NAFDAC. Outbound orders are dispatched in pre-chilled expanded polystyrene (EPS) insulated shippers with verified frozen phase-change gel refrigerant bricks.',
      },
    },
  ],
};

export default function VaccinationCalendarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <VaccinationCalculatorClient />
    </>
  );
}
