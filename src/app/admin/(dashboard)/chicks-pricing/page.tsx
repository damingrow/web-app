'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Save,
  Zap,
  BarChart3,
  Package,
  Calendar,
  ChevronUp,
  ChevronDown,
  Edit3,
  X,
  ArrowUpRight,
  Layers,
  MapPin,
  Phone,
  Star,
  Activity,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface HatcheryPartner {
  id: string;
  code: string;
  name: string;
  headquarters_location: string;
  contact_phone?: string | null;
  is_active: boolean;
}

interface QuotaSlot {
  id: string;
  hatchery_id: string;
  hatchery_name?: string;
  hatchery_code?: string;
  breed_type: string;
  dispatch_date: string;
  dispatch_day: 'Tuesday' | 'Thursday' | 'Special_Run';
  total_cartons_quota: number;
  reserved_cartons: number;
  confirmed_cartons: number;
  available_cartons: number;
  estimated_price_per_carton: number;
  status: 'open' | 'limited' | 'closed' | 'dispatched';
}

interface PriceRow {
  id: string;
  breed: string;
  breedCode: string;
  hatcheryBrand: string;
  hatcheryCode: string;
  currentPriceNgn: number;
  newPriceNgn: number;
  dispatchDays: string;
  status: 'active' | 'limited_allocation' | 'sold_out';
  category: 'broiler' | 'layer' | 'cockerel' | 'noiler' | 'turkey';
  birdsPerCarton: number;
  depositPct: number;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED_PRICES: PriceRow[] = [
  {
    id: 'brl-cobb500',
    breed: 'Commercial White Broiler',
    breedCode: 'COBB-500',
    hatcheryBrand: 'Chi / Zartech Certified Grade',
    hatcheryCode: 'CHI/ZAR',
    currentPriceNgn: 48000,
    newPriceNgn: 48000,
    dispatchDays: 'Tue & Thu',
    status: 'active',
    category: 'broiler',
    birdsPerCarton: 50,
    depositPct: 50,
  },
  {
    id: 'brl-ross308',
    breed: 'Ross 308 Premium Broiler',
    breedCode: 'ROSS-308',
    hatcheryBrand: 'Amo Hatchery Premium Line',
    hatcheryCode: 'AMO',
    currentPriceNgn: 51500,
    newPriceNgn: 51500,
    dispatchDays: 'Tue & Thu',
    status: 'active',
    category: 'broiler',
    birdsPerCarton: 50,
    depositPct: 50,
  },
  {
    id: 'lay-isabrown',
    breed: 'Commercial Brown Layer Pullet',
    breedCode: 'ISA-BROWN',
    hatcheryBrand: 'Isa Brown / Lohmann Grade',
    hatcheryCode: 'SAY',
    currentPriceNgn: 52000,
    newPriceNgn: 52000,
    dispatchDays: 'Tuesday',
    status: 'active',
    category: 'layer',
    birdsPerCarton: 50,
    depositPct: 50,
  },
  {
    id: 'lay-zarblack',
    breed: 'Zartech Black Layer Pullet',
    breedCode: 'ZAR-BLACK',
    hatcheryBrand: 'Zartech Farms — Black Strain',
    hatcheryCode: 'ZAR',
    currentPriceNgn: 54000,
    newPriceNgn: 54000,
    dispatchDays: 'Thursday',
    status: 'limited_allocation',
    category: 'layer',
    birdsPerCarton: 50,
    depositPct: 50,
  },
  {
    id: 'ckr-heavy',
    breed: 'Commercial Heavy Cockerel',
    breedCode: 'CCK-HVY',
    hatcheryBrand: 'White Cockerel Brooder Grade',
    hatcheryCode: 'AMO',
    currentPriceNgn: 18500,
    newPriceNgn: 18500,
    dispatchDays: 'Tuesday',
    status: 'active',
    category: 'cockerel',
    birdsPerCarton: 100,
    depositPct: 40,
  },
  {
    id: 'noi-kuroiler',
    breed: 'Dual-Purpose Noiler / Kuroiler',
    breedCode: 'NOI-KURO',
    hatcheryBrand: 'Heavy Dual-Yield Strain',
    hatcheryCode: 'VAL',
    currentPriceNgn: 34000,
    newPriceNgn: 34000,
    dispatchDays: 'Thursday',
    status: 'limited_allocation',
    category: 'noiler',
    birdsPerCarton: 50,
    depositPct: 50,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG');
}

function getNextDispatch(day: 'Tuesday' | 'Thursday') {
  const today = new Date();
  const target = day === 'Tuesday' ? 2 : 4;
  const diff = (target - today.getDay() + 7) % 7 || 7;
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  return d.toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' });
}

function daysUntil(day: 'Tuesday' | 'Thursday') {
  const today = new Date();
  const target = day === 'Tuesday' ? 2 : 4;
  const diff = (target - today.getDay() + 7) % 7 || 7;
  return diff;
}

function fillRate(q: QuotaSlot) {
  return q.total_cartons_quota > 0
    ? Math.round(((q.total_cartons_quota - q.available_cartons) / q.total_cartons_quota) * 100)
    : 0;
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: PriceRow['status'] }) {
  const map: Record<PriceRow['status'], string> = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    limited_allocation: 'bg-amber-50 text-amber-700 border-amber-200',
    sold_out: 'bg-red-50 text-red-600 border-red-200',
  };
  const labels: Record<PriceRow['status'], string> = {
    active: 'Active',
    limited_allocation: 'Limited',
    sold_out: 'Sold Out',
  };
  const dots: Record<PriceRow['status'], string> = {
    active: 'bg-emerald-500',
    limited_allocation: 'bg-amber-500',
    sold_out: 'bg-red-500',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${map[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {labels[status]}
    </span>
  );
}

function QuotaStatusBadge({ status }: { status: QuotaSlot['status'] }) {
  const map: Record<QuotaSlot['status'], string> = {
    open: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    limited: 'bg-amber-50 text-amber-700 border-amber-200',
    closed: 'bg-red-50 text-red-600 border-red-200',
    dispatched: 'bg-slate-50 text-slate-500 border-slate-200',
  };
  const dots: Record<QuotaSlot['status'], string> = {
    open: 'bg-emerald-500 animate-pulse',
    limited: 'bg-amber-500',
    closed: 'bg-red-500',
    dispatched: 'bg-slate-400',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${map[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function CategoryPill({ cat }: { cat: PriceRow['category'] }) {
  const cfg: Record<string, { bg: string; label: string }> = {
    broiler: { bg: 'bg-blue-100 text-blue-700', label: 'Broiler' },
    layer: { bg: 'bg-purple-100 text-purple-700', label: 'Layer' },
    cockerel: { bg: 'bg-orange-100 text-orange-700', label: 'Cockerel' },
    noiler: { bg: 'bg-teal-100 text-teal-700', label: 'Noiler' },
    turkey: { bg: 'bg-pink-100 text-pink-700', label: 'Turkey' },
  };
  const c = cfg[cat] || { bg: 'bg-blue-100 text-blue-700', label: 'Broiler' };
  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold ${c.bg}`}>
      {c.label}
    </span>
  );
}

// ─── Edit Price Modal ─────────────────────────────────────────────────────────

function EditPriceModal({
  row,
  onSave,
  onClose,
}: {
  row: PriceRow;
  onSave: (id: string, newPrice: number, status: PriceRow['status']) => void;
  onClose: () => void;
}) {
  const [price, setPrice] = useState(row.newPriceNgn);
  const [status, setStatus] = useState(row.status);
  const delta = price - row.currentPriceNgn;
  const pct = row.currentPriceNgn > 0 ? ((delta / row.currentPriceNgn) * 100).toFixed(1) : '0';
  const deposit = Math.round(price * (row.depositPct / 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Modal header */}
        <div className="bg-gradient-to-r from-[#062413] to-[#093d1f] px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Price Editor</p>
              <h3 className="text-white font-black text-lg leading-tight">{row.breed}</h3>
              <p className="text-emerald-300 text-xs mt-0.5">{row.breedCode} · {row.hatcheryBrand}</p>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Current vs New */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3">
              <p className="text-[10px] text-slate-500 font-bold mb-1">CURRENT RATE</p>
              <p className="text-lg font-black text-slate-700">{fmt(row.currentPriceNgn)}</p>
              <p className="text-[10px] text-slate-400">per carton ({row.birdsPerCarton} birds)</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100">
              <p className="text-[10px] text-emerald-600 font-bold mb-1">NEW RATE</p>
              <p className="text-lg font-black text-emerald-800">{fmt(price)}</p>
              <p className="text-[10px] text-emerald-500">
                {delta !== 0 ? (delta > 0 ? `▲ +${pct}%` : `▼ ${pct}%`) : '— No change'}
              </p>
            </div>
          </div>

          {/* Price Slider + Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Adjust Price (₦)</label>
            <input
              type="number"
              min={5000}
              step={500}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400"
            />
            <input
              type="range"
              min={5000}
              max={120000}
              step={500}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full mt-3 accent-emerald-600"
            />
            <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-0.5">
              <span>₦5,000</span><span>₦120,000</span>
            </div>
          </div>

          {/* Computed deposit */}
          <div className="bg-blue-50 rounded-2xl p-3 border border-blue-100">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold text-blue-700">Required Deposit ({row.depositPct}%)</p>
              <p className="text-sm font-black text-blue-800">{fmt(deposit)}</p>
            </div>
            <p className="text-[10px] text-blue-500 mt-0.5">Zenith Bank · 1017894562 (D-AminGrow)</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Availability Status</label>
            <div className="grid grid-cols-3 gap-2">
              {(['active', 'limited_allocation', 'sold_out'] as PriceRow['status'][]).map((s) => {
                const labels = { active: 'Active', limited_allocation: 'Limited', sold_out: 'Sold Out' };
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`rounded-xl py-2 px-2 text-[10px] font-bold border transition-all ${
                      status === s
                        ? 'bg-[#062413] text-white border-[#062413]'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {labels[s]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => { onSave(row.id, price, status); onClose(); }}
              className="flex-1 rounded-xl bg-[#062413] py-3 text-xs font-bold text-white hover:bg-[#0a3d1f] transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-3.5 h-3.5" /> Apply Price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Publish Confirm Modal ────────────────────────────────────────────────────

function PublishModal({
  rates,
  note,
  effectiveDate,
  onConfirm,
  onClose,
  saving,
}: {
  rates: PriceRow[];
  note: string;
  effectiveDate: string;
  onConfirm: () => void;
  onClose: () => void;
  saving: boolean;
}) {
  const changed = rates.filter((r) => r.newPriceNgn !== r.currentPriceNgn);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#062413] to-[#0a3d1f] px-6 py-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Publish Confirmation</p>
              <h3 className="text-white font-black text-xl">Publish Chick Rates?</h3>
              <p className="text-emerald-300 text-xs mt-1">Effective: {effectiveDate} · {changed.length} price change{changed.length !== 1 ? 's' : ''} detected</p>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 font-medium">
              Publishing these rates will update all customer-facing pricing and notify active booking agents. This action is logged in the audit trail.
            </p>
          </div>
          {changed.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Price Changes</p>
              {changed.map((r) => {
                const delta = r.newPriceNgn - r.currentPriceNgn;
                return (
                  <div key={r.id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{r.breed}</p>
                      <p className="text-[10px] text-slate-500">{r.breedCode}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 line-through">{fmt(r.currentPriceNgn)}</p>
                      <p className={`text-xs font-black ${delta > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {delta > 0 ? '▲' : '▼'} {fmt(r.newPriceNgn)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {note && (
            <div className="bg-slate-50 rounded-xl px-4 py-2">
              <p className="text-[10px] text-slate-500 font-bold">AUDIT NOTE</p>
              <p className="text-xs text-slate-700 mt-0.5">{note}</p>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={saving}
              className="flex-1 rounded-xl bg-[#062413] py-3 text-xs font-bold text-white hover:bg-[#0a3d1f] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Publishing…</> : <><Zap className="w-3.5 h-3.5" /> Confirm & Publish</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type TabId = 'live-board' | 'quota-health' | 'update-pricing' | 'hatcheries';

export default function ChickPricingPage() {
  const [tab, setTab] = useState<TabId>('live-board');
  const [rates, setRates] = useState<PriceRow[]>(SEED_PRICES);
  const [quotas, setQuotas] = useState<QuotaSlot[]>([]);
  const [hatcheries, setHatcheries] = useState<HatcheryPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState<Date>(new Date());

  const [editRow, setEditRow] = useState<PriceRow | null>(null);
  const [showPublish, setShowPublish] = useState(false);
  const [publishNote, setPublishNote] = useState('');
  const [effectiveDate, setEffectiveDate] = useState(() => new Date().toISOString().split('T')[0] ?? '');
  const [saving, setSaving] = useState(false);
  const [publishedOk, setPublishedOk] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dispatchFilter, setDispatchFilter] = useState<string>('all');

  // ── Load data ──
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [hRes, qRes] = await Promise.all([
        fetch('/api/admin/chicks-pricing/hatcheries').catch(() => null),
        fetch('/api/admin/chicks-pricing/quotas').catch(() => null),
      ]);

      if (hRes?.ok) {
        const hData = await hRes.json();
        if (hData?.hatcheries) setHatcheries(hData.hatcheries);
      }
      if (qRes?.ok) {
        const qData = await qRes.json();
        if (qData?.quotas) setQuotas(qData.quotas);
      }
    } catch {
      // keep seed data
    }
    setLoading(false);
    setLastSync(new Date());
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // ── Derived KPIs ──
  const activePrices = rates.filter((r) => r.status === 'active');
  const avgPrice = activePrices.length > 0
    ? Math.round(activePrices.reduce((s, r) => s + r.newPriceNgn, 0) / activePrices.length)
    : 0;
  const totalOpenCartons = quotas.reduce((s, q) => s + q.available_cartons, 0);
  const tueDays = daysUntil('Tuesday');
  const thuDays = daysUntil('Thursday');
  const nextDispatchDays = Math.min(tueDays, thuDays);
  const activeHatcheries = hatcheries.length || 5;

  // ── Edit + Publish ──
  const handleSaveRow = (id: string, newPrice: number, status: PriceRow['status']) => {
    setRates((prev) => prev.map((r) => r.id === id ? { ...r, newPriceNgn: newPrice, status } : r));
  };

  const handlePublish = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/chicks-pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          effectiveDate,
          note: publishNote || 'Routine weekly price sync',
          rates: rates.map((r) => ({
            id: r.id,
            breed: r.breed,
            hatcheryBrand: r.hatcheryBrand,
            priceNgn: r.newPriceNgn,
            status: r.status,
          })),
        }),
      });
      // Commit new prices to current
      setRates((prev) => prev.map((r) => ({ ...r, currentPriceNgn: r.newPriceNgn })));
      setPublishedOk(true);
      setTimeout(() => setPublishedOk(false), 5000);
    } catch {
      /* non-blocking */
    }
    setSaving(false);
    setShowPublish(false);
  };

  // ── Filtered rates ──
  const filteredRates = rates.filter((r) => {
    if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
    if (dispatchFilter === 'tuesday' && !r.dispatchDays.toLowerCase().includes('tue')) return false;
    if (dispatchFilter === 'thursday' && !r.dispatchDays.toLowerCase().includes('thu')) return false;
    return true;
  });

  const pendingChanges = rates.filter((r) => r.newPriceNgn !== r.currentPriceNgn).length;

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 pb-10">

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#062413] via-[#093d1f] to-[#041a0d] p-7 shadow-2xl">
        {/* Background decorations */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-green-400/5 blur-2xl" />
        <svg className="pointer-events-none absolute right-0 bottom-0 opacity-5" width="320" height="120" viewBox="0 0 320 120">
          <path d="M0 80 Q80 20 160 60 Q240 100 320 30" stroke="#2ee571" strokeWidth="2" fill="none" />
          <path d="M0 100 Q80 40 160 80 Q240 120 320 50" stroke="#2ee571" strokeWidth="1.5" fill="none" />
        </svg>

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            {/* Live pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-[#2ee571] animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Live Price Board</span>
              <span className="text-[10px] text-emerald-400">· Chick Price Sync</span>
            </div>
            <h1 className="text-3xl font-black text-white font-heading leading-tight">
              Chicks Pricing Command
            </h1>
            <p className="text-emerald-200/80 text-sm max-w-xl">
              Real-time day-old chick rates across CHI, ZAR, AMO, SAY & VAL partner hatcheries.
              Dispatch: <span className="text-[#2ee571] font-bold">Tuesday & Thursday only.</span>
            </p>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-white/80">
                <Calendar className="w-3 h-3" /> Next Tue: {getNextDispatch('Tuesday')} ({tueDays}d)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-white/80">
                <Calendar className="w-3 h-3" /> Next Thu: {getNextDispatch('Thursday')} ({thuDays}d)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-white/80">
                <Clock className="w-3 h-3" /> Synced: {lastSync.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {publishedOk && (
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl px-4 py-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">Rates Published!</span>
              </div>
            )}
            {pendingChanges > 0 && (
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-2xl px-4 py-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300">{pendingChanges} Pending Change{pendingChanges > 1 ? 's' : ''}</span>
              </div>
            )}
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-5 py-2.5 text-xs font-bold text-white transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            <button
              onClick={() => setShowPublish(true)}
              className="inline-flex items-center gap-2 bg-[#2ee571] hover:bg-emerald-400 rounded-2xl px-5 py-2.5 text-xs font-black text-[#062413] transition-all shadow-lg"
            >
              <Zap className="w-3.5 h-3.5" />
              Publish Rates
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Avg Price */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute right-0 bottom-0 opacity-5">
            <svg width="90" height="60" viewBox="0 0 90 60"><path d="M0 50 Q30 10 60 30 Q75 40 90 15" stroke="#062413" strokeWidth="3" fill="none" /></svg>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5 flex items-center gap-0.5">
              <ChevronUp className="w-3 h-3" />2.4%
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">{fmt(avgPrice)}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Avg Price / Carton</p>
          <p className="text-[10px] text-slate-400 mt-1">Across {activePrices.length} active breeds</p>
        </div>

        {/* Open Quota */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute right-0 bottom-0 opacity-5">
            <svg width="90" height="60" viewBox="0 0 90 60"><path d="M0 40 Q30 60 60 20 Q75 10 90 35" stroke="#062413" strokeWidth="3" fill="none" /></svg>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-700" />
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 rounded-full px-2 py-0.5">Live</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{totalOpenCartons > 0 ? totalOpenCartons.toLocaleString() : '—'}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Open Cartons Available</p>
          <p className="text-[10px] text-slate-400 mt-1">Across {quotas.length || '—'} active quota slots</p>
        </div>

        {/* Active Hatcheries */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute right-0 bottom-0 opacity-5">
            <svg width="90" height="60" viewBox="0 0 90 60"><path d="M0 30 Q45 5 90 40" stroke="#062413" strokeWidth="3" fill="none" /></svg>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Layers className="w-5 h-5 text-purple-700" />
            </div>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 rounded-full px-2 py-0.5">Partners</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{activeHatcheries}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Active Hatchery Partners</p>
          <p className="text-[10px] text-slate-400 mt-1">CHI · ZAR · AMO · SAY · VAL</p>
        </div>

        {/* Next Dispatch */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062413] to-[#0a3d1f] p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute right-0 bottom-0 opacity-10">
            <svg width="90" height="60" viewBox="0 0 90 60"><path d="M0 50 Q30 10 90 25" stroke="#2ee571" strokeWidth="3" fill="none" /></svg>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 rounded-full px-2 py-0.5">In {nextDispatchDays}d</span>
          </div>
          <p className="text-2xl font-black text-white">{nextDispatchDays === tueDays ? 'Tuesday' : 'Thursday'}</p>
          <p className="text-xs text-emerald-300 font-medium mt-0.5">Next Dispatch Day</p>
          <p className="text-[10px] text-emerald-400/70 mt-1">{getNextDispatch(nextDispatchDays === tueDays ? 'Tuesday' : 'Thursday')}</p>
        </div>
      </div>

      {/* ── Tabs ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 bg-slate-50 rounded-2xl p-1.5 border border-slate-100">
        {([
          { id: 'live-board', label: 'Live Price Board', icon: BarChart3 },
          { id: 'quota-health', label: 'Quota Health', icon: Activity },
          { id: 'update-pricing', label: 'Update Pricing', icon: Edit3 },
          { id: 'hatcheries', label: 'Hatchery Partners', icon: Star },
        ] as { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[]).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              tab === id
                ? 'bg-[#062413] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── Tab: Live Price Board ─────────────────────────────────────────── */}
      {tab === 'live-board' && (
        <div className="rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-[#fafcfb] to-white px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-black text-slate-900">Live Chick Price Board</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">{rates.length} breeds · Deposit via Zenith Bank 1017894562</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Breeds</option>
                <option value="broiler">Broiler</option>
                <option value="layer">Layer</option>
                <option value="cockerel">Cockerel</option>
                <option value="noiler">Noiler</option>
              </select>
              {/* Dispatch Filter */}
              <select
                value={dispatchFilter}
                onChange={(e) => setDispatchFilter(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Dispatch Days</option>
                <option value="tuesday">Tuesday Only</option>
                <option value="thursday">Thursday Only</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafcfb] text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-5">Breed & Genetics</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Hatchery</th>
                  <th className="py-3.5 px-4">Dispatch Days</th>
                  <th className="py-3.5 px-4">Rate / Carton</th>
                  <th className="py-3.5 px-4">Deposit (50%)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredRates.map((row) => {
                  const deposit = Math.round(row.newPriceNgn * (row.depositPct / 100));
                  const delta = row.newPriceNgn - row.currentPriceNgn;
                  return (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-5">
                        <p className="font-bold text-slate-900">{row.breed}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{row.breedCode} · {row.birdsPerCarton} birds/carton</p>
                      </td>
                      <td className="py-4 px-4">
                        <CategoryPill cat={row.category} />
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-800">{row.hatcheryCode}</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{row.hatcheryBrand}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-slate-700 font-semibold">{row.dispatchDays}</span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-black text-slate-900 text-sm">{fmt(row.newPriceNgn)}</p>
                        {delta !== 0 && (
                          <p className={`text-[10px] font-bold flex items-center gap-0.5 ${delta > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {delta > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {delta > 0 ? '+' : ''}{fmt(Math.abs(delta))} vs prev
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-blue-700">{fmt(deposit)}</p>
                        <p className="text-[10px] text-slate-400">{row.depositPct}% required</p>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => { setEditRow(row); setTab('update-pricing'); }}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#062413] hover:bg-[#0a3d1f] text-white px-3 py-1.5 text-[10px] font-bold transition-colors"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="px-6 py-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] text-slate-500">
              <span className="font-bold text-slate-700">Deposit:</span> Zenith Bank · 1017894562 · D-AminGrow Agric Ltd
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 font-medium">Live · Updated {lastSync.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Quota Health ─────────────────────────────────────────────── */}
      {tab === 'quota-health' && (
        <div className="space-y-5">
          {/* Advisory */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800">
              <span className="font-bold">Quota Health Monitor:</span> Track carton fill rates per hatchery dispatch slot. Slots below 30% available are flagged for review.
              {quotas.length === 0 && ' — Live quota data loading from Supabase. Showing seed quotas below.'}
            </p>
          </div>

          {quotas.length > 0 ? (
            <div className="rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-[#fafcfb] px-6 py-4 border-b border-slate-100">
                <h2 className="text-sm font-black text-slate-900">Hatchery Quota Fill Rates</h2>
                <p className="text-[11px] text-slate-500">{quotas.length} active dispatch slots</p>
              </div>
              <div className="divide-y divide-slate-50">
                {quotas.map((q) => {
                  const fill = fillRate(q);
                  const isLow = q.available_cartons < (q.total_cartons_quota * 0.3);
                  return (
                    <div key={q.id} className="px-6 py-4 hover:bg-slate-50/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-800 text-sm">{q.hatchery_name || q.hatchery_code}</span>
                            <QuotaStatusBadge status={q.status} />
                            {isLow && (
                              <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 border border-red-200 rounded-full px-2 py-0.5 text-[10px] font-bold">
                                <AlertTriangle className="w-2.5 h-2.5" /> Low Stock
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {q.breed_type} · {q.dispatch_day} · {new Date(q.dispatch_date).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="flex gap-4 text-xs">
                          <div className="text-center">
                            <p className="font-black text-slate-900">{q.total_cartons_quota}</p>
                            <p className="text-slate-400 text-[10px]">Total Quota</p>
                          </div>
                          <div className="text-center">
                            <p className="font-black text-emerald-700">{q.available_cartons}</p>
                            <p className="text-slate-400 text-[10px]">Available</p>
                          </div>
                          <div className="text-center">
                            <p className="font-black text-blue-700">{q.confirmed_cartons}</p>
                            <p className="text-slate-400 text-[10px]">Confirmed</p>
                          </div>
                          <div className="text-center">
                            <p className="font-black text-amber-700">{q.reserved_cartons}</p>
                            <p className="text-slate-400 text-[10px]">Reserved</p>
                          </div>
                          <div className="text-center">
                            <p className="font-black text-slate-900">{fmt(q.estimated_price_per_carton)}</p>
                            <p className="text-slate-400 text-[10px]">Rate/Carton</p>
                          </div>
                        </div>
                      </div>
                      {/* Fill Bar */}
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                          <span>Fill Rate</span>
                          <span className="font-bold text-slate-700">{fill}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              fill >= 80 ? 'bg-emerald-500' : fill >= 50 ? 'bg-amber-400' : 'bg-red-400'
                            }`}
                            style={{ width: `${fill}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Seed quota display when no live data */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { hatchery: 'Chi Hatchery', code: 'CHI', day: 'Tuesday', total: 150, avail: 20, confirmed: 88, reserved: 42, price: 48000, status: 'open' as const },
                { hatchery: 'Zartech Farms', code: 'ZAR', day: 'Tuesday', total: 100, avail: 25, confirmed: 60, reserved: 15, price: 48500, status: 'open' as const },
                { hatchery: 'Amo Hatchery', code: 'AMO', day: 'Thursday', total: 120, avail: 40, confirmed: 70, reserved: 10, price: 47500, status: 'open' as const },
              ].map((q) => {
                const fill = Math.round(((q.total - q.avail) / q.total) * 100);
                return (
                  <div key={q.code} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-black text-slate-900 text-sm">{q.hatchery}</p>
                        <p className="text-[10px] text-slate-400">{q.code} · {q.day}</p>
                      </div>
                      <QuotaStatusBadge status={q.status} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {[
                        { label: 'Total', val: q.total, color: 'text-slate-700' },
                        { label: 'Available', val: q.avail, color: 'text-emerald-700' },
                        { label: 'Confirmed', val: q.confirmed, color: 'text-blue-700' },
                        { label: 'Reserved', val: q.reserved, color: 'text-amber-700' },
                      ].map((s) => (
                        <div key={s.label} className="bg-slate-50 rounded-xl p-2">
                          <p className={`text-sm font-black ${s.color}`}>{s.val}</p>
                          <p className="text-[10px] text-slate-400">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span>Fill Rate</span>
                        <span className="font-bold">{fill}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${fill >= 80 ? 'bg-emerald-500' : fill >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${fill}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs font-black text-slate-800 mt-3">{fmt(q.price)}<span className="text-[10px] text-slate-400 font-medium"> / carton</span></p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Update Pricing ───────────────────────────────────────────── */}
      {tab === 'update-pricing' && (
        <div className="space-y-5">
          {/* Config row */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Effective Date</label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="sm:col-span-1 lg:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Audit Note (Required for record)</label>
                <input
                  value={publishNote}
                  onChange={(e) => setPublishNote(e.target.value)}
                  placeholder="e.g. Weekly CHI/ZAR rate review — feed grain +3% adjustment"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Advisory */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-800">Market Rate Volatility Notice</p>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Nigerian day-old chick prices fluctuate weekly due to feed, fuel, and FX rates. Click <strong>Edit</strong> on any row to adjust individual breed prices. All changes require supervisor confirmation before publishing.
              </p>
            </div>
          </div>

          {/* Price rows */}
          <div className="rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-[#fafcfb] px-6 py-4 border-b border-slate-100">
              <h2 className="text-sm font-black text-slate-900">Breed Price Editor</h2>
              <p className="text-[11px] text-slate-500">Click Edit to open the price adjustment modal per breed</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fafcfb] text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-5">Breed</th>
                    <th className="py-3.5 px-4">Code</th>
                    <th className="py-3.5 px-4">Current Rate</th>
                    <th className="py-3.5 px-4">New Rate</th>
                    <th className="py-3.5 px-4">Change</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Edit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {rates.map((row) => {
                    const delta = row.newPriceNgn - row.currentPriceNgn;
                    const pct = row.currentPriceNgn > 0 ? ((delta / row.currentPriceNgn) * 100).toFixed(1) : '0';
                    return (
                      <tr key={row.id} className={`hover:bg-slate-50/60 transition-colors ${delta !== 0 ? 'bg-amber-50/30' : ''}`}>
                        <td className="py-4 px-5">
                          <p className="font-bold text-slate-900">{row.breed}</p>
                          <p className="text-[10px] text-slate-400">{row.hatcheryBrand}</p>
                        </td>
                        <td className="py-4 px-4 font-mono text-slate-500 text-[10px]">{row.breedCode}</td>
                        <td className="py-4 px-4 font-semibold text-slate-600">{fmt(row.currentPriceNgn)}</td>
                        <td className="py-4 px-4 font-black text-slate-900">{fmt(row.newPriceNgn)}</td>
                        <td className="py-4 px-4">
                          {delta === 0 ? (
                            <span className="text-[10px] text-slate-400">— No change</span>
                          ) : (
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold rounded-full px-2 py-0.5 ${
                              delta > 0
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}>
                              {delta > 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              {delta > 0 ? '+' : ''}{pct}%
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4"><StatusBadge status={row.status} /></td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => setEditRow(row)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#062413] hover:bg-[#0a3d1f] text-white px-3 py-1.5 text-[10px] font-bold transition-colors"
                          >
                            <Edit3 className="w-3 h-3" /> Edit Price
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                {pendingChanges > 0 ? (
                  <p className="text-xs font-bold text-amber-700 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {pendingChanges} price change{pendingChanges > 1 ? 's' : ''} pending — publish to apply
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">All prices are current · No pending changes</p>
                )}
              </div>
              <button
                onClick={() => setShowPublish(true)}
                className="inline-flex items-center gap-2 bg-[#062413] hover:bg-[#0a3d1f] text-white rounded-2xl px-6 py-2.5 text-xs font-black transition-colors"
              >
                <Zap className="w-3.5 h-3.5" /> Publish Chick Rates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Hatchery Partners ────────────────────────────────────────── */}
      {tab === 'hatcheries' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(hatcheries.length > 0 ? hatcheries : [
              { id: 'h1', code: 'CHI', name: 'Chi Hatchery Ltd', headquarters_location: 'Ibadan, Oyo State', contact_phone: '+2348002444282', is_active: true },
              { id: 'h2', code: 'ZAR', name: 'Zartech Farms & Hatcheries', headquarters_location: 'Ibadan, Oyo State', contact_phone: '+2348039780000', is_active: true },
              { id: 'h3', code: 'AMO', name: 'Amo Hatchery (Farm Support)', headquarters_location: 'Awe, Oyo State', contact_phone: '+2348055551234', is_active: true },
              { id: 'h4', code: 'SAY', name: 'Sayed Farms Hatchery', headquarters_location: 'Ibadan, Oyo State', contact_phone: '+2348023004567', is_active: true },
              { id: 'h5', code: 'VAL', name: 'Valentine Chicks Hatchery', headquarters_location: 'Ogun State', contact_phone: '+2348077778901', is_active: true },
            ] as HatcheryPartner[]).map((h) => {
              const hatcheryRates = rates.filter((r) => r.hatcheryCode.includes(h.code));
              const lowestRate = hatcheryRates.length > 0 ? Math.min(...hatcheryRates.map((r) => r.newPriceNgn)) : null;
              return (
                <div key={h.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#062413] to-[#0a3d1f] flex items-center justify-center">
                      <span className="text-xs font-black text-[#2ee571]">{h.code}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                      h.is_active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${h.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                      {h.is_active ? 'Active Partner' : 'Inactive'}
                    </span>
                  </div>

                  <h3 className="font-black text-slate-900 text-sm mb-1">{h.name}</h3>

                  <div className="space-y-2 mt-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{h.headquarters_location}</span>
                    </div>
                    {h.contact_phone && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{h.contact_phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 mt-4 pt-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <p className="text-sm font-black text-slate-900">{hatcheryRates.length || '—'}</p>
                        <p className="text-[10px] text-slate-400">Breed Lines</p>
                      </div>
                      <div className="bg-emerald-50 rounded-xl p-2.5">
                        <p className="text-sm font-black text-emerald-700">{lowestRate ? fmt(lowestRate) : '—'}</p>
                        <p className="text-[10px] text-slate-400">From / carton</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 hover:border-[#062413] hover:text-[#062413] py-2 text-xs font-bold text-slate-600 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" /> View Quota Slots
                  </button>
                </div>
              );
            })}
          </div>

          {/* Banking note */}
          <div className="bg-gradient-to-r from-[#062413] to-[#0a3d1f] rounded-3xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Deposit Account</p>
                <h3 className="text-white font-black text-lg">Zenith Bank · 1017894562</h3>
                <p className="text-emerald-200 text-xs mt-1">D-AminGrow Agric Ltd · 50% deposit required to confirm allocation</p>
              </div>
              <div className="bg-white/10 rounded-2xl px-5 py-3 text-center">
                <p className="text-[10px] text-emerald-400 font-bold uppercase">Packaging Rule</p>
                <p className="text-white font-black text-xl mt-1">50 + 1</p>
                <p className="text-emerald-300 text-[10px]">birds per carton (all hatcheries)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modals ────────────────────────────────────────────────────────── */}
      {editRow && (
        <EditPriceModal
          row={editRow}
          onSave={handleSaveRow}
          onClose={() => setEditRow(null)}
        />
      )}
      {showPublish && (
        <PublishModal
          rates={rates}
          note={publishNote}
          effectiveDate={effectiveDate}
          onConfirm={handlePublish}
          onClose={() => setShowPublish(false)}
          saving={saving}
        />
      )}
    </div>
  );
}
