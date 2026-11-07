'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Wheat,
  Calculator,
  CheckCircle2,
  Scale,
  Send,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Clock,
  PhoneCall,
  Layers,
  FlaskConical,
  TrendingUp,
} from 'lucide-react';

interface FeedTarget {
  id: string;
  name: string;
  cpTarget: number; // Crude Protein %
  energyTarget: string; // kcal/kg
  calciumTarget: string;
  notes: string;
}

const FEED_TARGETS: FeedTarget[] = [
  {
    id: 'broiler_starter',
    name: 'Broiler Starter Crumble (0–3 Weeks)',
    cpTarget: 23.0,
    energyTarget: '3000 kcal/kg',
    calciumTarget: '1.0% Ca',
    notes: 'High protein for rapid muscular skeletal growth and gut villi development.',
  },
  {
    id: 'broiler_finisher',
    name: 'Broiler Finisher Pellets (4–7 Weeks)',
    cpTarget: 19.0,
    energyTarget: '3150 kcal/kg',
    calciumTarget: '0.85% Ca',
    notes: 'High metabolizable energy for fast meat deposition and fat pad control.',
  },
  {
    id: 'chick_starter_mash',
    name: 'Pullet / Chick Starter Mash (0–8 Weeks)',
    cpTarget: 20.0,
    energyTarget: '2850 kcal/kg',
    calciumTarget: '1.0% Ca',
    notes: 'Balanced frame development without premature sexual maturity.',
  },
  {
    id: 'layer_mash_phase1',
    name: 'Layer Phase 1 Production Mash',
    cpTarget: 16.5,
    energyTarget: '2750 kcal/kg',
    calciumTarget: '3.8% – 4.2% Ca',
    notes: 'Critical high-calcium diet to prevent eggshell breakage and cage layer fatigue.',
  },
];

const ENERGY_SOURCES = [
  { name: 'Yellow Maize (Clean Dry)', cp: 8.5 },
  { name: 'Sorghum / Guinea Corn', cp: 10.0 },
  { name: 'Wheat Offal', cp: 15.0 },
];

const PROTEIN_SOURCES = [
  { name: 'Soya Bean Meal (Extracted)', cp: 44.0 },
  { name: 'Groundnut Cake (GNC)', cp: 45.0 },
  { name: 'Full-Fat Extruded Soya', cp: 36.0 },
  { name: 'Fish Meal (65% CP Grade)', cp: 65.0 },
];

const OPERATIONAL_BENCHMARKS = [
  {
    value: '₦35–₦60/kg',
    label: 'Feed Cost Savings',
    detail: 'Average savings achieved compared to branded commercial bagged feeds',
  },
  {
    value: '23.0% CP',
    label: 'Broiler Starter Precision',
    detail: 'Balanced with synthetic Lysine and Methionine for rapid tissue accretion',
  },
  {
    value: '3.8%–4.2% Ca',
    label: 'Layer Shell Standard',
    detail: 'Coarse limestone and oyster shell blend for zero cage layer fatigue',
  },
  {
    value: '< 1.60 FCR',
    label: 'Target Broiler Efficiency',
    detail: 'Reached with calibrated amino acid and metabolizable energy density',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Crude Protein Illusion & Synthetic Amino Acid Deficits',
    desc: 'Many local millers formulate rations based strictly on total crude protein (e.g. 21% CP) without balancing digestible synthetic amino acids (L-Lysine, DL-Methionine, Threonine). Poultry cannot utilize excess nitrogen without the first limiting amino acids, resulting in high feed consumption, stunted birds, and excessive ammonia excreted into litter.',
    impact: 'FCR degrades from 1.6 to 2.1+, wasting ₦450/bird',
  },
  {
    title: 'Hidden Mycotoxins in Moisture-Damaged Maize',
    desc: 'Using low-grade or poorly dried maize (moisture > 13%) introduces toxic Aspergillus flavus producing aflatoxins. Aflatoxicosis severely damages bird livers, suppresses antibody production from vaccines, and leads to chronic unthriftiness and sudden mortality under hot weather.',
    impact: 'Immune failure, liver necrosis & 15% mortality',
  },
  {
    title: 'Excess Fine Calcium Powder in Layer Diets',
    desc: 'Using exclusively powdered limestone in layer feeds means calcium passes through the digestive tract in under 4 hours. By 2:00 AM when the eggshell calcifies in the uterus, the bird has no gut calcium left and resorbs structural bone, triggering brittle shells and cage layer paralysis.',
    impact: 'Up to 12% cracked eggs & premature layer culling',
  },
];

