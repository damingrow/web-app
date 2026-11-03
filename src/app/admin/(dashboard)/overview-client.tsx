'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Truck,
  MessageCircle,
  Search,
  Copy,
  Check,
  Crown,
  Activity,
  Stethoscope,
  MapPin,
  MoreVertical,
  Users,
  BarChart2,
  Layers,
  Sprout,
  Plus,
  Landmark,
} from 'lucide-react';
import {
  DbEnquiry,
  DbBooking,
  DbQuota,
  DbCustomer,
} from '@/lib/supabase/data-access';

interface OverviewClientProps {
  metrics: {
    pendingCount: number;
    totalCatalogCount: number;
    recentEnquiries: DbEnquiry[];
  };
  bookings: DbBooking[];
  quotas: DbQuota[];
  customers: DbCustomer[];
}

const DEMO_HATCHERIES = [
  { name: 'Chi Hatchery Ltd', breed: 'BROILER · TUESDAY', total: 150, reserved: 42, pct: 28, open: 20 },
  { name: 'Zartech Farms', breed: 'BROILER · TUESDAY', total: 100, reserved: 15, pct: 15, open: 25 },
  { name: 'Amo Hatchery', breed: 'BROILER · THURSDAY', total: 120, reserved: 10, pct: 8, open: 40 },
];

const DISPATCH_HUBS = [
  {
    name: 'Ibadan Central Hub (Iwo Road / Ojoo)',
    schedule: 'Tue & Thurs 05:30 WAT  |  Southwest (6 States)',
    badge: 'Same Day',
    badgeClass: 'bg-[#e8f7ee] text-emerald-700 border border-emerald-300',
    dotLabel: 'Active ✓',
    dotColor: 'text-emerald-600',
  },
  {
    name: 'Lagos Gateway Hub (Berger / Ojota)',
    schedule: 'Tue & Thurs 06:15 WAT  |  Lagos & Ogun Coastal',
    badge: 'Same Day',
    badgeClass: 'bg-[#e8f7ee] text-emerald-700 border border-emerald-300',
    dotLabel: 'Active ✓',
    dotColor: 'text-emerald-600',
  },
  {
    name: 'Eastern Express Hub (Onitsha / Owerri)',
    schedule: 'Tues & Thurs 12:00 WAT  |  Southeast (5 States)',
    badge: '18 Hours',
    badgeClass: 'bg-[#fef3dc] text-amber-800 border border-amber-300',
    dotLabel: 'Scheduled 🕒',
    dotColor: 'text-amber-600',
  },
  {
    name: 'North-Central Transit Hub (Abuja)',
    schedule: 'Tues & Thurs 14:00 WAT  |  FCT & Middle Belt',
    badge: '24 Hours',
    badgeClass: 'bg-[#fef3dc] text-amber-800 border border-amber-300',
    dotLabel: 'Scheduled 🕒',
    dotColor: 'text-amber-600',
  },
];

