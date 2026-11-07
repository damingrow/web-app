import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  EDITORIAL_PILLARS,
  getPillarBySlug,
  getArticlesForPillar,
  PillarId,
} from '@/lib/editorial/pillars';
import {
  generatePillarCollectionSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/structured-data';
import {
  ShieldCheck,
  Clock,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  Calculator,
  Search,
  Sparkles,
  BookOpen,
  Syringe,
  Stethoscope,
  Flame,
  Egg,
  Scale,
  Building2,
  AlertTriangle,
  XCircle,
  Award,
  HelpCircle,
  Check,
  TrendingUp,
} from 'lucide-react';

interface PillarPageProps {
  params: Promise<{
    pillar: string;
  }>;
}

export async function generateStaticParams() {
  return EDITORIAL_PILLARS.map((p) => ({
    pillar: p.slug,
  }));
}

export async function generateMetadata({ params }: PillarPageProps): Promise<Metadata> {
  const { pillar } = await params;
  const p = getPillarBySlug(pillar);

  if (!p) {
    return {
      title: 'Editorial Pillar Not Found | D-AminGrow Knowledge Centre',
    };
  }

  return {
    title: `${p.name} | Poultry Flock Management Guide | D-AminGrow Nigeria`,
    description: `${p.description} Certified veterinary advisory and operational protocols targeting ${p.targetAudience}.`,
    keywords: [
      `${p.name.toLowerCase()} nigeria`,
      'poultry flock management guide',
      'veterinary protocols nigeria',
      ...p.primaryKeywords.map((k) => k.query),
    ],
    openGraph: {
      title: `${p.name} — Technical Guides & VCN Protocols | D-AminGrow`,
      description: p.description,
      type: 'website',
      url: `https://damingrow.com/knowledge/pillar/${p.slug}`,
    },
  };
}

function getPillarIcon(iconName: string) {
  switch (iconName) {
    case 'Syringe':
      return Syringe;
    case 'Stethoscope':
      return Stethoscope;
    case 'Flame':
      return Flame;
    case 'Egg':
      return Egg;
    case 'Scale':
      return Scale;
    case 'Building2':
      return Building2;
    default:
      return BookOpen;
  }
}

interface PillarFAQ {
  question: string;
  answer: string;
}

function getPillarFaqs(pillarId: PillarId): PillarFAQ[] {
  switch (pillarId) {
    case 'immunology-vaccines':
      return [
        {
          question: 'How long can live poultry vaccines survive without ice in Nigeria?',
          answer:
            'Live freeze-dried viral vaccines (such as Lasota, Hitchner B1, and Gumboro) begin denaturing within 30 to 45 minutes once temperatures rise above 8°C. Without ice in Nigerian tropical ambient heat (32°C–38°C), titer counts collapse to sub-protective levels within 2 hours, resulting in complete vaccination failure even though birds drank the reconstituted solution.',
        },
        {
          question: 'Why must chlorine or municipal water sanitizers be neutralised before vaccination?',
          answer:
            'Chlorine and chemical sanitizers are formulated to kill viral organisms. Administering a live attenuated vaccine through chlorinated well or tap water immediately inactivates the antigen particles. Always discontinue chlorination 48 hours prior and mix skimmed milk powder (2g per litre) or a specialised blue vaccine stabilizer to bind free chlorine before reconstitution.',
        },
        {
          question: 'At what age should I give Gumboro (IBD) vaccine to commercial broilers in Nigeria?',
          answer:
            'Standard Nigerian commercial field protocols administer an intermediate strain (e.g., Georgia or 228E) between Day 9 and Day 11, followed by a second booster between Day 18 and Day 20. This timing accounts for maternal antibody decay curves observed in tropical day-old chicks from Nigerian commercial breeder parents.',
        },
        {
          question: 'Can I administer Lasota and Gumboro vaccines on the same day?',
          answer:
            'No. Concurrent administration of Lasota (Newcastle) and Gumboro (IBD) causes immunological interference and severe immunosuppression. Gumboro targets and temporarily depletes the bursa of Fabricius, suppressing the flock’s ability to mount an effective humoral antibody response to Newcastle antigen. Maintain an interval of at least 5 to 7 days.',
        },
        {
          question: 'What should I do if my vaccine consignment arrives melted or warm from transit?',
          answer:
            'Do not administer warm or thawed biologicals. At D-AminGrow, every cold-chain dispatch includes calibrated cool packs and temperature indicators. If your shipment experiences a temperature breach, photograph the indicator and alert our dispatch desk immediately for replacement before dosing your flock.',
        },
        {
          question: 'Why do broilers still catch Newcastle disease despite complete vaccination?',
          answer:
            'Field breakdowns usually stem from four root causes: broken transit cold chain, high maternal antibodies neutralizing early vaccines, immunosuppression from early subclinical Gumboro or mycotoxins in feed, or heavy wild-bird contamination overwhelming flock immunity titers.',
        },
      ];
    case 'disease-triage':
      return [
        {
          question: 'What causes sudden bloody droppings in broilers at 3 to 4 weeks of age?',
          answer:
            'Bloody, reddish-brown droppings accompanied by ruffled feathers and huddling are classic pathognomonic signs of Eimeria tenella caecal coccidiosis. It requires immediate intervention with Toltrazuril (Baycox) or Amprolium plus Vitamin K3 to control caecal haemorrhage and prevent devastating batch mortality.',
        },
        {
          question: 'Why are antibiotics failing to cure snoring and coughing (CRD) in my flock?',
          answer:
            'Chronic Respiratory Disease (CRD) is primarily triggered by Mycoplasma gallisepticum complicated by secondary Escherichia coli and high ambient ammonia. Routine broad-spectrum antibiotics (like tetracyclines) frequently fail due to widespread farm resistance. Effective treatment requires macrolides (Tilmicosin, Tylosin) or fluoroquinolones paired with immediate pen ventilation improvements.',
        },
        {
          question: 'What is the mandatory withdrawal period before harvesting broilers treated with antibiotics?',
          answer:
            'Withdrawal periods vary by active pharmaceutical ingredient: Enrofloxacin requires 7–10 days, Doxycycline 5–7 days, and Amprolium 3–5 days. Failing to observe withdrawal periods violates public health standards and leaves chemical residues in broiler meat.',
        },
        {
          question: 'When should I perform a post-mortem necropsy rather than guessing treatments?',
          answer:
            'Whenever sudden mortality exceeds 0.2% per day without obvious environmental triggers, or when an initial 48-hour therapeutic trial shows zero clinical recovery. Sacrificing 2 representative sick birds for internal organ necropsy saves thousands of birds from erroneous medication.',
        },
        {
          question: 'Can viral poultry diseases like Newcastle or Gumboro be cured with antibiotics?',
          answer:
            'No. Antibiotics have zero biological activity against viral pathogens. Antibiotics administered during viral outbreaks only suppress opportunistic secondary bacterial infections (like E. coli colisepticemia) while supportive care (electrolytes, immunostimulants) helps survivors recover.',
        },
        {
          question: 'How quickly can D-AminGrow veterinary surgeons review clinical flock photos on WhatsApp?',
          answer:
            'Our emergency clinical veterinary triage desk operates 7 days a week. Urgent submissions via our triage assistant receive preliminary review and differential assessment by registered VCN veterinary doctors within 30 minutes.',
        },
      ];
    case 'brooding-housing':
      return [
        {
          question: 'What is the ideal brooding temperature for day-old chicks in Nigeria?',
          answer:
            'Target 33°C to 35°C at chick level (floor height) for Days 1–3, gradually reducing temperature by approximately 2.5°C to 3°C each week until ambient farm temperature (24°C–26°C) is reached by Week 3 or 4. Always monitor chick distribution: evenly spread, contented chicks indicate optimal thermal balance.',
        },
        {
          question: 'Is gas radiant brooding better and more cost-effective than charcoal pots in Nigeria?',
          answer:
            'Yes. While charcoal initially seems cheaper, charcoal pots emit lethal carbon monoxide (CO), create extreme temperature spikes, and demand relentless overnight stoking. Radiant infrared gas brooders deliver continuous, thermostatically stable radiant warmth that heats chick bodies directly without drying pen humidity or asphyxiating birds.',
        },
        {
          question: 'How do I calculate floor space for 1,000 commercial broilers in tropical open-sided pens?',
          answer:
            'In tropical Nigerian heat, recommended stocking density is 10 to 12 birds per square metre (approximately 0.9 to 1.0 sq ft per bird) at market weight. For 1,000 mature broilers (2.0kg–2.5kg), construct a pen with at least 90 to 100 square metres of clean floor space with high roofing and wide eaves for cross-ventilation.',
        },
        {
          question: 'How do I test if day-old chicks have fed and hydrated properly in their first 24 hours?',
          answer:
            'Perform the standard 24-hour Crop Fill Assessment. Sample 50 chicks randomly from different pen sectors: at 8 hours post-placement, at least 80% should have soft, rounded, pliable crops; at 24 hours, 95%+ must have full crops filled with feed and water. Hard crops indicate insufficient water; empty crops indicate chick feeding failure.',
        },
        {
          question: 'How do I manage wet litter and high ammonia odor during the rainy season in Nigeria?',
          answer:
            'Use dry, dust-free wood shavings (avoid fine powdery sawdust which causes impaction). Maintain 5cm to 8cm depth, immediately rake out wet caked patches around nipple drinkers, and repair any ceiling or gutter splash-backs. High ammonia above 20 ppm severely damages tracheal cilia and triggers respiratory disease.',
        },
        {
          question: 'What curtain height protocol should I follow between hot afternoons and cool nights?',
          answer:
            'Keep curtains fully rolled down to 80% during cool brooding nights to retain warmth, while keeping top 20% gaps open for exhaust air exchange. During sweltering afternoons (12:00 PM – 4:00 PM), lower side curtains to allow free cross-ventilation breezes, using high-velocity circulating fans to alleviate heat stress.',
        },
      ];
    case 'commercial-layers':
      return [
        {
          question: 'At what week do Point-of-Lay pullets start laying eggs in Nigeria?',
          answer:
            'Commercial brown egg layers (such as ISA Brown, Shaver, or Bovans) typically produce their first eggs between Week 18 and Week 19, reaching 5% production at Week 20, 50% production around Week 22–23, and peak performance (92%–96% Hen-Day Production) between Weeks 26 and 32 when managed correctly.',
        },
        {
          question: 'What causes sudden egg production drops from 85% to 60% in commercial layers?',
          answer:
            'Sudden steep drops typically result from 4 major triggers: water failure or nipple drinker blockages for even 6–12 hours, high heat stress with inadequate ventilation, subclinical viral infections (Egg Drop Syndrome EDS-76, Infectious Bronchitis, Newcastle), or nutritional deficiencies (acute calcium/phosphorus imbalance or energy drops).',
        },
        {
          question: 'Are battery cages better than deep litter for commercial egg production in Nigeria?',
          answer:
            'In Nigeria, hot-dip galvanized battery cages outperform deep litter by eliminating egg eating, preventing dirty eggs, reducing internal parasite burdens (coccidia and roundworms), simplifying individual cull monitoring, and allowing 3x higher bird density per unit of building land.',
        },
        {
          question: 'How much calcium should layer mash contain to eliminate soft-shelled and cracked eggs?',
          answer:
            'Active laying hens require 3.8% to 4.2% elemental calcium in their daily ration. For on-farm feed mixing, combine 65% coarse limestone grit (2–4mm particle size) with 35% fine calcium powder. Coarse grit dissolves slowly overnight in the gizzard during shell calcification, preventing morning soft shells.',
        },
        {
          question: 'What lighting photoperiod program is required to sustain peak 90%+ Hen-Day Production?',
          answer:
            'Laying hens require a steady 16 hours of light per day (combining natural daylight plus supplementary artificial morning and evening bulb lighting). Never decrease day length during the active lay cycle; even a 30-minute drop in light exposure can trigger premature moulting and egg drop.',
        },
        {
          question: 'How do I safely transport 16-week Point-of-Lay pullets to prevent laying delays?',
          answer:
            'Transfer pullets only during the cool evening or early dawn hours using well-ventilated plastic transport crates (10–12 birds per crate). Administer anti-stress electrolytes and fat-soluble vitamins (A, D3, E) 24 hours before transit and 48 hours post-placement in the cages.',
        },
      ];
    case 'poultry-economics':
      return [
        {
          question: 'What is a good Feed Conversion Ratio (FCR) for commercial broilers in Nigeria?',
          answer:
            'Under professional tropical management, a commercial broiler flock should achieve an overall FCR of 1.55 to 1.70 at 6 weeks (consuming approximately 3.8kg to 4.2kg of feed to reach 2.3kg to 2.5kg live body weight). An FCR above 1.9 indicates feed wastage, high disease burden, or substandard nutritional formulation.',
        },
        {
          question: 'How much does it cost to raise 1,000 broilers to maturity in Nigeria (2026)?',
          answer:
            'At prevailing 2026 Nigerian feed and input costs, budget between ₦3,800 and ₦4,600 per finished 2.2kg–2.5kg broiler (encompassing day-old chicks, feed, vaccines/medication, brooding gas, litter, and labor), with feed accounting for 68%–72% of total production outlay.',
        },
        {
          question: 'Can I cut feed costs by formulating and mixing my own poultry feed on the farm?',
          answer:
            'On-farm feed mixing can reduce feeding costs by 15% to 22% compared to commercial branded bags, provided you have reliable access to high-purity maize, quality soya bean meal (44%–48% crude protein), limestone, bone meal, and verified amino acid/vitamin premixes with accurate scales.',
        },
        {
          question: 'What percentage of Palm Kernel Cake (PKC) can safely be used in broiler feeds?',
          answer:
            'Broilers have limited digestive capacity for high fibre. Keep PKC inclusion below 5% in broiler starter and under 8%–10% in broiler finisher, ensuring enzyme supplementation (mannanase/xylanase) is included to break down non-starch polysaccharides and prevent loose droppings.',
        },
        {
          question: 'How does high ambient heat worsen FCR and what can be done to protect margins?',
          answer:
            'When temperatures exceed 30°C, chickens expend metabolic energy panting to dissipate heat rather than depositing muscle. To safeguard feed conversion, practice split feeding: withhold feed during sweltering peak afternoon hours (12 PM – 3 PM) and feed heavily during cool night and early dawn hours.',
        },
        {
          question: 'How do I calculate net profit margin per kilogram of dressed broiler meat?',
          answer:
            'Net Profit Margin = [Gross Slaughter Sale Price per kg] − [Cost of Day-Old Chick per kg + (FCR × Cost of Feed per kg) + Medication & Utilities per kg + Processing / Packaging per kg]. Use our free on-page FCR & Margin Calculator to simulate real-time margins.',
        },
      ];
    case 'chick-sourcing':
      return [
        {
          question: 'Which broiler breed performs best in Nigeria: Zartech (Ross 308), Amo (Cobb 500), or Chi?',
          answer:
            'Both Ross 308 (Zartech) and Cobb 500 (Amo) are world-class broiler genetics. Cobb 500 excels in tropical heat tolerance, early breast meat development, and feed efficiency on lower-protein diets. Ross 308 delivers phenomenal skeletal strength, robust uniform weight gain, and high harvest weights when balanced amino acid nutrition is maintained.',
        },
        {
          question: 'What does the 50+1 packaging convention mean in day-old chick bookings?',
          answer:
            'Standard Nigerian commercial hatcheries pack 51 chicks per carton compartment box (50 billed chicks plus 1 bonus extra chick to absorb nominal transit losses). When you book 1,000 chicks, you receive 20 cartons containing 1,020 live chicks.',
        },
        {
          question: 'What should I immediately administer to day-old chicks upon farm arrival?',
          answer:
            'Provide lukewarm water (20°C–24°C) blended with 5% Dextrose monohydrate or a commercial chick rehydration electrolyte formula. Withhold solid feed for the first 1 to 2 hours until all chicks have rehydrated their mucosal membranes, then offer starter crumbs on chick paper across the brooder.',
        },
        {
          question: 'How does D-AminGrow handle Dead-On-Arrival (DOA) replacement claims?',
          answer:
            'We provide an ironclad DOA guarantee: all chick cartons are inspected at the motor park or dispatch hub. If mortality exceeds the 1 extra bird per carton upon collection, record a clear 30-second unboxing video and notify our logistics line within 2 hours for instant credit or replacement.',
        },
        {
          question: 'Why do day-old chick prices fluctuate between different days of the week?',
          answer:
            'Nigerian hatcheries hatch chicks on rigid cycles: predominantly Mondays and Thursdays. Market prices shift based on seasonal demand peaks (e.g. Easter and Christmas stocking cycles), parent stock egg availability, and nationwide transport fuel logistics.',
        },
        {
          question: 'Can day-old chicks be safely waybilled from Ibadan to northern and eastern states?',
          answer:
            'Yes. Using our specialized pressurized dispatch network and direct inter-state driver partnerships originating from Ibadan hatcheries, chicks arrive at regional park hubs (Abuja, Kano, Enugu, Port Harcourt) within 8 to 14 hours inside climate-ventilated cartons with zero smothering.',
        },
      ];
    default:
      return [
        {
          question: 'How often are D-AminGrow clinical flock guides updated?',
          answer:
            'All technical protocols and clinical calculators undergo quarterly review by licensed Nigerian Veterinary Council (VCN) doctors to reflect current pathogen field challenges, NAFDAC regulatory shifts, and economic input prices.',
        },
        {
          question: 'Are D-AminGrow calculators free to use for commercial farm managers?',
          answer:
            'Yes. All our biological calculators (FCR, Hen-Day Production, Brooder Floor Space, Vaccination Timetable, and Disease Triage) are 100% free with no paywall or forced subscription.',
        },
        {
          question: 'Can I request an on-farm physical consultation from D-AminGrow vets?',
          answer:
            'Yes. In addition to our real-time WhatsApp advisory desk, our field veterinary and technical engineering teams conduct on-farm biosecurity audits, necropsies, and farm setup design across Lagos, Ogun, Oyo, Osun, Abuja, and surrounding agricultural corridors.',
        },
        {
          question: 'How do I download printable vaccination and feeding charts for my pen staff?',
          answer:
            'Every technical guide and calculator features one-click PDF and CSV export buttons, allowing farm managers to print laminated pen-door charts for attendants.',
        },
        {
          question: 'Where can I procure genuine NAFDAC-certified drugs and cold-chain vaccines?',
          answer:
            'D-AminGrow operates a direct veterinary pharmaceutical dispensary and 2°C–8°C cold-chain hub. You can order prescription items directly with verified batch numbers and icepack delivery across Nigeria.',
        },
        {
          question: 'Who can I contact if I am experiencing an active flock disease emergency?',
          answer:
            'Message our emergency VCN veterinary desk directly on WhatsApp at +2348139169402 with photos of droppings, bird posture, and mortalities for rapid clinical guidance.',
        },
      ];
  }
}

interface FailureMode {
  title: string;
  problem: string;
  consequence: string;
}

function getPillarFailureModes(pillarId: PillarId): FailureMode[] {
  switch (pillarId) {
    case 'immunology-vaccines':
      return [
        {
          title: 'Cold-Chain Disruption During Transit',
          problem: 'Buying live viral vaccines from open-market stalls using melted ice cubes or unverified transport.',
          consequence: 'Zero antibody response; flock remains fully vulnerable to wild Newcastle or Gumboro virus outbreaks.',
        },
        {
          title: 'Vaccinating in Chlorinated Well Water',
          problem: 'Reconstituting biologicals in tap water containing active chemical sanitizers without skimmed milk stabilizers.',
          consequence: 'Active viral titer is killed instantly in the header tank before a single chicken drinks the solution.',
        },
        {
          title: 'Ignoring Maternal Antibody Decay Windows',
          problem: 'Vaccinating day-old chicks prematurely or delaying secondary booster shots past clinical protective windows.',
          consequence: 'Maternal antibodies neutralize the vaccine antigen, leaving birds defenseless during peak challenge weeks.',
        },
      ];
    case 'disease-triage':
      return [
        {
          title: 'Blind Antibiotic Cocktails for Viral Outbreaks',
          problem: 'Pumping expensive antibiotics into birds suffering from Newcastle or Gumboro viral infections.',
          consequence: 'Wasted cash, severe liver and kidney toxicity, zero reduction in mortality, and accelerated AMR resistance.',
        },
        {
          title: 'Delayed Diagnostic Post-Mortem Necropsies',
          problem: 'Waiting until 10% of the flock dies before consulting a licensed veterinary surgeon for organ examination.',
          consequence: 'Pathogens spread through litter, waterers, and air currents until salvage treatment becomes impossible.',
        },
        {
          title: 'Violating NAFDAC Drug Withdrawal Periods',
          problem: 'Selling birds treated with fluoroquinolones or heavy sulfa drugs directly into retail meat markets.',
          consequence: 'Harmful antimicrobial residues in consumer food chains, regulatory penalties, and compromised consumer trust.',
        },
      ];
    case 'brooding-housing':
      return [
        {
          title: 'Carbon Monoxide Poisoning from Charcoal Pots',
          problem: 'Burning charcoal inside tightly sealed brooding pens without adequate high-level fresh air vents.',
          consequence: 'Chicks suffer toxic hypoxia, stunted organ development, ascites (water belly), and sudden night mortalities.',
        },
        {
          title: 'Uneven Temperature Zones & Floor Chilling',
          problem: 'Relying on naked electric bulbs that illuminate without delivering radiant floor warmth to chick bodies.',
          consequence: 'Chicks huddle tightly, smothering weaker birds while cold shock shuts down digestive enzyme secretion.',
        },
        {
          title: 'High Litter Moisture & Caustic Ammonia Build-Up',
          problem: 'Using damp sawdust or ignoring leaking bell drinkers during the humid Nigerian rainy season.',
          consequence: 'Ammonia burns eye corneas and tracheal linings, opening the floodgates for severe CRD and coccidiosis.',
        },
      ];
    case 'commercial-layers':
      return [
        {
          title: 'Sudden Lighting Fluctuations & Dark Hours',
          problem: 'Allowing erratic power cuts or inconsistent manual bulb switching to disrupt the 16-hour laying photoperiod.',
          consequence: 'Hens interpret lighting drops as the onset of winter, triggering immediate hormonal moulting and egg drop.',
        },
        {
          title: 'Substandard Calcium Form & Particle Sizing',
          problem: 'Feeding only fine powdered limestone rather than combining coarse calcium grit for overnight shell calcification.',
          consequence: 'Depleted bone marrow calcium reserves, fragile cage layer fatigue, cracked eggs, and soft-shelled waste.',
        },
        {
          title: 'Unverified Point-of-Lay Pullet Sources',
          problem: 'Purchasing 16-week pullets with missing vaccination history or stunted skeletal frame development.',
          consequence: 'Flocks never exceed 65%–70% peak Hen-Day Production, turning capital investment into permanent losses.',
        },
      ];
    case 'poultry-economics':
      return [
        {
          title: 'Unchecked Feed Wastage & Poor Feeder Height',
          problem: 'Overfilling trough feeders and hanging them too low, allowing birds to flick expensive mash into the litter.',
          consequence: 'True FCR deteriorates past 1.95, directly burning up to 25% of the total flock working capital in feed waste.',
        },
        {
          title: 'Imbalanced Amino Acids in Farm-Mixed Feed',
          problem: 'Formulating feed purely by crude protein without balancing digestible lysine, methionine, and metabolizable energy.',
          consequence: 'Broilers consume maximum feed but fail to convert it into breast muscle, prolonging slaughter cycles by weeks.',
        },
        {
          title: 'Absence of Batch Financial Accounting',
          problem: 'Operating without calculating cost per kg live weight or tracking daily mortality-adjusted breakeven prices.',
          consequence: 'Farm owners sell finished stock below actual production cost during market price dips, creating silent bankruptcies.',
        },
      ];
    case 'chick-sourcing':
      return [
        {
          title: 'Counterfeit Hatchery Boxes & Stunted Genetics',
          problem: 'Buying chicks from street aggregators using counterfeit branded cartons with unverified parent stock.',
          consequence: 'Slow growth, high genetic mortality, poor uniformity, and inability to hit commercial target weights.',
        },
        {
          title: 'Severe Transit Dehydration Without Immediate Rehydration',
          problem: 'Offering dry commercial feed immediately upon chick arrival before re-establishing mucosal fluid balance.',
          consequence: 'Chicks develop severe kidney gout, uric acid crystallization, and high early 7-day mortality rates.',
        },
        {
          title: 'Unenforced Dead-On-Arrival (DOA) Compensation',
          problem: 'Failing to inspect boxes at the transit hub or report carton mortalities within official compensation windows.',
          consequence: 'Farmers absorb 5% to 15% transit deaths without reimbursement or hatchery accountability.',
        },
      ];
    default:
      return [
        {
          title: 'Unverified Social Media Farming Advice',
          problem: 'Applying viral remedies and unproven herbal cocktails without clinical laboratory verification.',
          consequence: 'Delayed professional treatment allows curable infections to destroy entire commercial flocks.',
        },
        {
          title: 'Neglecting Biosecurity Perimeter Controls',
          problem: 'Allowing unsterilized vehicle tires, wild birds, and outside footwear into production pen environments.',
          consequence: 'Virulent pathogens cross boundary fences, wiping out months of capital investment in hours.',
        },
        {
          title: 'Guesswork Dosing & Overmedication',
          problem: 'Mixing random pharmaceutical powders into drinking water without calculating bird body weight or water intake.',
          consequence: 'Under-dosing creates super-resistant bacteria while overdosing causes acute kidney failure.',
        },
      ];
  }
}

export default async function PillarDetailPage({ params }: PillarPageProps) {
  const { pillar: pillarSlug } = await params;
  const pillar = getPillarBySlug(pillarSlug);

  if (!pillar) {
    notFound();
  }

  const articles = getArticlesForPillar(pillar.id as PillarId);
  const otherPillars = EDITORIAL_PILLARS.filter((p) => p.id !== pillar.id);
  const PillarIcon = getPillarIcon(pillar.iconName);
  const faqs = getPillarFaqs(pillar.id as PillarId);
  const failureModes = getPillarFailureModes(pillar.id as PillarId);

  // Structured Data Schemas
  const collectionJsonLd = generatePillarCollectionSchema({
    pillarName: pillar.name,
    description: pillar.description,
    url: `/knowledge/pillar/${pillar.slug}`,
    articles: articles.map((a) => ({
      title: a.title,
      slug: a.slug,
      summary: a.summary,
    })),
  });

  const breadcrumbsJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Knowledge Centre', url: '/knowledge' },
    { name: pillar.shortTitle, url: `/knowledge/pillar/${pillar.slug}` },
  ]);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Schema.org Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/knowledge" className="hover:text-emerald-700 transition-colors">
              Knowledge Centre
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-emerald-800">{pillar.shortTitle}</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: 2-Column Cinematic Dark Hero (7/5 Grid) */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols: Benefit-Driven Headline & Positioning */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Topical Authority Pillar · VCN Veterinary Certified</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0">
                  <PillarIcon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Pillar Category · {pillar.shortTitle}
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading tracking-tight leading-tight">
                    {pillar.name}: Comprehensive Poultry Flock Management Guide &amp; Clinical Protocols
                  </h1>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Eliminate unverified social media guesswork with peer-reviewed veterinary protocols calibrated specifically for Nigerian environmental temperatures, biosecurity realities, and commercial flock economics.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>{pillar.clinicalReviewStandard}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <BookOpen className="h-4 w-4 text-cyan-400" />
                  <span>{articles.length} Authoritative Clinical Guides</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#guides-catalog"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 text-sm font-bold transition-all shadow-lg hover:shadow-emerald-900/30"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Access Clinical Guides</span>
                </a>
                <a
                  href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%20Vet%20Desk,%20I%20need%20advisory%20regarding%20${encodeURIComponent(pillar.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3.5 text-sm font-bold transition-all shadow-lg"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Vet Consultation (+2348139169402)</span>
                </a>
              </div>
            </div>

            {/* Right 5 Cols: Pillar Quick Reference Hub Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/40 p-6 backdrop-blur-md space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Pillar Authority Summary
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    {articles.length} Verified Guides
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-slate-400">Target Audience:</span>
                    <span className="font-semibold text-right text-slate-200">{pillar.targetAudience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Monthly Farmer Demand:</span>
                    <span className="font-semibold text-emerald-300">~{(pillar.monthlyTrafficTarget / 1000).toFixed(0)}k+ Farmers/mo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Clinical Verification:</span>
                    <span className="font-semibold text-cyan-300">Licensed VCN Surgeons</span>
                  </div>
                </div>

                {/* Associated Calculators Quick Pill Links */}
                {pillar.associatedCalculators.length > 0 && (
                  <div className="pt-3 border-t border-emerald-500/20 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Interactive Domain Tools
                    </span>
                    <div className="space-y-1.5">
                      {pillar.associatedCalculators.map((calc) => (
                        <Link
                          key={calc.href}
                          href={calc.href}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 transition-all text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <Calculator className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="font-semibold text-white">{calc.title}</span>
                          </div>
                          <ArrowRight className="h-3 w-3 text-emerald-400" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-emerald-500/20">
                  <a
                    href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%20Vet%20Desk,%20I%20have%20an%20urgent%20flock%20question"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 text-xs font-bold transition-all shadow"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Direct WhatsApp SOS Line</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Operational Benchmarks Bar */}
      <section className="bg-slate-900 border-y border-slate-800 py-6 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
                100%
              </div>
              <p className="text-xs text-slate-400 font-medium">VCN Peer-Reviewed Protocols</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
                {articles.length} Guides
              </div>
              <p className="text-xs text-slate-400 font-medium">Zero Paywalled Content</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
                ~{(pillar.monthlyTrafficTarget / 1000).toFixed(0)}k/mo
              </div>
              <p className="text-xs text-slate-400 font-medium">Active Farmer Inquiries</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
                &lt; 30 Mins
              </div>
              <p className="text-xs text-slate-400 font-medium">WhatsApp Vet Desk Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Problem Section ("Why Most Poultry Farms Face Setbacks in this Domain") */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
              Common Costly Pitfalls
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Most Nigerian Poultry Farms Face Severe Setbacks in {pillar.shortTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Commercial poultry is an unforgiving biological business. Applying hearsay or uncalibrated methods generates catastrophic financial bleed that wipes out working capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {failureModes.map((fm, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-rose-100 bg-rose-50/30 p-6 sm:p-7 space-y-4 hover:border-rose-300 transition-all"
              >
                <div className="h-10 w-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-slate-900">
                    {fm.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    <strong className="text-slate-800">The Mistake:</strong> {fm.problem}
                  </p>
                </div>
                <div className="pt-3 border-t border-rose-200/60 text-xs text-rose-900 font-semibold flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Impact:</strong> {fm.consequence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Information Gain Matrix (Unverified Advice vs D-AminGrow VCN Protocol) */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Information Gain Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Unverified Social Media Advice vs. D-AminGrow Clinical Protocols
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Discover why thousands of commercial farmers in Lagos, Ibadan, Ogun, and across Nigeria rely on our documented operational standards.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-4 px-6">Evaluation Parameter</th>
                  <th className="py-4 px-6 text-rose-300">Generic Market / Social Media Advice</th>
                  <th className="py-4 px-6 text-emerald-300">D-AminGrow VCN Clinical Protocols</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">1. Scientific &amp; Biological Validation</td>
                  <td className="py-4 px-6 text-slate-600">
                    Anecdotal recommendations, untested herbal tonics, and guesswork dosing from peer chat groups.
                  </td>
                  <td className="py-4 px-6 text-emerald-950 font-medium bg-emerald-50/50">
                    <span className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                      <Check className="h-4 w-4 text-emerald-600" />
                      100% VCN Surgeon Reviewed
                    </span>
                    Protocols backed by avian physiology, validated laboratory serology, and published pathogen standards.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">2. Tropical Climate Adaptation</td>
                  <td className="py-4 px-6 text-slate-600">
                    Imported European manuals assuming closed, climate-controlled negative pressure barns.
                  </td>
                  <td className="py-4 px-6 text-emerald-950 font-medium bg-emerald-50/50">
                    <span className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Calibrated for Nigerian Realities
                    </span>
                    Formulated for open-sided pens, 35°C humidity, well-water pH fluctuations, and local supply chains.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">3. Mathematical &amp; Economic Precision</td>
                  <td className="py-4 px-6 text-slate-600">
                    Rough rules of thumb with zero accountability for feed costs per kilogram or mortality impact.
                  </td>
                  <td className="py-4 px-6 text-emerald-950 font-medium bg-emerald-50/50">
                    <span className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Interactive Biological Calculators
                    </span>
                    Precise calculators that instantly compute exact dosages, stocking capacities, FCR curves, and margins.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">4. Emergency Escalation Support</td>
                  <td className="py-4 px-6 text-slate-600">
                    Static web pages or unresponsive social media posts with zero clinical follow-through.
                  </td>
                  <td className="py-4 px-6 text-emerald-950 font-medium bg-emerald-50/50">
                    <span className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Direct WhatsApp Vet Surgeon Desk
                    </span>
                    Direct emergency access to licensed veterinary clinicians ready to review necropsy photos within 30 minutes.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: 4-Pillar Clinical Delivery Framework */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              Standard Operating Procedure
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Our 4-Stage Clinical Delivery Framework for {pillar.shortTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              How D-AminGrow systematically translates complex avian veterinary science into practical, high-yield operational habits for your farm staff.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Diagnosis &amp; Root Cause
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identify exact flock vulnerabilities through symptom triaging, necropsy observation, and feed/water analysis.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                VCN Protocol Execution
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deploy standardized, verified veterinary SOPs covering exact biological dosages, timing, and withdrawal dates.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Bio-Metric Calculation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Utilize our calibrated mathematical calculators to track FCR, daily Hen-Day output, water flow, and batch economics.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Continuous Escalation Desk
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access on-demand veterinary clinical escalation via WhatsApp with same-day input procurement support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Preserved Interactive Calculators & Guides Catalog */}
      <section id="guides-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Associated Calculators Banner (if available) */}
        {pillar.associatedCalculators.length > 0 && (
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <Calculator className="h-3.5 w-3.5 text-emerald-600" />
                  Interactive Biological Calculator
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-1">
                  Compute Operational Parameters for this Pillar
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Eliminate guesswork with clinical math calibrated for Nigerian commercial poultry standards.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {pillar.associatedCalculators.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold transition-all shadow"
                  >
                    <span>{calc.title}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Guides Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                Clinical Guides &amp; Protocols ({articles.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Peer-reviewed by registered Veterinary Council of Nigeria (VCN) doctors.
              </p>
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Target Audience: {pillar.targetAudience}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-emerald-500/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold px-2.5 py-0.5 text-[11px]">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 font-medium text-[11px]">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  {/* VCN Clinical Review Badge */}
                  {article.clinicalReview && (
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{article.clinicalReview.reviewerName}</span>
                      </div>
                      <div className="text-[10px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded w-fit">
                        {article.clinicalReview.vcnRegistration}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    By <span className="font-semibold text-slate-700">{article.author.name}</span>
                  </div>
                  <Link
                    href={`/knowledge/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Search Queries & Research Topics Hub */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-extrabold font-heading text-slate-900">
              Key Research Topics &amp; Search Queries Covered in {pillar.shortTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pillar.primaryKeywords.map((kw, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {kw.intent}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    ~{(kw.estimatedMonthlySearches / 1000).toFixed(1)}k searches/mo
                  </span>
                </div>
                <div className="font-bold text-slate-800 capitalize">{kw.query}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: Honesty Filter ("Our Protocols May Not Be Right For You If...") */}
        <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h3 className="text-base sm:text-lg font-bold font-heading text-amber-950">
              Our {pillar.shortTitle} Guidance May Not Be Suitable If:
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-amber-900">
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>You are seeking overnight &quot;miracle herbal cures&quot; rather than following strict biological hygiene and biosecurity principles.</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>You refuse to track pen metrics (feed intake, daily mortalities, water consumption) necessary for accurate veterinary triage.</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>You prioritize short-term cheap uncertified inputs over NAFDAC-approved medications and cold-chain biological integrity.</span>
            </div>
          </div>
        </div>

        {/* SECTION 8: 6-Question Dynamic FAQ Section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
              Frequently Answered Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              Essential FAQs on {pillar.shortTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear clinical answers to the questions most frequently received by our veterinary team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-2 hover:border-emerald-300 transition-all"
              >
                <h3 className="text-sm font-bold text-slate-900 font-heading flex items-start gap-2">
                  <span className="text-emerald-600 font-extrabold shrink-0">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Pillar Navigation */}
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-extrabold font-heading text-slate-900">
            Explore Other Authority Pillars
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {otherPillars.map((other) => {
              const OtherIcon = getPillarIcon(other.iconName);
              return (
                <Link
                  key={other.id}
                  href={`/knowledge/pillar/${other.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <OtherIcon className="h-4 w-4" />
                    </div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {other.shortTitle}
                    </div>
                  </div>
                  <div className="pt-2 text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                    <span>View Pillar</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 9: Closing High-Converting CTA Banner */}
      <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Dedicated Veterinary Support for Commercial Operations</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight">
            Empower Your Flock with VCN-Grade Technical Clarity
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether you manage 500 broilers in Ogun or 50,000 commercial layers across Oyo and Abuja, our licensed veterinary desk provides continuous technical backstopping, biosecurity reviews, and cold-chain input fulfillment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%20Vet%20Desk,%20I%20would%20like%20to%20consult%20regarding%20${encodeURIComponent(pillar.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 text-sm font-bold transition-all shadow-lg hover:shadow-emerald-900/30"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp Veterinary Consultation Desk</span>
            </a>
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-4 text-sm font-bold transition-all"
            >
              <BookOpen className="h-4 w-4" />
              <span>Browse All Knowledge Hub Pillars</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
