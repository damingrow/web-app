'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calculator,
  Scale,
  Egg,
  Thermometer,
  Syringe,
  Stethoscope,
  ExternalLink,
} from 'lucide-react';

export default function ToolsClient() {
  const tools = [
    {
      name: 'Brooder Space & Equipment Calculator',
      slug: '/calculators/brooder',
      icon: Thermometer,
      category: 'Brooding & Housing',
      formula: 'Floor area = birdCount * 0.05 sq.m (Week 1–2); 1 gas brooder per 500 chicks',
      disclaimer: 'Heating guidelines calibrated for Nigerian ambient temperatures (22°C–32°C).',
      status: 'Active',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      name: 'Vaccination Schedule Planner & Calendar Hub',
      slug: '/vaccination-program',
      icon: Syringe,
      category: 'Flock Health & Biosecurity',
      formula: 'Date-calibrated Broiler (Day 1–19) and Layer (Day 1–Wk 22) immunization programs',
      disclaimer: 'Protocols based on NAFDAC-approved vaccines and field disease challenge zones.',
      status: 'Active',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      name: 'Feed Conversion Ratio (FCR) & Cost Margin Calculator',
      slug: '/calculators/fcr',
      icon: Scale,
      category: 'Nutrition & Profitability',
      formula: 'FCR = Total Feed Consumed (kg) / Total Flock Weight Gain (kg)',
      disclaimer: 'Target FCR for commercial broilers: 1.55–1.75 at 6 weeks.',
      status: 'Active',
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      name: 'Hen-Day Egg Production (HDP) Calculator',
      slug: '/calculators/egg-production',
      icon: Egg,
      category: 'Layer Operations',
      formula: 'HDP (%) = (Total Eggs Collected / Total Live Hens) * 100',
      disclaimer: 'Peak production threshold: 92%–96% between weeks 28–34.',
      status: 'Active',
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
    {
      name: 'Poultry Disease Symptom Triager',
      slug: '/calculators/symptom-checker',
      icon: Stethoscope,
      category: 'Clinical Advisory',
      formula: 'Clinical scoring (Critical, High, Routine) evaluating mortality & respiratory signs',
      disclaimer: 'Advisory triage only; does not replace on-farm post-mortem examination.',
      status: 'Active',
      color: 'bg-red-50 text-red-700 border-red-200',
    },
  ];

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <Calculator className="h-4 w-4" />
            <span>Farm Utilities · Module 08</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Farm Tools &amp; Calculators Administration
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage public agricultural calculators, mathematical models, assumptions, and printable chart templates.
          </p>
        </div>

        <Link
          href="/calculators"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
        >
          <span>Open Public Tools Hub</span>
          <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
        </Link>
      </div>

      {/* Tools Grid */}
      <div className="space-y-4">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 hover:border-emerald-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border ${t.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">{t.name}</h3>
                    <span className="text-xs text-slate-500">{t.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
                    {t.status}
                  </span>
                  <Link
                    href={t.slug}
                    target="_blank"
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <span>Launch</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mathematical Model &amp; Logic</div>
                  <div className="font-mono text-slate-800 mt-1">{t.formula}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Veterinary &amp; Operational Disclaimer</div>
                  <div className="text-slate-600 mt-1">{t.disclaimer}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
