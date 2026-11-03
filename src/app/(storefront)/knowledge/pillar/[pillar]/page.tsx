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
    title: `${p.name} — Technical Guides & VCN Protocols | D-AminGrow Nigeria`,
    description: `${p.description} Certified veterinary advisory and operational protocols targeting ${p.targetAudience}.`,
    keywords: p.primaryKeywords.map((k) => k.query),
    openGraph: {
      title: `${p.name} | D-AminGrow Agricultural Knowledge`,
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

export default async function PillarDetailPage({ params }: PillarPageProps) {
  const { pillar: pillarSlug } = await params;
  const pillar = getPillarBySlug(pillarSlug);

  if (!pillar) {
    notFound();
  }

  const articles = getArticlesForPillar(pillar.id as PillarId);
  const otherPillars = EDITORIAL_PILLARS.filter((p) => p.id !== pillar.id);
  const PillarIcon = getPillarIcon(pillar.iconName);

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

      {/* Cinematic Dark Hero */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Topical Authority Pillar · E-E-A-T Certified</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
                  <PillarIcon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Pillar Category
                  </span>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
                    {pillar.name}
                  </h1>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {pillar.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>{pillar.clinicalReviewStandard}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <BookOpen className="h-4 w-4 text-cyan-400" />
                  <span>{articles.length} Authoritative Clinical Guides</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp SOS Card */}
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/40 p-5 backdrop-blur-md max-w-sm space-y-3">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                VCN Veterinary Advisory Desk
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Have specific flock questions regarding {pillar.shortTitle.toLowerCase()}? Direct consultation available with licensed Nigerian poultry veterinary surgeons.
              </p>
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%20Vet%20Desk,%20I%20need%20advisory%20regarding%20"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-bold transition-all shadow"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Message Vet Desk (+2348139169402)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
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

        {/* Primary Search Queries & FAQs in this Pillar */}
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
    </div>
  );
}
