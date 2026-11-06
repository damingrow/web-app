'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calculator,
  Scale,
  Egg,
  Stethoscope,
  Thermometer,
  ArrowRight,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const CALCULATORS = [
  {
    title: 'Feed Conversion Ratio (FCR) & Feed Margin Calculator',
    slug: '/calculators/fcr',
    badge: 'Profit Optimizer',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: Scale,
    description:
      'Calculate feed efficiency, cost of feed per kilogram of live bird weight, target breed benchmarks, and identify costly feed wastage in commercial broilers and turkeys.',
    metrics: ['FCR Rating', 'Feed Cost / kg Meat', 'Wastage Cost', 'Breed Benchmark Comparison'],
    highlight: 'Feed represents 70–75% of production cost. Saving 0.1 on FCR increases profit by up to ₦180,000 per 1,000 birds.',
  },
  {
    title: 'Hen-Day Egg Production (HDP) & Layer Profitability Calculator',
    slug: '/calculators/egg-production',
    badge: 'Layer & POL Management',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    icon: Egg,
    description:
      'Track laying curve percentage against international breed standards (ISA Brown, Lohmann), calculate daily crates harvested, feed cost per crate, and net monthly gross egg margin.',
    metrics: ['Hen-Day % (HDP)', 'Daily Crates', 'Feed Cost / Crate', 'Net Monthly Egg Margin'],
    highlight: 'Instantly identifies production dips caused by nutritional deficits, disease onset, or lighting irregularities.',
  },
  {
    title: 'Livestock Disease Symptom Triaging Assistant',
    slug: '/calculators/symptom-checker',
    badge: 'Clinical Emergency Tool',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    icon: Stethoscope,
    description:
      'Interactive clinical diagnostic questionnaire matching observed symptoms (bloody droppings, snicking, twisted neck, egg drops) to probable poultry diseases with emergency protocols.',
    metrics: ['Probable Pathogen', 'Risk Severity Level', 'Emergency Farm Protocol', 'Direct Vet SOS Dispatch'],
    highlight: 'Helps farmers avoid indiscriminate antibiotic misuse and triggers rapid biosecure containment within minutes.',
  },
  {
    title: 'Brooder Floor Space & Gas Heating Calculator',
    slug: '/calculators/brooder',
    badge: 'Day-Old Chick Brooding',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    icon: Thermometer,
    description:
      'Calculate exact floor space in square meters and feet, radiant canopy gas brooder heaters needed, feeding trays, bell drinkers, and starter feed bags for day 1–21 chicks.',
    metrics: ['Gas Brooders Needed', 'Floor Area (m² & ft²)', 'Feeder & Drinker Counts', 'Starter Feed Bags'],
    highlight: 'Designed specifically for Nigerian tropical ambient temperatures to keep first-week mortality under 1.5%.',
  },
  {
    title: 'Poultry Vaccination Timetable Generator',
    slug: '/calculators/vaccination',
    badge: 'Immunization Schedule',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    icon: Calculator,
    description:
      'Generate a personalized day-by-day immunization timetable for broilers, commercial layers, or turkeys based on your flock placement date, complete with administration route and cold-chain guides.',
    metrics: ['Placement Date Sync', 'Vaccine Strains', 'Administration Method', 'Cold-Chain Protocol'],
    highlight: 'Synchronized with Nigerian field strains: Mareks, B1, Gumboro (IBD), LaSota, Fowl Pox, and EDS-76.',
  },
];

export function CalculatorsHubClient() {
  return (
    <div className="min-h-screen bg-slate-50/70 font-body">
      {/* Hero */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 section-label-dark mx-auto">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>African Agro-Allied Intelligence Suite</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight max-w-4xl mx-auto leading-tight">
            Scientific Farm Calculators & <br />
            <span className="text-gradient-green">Clinical Decision Tools</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Eliminate guesswork in your poultry and livestock operations. Powered by Nigerian epidemiological data, tropical brooding parameters, and verified international feed conversion standards.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto pt-6 text-left">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="text-2xl font-extrabold text-emerald-400 font-heading">5 Tools</div>
              <div className="text-xs text-slate-400 mt-0.5">Clinical & Economic Models</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="text-2xl font-extrabold text-amber-400 font-heading">70–75%</div>
              <div className="text-xs text-slate-400 mt-0.5">Feed Cost Optimization</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="text-2xl font-extrabold text-cyan-400 font-heading">&lt; 1.5%</div>
              <div className="text-xs text-slate-400 mt-0.5">Target Brooding Mortality</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="text-2xl font-extrabold text-rose-400 font-heading">24/7 SOS</div>
              <div className="text-xs text-slate-400 mt-0.5">Direct WhatsApp Vet Desk</div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-8">
          <div className="text-center sm:text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
              Select an Operational Utility
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Real-time mathematical and clinical algorithms tailored for commercial broiler, layer pullet, and turkey farmers across Nigeria and West Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CALCULATORS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.slug}
                  className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-emerald-500/40 relative overflow-hidden"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    {/* Highlight Box */}
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-xs text-slate-700 flex items-start gap-2.5">
                      <TrendingUp className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{tool.highlight}</span>
                    </div>

                    {/* Metric Pills */}
                    <div className="pt-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Calculated Parameters:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tool.metrics.map((metric, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                          >
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <Link
                      href={tool.slug}
                      className="inline-flex items-center justify-center w-full rounded-2xl bg-[#050E08] hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 transition-all duration-200 text-sm shadow group-hover:shadow-lg gap-2"
                    >
                      <span>Launch Interactive Calculator</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
