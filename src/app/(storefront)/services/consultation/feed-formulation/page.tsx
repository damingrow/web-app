'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Wheat,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Scale,
  Send,
  MessageCircle,
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

export default function FeedFormulationConsultationPage() {
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
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/services/consultation" className="hover:text-emerald-700 transition-colors">
              Consultation Services
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-slate-900">Feed Formulation &amp; Nutrition</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-lime-950 text-white py-14 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-lime-500/20 border border-lime-400/30 px-3.5 py-1 text-xs font-bold text-lime-300">
              <Wheat className="h-4 w-4" />
              <span>Veterinary Nutritional Science · Pearson Square Precision</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
              Poultry Feed Formulation &amp; Nutrition Advisory
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Formulate high-performance, cost-effective poultry rations using locally available raw materials.
              Balance Crude Protein (CP), amino acids (Lysine &amp; Methionine), and calcium for maximum FCR efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Pearson Square Calculator */}
          <div className="lg:col-span-7 space-y-6">
            {/* Target Diet Selector */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                <Scale className="h-4 w-4 text-lime-600" />
                1. Select Target Production Ration
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEED_TARGETS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTarget(t.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedTarget === t.id
                        ? 'border-lime-600 bg-lime-50/70'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
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
                            ? 'border-lime-600 bg-lime-50 text-lime-950'
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
                            ? 'border-lime-600 bg-lime-50 text-lime-950'
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
                  <Calculator className="h-4 w-4 text-lime-600" />
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
                    href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20just%20submitted%20a%20feed%20formulation%20advisory%20request"
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
                      placeholder="e.g. 08039123456"
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
      </section>
    </div>
  );
}
