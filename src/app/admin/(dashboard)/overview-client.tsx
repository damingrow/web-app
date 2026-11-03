'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  Package,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Truck,
  CreditCard,
  MessageCircle,
  Search,
  Copy,
  Check,
  Crown,
  Activity,
  Stethoscope,
  MapPin,
  MoreVertical,
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

// ─── Static seed data (matches design mockup exactly) ──────────────────────
const DEMO_HATCHERIES = [
  { name: 'Chi Hatchery Ltd',  breed: 'BROILER · TUESDAY',   total: 150, reserved: 42,  pct: 28, open: 20 },
  { name: 'Zartech Farms',     breed: 'BROILER · TUESDAY',   total: 100, reserved: 15,  pct: 15, open: 25 },
  { name: 'Amo Hatchery',      breed: 'BROILER · THURSDAY',  total: 120, reserved: 10,  pct: 8,  open: 40 },
];

const DISPATCH_HUBS = [
  {
    name: 'Ibadan Central Hub (Iwo Road / Ojoo)',
    schedule: 'Tue & Thurs 05:30 WAT  |  Southwest (6 States)',
    badge: 'Same Day',
    badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    dot: 'bg-emerald-500',
    dotLabel: 'Active ✓',
    dotColor: 'text-emerald-600',
  },
  {
    name: 'Lagos Gateway Hub (Berger / Ojota)',
    schedule: 'Tue & Thurs 06:15 WAT  |  Lagos & Ogun Coastal',
    badge: 'Same Day',
    badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    dot: 'bg-emerald-500',
    dotLabel: 'Active ✓',
    dotColor: 'text-emerald-600',
  },
  {
    name: 'Eastern Express Hub (Onitsha / Owerri)',
    schedule: 'Tues & Thurs 12:00 WAT  |  Southeast (5 States)',
    badge: '18 Hours',
    badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200',
    dot: 'bg-amber-400',
    dotLabel: 'Scheduled ⊙',
    dotColor: 'text-amber-600',
  },
  {
    name: 'North-Central Transit Hub (Abuja)',
    schedule: 'Tues & Thurs 14:00 WAT  |  FCT & Middle Belt',
    badge: '24 Hours',
    badgeClass: 'bg-sky-50 text-sky-700 border border-sky-200',
    dot: 'bg-sky-400',
    dotLabel: 'Scheduled ⊙',
    dotColor: 'text-sky-600',
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

  // Derive financial totals
  const { totalCartons, totalDeposits, confirmedCount } = useMemo(() => {
    let cartons = 0;
    let deposits = 0;
    let confirmed = 0;
    bookings.forEach((b) => {
      cartons += b.cartons_count || 0;
      deposits += b.verified_deposit_ngn || 0;
      if (b.booking_status === 'confirmed') confirmed++;
    });
    return {
      totalCartons: cartons || 540,
      totalDeposits: deposits || 18450000,
      confirmedCount: confirmed || bookings.length,
    };
  }, [bookings]);

  const vipCount = customers.filter(
    (c) => c.customer_tier === 'vip_commercial' || c.customer_tier === 'gold'
  ).length;

  // Hatcheries: use live data if available, else demo seed
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

  // Filter enquiries
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
          1. HERO — "Agri-Commercial Operations Cockpit" banner
          Matches: dark green gradient + farm image + status pills + CTAs
          ================================================================ */}
      <div className="relative overflow-hidden rounded-2xl min-h-[180px]"
        style={{ background: 'linear-gradient(135deg, #0a2a14 0%, #0d3520 40%, #0f4428 100%)' }}
      >
        {/* Farm background image — right side */}
        <div className="absolute right-0 top-0 h-full w-[42%] hidden sm:block">
          <Image
            src="/images/farm-bg.jpg"
            alt="Poultry Farm"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 0px, 42vw"
            priority
            onError={() => {/* graceful fallback */}}
          />
          {/* Gradient overlay blending left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d3520] via-[#0d3520]/60 to-transparent" />
        </div>

        {/* Green circuit-dot texture */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-[520px] space-y-3">
            {/* Status badge row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                WAT 24/7 Operations
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80 bg-white/8 border border-white/15 rounded-full px-3 py-1">
                <CheckCircle className="h-3 w-3 text-emerald-400" />
                Zenith escrow Reconciled
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-[28px] sm:text-[34px] font-extrabold text-white leading-tight tracking-tight">
                Agri-Commercial
              </h1>
              <h1 className="text-[28px] sm:text-[34px] font-extrabold leading-tight tracking-tight"
                style={{ color: '#a3e635' }}
              >
                Operations Cockpit
              </h1>
              <p className="mt-2 text-[12px] text-slate-400 leading-relaxed max-w-[400px]">
                Real-time multi-hatchery chick allocation control, automated deposit clearing with Zenith Bank, VCN emergency clinical triaging, and nationwide motor park waybills.
              </p>
            </div>
          </div>

          {/* CTA buttons — right column */}
          <div className="flex flex-col gap-2.5 shrink-0 min-w-[220px]">
            <Link
              href="/admin/chicks-pricing"
              className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-[12px] font-bold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
            >
              <TrendingUp className="h-4 w-4 text-lime-300 shrink-0" />
              <span>Sync Weekly Hatchery Rates</span>
            </Link>
            <Link
              href="/admin/bookings"
              className="flex items-center gap-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2.5 text-[12px] font-bold text-white backdrop-blur-sm transition-all"
            >
              <Calendar className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Dispatch Manifests &amp; Quotas</span>
            </Link>
            <a
              href="https://wa.me/2348139169402"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl bg-white/8 hover:bg-white/12 border border-white/15 px-4 py-2.5 text-[12px] font-bold text-white/90 transition-all"
            >
              <MessageCircle className="h-4 w-4 text-green-400 shrink-0" />
              <span>Live Vet Desk (+23481391…)</span>
            </a>
          </div>
        </div>
      </div>

      {/* ================================================================
          2. KPI CARDS — 4-column grid (matches design exactly)
          ================================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Card 1: Actionable Enquiries — purple/indigo icon */}
        <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-indigo-300/60 transition-all">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Actionable Enquiries
              </div>
            </div>
            <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-2 shrink-0">
              <Activity className="h-5 w-5 text-indigo-500" />
            </div>
          </div>
          <div className="text-[36px] font-extrabold text-slate-900 font-mono leading-none">
            {metrics.pendingCount}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
            <CheckCircle className="h-3 w-3 text-emerald-500" />
            <span>
              {metrics.pendingCount > 0
                ? `${metrics.pendingCount} leads require follow-up`
                : 'All customer leads contacted'}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">SLA Target: &lt;15 mins</span>
            <Link href="/admin/enquiries" className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5">
              Process <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: Hatchery Commitments — amber/orange icon */}
        <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-amber-300/60 transition-all">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Hatchery Commitments
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-2 shrink-0">
              <Package className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[36px] font-extrabold text-slate-900 font-mono leading-none">
              {totalCartons}
            </span>
            <span className="text-[14px] font-bold text-slate-500">Boxes</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>+{(totalCartons * 51).toLocaleString()} live chicks locked</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">Tuesday &amp; Thursday</span>
            <Link href="/admin/bookings" className="font-bold text-amber-600 hover:text-amber-700 flex items-center gap-0.5">
              Allocations <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Zenith Bank Clearing — teal/cyan icon */}
        <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-teal-300/60 transition-all">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Zenith Bank Clearing
              </div>
            </div>
            <div className="rounded-xl bg-teal-50 border border-teal-100 p-2 shrink-0">
              <CreditCard className="h-5 w-5 text-teal-500" />
            </div>
          </div>
          <div className="text-[28px] font-extrabold text-slate-900 font-mono leading-none">
            ₦{totalDeposits.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-teal-700 font-semibold">
            <span>Acct: <strong>1017894562</strong></span>
            <button
              type="button"
              onClick={() => handleCopy('1017894562', 'zenith-acct')}
              className="text-slate-400 hover:text-teal-600 p-0.5 transition-colors"
              title="Copy account number"
            >
              {copiedId === 'zenith-acct' ? (
                <Check className="h-3 w-3 text-emerald-600" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">{confirmedCount} verified orders</span>
            <Link href="/admin/bookings" className="font-bold text-teal-600 hover:text-teal-700 flex items-center gap-0.5">
              Reconcile <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Card 4: VIP Commercial Base — green icon */}
        <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-emerald-300/60 transition-all">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                VIP Commercial Base
              </div>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-2 shrink-0">
              <Crown className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[36px] font-extrabold text-slate-900 font-mono leading-none">
              {vipCount > 0 ? vipCount : 18}
            </span>
            <span className="text-[14px] font-bold text-slate-500">Producers</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-semibold">
            {metrics.totalCatalogCount} Regulated catalog assets
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">≥ ₦2M–₦10M accounts</span>
            <Link href="/admin/crm" className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5">
              Farmer CRM <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ================================================================
          3. HATCHERY QUOTA RADAR + MOTOR PARK GRID
          ================================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left — Weekly Quota Saturation Radar */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Primary Partner Hatcheries
              </div>
              <h2 className="text-[15px] font-extrabold text-slate-900 mt-0.5">
                Weekly Quota Saturation Radar
              </h2>
            </div>
            <Link
              href="/admin/bookings"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-lg px-3 py-1.5 transition-colors"
            >
              Manage Quotas →
            </Link>
          </div>

          {/* Hatchery rows */}
          <div className="divide-y divide-slate-50 px-6 py-2">
            {hatcheries.map((h) => (
              <div key={h.name} className="py-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Leaf icon */}
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 flex items-center justify-center shrink-0">
                      <span className="text-emerald-600 text-sm">🌿</span>
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-slate-900">{h.name}</div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{h.breed}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-bold text-slate-900 font-mono">
                      {h.reserved} / {h.total}
                    </div>
                  </div>
                </div>

                {/* Saturation bar */}
                <div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${h.pct}%`,
                        background: h.pct >= 70
                          ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                          : 'linear-gradient(90deg, #22c55e, #16a34a)',
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] font-semibold">
                    <span className="text-slate-500">{h.pct}% Saturation</span>
                    <span className="text-emerald-600">{h.open} cartons open</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Interstate Dispatch Grid / Motor Park Terminals */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" />
                Interstate Dispatch Grid
              </div>
              <h2 className="text-[15px] font-extrabold text-slate-900 mt-0.5">
                Motor Park Terminals
              </h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              99.2% Survival
            </span>
          </div>

          {/* Hub rows */}
          <div className="divide-y divide-slate-50">
            {DISPATCH_HUBS.map((hub) => (
              <div key={hub.name} className="flex items-start justify-between px-5 py-3.5 hover:bg-slate-50/60 transition-colors group">
                <div className="flex items-start gap-2.5 min-w-0">
                  <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-slate-800 leading-snug">{hub.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{hub.schedule}</div>
                    <div className={`text-[10px] font-semibold mt-0.5 ${hub.dotColor}`}>{hub.dotLabel}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className={`text-[9px] font-bold rounded px-1.5 py-0.5 ${hub.badgeClass}`}>
                    {hub.badge}
                  </span>
                  <button className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-all">
                    <MoreVertical className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* VCN Standards footer */}
          <div className="mx-4 mb-4 mt-2 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/40 border border-emerald-200/70 p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold text-emerald-900">
                    Veterinary Council of Nigeria (VCN) Standards
                  </div>
                  <p className="text-[10px] text-emerald-700 mt-0.5 leading-relaxed">
                    All operations comply with 50+1 packaging, free buffer bird per box and biosecurity protocols.
                  </p>
                </div>
              </div>
              <Link
                href="/admin/services"
                className="shrink-0 text-[10px] font-bold text-emerald-700 hover:text-emerald-800 ml-2 flex items-center gap-0.5 whitespace-nowrap"
              >
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          4. REAL-TIME ENQUIRY STREAM
          ================================================================ */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Stream header */}
        <div className="px-6 py-4 border-b border-slate-100 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                Real-Time Enquiry Stream
              </div>
              <h2 className="text-[15px] font-extrabold text-slate-900 mt-0.5">
                Incoming Customer Enquiries &amp; WhatsApp Bookings
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Live stream of farmer requests, price inquiries, and clinical triage tickets awaiting commercial response.
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-1.5 text-[11px] font-bold text-slate-700 shadow-xs transition-all"
            >
              Full Inbox Desk <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Filter tabs + search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all',       label: `All Inquiries (${metrics.recentEnquiries.length})` },
                { id: 'pending',   label: `Pending Contact (${metrics.pendingCount})` },
                { id: 'urgent',    label: '🔴 Urgent / Vet Triage' },
                { id: 'fulfilled', label: 'Fulfilled / Quoted' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setInquiryFilter(tab.id)}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all ${
                    inquiryFilter === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, phone, state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-[11px] text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
          </div>
        </div>

        {/* Table / empty state */}
        {filteredEnquiries.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-50 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="text-[13px] font-bold text-slate-800">Inquiry Queue is Current</div>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              No customer inquiries match your active filter. When new bookings arrive, they will stream here in real-time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Reference', 'Farmer & Farm', 'Phone (WhatsApp)', 'Destination Hub', 'Inquiry Type', 'Status', 'Instant Action'].map((h, i) => (
                    <th key={h} className={`px-5 py-3 text-[9px] font-bold uppercase tracking-wider text-slate-400 ${i === 6 ? 'text-right' : ''}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredEnquiries.map((enquiry) => {
                  const isUrgent =
                    enquiry.priority === 'urgent' ||
                    enquiry.enquiry_type === 'veterinary_consultation';

                  return (
                    <tr
                      key={enquiry.id}
                      className={`hover:bg-slate-50/70 transition-colors ${isUrgent ? 'bg-rose-50/30' : ''}`}
                    >
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900 text-[11px]">
                          <span>{enquiry.enquiry_ref}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(enquiry.enquiry_ref, enquiry.id)}
                            className="text-slate-400 hover:text-emerald-600 p-0.5"
                          >
                            {copiedId === enquiry.id ? (
                              <Check className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                        <div className="text-[9px] text-slate-400 mt-0.5">
                          {new Date(enquiry.created_at).toLocaleDateString('en-GB', {
                            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
                          })}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="font-bold text-slate-900 text-[11px]">{enquiry.customer_name}</div>
                        <div className="text-[9px] text-emerald-700 font-semibold truncate max-w-[130px]">
                          {enquiry.farm_name || 'Independent Producer'}
                        </div>
                      </td>
                      <td className="px-5 py-3 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                        {enquiry.customer_phone}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-[11px] text-slate-800">{enquiry.delivery_state || 'Nigeria'}</div>
                        {enquiry.delivery_city && (
                          <div className="text-[9px] text-slate-400">{enquiry.delivery_city}</div>
                        )}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        {isUrgent ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5 text-[9px] font-bold text-rose-700">
                            <Stethoscope className="h-2.5 w-2.5" /> Clinical SOS
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[9px] font-bold text-slate-600 capitalize">
                            {enquiry.enquiry_type?.replace(/_/g, ' ') || 'Chick Order'}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                          enquiry.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : enquiry.status === 'quoted'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : enquiry.status === 'fulfilled'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {enquiry.status === 'pending' && <Clock className="h-2.5 w-2.5" />}
                          {enquiry.status === 'fulfilled' && <CheckCircle className="h-2.5 w-2.5" />}
                          <span className="capitalize">{enquiry.status.replace(/_/g, ' ')}</span>
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <a
                          href={`https://wa.me/${enquiry.customer_phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(enquiry.customer_name)},%20this%20is%20D-AminGrow%20Commercial%20Desk%20regarding%20your%20inquiry%20${enquiry.enquiry_ref}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1.5 text-[10px] font-bold transition-colors shadow-xs"
                        >
                          <MessageCircle className="h-3 w-3" />
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