const NUTRITION_MATRIX = [
  {
    stage: 'Broiler Starter (0–21 Days)',
    energy: '3,000 – 3,050 kcal/kg',
    cp: '22.5% – 23.5%',
    calcium: '0.95% – 1.05%',
    phosphorus: '0.45% – 0.50%',
    aminoAcids: 'Lysine 1.35% · Methionine 0.52%',
    criticalAdditives: 'Phytase enzyme, Coccidiostat, Toxin binder, Liver tonic',
  },
  {
    stage: 'Broiler Finisher (22–42 Days)',
    energy: '3,150 – 3,250 kcal/kg',
    cp: '19.0% – 20.0%',
    calcium: '0.85% – 0.90%',
    phosphorus: '0.40% – 0.45%',
    aminoAcids: 'Lysine 1.15% · Methionine 0.45%',
    criticalAdditives: 'Fat/vegetable oil, Phytase, Choline chloride',
  },
  {
    stage: 'Pullet Grower (9–16 Weeks)',
    energy: '2,750 – 2,800 kcal/kg',
    cp: '15.5% – 16.5%',
    calcium: '1.00% – 1.20%',
    phosphorus: '0.40% – 0.42%',
    aminoAcids: 'Lysine 0.75% · Methionine 0.35%',
    criticalAdditives: 'Controlled energy to avoid fatty livers before lay',
  },
  {
    stage: 'Layer Phase 1 (18–45 Weeks)',
    energy: '2,750 – 2,800 kcal/kg',
    cp: '16.5% – 17.5%',
    calcium: '3.80% – 4.20%',
    phosphorus: '0.42% – 0.48%',
    aminoAcids: 'Lysine 0.85% · Methionine 0.42%',
    criticalAdditives: '70% coarse limestone grit, 30% fine powder, Phytase, Vitamin D3',
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'Pearson Square & Linear Optimization Modeling',
    desc: 'Balancing exact metabolizable energy and crude protein components using linear mathematical equations to eliminate wasteful nutrient excesses and minimize cost per kilogram.',
    icon: Scale,
    color: 'text-lime-400',
    borderColor: 'border-lime-500/30',
    bgColor: 'bg-lime-500/10',
  },
  {
    num: '02',
    title: 'Raw Material Auditing & Toxin Decontamination',
    desc: 'Screening incoming yellow maize, soybean meal, and GNC for moisture, adulteration, urease activity, and aflatoxin contamination prior to batch milling.',
    icon: ShieldCheck,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
  {
    num: '03',
    title: 'Synthetic Amino Acid Balancing (Lysine & Methionine)',
    desc: 'Precision dosing of crystalline amino acids to satisfy ideal protein ratios without overpaying for expensive intact oilseed proteins.',
    icon: FlaskConical,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '04',
    title: 'Enzyme Fortification & Mineral Bioavailability',
    desc: 'Integrating 6-phytase enzymes to liberate bound organic phosphorus from plant phytate, lowering feed costs while safeguarding skeletal development.',
    icon: TrendingUp,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
];

const FAQS = [
  {
    q: 'How much money can a commercial poultry farm save by self-compounding feed in Nigeria?',
    a: 'Self-compounding feed using on-farm mills or toll milling services typically saves between ₦1,750 and ₦3,000 per 50kg bag (₦35 to ₦60 per kg) compared to buying branded commercial feeds. On a batch of 5,000 broilers consuming approximately 400 to 450 bags over 6 weeks, total net operational savings range between ₦780,000 and ₦1,350,000 per cycle.',
  },
  {
    q: 'What is the Pearson Square method in poultry feed formulation?',
    a: 'The Pearson Square is an established algebraic method used to determine the exact proportion of an energy feed ingredient (such as maize or sorghum) and a protein concentrate (such as soybean meal or GNC) required to achieve a target dietary Crude Protein (CP) percentage. While ideal for two-ingredient basal balancing, commercial multi-nutrient diets also incorporate fixed mineral and amino acid packs.',
  },
  {
    q: 'Why is soybean meal preferred over Groundnut Cake (GNC) in broiler rations?',
    a: 'Extracted soybean meal has a superior amino acid profile, particularly in Lysine (approx. 2.8%–3.0%) and Threonine, with higher digestibility and lower susceptibility to aflatoxin contamination compared to Groundnut Cake. GNC is often contaminated with toxic aflatoxins due to poor drying practices in northern Nigeria and is severely deficient in Lysine and Methionine.',
  },
  {
    q: 'Why do commercial layer birds need coarse limestone instead of fine powder?',
    a: 'A hen forms the hard calcified eggshell mainly at night while asleep in the dark. Fine calcium powder dissolves rapidly in the proventriculus and is excreted within 3 to 4 hours. Coarse limestone particles (2mm–4mm) remain slowly dissolving in the gizzard throughout the night, continuously releasing ionized calcium into the bloodstream when shell mineralization demand peaks.',
  },
  {
    q: 'What happens if I forget to add phytase enzyme to my poultry feed?',
    a: 'Phytase breaks down phytate, an indigestible organic molecule in grains and oilseeds that binds phosphorus, calcium, zinc, and amino acids. Without phytase, up to 70% of plant phosphorus is excreted in manure, forcing you to purchase expensive inorganic dicalcium phosphate (DCP). Adding phytase improves amino acid digestibility and saves ₦15 to ₦25 per kg of finished feed.',
  },
  {
    q: 'How does D-AminGrow assist Nigerian farmers with feed formulation?',
    a: 'We provide customized, least-cost linear feed formulation spreadsheets calibrated to current grain market prices in your state. We audit your raw material sources (maize moisture, soybean quality), formulate tailor-made broiler, layer, and turkey diets, and supply certified pure synthetic amino acids, toxin binders, and vitamin premixes.',
  },
];

export function FeedFormulationClient() {
  const [selectedTarget, setSelectedTarget] = useState<string>('broiler_starter');
  const [energySourceIndex, setEnergySourceIndex] = useState<number>(0);
  const [proteinSourceIndex, setProteinSourceIndex] = useState<number>(0);

  // Form state
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmLocation, setFarmLocation] = useState('Oyo State');
  const [batchVolumeKg, setBatchVolumeKg] = useState<number>(1000);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const target: FeedTarget = useMemo(() => {
    return FEED_TARGETS.find((f) => f.id === selectedTarget) || FEED_TARGETS[0]!;
  }, [selectedTarget]);

  const energySource = ENERGY_SOURCES[energySourceIndex] ?? ENERGY_SOURCES[0]!;
  const proteinSource = PROTEIN_SOURCES[proteinSourceIndex] ?? PROTEIN_SOURCES[0]!;

  // Pearson Square Mathematical Formulation
  const formulation = useMemo(() => {
    const cpTarget = target.cpTarget;
    const cpEnergy = energySource.cp;
    const cpProtein = proteinSource.cp;

    // Diagonal absolute differences
    const partsEnergy = Math.abs(cpProtein - cpTarget);
    const partsProtein = Math.abs(cpTarget - cpEnergy);
    const totalParts = partsEnergy + partsProtein;

    const percentEnergy = (partsEnergy / totalParts) * 100;
    const percentProtein = (partsProtein / totalParts) * 100;

    // Scale to standard 100kg batch
    const kgEnergyIn100kg = ((percentEnergy * 0.95)).toFixed(1); // 95% basal + 5% fixed premix/minerals
    const kgProteinIn100kg = ((percentProtein * 0.95)).toFixed(1);

    return {
      percentEnergy: percentEnergy.toFixed(1),
      percentProtein: percentProtein.toFixed(1),
      kgEnergyIn100kg,
      kgProteinIn100kg,
      fixedPremixKg: 5.0, // Fixed vitamins, minerals, DCP, limestone, toxin binder, lysine, DL-methionine
    };
  }, [target, energySource, proteinSource]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !farmerPhone) return;

    setSubmitting(true);
    try {
      const payload = {
        enquiryType: 'feed_formulation',
        customerName: farmerName,
        customerPhone: farmerPhone,
        farmName: 'Feed Formulation Project',
        deliveryState: farmLocation,
        deliveryCity: 'Regional Feed Plant',
        items: [
          {
            name: `Feed Optimization Consultation (${target.name} - ${batchVolumeKg}kg)`,
            quantity: 1,
            unitPriceNgn: 0,
          },
        ],
        userNotes: `Target diet: ${target.name} (${target.cpTarget}% CP). Energy base: ${energySource.name}. Protein base: ${proteinSource.name}. Formulation ratio: ${formulation.kgEnergyIn100kg}kg energy / ${formulation.kgProteinIn100kg}kg protein. Batch size: ${batchVolumeKg}kg.`,
        consentGiven: true,
      };

      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-body bg-slate-50 min-h-screen">
      {/* ====================================================================
          CINEMATIC DARK HERO (7/5 GRID)
          ==================================================================== */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-lime-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
            <span>/</span>
            <Link href="/services/consultation" className="hover:text-emerald-400 transition-colors">Consultation</Link>
            <span>/</span>
            <span className="text-lime-400 font-semibold">Feed Formulation</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <Wheat className="h-3.5 w-3.5 text-lime-400" />
                Veterinary Nutritional Science &amp; Least-Cost Compounding
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading tracking-tight leading-tight">
                Poultry Feed Formulation in Nigeria: <br />
                <span className="bg-gradient-to-r from-lime-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                  Pearson Square &amp; Least-Cost Ration Balancer
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Feed represents 72% of total commercial poultry production cost in Nigeria. Stop paying hefty marketing markups on commercial bagged feeds. Formulate high-performance, precision crude protein rations using local grains and pure synthetic amino acids.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20consult%20on%20poultry%20feed%20formulation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Consult Nutritionist on WhatsApp</span>
                </a>
                <a
                  href="#interactive-calculator"
                  className="inline-flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all text-sm"
                >
                  <span>Launch Pearson Square Balancer</span>
                  <ArrowRight className="h-4 w-4 text-lime-400" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Save ₦35–₦60 Per Kilogram</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Crystalline Amino Acid Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>FCR Under 1.60 Achieved</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Live Formulation Preview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-lime-500/30 bg-slate-900/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Formulation Preview
                  </span>
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-extrabold border bg-lime-950/80 text-lime-400 border-lime-800">
                    {target.cpTarget}% Target CP
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2.5">
                  <div className="text-base font-bold text-white font-heading truncate">
                    {target.name}
                  </div>
                  <div className="text-xs text-slate-300">
                    Energy: {energySource.name} ({formulation.kgEnergyIn100kg} kg/100kg)
                  </div>
                  <div className="text-xs text-slate-300">
                    Protein: {proteinSource.name} ({formulation.kgProteinIn100kg} kg/100kg)
                  </div>
                  <div className="text-[11px] text-lime-400 font-semibold pt-1 border-t border-slate-700">
                    Fixed Premix &amp; Minerals: {formulation.fixedPremixKg} kg (DCP, Limestone, Salt, Amino Acids)
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-400 shrink-0" />
                    <span>Linear programming spreadsheet available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-400 shrink-0" />
                    <span>Includes toxin binder &amp; phytase dosage</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#interactive-calculator"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-600 to-emerald-600 px-5 py-3 text-xs font-bold text-white hover:from-lime-500 hover:to-emerald-500 transition-all shadow-md"
                  >
                    <span>Customize Ingredients Below</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          OPERATIONAL BENCHMARKS BAR
          ==================================================================== */}
      <section className="bg-white border-y border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {OPERATIONAL_BENCHMARKS.map((b, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  {b.value}
                </div>
                <div className="text-xs font-bold text-lime-800 uppercase tracking-wider">
                  {b.label}
                </div>
                <div className="text-xs text-slate-500 leading-snug">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM SECTION: SYSTEMIC FEED COMPOUNDING MISTAKES
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            Nutritional Hazards in Farm Compounding
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Why Flawed Feed Recipes Rob 30% of Farm Profitability
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Formulating chicken feed is pure biochemical engineering, not guesswork. Relying on unbalanced crude protein, damp maize, or missing amino acids silently drains your capital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROBLEM_POINTS.map((p, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-red-100 bg-red-50/30 p-7 space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-red-100 text-xs font-bold text-red-700">
                Economic Impact: {p.impact}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          INFORMATION GAIN MATRIX: COMMERCIAL NUTRITIONAL SPECIFICATIONS
          ==================================================================== */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Layers className="h-3.5 w-3.5 text-lime-700" />
              Nutritional Nutrient Matrix
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Commercial Poultry Nutritional Standards &amp; Raw Material Matrix
            </h2>
            <p className="text-sm text-slate-600">
              Evidence-based nutritional targets for tropical climates (Nigeria 2026), calibrated to maintain high feed conversion efficiency during extreme ambient heat.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-heading">
                  <th className="p-4 sm:p-5 font-bold">Production Stage</th>
                  <th className="p-4 sm:p-5 font-bold">Metabolizable Energy</th>
                  <th className="p-4 sm:p-5 font-bold">Crude Protein</th>
                  <th className="p-4 sm:p-5 font-bold">Calcium (Ca)</th>
                  <th className="p-4 sm:p-5 font-bold">Available P</th>
                  <th className="p-4 sm:p-5 font-bold">Limiting Amino Acids</th>
                  <th className="p-4 sm:p-5 font-bold">Critical Additives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {NUTRITION_MATRIX.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.stage}</td>
                    <td className="p-4 sm:p-5 font-mono">{row.energy}</td>
                    <td className="p-4 sm:p-5 font-bold text-lime-700">{row.cp}</td>
                    <td className="p-4 sm:p-5 font-mono">{row.calcium}</td>
                    <td className="p-4 sm:p-5 font-mono">{row.phosphorus}</td>
                    <td className="p-4 sm:p-5 font-semibold text-slate-800">{row.aminoAcids}</td>
                    <td className="p-4 sm:p-5 text-slate-600">{row.criticalAdditives}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4-PILLAR FRAMEWORK OF OPERATIONAL EXCELLENCE
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <Sparkles className="h-3.5 w-3.5" />
            Nutritional Engineering Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            The D-AminGrow 4-Pillar Precision Nutrition Standard
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our feed formulation philosophy maximizes biological availability while keeping ingredient procurement costs at their absolute minimum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pil) => {
            const Icon = pil.icon;
            return (
              <div
                key={pil.num}
                className="rounded-3xl border border-slate-200 bg-white p-7 space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-heading text-slate-300">{pil.num}</span>
                    <div className={`h-10 w-10 rounded-2xl ${pil.bgColor} ${pil.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 leading-snug">
                    {pil.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          PRESERVED INTERACTIVE PEARSON SQUARE CALCULATOR & FORM
          ==================================================================== */}
      <section id="interactive-calculator" className="py-16 bg-white border-y border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Calculator className="h-3.5 w-3.5 text-lime-700" />
              Interactive Feed Calculator
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Pearson Square Ration Balancer (Live Compounding Tool)
            </h2>
            <p className="text-sm text-slate-600">
              Select your target bird production stage, choose your primary energy base and protein meal, and calculate the exact kilograms required per 100kg mixing batch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Interactive Pearson Square Calculator */}
            <div className="lg:col-span-7 space-y-6">
              {/* Target Diet Selector */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <Scale className="h-4 w-4 text-lime-700" />
                  1. Select Target Production Ration
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FEED_TARGETS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTarget(t.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedTarget === t.id
                          ? 'border-lime-700 bg-white shadow-sm ring-1 ring-lime-700'
                          : 'border-slate-200 bg-white hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 block">{t.name}</span>
                        <span className="text-xs font-extrabold text-lime-800 bg-lime-100 px-2 py-0.5 rounded">
                          {t.cpTarget}% CP
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-1">{t.energyTarget} · {t.calciumTarget}</span>
                      <span className="text-[10px] text-slate-400 block mt-1.5">{t.notes}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Raw Ingredients Configuration */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
                <h3 className="text-base font-bold font-heading text-slate-900">
                  2. Select Available Energy &amp; Protein Bases
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Energy Base (Grains / Offal)
                    </label>
                    <div className="space-y-2">
                      {ENERGY_SOURCES.map((src, i) => (
                        <button
                          key={src.name}
                          type="button"
                          onClick={() => setEnergySourceIndex(i)}
                          className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between ${
                            energySourceIndex === i
                              ? 'border-lime-700 bg-lime-50 text-lime-950 ring-1 ring-lime-700'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{src.name}</span>
                          <span className="text-[11px] text-slate-400">{src.cp}% CP</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Protein Concentrate
                    </label>
                    <div className="space-y-2">
                      {PROTEIN_SOURCES.map((src, i) => (
                        <button
                          key={src.name}
                          type="button"
                          onClick={() => setProteinSourceIndex(i)}
                          className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between ${
                            proteinSourceIndex === i
                              ? 'border-lime-700 bg-lime-50 text-lime-950 ring-1 ring-lime-700'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{src.name}</span>
                          <span className="text-[11px] text-slate-400">{src.cp}% CP</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculated Inclusion Batch */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-lime-700" />
                    Calculated Batch Formulation (Per 100kg Mix)
                  </h3>
                  <span className="text-xs font-bold text-lime-800 bg-lime-100 px-2.5 py-0.5 rounded-full">
                    Target: {target.cpTarget}% CP
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-slate-500 font-semibold block">{energySource.name}</span>
                    <span className="text-xl font-bold text-slate-900 block">{formulation.kgEnergyIn100kg} kg</span>
                    <span className="text-[10px] text-slate-400 block">{formulation.percentEnergy}% of basal mix</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-slate-500 font-semibold block">{proteinSource.name}</span>
                    <span className="text-xl font-bold text-slate-900 block">{formulation.kgProteinIn100kg} kg</span>
                    <span className="text-[10px] text-slate-400 block">{formulation.percentProtein}% of basal mix</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-slate-500 font-semibold block">Fixed Premix &amp; Minerals</span>
                    <span className="text-xl font-bold text-emerald-800 block">{formulation.fixedPremixKg} kg</span>
                    <span className="text-[10px] text-slate-400 block">DCP, limestone, salt, amino acids</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950">
                  <strong>Critical Premix Additives (5kg bundle):</strong> Vitamin-Mineral Premix 250g, Bone Meal / DCP 2.0kg, Limestone 1.5kg, L-Lysine 100g, DL-Methionine 150g, Toxin Binder 200g, Table Salt 300g, Phytase Enzyme 50g.
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form & Custom Spreadsheet Request */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg sticky top-24 space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-lime-700">
                    Veterinary Nutritionist Review
                  </span>
                  <h3 className="text-xl font-bold font-heading text-slate-900 mt-1">
                    Request Custom Farm Feed Spec
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Get a complete multi-ingredient linear programming spreadsheet tailored to your local raw material prices.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-lime-50 border border-lime-200 text-center space-y-3">
                    <CheckCircle2 className="h-10 w-10 text-lime-700 mx-auto" />
                    <h4 className="text-base font-bold text-lime-950">Formulation Request Received</h4>
                    <p className="text-xs text-lime-900 leading-relaxed">
                      Our poultry nutrition consultant will compile your {target.name} spreadsheet with exact raw material costings.
                    </p>
                    <a
                      href="https://wa.me/2348068700074?text=Hello%20D-AminGrow,%20I%20just%20submitted%20a%20feed%20formulation%20advisory%20request"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-lime-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-lime-800 transition-colors shadow-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Discuss on WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chief Austin Loveday"
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08068700074"
                        value={farmerPhone}
                        onChange={(e) => setFarmerPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Farm State / Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Oyo State"
                        value={farmLocation}
                        onChange={(e) => setFarmLocation(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Target Weekly Compounding Volume (Kg)
                      </label>
                      <input
                        type="number"
                        step="500"
                        value={batchVolumeKg}
                        onChange={(e) => setBatchVolumeKg(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      <span>{submitting ? 'Generating Consultation...' : 'Request Complete Nutrition Spreadsheet'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          HONESTY FILTER: WE MAY NOT BE RIGHT FOR YOU IF...
          ==================================================================== */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-3">
            <div className="section-label">
              <ShieldCheck className="h-3.5 w-3.5 text-lime-700" />
              Honest Fit Assessment
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              Our Feed Formulation Consultation May <span className="text-rose-600">Not</span> Be Right For You If...
            </h2>
            <p className="text-sm text-slate-600">
              We engineer scientifically verified nutritional formulas for commercial farm profitability. We are transparent about operational limits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Use Uncalibrated Eye-Measure Weighing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your farm attendants scoop synthetic amino acids or enzymes using food tins or paint buckets instead of digital gram scales, batch inconsistency will cause uneven growth and flock feather picking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Buy Moldy Discount Maize Without Testing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No advanced formulation or chemical toxin binder can overcome cheap rotten grain saturated with 200+ ppb aflatoxin. We do not formulate diets using visibly moldy materials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Your Weekly Batch Volume is Below 500 Kilograms
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Micro-producers rearing 50 to 100 birds lack the scale to buy wholesale 50kg bags of methionine and lysine economically. High-grade commercial bagged crumbs remain more cost-effective for backyard flocks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FAQ SECTION (6 QUESTIONS)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="section-label">
              <HelpCircle className="h-3.5 w-3.5 text-lime-700" />
              Formulation FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Poultry Feed Formulation in Nigeria
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2">
                <h3 className="text-sm sm:text-base font-bold font-heading text-slate-900">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          HIGH-CONVERTING CLOSING CTA BANNER
          ==================================================================== */}
      <section className="py-20 bg-gradient-to-br from-[#050E08] via-slate-950 to-lime-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-lime-500/20 border border-lime-500/30 px-3.5 py-1 text-xs font-bold text-lime-300">
            <Clock className="h-3.5 w-3.5 text-lime-400" />
            <span>Turnkey Feed Compounding Solutions Across Nigeria</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Slash Your Poultry Feed Costs by Up to ₦60/kg
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect directly with registered veterinary nutritionists. Get custom linear programming feed recipes, raw material sourcing audits, and pure crystalline premixes delivered directly to your farm.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%20Nutrition%20Desk%2C%20I%20want%20to%20optimize%20my%20poultry%20feed%20formulation%20and%20save%20costs."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-xl inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Connect on WhatsApp (+234 806 870 0074)</span>
            </a>
            <a
              href="tel:+2348068700074"
              className="border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-xl transition-all text-base inline-flex items-center justify-center gap-2 bg-white/5"
            >
              <PhoneCall className="h-5 w-5 text-lime-400" />
              <span>Call Senior Feed Nutritionist</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
