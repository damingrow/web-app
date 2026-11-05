'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Modal } from '@/components/ui/modal';
import {
  BookOpen,
  ShieldCheck,
  Search,
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
  ChevronLeft,
  ChevronDown,
  Download,
  Plus,
  Target,
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

export type ArticlePublishStatus =
  | 'published'
  | 'editorial_review'
  | 'veterinary_review'
  | 'draft'
  | 'archived';

interface ManagedArticle extends ArticleItem {
  publishStatus?: ArticlePublishStatus;
}

export default function ContentClient({ articles: initialArticles }: ContentClientProps) {
  const [activeTab, setActiveTab] = useState<'pillars' | 'traffic' | 'keywords' | 'workflow'>('pillars');
  const [articlesList, setArticlesList] = useState<ManagedArticle[]>(() =>
    initialArticles.map((a) => ({ ...a, publishStatus: 'published' }))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [pillarFilter, setPillarFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Selected article for status / VCN review modal
  const [selectedArticle, setSelectedArticle] = useState<ManagedArticle | null>(null);
  const [targetStatus, setTargetStatus] = useState<ArticlePublishStatus>('published');
  const [editorialNote, setEditorialNote] = useState<string>('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  // New Article draft modal
  const [isNewArticleModalOpen, setIsNewArticleModalOpen] = useState(false);
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleCategory, setNewArticleCategory] = useState(EDITORIAL_PILLARS[0]?.name || 'Immunology & Vaccines');
  const [newArticleSummary, setNewArticleSummary] = useState('');

  // Schema Audit Modal
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);

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

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return articlesList.filter((a) => {
      const matchesSearch =
        !searchQuery.trim() ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.clinicalReview?.reviewerName && a.clinicalReview.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()));

      const pillar = getPillarForArticle(a);
      const matchesPillar = pillarFilter === 'all' || pillar.id === pillarFilter;
      const matchesStatus = statusFilter === 'all' || (a.publishStatus || 'published') === statusFilter;

      return matchesSearch && matchesPillar && matchesStatus;
    });
  }, [articlesList, searchQuery, pillarFilter, statusFilter]);

  // Paginated articles
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredArticles.slice(start, start + pageSize);
  }, [filteredArticles, currentPage, pageSize]);

  // Handle article status update via backend API
  const handleArticleStatusChange = useCallback(async () => {
    if (!selectedArticle) return;
    setIsUpdatingStatus(true);
    setStatusFeedback(null);

    // Optimistic update
    setArticlesList((prev) =>
      prev.map((item) =>
        item.slug === selectedArticle.slug ? { ...item, publishStatus: targetStatus } : item
      )
    );

    try {
      const res = await fetch('/api/admin/content/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleSlug: selectedArticle.slug,
          targetStatus,
          reviewerName: selectedArticle.clinicalReview?.reviewerName,
          credentials: selectedArticle.clinicalReview?.credentials,
          vcnRegistration: selectedArticle.clinicalReview?.vcnRegistration,
          declaration: selectedArticle.clinicalReview?.declaration,
          editorialNotes: editorialNote.trim() || undefined,
        }),
      });

      if (res.ok) {
        setStatusFeedback(`Status updated to "${targetStatus}" with VCN compliance audit logged.`);
      } else {
        const data = await res.json().catch(() => ({}));
        setStatusFeedback(data.error || 'Status updated locally in session.');
      }
    } catch {
      setStatusFeedback('Status updated locally in session.');
    } finally {
      setIsUpdatingStatus(false);
    }
  }, [selectedArticle, targetStatus, editorialNote]);

  // Handle create new article draft
  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleTitle.trim()) return;

    const slug = newArticleTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newArticle: ManagedArticle = {
      id: `art-draft-${Date.now()}`,
      slug,
      title: newArticleTitle,
      subtitle: newArticleSummary.slice(0, 80) || 'Comprehensive agricultural guide for Nigerian farmers.',
      category: newArticleCategory as ArticleItem['category'],
      readTime: '6 min read',
      publishedDate: new Date().toISOString().slice(0, 10),
      author: {
        name: 'Dr. A. O. Bello, DVM',
        role: 'Senior Poultry Veterinarian',
      },
      clinicalReview: {
        reviewerName: 'Dr. A. O. Bello, DVM, FCVSN',
        credentials: 'DVM, FCVSN (Avian Medicine)',
        vcnRegistration: 'VCN Reg #08492',
        reviewDate: new Date().toISOString().slice(0, 10),
        declaration: 'Pre-publication clinical sign-off pending editorial review.',
      },
      summary: newArticleSummary || newArticleTitle,
      content: newArticleSummary || 'Article draft content under veterinary preparation.',
      faqs: [],
      relatedProductSlugs: [],
      publishStatus: 'draft',
    };

    setArticlesList((prev) => [newArticle, ...prev]);
    setIsNewArticleModalOpen(false);
    setNewArticleTitle('');
    setNewArticleSummary('');
  };

  // Export CSV
  const handleExportCSV = useCallback(() => {
    const headers = [
      'Slug',
      'Title',
      'Pillar',
      'Category',
      'Read Time',
      'VCN Reviewer',
      'VCN Reg #',
      'Status',
      'Published Date',
    ];
    const rows = filteredArticles.map((a) => {
      const p = getPillarForArticle(a);
      return [
        a.slug,
        `"${a.title.replace(/"/g, '""')}"`,
        `"${p.shortTitle}"`,
        `"${a.category}"`,
        a.readTime,
        `"${a.clinicalReview?.reviewerName || 'N/A'}"`,
        `"${a.clinicalReview?.vcnRegistration || 'N/A'}"`,
        a.publishStatus || 'published',
        a.publishedDate,
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `D-AminGrow-Editorial-Guides-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredArticles]);

  // VCN Validator Submit
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
    <div className="space-y-6 pb-12 font-body">
      {/* =========================================================================
          EXECUTIVE HERO HEADER BANNER: 500K Milestone & E-E-A-T Architecture
      ========================================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#062413] via-[#093d1f] to-[#041a0d] border border-emerald-500/20 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2ee571]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00a854]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 md:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-bold text-white/90 uppercase tracking-widest backdrop-blur-md">
                  <BookOpen className="h-3.5 w-3.5 text-[#2ee571]" />
                  Editorial SEO Engine · Module 06
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00a854]/20 border border-[#00a854]/40 px-3 py-1 text-[11px] font-semibold text-[#2ee571]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2ee571] animate-pulse" />
                  VCN Clinical Gate Armed
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/70">
                  500,000+ Milestone Surpassed
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight font-heading">
                Blog Editorial &amp;{' '}
                <span className="text-[#2ee571]">Traffic Engine</span>
              </h1>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                West Africa&apos;s leading organic agricultural portal powering 512,400+ monthly farmer visits through certified veterinary E-E-A-T architecture, clinical triage guides, and algorithmic SERP domination.
              </p>
            </div>

            {/* Header Action Controls */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsSchemaModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition-all backdrop-blur-md hover:scale-[1.02] shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-[#2ee571]" />
                <span>Schema Rich Snippets</span>
              </button>

              <button
                onClick={() => setIsNewArticleModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#2ee571] to-[#00a854] hover:from-[#35f07a] hover:to-[#00bf5f] px-5 py-2.5 text-xs font-black text-[#062413] transition-all hover:scale-[1.02] shadow-lg shadow-emerald-950/40"
              >
                <Plus className="h-4 w-4 stroke-[3]" />
                <span>Draft New Guide</span>
              </button>

              <Link
                href="/knowledge"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition-all backdrop-blur-md"
              >
                <span>Live Knowledge Hub</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-300" />
              </Link>
            </div>
          </div>

          {/* Strategic Milestone Progress Bar Card */}
          <div className="rounded-2xl bg-white/5 border border-white/15 p-5 backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">Target: 500,000 Monthly Farmer Sessions</span>
                    <span className="text-[10px] font-extrabold bg-[#2ee571]/20 text-[#2ee571] border border-[#2ee571]/30 px-2 py-0.5 rounded-full">
                      102.5% Achieved
                    </span>
                  </div>
                  <span className="font-mono font-extrabold text-[#2ee571] text-sm">
                    {trafficOverview.latestMonthlyVisits.toLocaleString()} / 500,000
                  </span>
                </div>

                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#00a854] via-[#2ee571] to-[#7effa8] rounded-full transition-all duration-1000 shadow-sm"
                    style={{ width: '100%' }}
                  />
                </div>

                <p className="text-[11px] text-white/60">
                  Nov 2026 milestone delivered across 6 programmatic pillars, {stats.totalTrackedKeywords} high-intent commercial keywords, and 100% Veterinary Council of Nigeria accreditation.
                </p>
              </div>

              <div className="lg:col-span-4 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <div className="text-lg font-black text-[#2ee571] font-heading">
                    +{trafficOverview.monthOverMonthGrowthPct}%
                  </div>
                  <div className="text-[10px] text-white/70">Month-over-Month</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <div className="text-lg font-black text-cyan-300 font-heading">
                    {trafficOverview.clickThroughRatePct}%
                  </div>
                  <div className="text-[10px] text-white/70">Avg Organic CTR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FOUR BILLION-DOLLAR TOP KPI CARDS (Wave Graphic SVGs)
      ========================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Monthly Organic Visits */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-heading">
              Organic Visits / Mo
            </span>
            <div className="h-9 w-9 rounded-2xl bg-emerald-50 text-[#00a854] flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-heading tracking-tight">
              {trafficOverview.latestMonthlyVisits.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-xs font-extrabold text-emerald-600">
              <span>↑ 18.4%</span>
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400 font-medium">500k West Africa milestone achieved</p>

          <div className="mt-2 h-7 w-full overflow-hidden opacity-30 group-hover:opacity-45 transition-opacity">
            <svg viewBox="0 0 120 28" className="w-full h-full text-emerald-500 fill-current" preserveAspectRatio="none">
              <path d="M0,20 C30,8 60,25 90,12 C105,6 115,18 120,15 L120,28 L0,28 Z" />
            </svg>
          </div>
        </div>

        {/* Card 2: VCN Review Rate */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-purple-200/90 p-5 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 font-heading">
              VCN Clinical Coverage
            </span>
            <div className="h-9 w-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-950 font-heading tracking-tight">
              100%
            </span>
            <span className="inline-flex items-center text-xs font-extrabold text-purple-700">
              <span>6 Pillars</span>
            </span>
          </div>
          <p className="mt-1 text-[11px] text-purple-700 font-medium">Every medical guide accredited by DVM</p>

          <div className="mt-2 h-7 w-full overflow-hidden opacity-35 group-hover:opacity-50 transition-opacity">
            <svg viewBox="0 0 120 28" className="w-full h-full text-purple-500 fill-current" preserveAspectRatio="none">
              <path d="M0,15 C25,24 55,10 85,22 C100,26 110,12 120,18 L120,28 L0,28 Z" />
            </svg>
          </div>
        </div>

        {/* Card 3: Top-3 SERP Rankings */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-cyan-200/90 p-5 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-800 font-heading">
              Top-3 Google Ranks
            </span>
            <div className="h-9 w-9 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-cyan-950 font-heading tracking-tight">
              {trafficOverview.top3RankingsCount} / {trafficOverview.totalTrackedKeywords}
            </span>
            <span className="inline-flex items-center text-xs font-extrabold text-cyan-700">
              <span>{trafficOverview.clickThroughRatePct}% CTR</span>
            </span>
          </div>
          <p className="mt-1 text-[11px] text-cyan-700 font-medium">Dominating commercial poultry searches</p>

          <div className="mt-2 h-7 w-full overflow-hidden opacity-35 group-hover:opacity-50 transition-opacity">
            <svg viewBox="0 0 120 28" className="w-full h-full text-cyan-500 fill-current" preserveAspectRatio="none">
              <path d="M0,22 C20,10 50,26 80,14 C100,8 112,20 120,16 L120,28 L0,28 Z" />
            </svg>
          </div>
        </div>

        {/* Card 4: Attributed Commercial GMV */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-amber-200/90 p-5 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-heading">
              Downstream Funnel GMV
            </span>
            <div className="h-9 w-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <BarChart3 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-950 font-heading tracking-tight">
              ₦184.5M
            </span>
            <span className="inline-flex items-center text-xs font-extrabold text-amber-600">
              <span>{CONVERSION_FUNNEL_METRICS.bookingConversionPct}% Conv</span>
            </span>
          </div>
          <p className="mt-1 text-[11px] text-amber-700 font-medium">Monthly chick orders from organic readers</p>

          <div className="mt-2 h-7 w-full overflow-hidden opacity-35 group-hover:opacity-50 transition-opacity">
            <svg viewBox="0 0 120 28" className="w-full h-full text-amber-500 fill-current" preserveAspectRatio="none">
              <path d="M0,18 C30,26 65,12 95,20 C108,24 114,14 120,16 L120,28 L0,28 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FOUR TAB NAVIGATION BAR
      ========================================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
        {[
          { id: 'pillars', label: `6 Authority Pillars (${articlesList.length} Guides)`, icon: <Layers className="h-4 w-4" /> },
          { id: 'traffic', label: 'Organic Traffic & Conversion Funnel', icon: <BarChart3 className="h-4 w-4" /> },
          { id: 'keywords', label: `High-Intent SERP Tracker (${TRACKED_SEARCH_QUERIES.length})`, icon: <TrendingUp className="h-4 w-4" /> },
          { id: 'workflow', label: 'VCN Sign-off & 90-Day Calendar', icon: <ShieldCheck className="h-4 w-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-extrabold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#062413] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: 6 AUTHORITY PILLARS & ARTICLE DIRECTORY
      ========================================================================== */}
      {activeTab === 'pillars' && (
        <div className="space-y-6">
          {/* 6 Pillar Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EDITORIAL_PILLARS.map((p) => {
              const pArticles = articlesList.filter((a) => getPillarForArticle(a).id === p.id);
              const isSelected = pillarFilter === p.id;

              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setPillarFilter(isSelected ? 'all' : p.id);
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer rounded-3xl border p-5 transition-all shadow-sm flex flex-col justify-between group ${
                    isSelected
                      ? 'border-[#00a854] bg-emerald-50/60 ring-2 ring-[#00a854]/20'
                      : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${p.badgeColor}`}>
                        {p.shortTitle}
                      </span>
                      <span className="text-[11px] font-black text-slate-400 group-hover:text-emerald-700 transition-colors">
                        {pArticles.length} guides
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-slate-900 font-heading">
                        {p.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">
                      Target: <strong className="text-slate-700">{(p.monthlyTrafficTarget / 1000).toFixed(0)}k visits/mo</strong>
                    </span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      {isSelected ? 'Clear filter' : 'Filter guides'} <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filter, Search, and Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search guide titles, clinical keywords, or reviewing veterinary surgeons..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#00a854]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={pillarFilter}
                onChange={(e) => {
                  setPillarFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#00a854] cursor-pointer"
              >
                <option value="all">All 6 Pillars ({articlesList.length})</option>
                {EDITORIAL_PILLARS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.shortTitle}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#00a854] cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="editorial_review">Editorial Review</option>
                <option value="veterinary_review">Veterinary Review</option>
                <option value="draft">Draft</option>
              </select>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all"
              >
                <Download className="h-3.5 w-3.5 text-slate-500" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Articles Table */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-[#fafcfb] text-[11px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Guide Title &amp; Abstract</th>
                    <th className="px-4 py-3.5">Authority Pillar</th>
                    <th className="px-4 py-3.5">VCN Reviewer</th>
                    <th className="px-4 py-3.5">VCN Reg #</th>
                    <th className="px-4 py-3.5">Read Time</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedArticles.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center text-slate-400">
                        <div className="max-w-xs mx-auto space-y-2">
                          <BookOpen className="h-8 w-8 text-slate-300 mx-auto" />
                          <p className="font-extrabold text-slate-700 text-sm">No educational guides match criteria</p>
                          <p className="text-xs text-slate-400">Try adjusting your active filter or search keywords.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedArticles.map((a) => {
                      const pillar = getPillarForArticle(a);
                      const status = a.publishStatus || 'published';

                      return (
                        <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-5 py-3.5 max-w-sm">
                            <div className="font-extrabold text-slate-900 text-xs leading-snug line-clamp-1">
                              {a.title}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{a.summary}</div>
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${pillar.badgeColor}`}>
                              {pillar.shortTitle}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            {a.clinicalReview ? (
                              <div className="font-extrabold text-emerald-800 flex items-center gap-1.5">
                                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                                <span>{a.clinicalReview.reviewerName}</span>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">General Education</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            {a.clinicalReview?.vcnRegistration ? (
                              <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 font-extrabold">
                                {a.clinicalReview.vcnRegistration}
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 font-medium">
                            {a.readTime}
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold capitalize ${
                                status === 'published'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : status === 'veterinary_review'
                                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                  : status === 'editorial_review'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}
                              />
                              <span>{status.replace('_', ' ')}</span>
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-1.5">
                            <button
                              onClick={() => {
                                setSelectedArticle(a);
                                setTargetStatus(a.publishStatus || 'published');
                                setEditorialNote('');
                                setStatusFeedback(null);
                              }}
                              className="inline-flex items-center gap-1 rounded-xl bg-[#062413] hover:bg-[#0a351d] text-white px-3 py-1.5 text-xs font-bold transition-all shadow-2xs"
                            >
                              <span>Manage</span>
                              <ChevronDown className="h-3 w-3 text-slate-300" />
                            </button>

                            <Link
                              href={`/knowledge/${a.slug}`}
                              target="_blank"
                              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs"
                            >
                              <span>Live</span>
                              <ArrowRight className="h-3 w-3 text-slate-400" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 bg-[#fcfdfd]">
              <div>
                Showing <strong className="text-slate-800">{filteredArticles.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filteredArticles.length)}</strong> of{' '}
                <strong className="text-slate-800">{filteredArticles.length}</strong> published guides
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: Math.ceil(filteredArticles.length / pageSize) || 1 })
                  .slice(0, 5)
                  .map((_, i) => {
                    const pNum = i + 1;
                    const isCurrent = currentPage === pNum;
                    return (
                      <button
                        key={pNum}
                        onClick={() => setCurrentPage(pNum)}
                        className={`h-8 w-8 rounded-full font-bold flex items-center justify-center text-xs transition-colors ${
                          isCurrent
                            ? 'bg-[#00a854] text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pNum}
                      </button>
                    );
                  })}

                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      p < Math.ceil(filteredArticles.length / pageSize) ? p + 1 : p
                    )
                  }
                  disabled={currentPage >= Math.ceil(filteredArticles.length / pageSize)}
                  className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Rows:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: ORGANIC TRAFFIC & CONVERSION ANALYTICS
      ========================================================================== */}
      {activeTab === 'traffic' && (
        <div className="space-y-6">
          {/* Monthly Trajectory Table & Growth Trend */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 font-heading">
                  12-Month Organic Traffic Trajectory to 500k Milestone
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Monthly organic search sessions originating from Google Nigeria, Ghana, and Kenya agricultural queries.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-2xl">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>500k Goal Surpassed in Month 11 (Nov 2026)</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-[#fafcfb] text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Month</th>
                    <th className="px-4 py-3">Organic Visits</th>
                    <th className="px-4 py-3">Milestone Target</th>
                    <th className="px-4 py-3">SERP Impressions</th>
                    <th className="px-4 py-3">CTR (%)</th>
                    <th className="px-4 py-3">Indexed Guides</th>
                    <th className="px-4 py-3 text-right">Delivery Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {TRAFFIC_TRAJECTORY_DATA.map((t) => (
                    <tr
                      key={t.month}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        t.actualVisits >= 500000 ? 'bg-emerald-50/40 font-bold text-emerald-950' : ''
                      }`}
                    >
                      <td className="px-4 py-2.5 font-sans font-extrabold text-slate-800">{t.month}</td>
                      <td className="px-4 py-2.5 text-emerald-700 font-bold">{t.actualVisits.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-slate-400">{t.targetVisits.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-slate-600">{t.organicImpressions.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-slate-700 font-bold">{t.clickThroughRatePct}%</td>
                      <td className="px-4 py-2.5 text-slate-500">{t.indexedUrlsCount} URLs</td>
                      <td className="px-4 py-2.5 text-right font-sans">
                        {t.actualVisits >= 500000 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-[#00a854] text-white px-2.5 py-0.5 rounded-full font-extrabold shadow-2xs">
                            Milestone Met
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
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
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-black text-slate-900 font-heading">
                    Geographic Farmer Audience Share
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">West African Agricultural Hubs</span>
              </div>

              <div className="space-y-3.5">
                {GEOGRAPHIC_TRAFFIC_BREAKDOWN.map((geo) => (
                  <div key={geo.country} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                        <span>{geo.flag}</span>
                        <span>{geo.country}</span>
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {geo.percentage}% ({geo.monthlyVisits.toLocaleString()} visits)
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-[#2ee571] rounded-full"
                        style={{ width: `${geo.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device & Pen Behavior */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-cyan-600" />
                  <h3 className="text-sm font-black text-slate-900 font-heading">
                    Device Split &amp; Pen Behavior
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Mobile-First Pen Triage</span>
              </div>

              <div className="space-y-3">
                {DEVICE_TRAFFIC_BREAKDOWN.map((dev) => (
                  <div key={dev.device} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">{dev.device}</span>
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

          {/* Downstream Commercial Conversion Funnel */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 font-heading">
                  Downstream Commercial Conversion Funnel
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  How 512,400 monthly organic readers convert into agricultural calculator runs, WhatsApp inquiries, and commercial chick bookings.
                </p>
              </div>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-2xl">
                ₦184.5M Monthly GMV Attributed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 space-y-1">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Step 1: Organic Readers</div>
                <div className="text-2xl font-black font-heading text-slate-900">{CONVERSION_FUNNEL_METRICS.organicVisitsMonthly.toLocaleString()}</div>
                <div className="text-[11px] text-slate-500 font-medium">100% of organic inflow</div>
              </div>

              <div className="rounded-3xl border border-cyan-200 bg-cyan-50/40 p-4 space-y-1">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-800">Step 2: Calculator Launches</div>
                <div className="text-2xl font-black font-heading text-cyan-950">{CONVERSION_FUNNEL_METRICS.calculatorLaunches.toLocaleString()}</div>
                <div className="text-[11px] text-cyan-700 font-bold">{CONVERSION_FUNNEL_METRICS.calculatorConversionPct}% conversion rate</div>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-1">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">Step 3: WhatsApp Desk Clicks</div>
                <div className="text-2xl font-black font-heading text-emerald-950">{CONVERSION_FUNNEL_METRICS.whatsappConsultationClicks.toLocaleString()}</div>
                <div className="text-[11px] text-emerald-700 font-bold">{CONVERSION_FUNNEL_METRICS.whatsappConversionPct}% high-intent triage</div>
              </div>

              <div className="rounded-3xl border border-purple-200 bg-purple-50/40 p-4 space-y-1">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-purple-800">Step 4: Paid Chick Bookings</div>
                <div className="text-2xl font-black font-heading text-purple-950">{CONVERSION_FUNNEL_METRICS.chickBookingSubmissions.toLocaleString()}</div>
                <div className="text-[11px] text-purple-700 font-bold">{CONVERSION_FUNNEL_METRICS.bookingConversionPct}% checkout conversion</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: HIGH-INTENT SERP TRACKER
      ========================================================================== */}
      {activeTab === 'keywords' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 font-heading">
                  Monitored Nigerian Commercial &amp; Veterinary Search Queries
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tracking Google Nigeria rank positions, search intent, and Rich Snippet eligibility across high-value poultry keywords.
                </p>
              </div>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-2xl">
                {TRACKED_SEARCH_QUERIES.length} High-Intent Queries Tracked
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-[#fafcfb] text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Search Query Keyword</th>
                    <th className="px-4 py-3">Authority Pillar</th>
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
                        <div className="font-extrabold text-slate-900 capitalize text-xs">{q.keyword}</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5 truncate max-w-xs">
                          {q.rankingUrl}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          {q.pillarId}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
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
                          <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg text-xs font-black">
                            #{q.currentRank}
                          </span>
                          {q.currentRank < q.previousRank && (
                            <span className="text-[10px] text-emerald-600 font-sans font-bold">▲ gained</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-slate-700 font-semibold">
                        {q.monthlySearchVolume.toLocaleString()} / mo
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono font-black text-emerald-800">
                        {q.estimatedVisits.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {q.serpFeatures.map((f, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold"
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

      {/* =========================================================================
          TAB 4: VCN CLINICAL SIGN-OFF GATE & SEASONAL CALENDAR
      ========================================================================== */}
      {activeTab === 'workflow' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* VCN Validation Interactive Sandbox */}
            <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-base font-black text-slate-900 font-heading">
                    Veterinary Council of Nigeria (VCN) Sign-Off Gate
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Enforces strict regulatory compliance: no medical, antibiotic dosage, or vaccine article can be published without verified VCN surgeon accreditation.
                </p>
              </div>

              <form onSubmit={handleTestVcnValidation} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-extrabold text-slate-700">Reviewing Veterinary Surgeon</label>
                  <input
                    type="text"
                    value={testReviewerName}
                    onChange={(e) => setTestReviewerName(e.target.value)}
                    className="w-full mt-1 rounded-2xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-extrabold text-slate-700">Credentials (Must include DVM)</label>
                    <input
                      type="text"
                      value={testCredentials}
                      onChange={(e) => setTestCredentials(e.target.value)}
                      className="w-full mt-1 rounded-2xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854]"
                    />
                  </div>
                  <div>
                    <label className="font-extrabold text-slate-700">VCN Registration Number</label>
                    <input
                      type="text"
                      value={testVcnReg}
                      onChange={(e) => setTestVcnReg(e.target.value)}
                      className="w-full mt-1 rounded-2xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-extrabold text-slate-700">Clinical Declaration</label>
                  <textarea
                    rows={3}
                    value={testDeclaration}
                    onChange={(e) => setTestDeclaration(e.target.value)}
                    className="w-full mt-1 rounded-2xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854] resize-none"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={testAmrChecked}
                      onChange={(e) => setTestAmrChecked(e.target.checked)}
                      className="rounded text-[#00a854] focus:ring-[#00a854]"
                    />
                    <span className="font-bold text-slate-700">
                      Antimicrobial Resistance (AMR) Stewardship verified (no off-label dosage)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={testDosageChecked}
                      onChange={(e) => setTestDosageChecked(e.target.checked)}
                      className="rounded text-[#00a854] focus:ring-[#00a854]"
                    />
                    <span className="font-bold text-slate-700">
                      Dosage math and NAFDAC withdrawal periods checked
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-[#063319] to-[#0d592b] hover:from-[#084221] hover:to-[#116e37] text-white font-black py-2.5 px-4 transition-all shadow-sm"
                >
                  Verify VCN Sign-Off Compliance
                </button>
              </form>

              {validationResult && (
                <div
                  className={`rounded-2xl border p-4 text-xs space-y-2 ${
                    validationResult.isValid
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                      : 'border-rose-200 bg-rose-50 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black">
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
                    <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
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
            <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <h3 className="text-base font-black text-slate-900 font-heading">
                    90-Day Programmatic Seasonal Publishing Schedule
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Synchronized with Nigerian agro-climatic farming cycles: brooding in harmattan, coccidiosis during rainy season, and pre-festive batch placements.
                </p>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1 scrollbar-thin">
                {SEASONAL_PUBLISHING_CALENDAR.map((item) => (
                  <div
                    key={item.week}
                    className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-1.5 text-xs hover:border-emerald-200 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-lg text-[10px]">
                        Week {item.week} · {item.season}
                      </span>
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase">
                        {item.pillarId}
                      </span>
                    </div>

                    <div className="font-black text-slate-900 leading-tight">
                      {item.targetTitle}
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                      <span className="font-mono text-slate-600 font-semibold">&quot;{item.targetKeyword}&quot;</span>
                      <span className="text-emerald-700 font-bold">{item.leadReviewer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: ARTICLE STATUS & VCN TRANSITION MODAL
      ========================================================================== */}
      {selectedArticle && (
        <Modal
          isOpen={!!selectedArticle}
          onClose={() => {
            setSelectedArticle(null);
            setStatusFeedback(null);
          }}
          title="Editorial Publishing Workflow & VCN Review"
          description={`Guide: ${selectedArticle.title}`}
          maxWidth="lg"
        >
          <div className="space-y-4 pt-1 text-slate-800 text-xs">
            {statusFeedback && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 font-bold text-emerald-800 flex items-center justify-between">
                <span>{statusFeedback}</span>
                <button onClick={() => setStatusFeedback(null)} className="text-emerald-600">✕</button>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400">/{selectedArticle.slug}</span>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {selectedArticle.category}
                </span>
              </div>
              <h4 className="font-black text-sm text-slate-900">{selectedArticle.title}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">{selectedArticle.summary}</p>
            </div>

            {/* Target Status Selector */}
            <div className="space-y-1.5">
              <label className="font-black text-slate-700 uppercase tracking-wider text-[11px]">
                Target Publishing Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['published', 'veterinary_review', 'editorial_review', 'draft'] as ArticlePublishStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setTargetStatus(st)}
                    className={`p-2.5 rounded-2xl font-black text-xs transition-all border ${
                      targetStatus === st
                        ? 'bg-[#062413] text-white border-[#062413] shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Editorial Staff Audit Note */}
            <div className="space-y-1.5">
              <label className="font-black text-slate-700 uppercase tracking-wider text-[11px]">
                Staff Audit Notes &amp; Clinical Remarks
              </label>
              <textarea
                value={editorialNote}
                onChange={(e) => setEditorialNote(e.target.value)}
                placeholder="Log internal editorial edits, updated vaccination dosages, or VCN sign-off details..."
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854] resize-none h-20"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <Link
                href={`/knowledge/${selectedArticle.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 text-xs"
              >
                <span>Preview Public Knowledge Page</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isUpdatingStatus}
                  onClick={handleArticleStatusChange}
                  className="rounded-2xl bg-gradient-to-r from-[#2ee571] to-[#00a854] hover:from-[#35f07a] hover:to-[#00bf5f] px-5 py-2 text-xs font-black text-[#062413] shadow-md"
                >
                  {isUpdatingStatus ? 'Updating...' : 'Save & Sign-Off'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* =========================================================================
          MODAL 2: DRAFT NEW ARTICLE MODAL
      ========================================================================== */}
      {isNewArticleModalOpen && (
        <Modal
          isOpen={isNewArticleModalOpen}
          onClose={() => setIsNewArticleModalOpen(false)}
          title="Draft New Educational Guide"
          description="Create a canonical knowledge guide assigned to one of the 6 authority pillars."
          maxWidth="lg"
        >
          <form onSubmit={handleCreateDraft} className="space-y-4 pt-1 text-slate-800 text-xs">
            <div>
              <label className="block font-extrabold uppercase tracking-wider text-slate-500 mb-1 text-[11px]">
                Guide Title *
              </label>
              <input
                type="text"
                required
                value={newArticleTitle}
                onChange={(e) => setNewArticleTitle(e.target.value)}
                placeholder="e.g. Complete Guide to Newcastle Disease Vaccination in Harmattan"
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854]"
              />
            </div>

            <div>
              <label className="block font-extrabold uppercase tracking-wider text-slate-500 mb-1 text-[11px]">
                Authority Pillar &amp; Topic Cluster *
              </label>
              <select
                value={newArticleCategory}
                onChange={(e) => setNewArticleCategory(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#00a854]"
              >
                {EDITORIAL_PILLARS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.shortTitle})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-extrabold uppercase tracking-wider text-slate-500 mb-1 text-[11px]">
                Executive Abstract &amp; SEO Summary
              </label>
              <textarea
                rows={3}
                value={newArticleSummary}
                onChange={(e) => setNewArticleSummary(e.target.value)}
                placeholder="Provide a clinical synopsis targeting commercial poultry farmers in Nigeria and West Africa..."
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854] resize-none"
              />
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
              Note: Articles saved as <strong>Draft</strong> must complete clinical review by a licensed Veterinary Surgeon (DVM) before public publication.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNewArticleModalOpen(false)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-[#2ee571] to-[#00a854] hover:from-[#35f07a] hover:to-[#00bf5f] px-5 py-2 text-xs font-black text-[#062413] shadow-md"
              >
                Create Draft
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* =========================================================================
          MODAL 3: SCHEMA RICH SNIPPET AUDIT MODAL
      ========================================================================== */}
      {isSchemaModalOpen && (
        <Modal
          isOpen={isSchemaModalOpen}
          onClose={() => setIsSchemaModalOpen(false)}
          title="Schema.org Structured Data & SERP Snippet Health"
          description="Audits automated structured data schemas powering Google Rich Results."
          maxWidth="lg"
        >
          <div className="space-y-4 pt-1 text-xs text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SCHEMA_RICH_SNIPPET_AUDIT.map((s) => (
                <div key={s.schemaName} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{s.schemaName}</span>
                    <span className="font-mono text-emerald-700 font-black text-sm">{s.complianceRatePct}%</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{s.schemaType}</div>
                  <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{s.serpStatus} ({s.coverageCount} pages)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-200/60 pt-2">
                    {s.coverageCount} indexed knowledge pages validated against schema.org and Google Search Central structured data specifications.
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsSchemaModalOpen(false)}
                className="rounded-2xl bg-[#062413] px-5 py-2 text-xs font-bold text-white hover:bg-[#0a351d]"
              >
                Close Audit
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
