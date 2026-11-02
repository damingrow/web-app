import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import {
  Calendar,
  Clock,
  ArrowRight,
  Calculator,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Veterinary Knowledge Centre & Poultry Health Guides | D-AminGrow',
  description:
    'Evidence-based clinical guides on poultry vaccination timetables, coccidiosis treatment, day-old chick brooding, and tropical livestock health management in Nigeria.',
};

export default function KnowledgeHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Knowledge Centre</span>
        </nav>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
              📚 Veterinary Advisory & Farm Engineering
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
              Livestock Knowledge Centre
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Empowering African farmers with actionable, clinical veterinary guidance and engineering standards to maximize livability, prevent disease outbreaks, and eliminate biosecurity losses.
            </p>
          </div>
        </div>

        {/* Interactive Tools Highlight Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/calculators/brooder"
            className="group rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-8 transition-all hover:bg-emerald-50 hover:shadow-md flex items-start space-x-5"
          >
            <div className="rounded-2xl bg-emerald-600 p-4 text-white shadow-md group-hover:scale-105 transition-transform">
              <Calculator className="h-7 w-7" />
            </div>
            <div className="space-y-1.5 flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Interactive Farm Planning Utility
              </span>
              <h2 className="text-lg font-bold text-slate-900 font-heading group-hover:text-emerald-800 transition-colors">
                Brooder Equipment & Floor Space Calculator
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Input your target flock size to instantly calculate required square footage, canopy gas brooders, starter trays, and drinkers.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center">
                <span>Launch Brooder Calculator</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link
            href="/calculators/vaccination"
            className="group rounded-3xl border border-cyan-200 bg-cyan-50/50 p-6 sm:p-8 transition-all hover:bg-cyan-50 hover:shadow-md flex items-start space-x-5"
          >
            <div className="rounded-2xl bg-cyan-600 p-4 text-white shadow-md group-hover:scale-105 transition-transform">
              <Calendar className="h-7 w-7" />
            </div>
            <div className="space-y-1.5 flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800">
                Clinical Immunization Engine
              </span>
              <h2 className="text-lg font-bold text-slate-900 font-heading group-hover:text-cyan-800 transition-colors">
                Poultry Vaccination Schedule Generator
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate a custom calendar timetable for broilers or layers with exact drinking water administration and cold-chain protocols.
              </p>
              <div className="pt-2 text-xs font-semibold text-cyan-700 flex items-center">
                <span>Generate Flock Schedule</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* Clinical Guides & Articles Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 font-heading">
              Clinical Advisory & Field Management Guides
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Authored by certified Nigerian veterinarians and agricultural engineers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.map((article) => (
              <Link
                key={article.id}
                href={`/knowledge/${article.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-emerald-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {article.category}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-950 font-heading group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    By <span className="font-medium text-slate-700">{article.author.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 flex items-center group-hover:translate-x-1 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
