import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { EDITORIAL_PILLARS } from '@/lib/editorial/pillars';
import { KnowledgeList } from './knowledge-list';
import {
  Calendar,
  Clock,
  ArrowRight,
  Calculator,
  Sparkles,
  BookOpen,
  ShieldCheck,
  MessageCircle,
  FileText,
  Users,
  Syringe,
  Stethoscope,
  Flame,
  Egg,
  Scale,
  Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Livestock Knowledge Centre — Clinical Guides & Veterinary Timetables | D-AminGrow',
  description:
    'Evidence-based veterinary advisory, poultry vaccination timetables, coccidiosis management, brooding engineering standards, and tropical livestock guidance across Nigeria and Africa.',
  openGraph: {
    title: 'D-AminGrow Livestock Knowledge Centre — Clinical Guides & Farm Calculators',
    description:
      'Empowering 500K+ African farmers with certified veterinary protocols, brooding calculators, and disease prevention insights.',
  },
};

export default function KnowledgeHubPage() {
  const featuredArticle = ARTICLES[0]!; // Complete Poultry Vaccination Schedule

  return (
    <div className="min-h-screen bg-slate-50/70">
      {/* ====================================================================
          CINEMATIC DARK HERO
          ==================================================================== */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        {/* Decorative Grid Pattern Overlay */}
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Knowledge Centre</span>
          </nav>

          <div className="max-w-3xl space-y-5">
            <div className="section-label-dark">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              Veterinary Knowledge & Farm Engineering Hub
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading leading-tight">
              African Livestock <br />
              <span className="text-gradient-green">Knowledge Centre</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Empowering commercial and smallholder livestock farmers across Nigeria and Africa with actionable, clinical veterinary protocols, biosecurity standards, and interactive engineering tools to eliminate mortality and maximize profitability.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-400" />
                <span>Targeting <strong>500,000+</strong> monthly African farmers</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Authored by licensed Nigerian Veterinarians</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-400" />
                <span>100% Free & Open Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FEATURED HERO ARTICLE BANNER
          ==================================================================== */}
      <section className="relative -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-10 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300">
                  <Sparkles className="h-3 w-3" />
                  Featured Clinical Guide
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredArticle.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {featuredArticle.summary}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span>By <strong className="text-emerald-300">{featuredArticle.author.name}</strong></span>
                <span>•</span>
                <span>{featuredArticle.category}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href={`/knowledge/${featuredArticle.slug}`}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 text-sm group"
              >
                <span>Read Full Protocol</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6 CORE AUTHORITY PILLARS (PROGRAMMATIC TOPIC CLUSTERS)
          ==================================================================== */}
      <section className="pt-16 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="section-label mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              E-E-A-T Programmatic Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading">
              6 Core Agricultural Authority Pillars
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Specialized veterinary and engineering research clusters serving 500,000+ monthly poultry producers across West Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDITORIAL_PILLARS.map((p) => {
            let IconComp = BookOpen;
            if (p.iconName === 'Syringe') IconComp = Syringe;
            else if (p.iconName === 'Stethoscope') IconComp = Stethoscope;
            else if (p.iconName === 'Flame') IconComp = Flame;
            else if (p.iconName === 'Egg') IconComp = Egg;
            else if (p.iconName === 'Scale') IconComp = Scale;
            else if (p.iconName === 'Building2') IconComp = Building2;

            return (
              <Link
                key={p.id}
                href={`/knowledge/pillar/${p.slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
                    <span>Target: <strong className="text-slate-800">{(p.monthlyTrafficTarget / 1000).toFixed(0)}k/mo</strong></span>
                    <span className="text-emerald-700 font-semibold group-hover:underline flex items-center gap-1">
                      Explore Pillar <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="section-label mb-2">
              <Calculator className="h-3.5 w-3.5" />
              Digital Decision Tools
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading">
              Interactive Farm Calculators
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Compute flock floor space, canopy gas heaters, and generate automated vaccination schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Brooder Calculator */}
          <Link
            href="/calculators/brooder"
            className="group relative overflow-hidden rounded-3xl border border-emerald-200 bg-white p-7 sm:p-9 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/10 hover:border-emerald-400 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Calculator className="h-7 w-7" />
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                  Flock Planning
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-950 font-heading group-hover:text-emerald-700 transition-colors">
                  Brooder Equipment & Floor Space Calculator
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Input target bird numbers (broilers, layers, turkeys) to calculate exact square footage, radiant gas heaters, drinker rows, and feeder trays needed for zero brooding mortality.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                Launch Brooder Calculator <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="text-slate-400 font-normal">Instant calculation</span>
            </div>
          </Link>

          {/* Vaccination Schedule Generator */}
          <Link
            href="/calculators/vaccination"
            className="group relative overflow-hidden rounded-3xl border border-cyan-200 bg-white p-7 sm:p-9 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/10 hover:border-cyan-400 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-600/20 group-hover:scale-110 transition-transform">
                  <Calendar className="h-7 w-7" />
                </div>
                <span className="text-xs font-bold text-cyan-800 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full">
                  Clinical Scheduling
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-950 font-heading group-hover:text-cyan-700 transition-colors">
                  Flock Vaccination Schedule Generator
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Select bird breed and hatch arrival date to produce a custom, printable immunization timetable with Newcastle, Gumboro, Marek&apos;s, and Fowl Pox dates.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs font-bold text-cyan-700">
              <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                Generate Custom Schedule <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="text-slate-400 font-normal">Custom Timetable</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ====================================================================
          MAIN ARTICLES DIRECTORY WITH LIVE SEARCH & FILTERING
          ==================================================================== */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <div className="section-label">
            <BookOpen className="h-3.5 w-3.5" />
            Field Advisory
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight">
            Clinical Veterinary & Farm Engineering Library
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            Practical, evidence-backed guides created by Nigerian veterinary doctors and livestock engineers to protect your capital.
          </p>
        </div>

        {/* Client Interactive Filter & Grid */}
        <KnowledgeList articles={ARTICLES} />
      </section>

      {/* ====================================================================
          VETERINARY ADVISORY CALLOUT (WHATSAPP OUTBREAK LINE)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#050E08] text-white p-8 sm:p-14 border border-emerald-900/40">
            {/* Mesh backdrop */}
            <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="section-label-dark">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Farm Advisory Hotline
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white leading-tight">
                  Facing an active flock disease outbreak or mortality spike?
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Do not self-prescribe arbitrary antibiotics. Connect directly with our clinical livestock desk on WhatsApp for symptom triage, post-mortem interpretation, and drug administration guidance.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end justify-center">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%20Veterinary%20Desk%2C%20I%20have%20an%20urgent%20flock%20health%20inquiry%20regarding%20my%20birds."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold px-7 py-4 rounded-2xl transition-all shadow-xl shadow-emerald-950/40 text-sm whitespace-nowrap"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Consult Veterinary Desk</span>
                </a>
                <Link
                  href="/services#consultation"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-7 py-4 rounded-2xl transition-all text-sm whitespace-nowrap border border-white/10"
                >
                  <span>Book Farm Visit</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