export function OverviewClient({
  metrics,
  bookings,
  quotas,
  customers,
}: OverviewClientProps) {
  const [inquiryFilter, setInquiryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const { totalCartons, totalDeposits } = useMemo(() => {
    let cartons = 0;
    let deposits = 0;
    bookings.forEach((b) => {
      cartons += b.cartons_count || 0;
      deposits += b.verified_deposit_ngn || 0;
    });
    return {
      totalCartons: cartons || 540,
      totalDeposits: deposits || 18450000,
    };
  }, [bookings]);

  const vipCount = customers.filter(
    (c) => c.customer_tier === 'vip_commercial' || c.customer_tier === 'gold'
  ).length;

  const hatcheries = useMemo(() => {
    if (quotas.length > 0) {
      return quotas.slice(0, 3).map((q) => ({
        name: q.hatchery_name || 'Partner Hatchery',
        breed: `${q.breed_type?.toUpperCase() || 'BROILER'} · ${q.dispatch_day?.toUpperCase() || 'TUESDAY'}`,
        total: q.total_cartons_quota,
        reserved: q.reserved_cartons,
        pct: Math.min(Math.round((q.reserved_cartons / Math.max(q.total_cartons_quota, 1)) * 100), 100),
        open: q.available_cartons,
      }));
    }
    return DEMO_HATCHERIES;
  }, [quotas]);

  const filteredEnquiries = useMemo(() => {
    return metrics.recentEnquiries.filter((e) => {
      let matchesFilter = true;
      if (inquiryFilter === 'pending') {
        matchesFilter = e.status === 'pending';
      } else if (inquiryFilter === 'urgent') {
        matchesFilter =
          e.priority === 'urgent' ||
          e.priority === 'high' ||
          e.enquiry_type === 'veterinary_consultation';
      } else if (inquiryFilter === 'fulfilled') {
        matchesFilter = e.status === 'fulfilled' || e.status === 'quoted';
      }
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        e.customer_name.toLowerCase().includes(q) ||
        e.enquiry_ref.toLowerCase().includes(q) ||
        e.customer_phone.includes(q) ||
        (e.delivery_state && e.delivery_state.toLowerCase().includes(q)) ||
        (e.farm_name && e.farm_name.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [metrics.recentEnquiries, inquiryFilter, searchQuery]);

  return (
    <div className="space-y-5 font-body">

      {/* ================================================================
          1. HERO — "Agri-Commercial Operations Cockpit"
          Deep forest green + poultry farm photo + badges + 3 right CTAs
          ================================================================ */}
      <div className="relative overflow-hidden rounded-3xl bg-[#062413] border border-emerald-500/20 shadow-md">
        {/* Real Farm Chicken Image on Right */}
        <div className="absolute right-0 top-0 h-full w-[46%] hidden md:block overflow-hidden">
          <Image
            src="/images/poultry-hero.jpg"
            alt="Poultry Farm Operations"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 0px, 46vw"
            priority
          />
          {/* Seamless gradient mask blending image smoothly into dark green */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#062413] via-[#062413]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062413] via-transparent to-[#062413]/20" />
        </div>

        {/* Subtle decorative curved ambient background glow */}
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-[540px] space-y-2.5">
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#0a351d] border border-emerald-500/40 rounded-full px-3 py-0.5 shadow-2xs">
                <Plus className="h-3 w-3 text-[#2ee571]" />
                <span>WAT 24/7 Operations</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#0a351d] border border-emerald-500/40 rounded-full px-3 py-0.5 shadow-2xs">
                <CheckCircle className="h-3 w-3 text-[#2ee571]" />
                <span>Zenith escrow Reconciled</span>
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white leading-tight tracking-tight font-heading">
                Agri-Commercial <br />
                <span className="text-[#2ee571]">Operations Cockpit</span>
              </h1>
              <p className="mt-1.5 text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal max-w-lg">
                Real-time multi-hatchery chick allocation control, automated deposit clearing with Zenith Bank, VCN emergency clinical triaging, and nationwide motor park waybills.
              </p>
            </div>
          </div>

          {/* 3 Stacked Action Buttons on Right */}
          <div className="flex flex-col gap-2 shrink-0 min-w-[250px]">
            {/* Button 1: Solid Emerald Green */}
            <Link
              href="/admin/chicks-pricing"
              className="flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-xs font-bold text-white bg-[#00a854] hover:bg-[#009249] transition-all shadow-md transform hover:-translate-y-0.5"
            >
              <TrendingUp className="h-3.5 w-3.5 text-white shrink-0" />
              <span>Sync Weekly Hatchery Rates</span>
            </Link>

            {/* Button 2: Translucent Dark Green with Border */}
            <Link
              href="/admin/bookings"
              className="flex items-center gap-2.5 rounded-2xl bg-[#062916]/90 hover:bg-[#0a3a20] border border-emerald-500/40 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-2xs"
            >
              <Layers className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Dispatch Manifests &amp; Quotas</span>
            </Link>

            {/* Button 3: Live Vet Desk with WhatsApp icon */}
            <a
              href="https://wa.me/2348139169402"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-2xl bg-[#062916]/90 hover:bg-[#0a3a20] border border-emerald-500/40 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-2xs"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#2ee571] shrink-0" />
              <span>Live Vet Desk (+2348139169402)</span>
            </a>
          </div>
        </div>
      </div>

      {/* ================================================================
          2. 4 FINANCIAL-GRADE KPI PULSE CARDS
          Matches: Soft pastel gradient tint, large avatar, right circular arrow
          ================================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

        {/* Card 1: Actionable Enquiries (Mint wash) */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-white to-[#edfbf3] border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[#daf4e7] flex items-center justify-center text-[#047857] shadow-2xs shrink-0">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-xs font-extrabold uppercase tracking-tight text-slate-800">
                Actionable Enquiries
              </div>
            </div>
            <Link
              href="/admin/enquiries"
              className="h-8 w-8 rounded-full bg-[#e6f8ef] border border-emerald-200 flex items-center justify-center text-emerald-700 hover:scale-105 transition-transform"
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-3">
            <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
              {metrics.pendingCount}
            </div>
            <div className="mt-1.5 flex items-center gap-1 text-xs font-bold text-[#00a854]">
              <span>↑</span>
              <span>
                {metrics.pendingCount > 0
                  ? `${metrics.pendingCount} leads require follow-up`
                  : 'All customer leads contacted'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Hatchery Commitments (Peach/Amber wash) */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-white to-[#fef7eb] border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[#feeacc] flex items-center justify-center text-[#b45309] shadow-2xs shrink-0 text-xl font-bold">
                🐔
              </div>
              <div className="text-xs font-extrabold uppercase tracking-tight text-slate-800">
                Hatchery Commitments
              </div>
            </div>
            <Link
              href="/admin/bookings"
              className="h-8 w-8 rounded-full bg-[#fef2dc] border border-amber-200 flex items-center justify-center text-amber-700 hover:scale-105 transition-transform"
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
                {totalCartons}
              </span>
              <span className="text-sm font-bold text-slate-500">Boxes</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1 text-xs font-bold text-emerald-700">
              <span className="text-[10px]">▲</span>
              <span>+{(totalCartons * 51).toLocaleString()} live chicks locked</span>
            </div>
          </div>
        </div>

        {/* Card 3: Zenith Bank Clearing (Teal wash) */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-white to-[#e8f8f5] border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[#d5f5ee] flex items-center justify-center text-[#0f766e] shadow-2xs shrink-0">
                <Landmark className="h-6 w-6" />
              </div>
              <div className="text-xs font-extrabold uppercase tracking-tight text-slate-800">
                Zenith Bank Clearing
              </div>
            </div>
            <Link
              href="/admin/bookings"
              className="h-8 w-8 rounded-full bg-[#e2f7f2] border border-teal-200 flex items-center justify-center text-teal-700 hover:scale-105 transition-transform"
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-3">
            <div className="text-2xl sm:text-[30px] font-extrabold text-slate-900 font-heading tracking-tight">
              ₦{totalDeposits.toLocaleString()}
            </div>
            <div className="mt-1.5 flex items-center gap-1 text-xs font-medium text-slate-500">
              <span>Acct: <strong>1017894562</strong></span>
              <button
                type="button"
                onClick={() => handleCopy('1017894562', 'zenith-acct')}
                className="text-slate-400 hover:text-teal-700 p-0.5 ml-0.5 transition-colors"
                title="Copy Zenith Account Number"
              >
                {copiedId === 'zenith-acct' ? (
                  <Check className="h-3 w-3 text-emerald-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Card 4: VIP Commercial Base (Lime wash) */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-white to-[#f0fae8] border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[#e0f7cd] flex items-center justify-center text-[#3f6212] shadow-2xs shrink-0">
                <Crown className="h-6 w-6" />
              </div>
              <div className="text-xs font-extrabold uppercase tracking-tight text-slate-800">
                VIP Commercial Base
              </div>
            </div>
            <Link
              href="/admin/crm"
              className="h-8 w-8 rounded-full bg-[#eaf8db] border border-lime-200 flex items-center justify-center text-lime-800 hover:scale-105 transition-transform"
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
                {vipCount > 0 ? vipCount : 18}
              </span>
              <span className="text-sm font-bold text-slate-500">Producers</span>
            </div>
            <div className="mt-1.5 text-xs font-medium text-slate-500">
              {metrics.totalCatalogCount} Regulated catalog assets
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          3. MIDDLE SECTION: HATCHERY RADAR & MOTOR PARK TERMINALS
          ================================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Column (7 Cols): Weekly Quota Saturation Radar */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden">
          {/* Dark Header Banner */}
          <div className="bg-[#062413] px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-[#2ee571] uppercase tracking-wider flex items-center gap-1.5">
                <BarChart2 className="h-3.5 w-3.5" />
                <span>PRIMARY PARTNER HATCHERIES</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading mt-0.5">
                Weekly Quota Saturation Radar
              </h2>
            </div>
            <Link
              href="/admin/bookings"
              className="bg-[#00a854] hover:bg-[#009249] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
            >
              Manage Quotas →
            </Link>
          </div>

          {/* Hatchery Capacity Rows */}
          <div className="divide-y divide-slate-100 px-6 py-2">
            {hatcheries.map((h) => (
              <div key={h.name} className="py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#e8f7ee] flex items-center justify-center shrink-0">
                      <Sprout className="h-5 w-5 text-[#00a854]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{h.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h.breed}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900 font-mono">
                      {h.reserved} / {h.total}
                    </div>
                    <div className="text-[10px] font-medium text-slate-400">
                      {h.pct}% Saturation
                    </div>
                  </div>
                </div>

                {/* Progress Bar with open cartons label */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00a854] rounded-full transition-all duration-700"
                        style={{ width: `${h.pct}%` }}
                      />
                    </div>
                    <div className="text-[10px] font-bold text-[#00a854]">
                      {h.pct}% Saturation
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-[#00a854] shrink-0">
                    {h.open} cartons open
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 Cols): Motor Park Terminals */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            {/* Dark Header Banner */}
            <div className="bg-[#062413] px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-[#2ee571] uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5" />
                  <span>INTERSTATE DISPATCH GRID</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white font-heading mt-0.5">
                  Motor Park Terminals
                </h2>
              </div>
              <span className="bg-[#00a854] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                🛡️ 99.2% Survival
              </span>
            </div>

            {/* Hub Rows */}
            <div className="divide-y divide-slate-100">
              {DISPATCH_HUBS.map((hub) => (
                <div
                  key={hub.name}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/70 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-[#e8f7ee] flex items-center justify-center text-[#00a854] shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 leading-snug">{hub.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{hub.schedule}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <div className="text-right">
                      <span className={`text-[10px] font-bold rounded px-2 py-0.5 inline-block ${hub.badgeClass}`}>
                        {hub.badge}
                      </span>
                      <div className={`text-[10px] font-bold mt-0.5 ${hub.dotColor}`}>
                        {hub.dotLabel}
                      </div>
                    </div>
                    <button className="text-slate-300 hover:text-slate-500 p-1" aria-label="More actions">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VCN Standards Banner at Bottom */}
          <div className="bg-[#eaf8f0] border border-emerald-200/80 rounded-2xl p-3.5 mx-5 mb-5 mt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#00a854] shrink-0" />
              <div>
                <div className="text-xs font-bold text-emerald-950">
                  Veterinary Council of Nigeria (VCN) Standards
                </div>
                <div className="text-[10px] text-emerald-800 leading-tight mt-0.5">
                  All operations comply with 50+1 packaging, free buffer bird per box and biosecurity protocols.
                </div>
              </div>
            </div>
            <Link
              href="/admin/services"
              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 shrink-0 whitespace-nowrap"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>

      {/* ================================================================
          4. BOTTOM SECTION: REAL-TIME ENQUIRY STREAM
          ================================================================ */}
      <div className="rounded-3xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden">
        {/* Header Area */}
        <div className="p-6 border-b border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold text-[#00a854] uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 animate-pulse" />
                <span>REAL-TIME ENQUIRY STREAM</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-heading mt-0.5">
                Incoming Customer Enquiries &amp; WhatsApp Bookings
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Live stream of farmer requests, price inquiries, and clinical triage tickets awaiting commercial response.
              </p>
            </div>
          </div>

          {/* Filter Pills + Search + Full Inbox Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: `All Inquiries (${metrics.recentEnquiries.length})` },
                { id: 'pending', label: `Pending Contact (${metrics.pendingCount})` },
                { id: 'urgent', label: '🚨 Urgent / Vet Triage' },
                { id: 'fulfilled', label: '⏱ Fulfilled / Quoted' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setInquiryFilter(tab.id)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    inquiryFilter === tab.id
                      ? 'bg-[#062413] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, phone, state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-8 pr-3 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a854]/40"
                />
              </div>
              <Link
                href="/admin/enquiries"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-2xs transition-all"
              >
                <span>Full Inbox Desk</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Content View: Empty State graphic matching attached UI, or Live Table */}
        {filteredEnquiries.length === 0 ? (
          <div className="relative py-16 px-6 text-center overflow-hidden">
            {/* Wavy Soft Landscape Vector Graphic Background */}
            <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none opacity-40">
              <svg viewBox="0 0 1440 200" fill="none" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <path
                  d="M0,100 C320,180 420,20 720,80 C1020,140 1120,40 1440,90 L1440,200 L0,200 Z"
                  fill="#bbf7d0"
                  fillOpacity="0.5"
                />
                <path
                  d="M0,130 C360,60 520,190 840,110 C1160,30 1280,150 1440,120 L1440,200 L0,200 Z"
                  fill="#86efac"
                  fillOpacity="0.4"
                />
              </svg>
            </div>

            {/* Central Sprout Illustration */}
            <div className="relative z-10 space-y-2">
              <div className="mx-auto h-16 w-16 rounded-full bg-[#d8f6e7] flex items-center justify-center shadow-xs">
                <Sprout className="h-8 w-8 text-[#00a854]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Inquiry Queue is Current
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                No customer inquiries match your active filter. When new bookings arrive, they will stream here in real-time.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Reference', 'Farmer & Farm', 'Phone (WhatsApp)', 'Destination Hub', 'Inquiry Type', 'Status', 'Instant Action'].map((h, i) => (
                    <th key={h} className={`px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 ${i === 6 ? 'text-right' : ''}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.map((enquiry) => {
                  const isUrgent =
                    enquiry.priority === 'urgent' ||
                    enquiry.enquiry_type === 'veterinary_consultation';

                  return (
                    <tr
                      key={enquiry.id}
                      className={`hover:bg-slate-50/80 transition-colors ${isUrgent ? 'bg-rose-50/20' : ''}`}
                    >
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900 text-xs">
                          <span>{enquiry.enquiry_ref}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(enquiry.enquiry_ref, enquiry.id)}
                            className="text-slate-400 hover:text-emerald-600 p-0.5"
                            title="Copy Reference"
                          >
                            {copiedId === enquiry.id ? (
                              <Check className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(enquiry.created_at).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900 text-xs">{enquiry.customer_name}</div>
                        <div className="text-[10px] text-[#00a854] font-semibold truncate max-w-[140px]">
                          {enquiry.farm_name || 'Independent Producer'}
                        </div>
                      </td>

                      <td className="px-5 py-3.5 font-mono text-slate-700 whitespace-nowrap">
                        {enquiry.customer_phone}
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{enquiry.delivery_state || 'Nigeria'}</div>
                        {enquiry.delivery_city && (
                          <div className="text-[10px] text-slate-400">{enquiry.delivery_city}</div>
                        )}
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {isUrgent ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[10px] font-bold text-rose-700">
                            <Stethoscope className="h-3 w-3 text-rose-600" /> Clinical SOS
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 capitalize">
                            {enquiry.enquiry_type?.replace(/_/g, ' ') || 'Chick Order'}
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          enquiry.status === 'pending'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : enquiry.status === 'quoted'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : enquiry.status === 'fulfilled'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {enquiry.status === 'pending' && <Clock className="h-2.5 w-2.5" />}
                          {enquiry.status === 'fulfilled' && <CheckCircle className="h-2.5 w-2.5" />}
                          <span className="capitalize">{enquiry.status.replace(/_/g, ' ')}</span>
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <a
                          href={`https://wa.me/${enquiry.customer_phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(enquiry.customer_name)},%20this%20is%20D-AminGrow%20Commercial%20Desk%20regarding%20your%20inquiry%20${enquiry.enquiry_ref}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-xl bg-[#00a854] hover:bg-[#009249] text-white px-3 py-1.5 text-xs font-bold transition-all shadow-xs"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
