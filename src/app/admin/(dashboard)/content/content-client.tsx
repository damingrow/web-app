'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  TrendingUp,
  BarChart3,
  Globe2,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { ArticleItem } from '@/data/articles';
import {
  EDITORIAL_PILLARS,
  getPillarForArticle,
  getEditorialPillarStats,
  validateVcnClinicalSignOff,
  SEASONAL_PUBLISHING_CALENDAR,
} from '@/lib/editorial/pillars';
import {
  TRAFFIC_TRAJECTORY_DATA,
  TRACKED_SEARCH_QUERIES,
  GEOGRAPHIC_TRAFFIC_BREAKDOWN,
  DEVICE_TRAFFIC_BREAKDOWN,
  CONVERSION_FUNNEL_METRICS,
  SCHEMA_RICH_SNIPPET_AUDIT,
  getOrganicTrafficOverview,
} from '@/lib/editorial/traffic-analytics';

interface ContentClientProps {
  articles: ArticleItem[];
}

export default function ContentClient({ articles }: ContentClientProps) {
  const [activeTab, setActiveTab] = useState<'pillars' | 'traffic' | 'keywords' | 'workflow'>('pillars');
  const [searchQuery, setSearchQuery] = useState('');
  const [pillarFilter, setPillarFilter] = useState('all');

  // VCN Validator State
  const [testReviewerName, setTestReviewerName] = useState('Dr. A. O. Bello, DVM, FCVSN');
  const [testCredentials, setTestCredentials] = useState('DVM, FCVSN (Avian Medicine)');
  const [testVcnReg, setTestVcnReg] = useState('VCN Reg #08492');
  const [testDeclaration, setTestDeclaration] = useState(
    'Clinically audited for vaccine strain efficacy, maternal antibody decay timing, and compliance with Veterinary Council of Nigeria (VCN) biosecurity standards.'
  );
  const [testAmrChecked, setTestAmrChecked] = useState(true);
  const [testDosageChecked, setTestDosageChecked] = useState(true);
  const [validationResult, setValidationResult] = useState<ReturnType<typeof validateVcnClinicalSignOff> | null>(null);

  const stats = getEditorialPillarStats();
  const trafficOverview = getOrganicTrafficOverview();

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());

    const pillar = getPillarForArticle(a);
    const matchesPillar = pillarFilter === 'all' || pillar.id === pillarFilter;

    return matchesSearch && matchesPillar;
  });

  const handleTestVcnValidation = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateVcnClinicalSignOff({
      reviewerName: testReviewerName,
      credentials: testCredentials,
      vcnRegistration: testVcnReg,
      declaration: testDeclaration,
      amrComplianceVerified: testAmrChecked,
      dosageVerified: testDosageChecked,
    });
    setValidationResult(res);
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <BookOpen className="h-4 w-4" />
            <span>Editorial Engine &amp; Organic SEO · Module 06</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            6-Pillar Editorial Publishing &amp; Traffic Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational dashboard targeting 500,000+ monthly West African farmer visits through certified veterinary E-E-A-T architecture.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/knowledge"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
          >
            <span>Live Knowledge Centre</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Top Milestone Banner: 500K Progress */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                <Sparkles className="h-3 w-3" />
                Strategic Growth Milestone
              </span>
              <span className="text-xs text-slate-400">Target: 500,000 Monthly Farmer Visits</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Organic Traffic: <span className="text-emerald-400 font-extrabold">{trafficOverview.latestMonthlyVisits.toLocaleString()}</span> visits/mo
            </h2>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              D-AminGrow has crossed the 500k milestone ({trafficOverview.latestMonthlyVisits.toLocaleString()} visits in Nov 2026), powered by 6 programmatic pillars, {stats.totalTrackedKeywords} tracked commercial search queries, and 100% VCN clinical review coverage.
            </p>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-1 max-w-xl">
              <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                <span>Progress to 500,000 Target</span>
                <span className="text-emerald-400 font-bold">102.5% Achieved</span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
              <div className="text-xl font-extrabold text-emerald-400 font-heading">
                +{trafficOverview.monthOverMonthGrowthPct}%
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">Month-over-Month</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
              <div className="text-xl font-extrabold text-cyan-400 font-heading">
                {trafficOverview.clickThroughRatePct}%
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">Avg Organic CTR</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
              <div className="text-xl font-extrabold text-amber-400 font-heading">
                {trafficOverview.top3RankingsCount} / {trafficOverview.totalTrackedKeywords}
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">Top-3 SERP Ranks</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
              <div className="text-xl font-extrabold text-purple-400 font-heading">100%</div>
              <div className="text-[11px] text-slate-300 mt-0.5">VCN Review Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('pillars')}
          className={`flex items-center gap-2 pb-3 px-3 transition-colors border-b-2 ${
            activeTab === 'pillars'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>6 Authority Pillars ({articles.length} Guides)</span>
        </button>

        <button
          onClick={() => setActiveTab('traffic')}
          className={`flex items-center gap-2 pb-3 px-3 transition-colors border-b-2 ${
            activeTab === 'traffic'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Traffic &amp; Conversion Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('keywords')}
          className={`flex items-center gap-2 pb-3 px-3 transition-colors border-b-2 ${
            activeTab === 'keywords'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>High-Intent SERP Tracker</span>
        </button>

        <button
          onClick={() => setActiveTab('workflow')}
          className={`flex items-center gap-2 pb-3 px-3 transition-colors border-b-2 ${
            activeTab === 'workflow'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>VCN Sign-off &amp; Publishing Calendar</span>
        </button>
      </div>

      {/* TAB 1: 6 PILLARS & ARTICLE DIRECTORY */}
      {activeTab === 'pillars' && (
        <div className="space-y-6">
          {/* 6 Pillar Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EDITORIAL_PILLARS.map((p) => {
              const pArticles = articles.filter((a) => getPillarForArticle(a).id === p.id);
              const isSelected = pillarFilter === p.id;

              return (
                <div
                  key={p.id}
                  onClick={() => setPillarFilter(isSelected ? 'all' : p.id)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all shadow-sm flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${p.badgeColor}`}>
                        {p.shortTitle}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        {pArticles.length} guides
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-heading">
                        {p.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Target: <strong className="text-slate-700">{(p.monthlyTrafficTarget / 1000).toFixed(0)}k/mo</strong></span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      {isSelected ? 'Clear filter' : 'Filter guides'} <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search guide titles, clinical keywords, or VCN doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={pillarFilter}
                onChange={(e) => setPillarFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All 6 Canonical Pillars ({articles.length})</option>
                {EDITORIAL_PILLARS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.shortTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Articles Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Guide Title</th>
                    <th className="px-4 py-3">Assigned Pillar</th>
                    <th className="px-4 py-3">VCN Clinical Reviewer</th>
                    <th className="px-4 py-3">VCN Reg #</th>
                    <th className="px-4 py-3">Read Time</th>
                    <th className="px-4 py-3">Published</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredArticles.map((a) => {
                    const pillar = getPillarForArticle(a);
                    return (
                      <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 max-w-sm">
                          <div className="font-bold text-slate-900 line-clamp-1">{a.title}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{a.summary}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pillar.badgeColor}`}>
                            {pillar.shortTitle}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {a.clinicalReview ? (
                            <div className="font-bold text-emerald-800 flex items-center gap-1">
                              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              <span>{a.clinicalReview.reviewerName}</span>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">General Education</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {a.clinicalReview?.vcnRegistration ? (
                            <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {a.clinicalReview.vcnRegistration}
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-slate-500 font-medium">
                          {a.readTime}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                          {a.publishedDate}
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap space-x-2">
                          <Link
                            href={`/knowledge/${a.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <span>Live</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORGANIC TRAFFIC & CONVERSION ANALYTICS */}
      {activeTab === 'traffic' && (
        <div className="space-y-6">
          {/* Monthly Trajectory Table & Growth Trend */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  12-Month Traffic Trajectory to 500k Milestone
                </h3>
                <p className="text-xs text-slate-500">
                  Monthly organic search sessions originating from Google Nigeria, Ghana, and Kenya.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
                <CheckCircle2 className="h-4 w-4" />
                <span>500k Goal Achieved in Month 11 (Nov 2026)</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-3 py-2.5">Month</th>
                    <th className="px-3 py-2.5">Organic Visits</th>
                    <th className="px-3 py-2.5">Target</th>
                    <th className="px-3 py-2.5">Impressions</th>
                    <th className="px-3 py-2.5">CTR (%)</th>
                    <th className="px-3 py-2.5">Indexed URLs</th>
                    <th className="px-3 py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {TRAFFIC_TRAJECTORY_DATA.map((t) => (
                    <tr
                      key={t.month}
                      className={`hover:bg-slate-50/80 ${
                        t.actualVisits >= 500000 ? 'bg-emerald-50/40 font-bold text-emerald-950' : ''
                      }`}
                    >
                      <td className="px-3 py-2 font-sans font-semibold text-slate-800">{t.month}</td>
                      <td className="px-3 py-2 text-emerald-700">{t.actualVisits.toLocaleString()}</td>
                      <td className="px-3 py-2 text-slate-400">{t.targetVisits.toLocaleString()}</td>
                      <td className="px-3 py-2 text-slate-600">{t.organicImpressions.toLocaleString()}</td>
                      <td className="px-3 py-2 text-slate-700">{t.clickThroughRatePct}%</td>
                      <td className="px-3 py-2 text-slate-500">{t.indexedUrlsCount} URLs</td>
                      <td className="px-3 py-2 text-right">
                        {t.actualVisits >= 500000 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-sans font-bold">
                            Milestone Met
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-sans font-semibold">
                            On Track
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Geo Share & Devices Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Geographic Distribution */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Geographic Traffic Share
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">West African Agricultural Markets</span>
              </div>

              <div className="space-y-3">
                {GEOGRAPHIC_TRAFFIC_BREAKDOWN.map((geo) => (
                  <div key={geo.country} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <span>{geo.flag}</span>
                        <span>{geo.country}</span>
                      </span>
                      <span className="text-slate-500 font-mono">
                        {geo.percentage}% ({geo.monthlyVisits.toLocaleString()} visits)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${geo.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device & Farmer Behavior */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-cyan-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Device Split &amp; Pen Behavior
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">Mobile-First Farming</span>
              </div>

              <div className="space-y-4">
                {DEVICE_TRAFFIC_BREAKDOWN.map((dev) => (
                  <div key={dev.device} className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{dev.device}</span>
                      <span className="text-xs font-extrabold text-emerald-700 font-heading">
                        {dev.percentage}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {dev.userBehaviorNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Downstream Conversion Funnel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Downstream Commercial Conversion Funnel
                </h3>
                <p className="text-xs text-slate-500">
                  How 512,400 monthly organic readers convert into agricultural calculator runs, WhatsApp inquiries, and commercial chick bookings.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                ₦184.5M Monthly GMV Attributed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Step 1: Organic Readers</div>
                <div className="text-2xl font-extrabold font-heading text-slate-900">{CONVERSION_FUNNEL_METRICS.organicVisitsMonthly.toLocaleString()}</div>
                <div className="text-[11px] text-slate-500">100% of organic traffic</div>
              </div>

              <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-4 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-800">Step 2: Calculator Launches</div>
                <div className="text-2xl font-extrabold font-heading text-cyan-950">{CONVERSION_FUNNEL_METRICS.calculatorLaunches.toLocaleString()}</div>
                <div className="text-[11px] text-cyan-700 font-semibold">{CONVERSION_FUNNEL_METRICS.calculatorConversionPct}% conversion rate</div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Step 3: WhatsApp Desk Clicks</div>
                <div className="text-2xl font-extrabold font-heading text-emerald-950">{CONVERSION_FUNNEL_METRICS.whatsappConsultationClicks.toLocaleString()}</div>
                <div className="text-[11px] text-emerald-700 font-semibold">{CONVERSION_FUNNEL_METRICS.whatsappConversionPct}% high-intent triage</div>
              </div>

              <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-purple-800">Step 4: Paid Chick Bookings</div>
                <div className="text-2xl font-extrabold font-heading text-purple-950">{CONVERSION_FUNNEL_METRICS.chickBookingSubmissions.toLocaleString()}</div>
                <div className="text-[11px] text-purple-700 font-semibold">{CONVERSION_FUNNEL_METRICS.bookingConversionPct}% checkout conversion</div>
              </div>
            </div>
          </div>

          {/* Schema Rich Snippet Health */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              Schema.org Rich Snippet SERP Eligibility Audit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SCHEMA_RICH_SNIPPET_AUDIT.map((s) => (
                <div key={s.schemaName} className="rounded-xl border border-slate-200 p-3.5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{s.schemaName}</span>
                    <span className="font-mono text-emerald-700 font-bold">{s.complianceRatePct}%</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{s.schemaType}</div>
                  <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{s.serpStatus} ({s.coverageCount} pages)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HIGH-INTENT SERP TRACKER */}
      {activeTab === 'keywords' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Monitored Nigerian Commercial &amp; Veterinary Search Queries
                </h3>
                <p className="text-xs text-slate-500">
                  Tracking search intent, Google rank position, and rich snippet feature presence.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl">
                {TRACKED_SEARCH_QUERIES.length} Priority High-Intent Queries Tracked
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Search Query Candidate</th>
                    <th className="px-4 py-3">Pillar</th>
                    <th className="px-4 py-3">Intent</th>
                    <th className="px-4 py-3">Google Rank</th>
                    <th className="px-4 py-3">Monthly Volume</th>
                    <th className="px-4 py-3">Estimated Visits</th>
                    <th className="px-4 py-3">SERP Features</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TRACKED_SEARCH_QUERIES.map((q) => (
                    <tr key={q.keyword} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900 capitalize">{q.keyword}</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5 truncate max-w-xs">
                          {q.rankingUrl}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {q.pillarId}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            q.intent === 'Transactional'
                              ? 'bg-purple-50 text-purple-800 border border-purple-200'
                              : q.intent === 'Commercial'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-blue-50 text-blue-800 border border-blue-200'
                          }`}
                        >
                          {q.intent}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-bold font-mono">
                          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-xs">
                            #{q.currentRank}
                          </span>
                          {q.currentRank < q.previousRank && (
                            <span className="text-[10px] text-emerald-600 font-sans">▲ gained</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-slate-700">
                        {q.monthlySearchVolume.toLocaleString()} / mo
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono font-bold text-emerald-800">
                        {q.estimatedVisits.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {q.serpFeatures.map((f, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VCN SIGN-OFF & PUBLISHING CALENDAR */}
      {activeTab === 'workflow' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* VCN Validation Interactive Sandbox */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Veterinary Council of Nigeria (VCN) Sign-Off Gate
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Enforces strict regulatory compliance: no medical, antibiotic dosage, or vaccine article can be published without verified VCN surgeon accreditation.
                </p>
              </div>

              <form onSubmit={handleTestVcnValidation} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700">Reviewing Veterinary Surgeon</label>
                  <input
                    type="text"
                    value={testReviewerName}
                    onChange={(e) => setTestReviewerName(e.target.value)}
                    className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700">Credentials (Must include DVM)</label>
                    <input
                      type="text"
                      value={testCredentials}
                      onChange={(e) => setTestCredentials(e.target.value)}
                      className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">VCN Registration Number</label>
                    <input
                      type="text"
                      value={testVcnReg}
                      onChange={(e) => setTestVcnReg(e.target.value)}
                      className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700">Clinical Declaration</label>
                  <textarea
                    rows={3}
                    value={testDeclaration}
                    onChange={(e) => setTestDeclaration(e.target.value)}
                    className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={testAmrChecked}
                      onChange={(e) => setTestAmrChecked(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-semibold text-slate-700">
                      Antimicrobial Resistance (AMR) Stewardship verified (no off-label dosage)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={testDosageChecked}
                      onChange={(e) => setTestDosageChecked(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-semibold text-slate-700">
                      Dosage math and NAFDAC withdrawal periods checked
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 transition-all shadow"
                >
                  Verify VCN Sign-Off Compliance
                </button>
              </form>

              {validationResult && (
                <div
                  className={`rounded-xl border p-4 text-xs space-y-2 ${
                    validationResult.isValid
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                      : 'border-rose-200 bg-rose-50 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    {validationResult.isValid ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>VCN Clinical Sign-off Approved ({validationResult.normalizedVcnReg})</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-rose-600" />
                        <span>Sign-off Blocked by Regulatory Rules</span>
                      </>
                    )}
                  </div>

                  {validationResult.isValid ? (
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      Article meets all Veterinary Council of Nigeria accreditation requirements and is safe for publication to the public Knowledge Centre.
                    </p>
                  ) : (
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-800">
                      {validationResult.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* 90-Day Seasonal Publishing Calendar */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    90-Day Programmatic Seasonal Publishing Schedule
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Synchronized with Nigerian agro-climatic farming cycles: brooding in harmattan, coccidiosis during rainy season, and pre-festive batch placements.
                </p>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1">
                {SEASONAL_PUBLISHING_CALENDAR.map((item) => (
                  <div
                    key={item.week}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-1.5 text-xs hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded text-[10px]">
                        Week {item.week} · {item.season}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase">
                        {item.pillarId}
                      </span>
                    </div>

                    <div className="font-bold text-slate-900 leading-tight">
                      {item.targetTitle}
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                      <span className="font-mono text-slate-600">&quot;{item.targetKeyword}&quot;</span>
                      <span className="text-emerald-700 font-semibold">{item.leadReviewer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
