import React from 'react';
import { Metadata } from 'next';
import { FeedFormulationClient } from './feed-formulation-client';

export const metadata: Metadata = {
  title: 'Poultry Feed Formulation Nigeria | Pearson Square Ration Balancer | D-AminGrow',
  description:
    'Formulate high-performance poultry feed in Nigeria. Interactive Pearson Square ration calculator, crude protein balancing, synthetic amino acid specs, and least-cost compounding advisory.',
  keywords: [
    'poultry feed formulation in nigeria',
    'pearson square feed formulation',
    'broiler starter mash recipe',
    'layer feed crude protein ratio',
    'commercial poultry feed compounding',
    'least cost poultry feed formulation',
    'poultry feed formulation formula and calculation',
    'how to formulate broiler feed in nigeria',
    'commercial layer feed formulation guide',
    'least cost feed formulation spreadsheet poultry',
  ],
  alternates: {
    canonical: 'https://damingrow.com/services/consultation/feed-formulation',
  },
  openGraph: {
    title: 'Poultry Feed Formulation Nigeria | Pearson Square Ration Balancer | D-AminGrow',
    description:
      'Slash poultry feed production costs with interactive Pearson Square balancing, crystalline amino acid dosing, and custom veterinary nutrition spreadsheets across Nigeria.',
    url: 'https://damingrow.com/services/consultation/feed-formulation',
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
      name: 'How much money can a commercial poultry farm save by self-compounding feed in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Self-compounding feed using on-farm mills or toll milling services typically saves between ₦1,750 and ₦3,000 per 50kg bag (₦35 to ₦60 per kg) compared to buying branded commercial feeds. On a batch of 5,000 broilers consuming approximately 400 to 450 bags over 6 weeks, total net operational savings range between ₦780,000 and ₦1,350,000 per cycle.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Pearson Square method in poultry feed formulation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Pearson Square is an established algebraic method used to determine the exact proportion of an energy feed ingredient (such as maize or sorghum) and a protein concentrate (such as soybean meal or GNC) required to achieve a target dietary Crude Protein (CP) percentage. While ideal for two-ingredient basal balancing, commercial multi-nutrient diets also incorporate fixed mineral and amino acid packs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is soybean meal preferred over Groundnut Cake (GNC) in broiler rations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Extracted soybean meal has a superior amino acid profile, particularly in Lysine (approx. 2.8%–3.0%) and Threonine, with higher digestibility and lower susceptibility to aflatoxin contamination compared to Groundnut Cake. GNC is often contaminated with toxic aflatoxins due to poor drying practices in northern Nigeria and is severely deficient in Lysine and Methionine.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do commercial layer birds need coarse limestone instead of fine powder?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A hen forms the hard calcified eggshell mainly at night while asleep in the dark. Fine calcium powder dissolves rapidly in the proventriculus and is excreted within 3 to 4 hours. Coarse limestone particles (2mm–4mm) remain slowly dissolving in the gizzard throughout the night, continuously releasing ionized calcium into the bloodstream when shell mineralization demand peaks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I forget to add phytase enzyme to my poultry feed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Phytase breaks down phytate, an indigestible organic molecule in grains and oilseeds that binds phosphorus, calcium, zinc, and amino acids. Without phytase, up to 70% of plant phosphorus is excreted in manure, forcing you to purchase expensive inorganic dicalcium phosphate (DCP). Adding phytase improves amino acid digestibility and saves ₦15 to ₦25 per kg of finished feed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does D-AminGrow assist Nigerian farmers with feed formulation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide customized, least-cost linear feed formulation spreadsheets calibrated to current grain market prices in your state. We audit your raw material sources (maize moisture, soybean quality), formulate tailor-made broiler, layer, and turkey diets, and supply certified pure synthetic amino acids, toxin binders, and vitamin premixes.',
      },
    },
  ],
};

export default function FeedFormulationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <FeedFormulationClient />
    </>
  );
}
