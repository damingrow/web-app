'use client';

import React, { useState, useCallback, useEffect } from 'react';
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
  DollarSign,
  ShieldCheck,
  Check,
  Percent,
} from 'lucide-react';
import type { DbHatchery, DbQuota } from '@/lib/supabase/data-access';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PriceRow {
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
    breed: 'Commercial Broilers',
    breedCode: 'BRL-COMM',
    hatcheryBrand: 'Chi / Amo / Zartech Certified Grade',
    hatcheryCode: 'CHI/AMO/ZAR',
    currentPriceNgn: 100000,
    newPriceNgn: 100000,
    dispatchDays: 'Mon & Thu',
    status: 'active',
    category: 'broiler',
    birdsPerCarton: 50,
    depositPct: 50,
  },
  {
    id: 'tky-hybrid',
    breed: 'Hybrid Turkey',
    breedCode: 'TKY-HYB',
    hatcheryBrand: 'Amo / Zartech Hybrid Line',
    hatcheryCode: 'AMO/ZAR',
    currentPriceNgn: 165000,
    newPriceNgn: 165000,
    dispatchDays: 'Mon & Thu',
    status: 'active',
    category: 'turkey',
    birdsPerCarton: 30,
    depositPct: 50,
  },
  {
    id: 'lay-zarblack',
    breed: 'Zartech Pullet',
    breedCode: 'ZAR-PLT',
    hatcheryBrand: 'Zartech Farms — Certified Pullets',
    hatcheryCode: 'ZAR',
    currentPriceNgn: 135000,
    newPriceNgn: 135000,
    dispatchDays: 'Mon & Thu',
    status: 'active',
    category: 'layer',
    birdsPerCarton: 50,
    depositPct: 50,
  },
  {
    id: 'ckr-heavy',
    breed: 'Cockerel',
    breedCode: 'CKR-STD',
    hatcheryBrand: 'Certified Cockerel Brooder Grade',
    hatcheryCode: 'AMO/CHI',
    currentPriceNgn: 5000,
    newPriceNgn: 5000,
    dispatchDays: 'Mon & Thu',
    status: 'active',
    category: 'cockerel',
    birdsPerCarton: 50,
    depositPct: 50,
  },
  {
    id: 'noi-kuroiler',
    breed: 'Noiler',
    breedCode: 'NOI-STD',
    hatcheryBrand: 'Dual-Yield Heavy Line',
    hatcheryCode: 'AMO/VAL',
    currentPriceNgn: 37500,
    newPriceNgn: 37500,
    dispatchDays: 'Mon & Thu',
    status: 'active',
    category: 'noiler',
    birdsPerCarton: 50,
    depositPct: 50,
  },
  {
    id: 'tky-local',
    breed: 'Local Turkey',
    breedCode: 'TKY-LOC',
    hatcheryBrand: 'Indigenous Improved Turkey Line',
    hatcheryCode: 'VAL',
    currentPriceNgn: 69000,
    newPriceNgn: 69000,
    dispatchDays: 'Mon & Thu',
    status: 'active',
    category: 'turkey',
    birdsPerCarton: 30,
    depositPct: 50,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG');
}

function getNextDispatch(day: 'Monday' | 'Thursday') {
  const today = new Date();
  const target = day === 'Monday' ? 1 : 4;
  const diff = (target - today.getDay() + 7) % 7 || 7;
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  return d.toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' });
}

function daysUntil(day: 'Monday' | 'Thursday') {
  const today = new Date();
  const target = day === 'Monday' ? 1 : 4;
  const diff = (target - today.getDay() + 7) % 7 || 7;
  return diff;
}

function fillRate(q: DbQuota) {
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
    active: 'Active Allocation',
    limited_allocation: 'Limited Allocation',
    sold_out: 'Sold Out',
  };
  const dots: Record<PriceRow['status'], string> = {
    active: 'bg-emerald-500 animate-pulse',
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

function QuotaStatusBadge({ status }: { status: DbQuota['status'] }) {
  const map: Record<DbQuota['status'], string> = {
    open: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    limited: 'bg-amber-50 text-amber-700 border-amber-200',
    closed: 'bg-red-50 text-red-600 border-red-200',
    dispatched: 'bg-slate-50 text-slate-500 border-slate-200',
  };
  const dots: Record<DbQuota['status'], string> = {
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
  const cfg: Record<PriceRow['category'], { bg: string; label: string }> = {
    broiler: { bg: 'bg-emerald-100 text-emerald-800', label: 'Broiler' },
    layer: { bg: 'bg-purple-100 text-purple-800', label: 'Layer' },
    cockerel: { bg: 'bg-orange-100 text-orange-800', label: 'Cockerel' },
    noiler: { bg: 'bg-teal-100 text-teal-800', label: 'Noiler' },
    turkey: { bg: 'bg-pink-100 text-pink-800', label: 'Turkey' },
  };
  const c = cfg[cat] ?? { bg: 'bg-emerald-100 text-emerald-800', label: 'Broiler' };
  return (
    <span className={`inline-flex rounded-lg px-2.5 py-0.5 text-[10px] font-extrabold ${c.bg}`}>
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
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal header */}
        <div className="bg-gradient-to-r from-[#062413] via-[#093d1f] to-[#041a0d] px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-extrabold text-[#2ee571] uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ee571] animate-pulse" />
                Price Configuration Desk
              </p>
              <h3 className="text-white font-black text-xl leading-tight font-heading">{row.breed}</h3>
              <p className="text-emerald-200 text-xs mt-0.5">{row.breedCode} · {row.hatcheryBrand}</p>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Current vs New */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider mb-1">Current Price</p>
              <p className="text-xl font-black text-slate-700">{fmt(row.currentPriceNgn)}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">per carton ({row.birdsPerCarton} birds)</p>
            </div>
            <div className="bg-emerald-50/80 rounded-2xl p-3.5 border border-emerald-200">
              <p className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider mb-1">Proposed Price</p>
              <p className="text-xl font-black text-emerald-900">{fmt(price)}</p>
              <p className="text-[10px] font-extrabold text-emerald-700 mt-0.5">
                {delta !== 0 ? (delta > 0 ? `▲ +${pct}%` : `▼ ${pct}%`) : '— No variance'}
              </p>
            </div>
          </div>

          {/* Quick Adjustment Buttons */}
          <div>
            <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-2">Quick Adjustment</label>
            <div className="grid grid-cols-4 gap-2">
              {[-1000, -500, 500, 1000].map((adj) => (
                <button
                  key={adj}
                  type="button"
                  onClick={() => setPrice((p) => Math.max(5000, p + adj))}
                  className="rounded-xl border border-slate-200 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  {adj > 0 ? `+₦${adj}` : `-₦${Math.abs(adj)}`}
                </button>
              ))}
            </div>
          </div>

          {/* Price Slider + Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-extrabold text-slate-700">Exact Price Per Carton (₦)</label>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                ₦{Math.round(price / (row.birdsPerCarton || 50)).toLocaleString()} per bird
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">₦</span>
              <input
                type="number"
                min={1000}
                step={500}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 text-base font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
            <input
              type="range"
              min={1000}
              max={250000}
              step={500}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full mt-3 accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
              <span>₦1,000 (Min)</span>
              <span>₦100,000</span>
              <span>₦250,000 (Max)</span>
            </div>
          </div>

          {/* Computed deposit breakdown */}
          <div className="bg-emerald-50/50 rounded-2xl p-3.5 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Percent className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950">Required Booking Deposit ({row.depositPct}%)</p>
                <p className="text-[10px] text-emerald-700 font-medium">Zenith Bank 1017894562</p>
              </div>
            </div>
            <p className="text-base font-black text-emerald-900">{fmt(deposit)}</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-2">Inventory Allocation State</label>
            <div className="grid grid-cols-3 gap-2">
              {(['active', 'limited_allocation', 'sold_out'] as PriceRow['status'][]).map((s) => {
                const labels = { active: 'Active', limited_allocation: 'Limited', sold_out: 'Sold Out' };
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`rounded-xl py-2 px-2 text-[11px] font-bold border transition-all ${
                      status === s
                        ? 'bg-[#062413] text-white border-[#062413] shadow-sm'
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
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => { onSave(row.id, price, status); onClose(); }}
              className="flex-1 rounded-2xl bg-[#062413] py-3 text-xs font-black text-white hover:bg-[#0a3d1f] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#062413]/10"
            >
              <Save className="w-3.5 h-3.5" /> Apply Rate
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
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#062413] via-[#093d1f] to-[#041a0d] px-6 py-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-extrabold text-[#2ee571] uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Executive Price Synchronizer
              </p>
              <h3 className="text-white font-black text-xl font-heading">Publish Updated Chick Rates?</h3>
              <p className="text-emerald-200 text-xs mt-1">Effective: {effectiveDate} · {changed.length} price change{changed.length !== 1 ? 's' : ''} detected</p>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 font-medium leading-relaxed">
              Publishing will update customer pricing on the storefront, reflect on active booking agents&apos; calculators, and log an immutable entry into the enterprise audit trail.
            </p>
          </div>

          {changed.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-black text-slate-800 uppercase tracking-wider">Modified Rates ({changed.length})</p>
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {changed.map((r) => {
                  const delta = r.newPriceNgn - r.currentPriceNgn;
                  return (
                    <div key={r.id} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5">
                      <div>
                        <p className="text-xs font-black text-slate-900">{r.breed}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{r.breedCode} · {r.hatcheryCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 line-through">{fmt(r.currentPriceNgn)}</p>
                        <p className={`text-xs font-black ${delta > 0 ? 'text-amber-600' : 'text-emerald-700'}`}>
                          {delta > 0 ? '▲ +' : '▼ '}{fmt(r.newPriceNgn)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-3.5 text-center text-xs text-slate-600">
              No prices were modified from previous values. This will refresh and re-confirm the current price board.
            </div>
          )}

          {note && (
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Audit Documentation</p>
              <p className="text-xs text-slate-800 mt-1 font-medium">{note}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={saving}
              className="flex-1 rounded-2xl bg-[#062413] py-3 text-xs font-black text-white hover:bg-[#0a3d1f] disabled:opacity-60 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#062413]/10"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Synchronizing…
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" /> Confirm & Synchronize
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────

type TabId = 'live-board' | 'quota-health' | 'update-pricing' | 'hatcheries';

export default function ChicksPricingClient({
  initialHatcheries,
  initialQuotas,
}: {
  initialHatcheries: DbHatchery[];
  initialQuotas: DbQuota[];
}) {
  const [tab, setTab] = useState<TabId>('live-board');
  const [rates, setRates] = useState<PriceRow[]>(SEED_PRICES);
  const [quotas, setQuotas] = useState<DbQuota[]>(initialQuotas);
  const [hatcheries, setHatcheries] = useState<DbHatchery[]>(initialHatcheries);
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<Date>(new Date());

  const [editRow, setEditRow] = useState<PriceRow | null>(null);
  const [showPublish, setShowPublish] = useState(false);
  const [publishNote, setPublishNote] = useState('');
  const [effectiveDate, setEffectiveDate] = useState(() => new Date().toISOString().split('T')[0] ?? '');
  const [saving, setSaving] = useState(false);
  const [publishedOk, setPublishedOk] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dispatchFilter, setDispatchFilter] = useState<string>('all');

  // ── Sync with API ──
  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/chicks-pricing');
      if (res.ok) {
        const data = await res.json();
        if (data?.hatcheries?.length) setHatcheries(data.hatcheries);
        if (data?.quotas?.length) setQuotas(data.quotas);
        if (data?.savedRates && Array.isArray(data.savedRates) && data.savedRates.length > 0) {
          setRates(data.savedRates);
        }
      }
    } catch {
      // Keep state
    }
    setLoading(false);
    setLastSync(new Date());
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // ── Derived KPIs ──
  const activePrices = rates.filter((r) => r.status === 'active');
  const avgPrice = activePrices.length > 0
    ? Math.round(activePrices.reduce((s, r) => s + r.newPriceNgn, 0) / activePrices.length)
    : 0;
  const totalOpenCartons = quotas.reduce((s, q) => s + (q.available_cartons ?? 0), 0);
  const monDays = daysUntil('Monday');
  const thuDays = daysUntil('Thursday');
  const nextDispatchDays = Math.min(monDays, thuDays);
  const activeHatcheryCount = hatcheries.filter((h) => h.is_active).length || hatcheries.length || 5;

  // ── Edit & Publish ──
  const handleSaveRow = (id: string, newPrice: number, status: PriceRow['status']) => {
    setRates((prev) => prev.map((r) => r.id === id ? { ...r, newPriceNgn: newPrice, status } : r));
  };

  const handlePublish = async () => {
    setSaving(true);
    try {
      const payloadRates = rates.map((r) => ({
        id: r.id,
        breed: r.breed,
        hatcheryBrand: r.hatcheryBrand,
        priceNgn: r.newPriceNgn,
        status: r.status,
        birdsPerCarton: r.birdsPerCarton,
        category: r.category,
        breedCode: r.breedCode,
        dispatchDays: r.dispatchDays,
      }));

      const res = await fetch('/api/admin/chicks-pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          effectiveDate,
          note: publishNote || 'Routine weekly price sync',
          rates: payloadRates,
        }),
      });

      // Commit new rates to current in client state
      setRates((prev) => prev.map((r) => ({ ...r, currentPriceNgn: r.newPriceNgn })));

      // Broadcast immediately to localStorage for instant same-browser cross-tab updates without delay
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('damingrow_chick_rates', JSON.stringify(payloadRates));
          localStorage.setItem('damingrow_chick_rates_timestamp', new Date().toISOString());
          window.dispatchEvent(new Event('damingrow_chick_rates_updated'));
        } catch {
          // ignore
        }
      }

      if (res.ok) {
        setPublishedOk(true);
        setTimeout(() => setPublishedOk(false), 5000);
      }
    } catch {
      // Non-blocking fallback
    }
    setSaving(false);
    setShowPublish(false);
  };

  // ── Filtered rates ──
  const filteredRates = rates.filter((r) => {
    if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
    if (dispatchFilter === 'monday' && !r.dispatchDays.toLowerCase().includes('mon')) return false;
    if (dispatchFilter === 'thursday' && !r.dispatchDays.toLowerCase().includes('thu')) return false;
    return true;
  });

  const pendingChanges = rates.filter((r) => r.newPriceNgn !== r.currentPriceNgn).length;

  return (
    <div className="space-y-6 pb-12">

      {/* ── Executive Hero Banner ────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#062413] via-[#093d1f] to-[#041a0d] p-7 shadow-2xl border border-emerald-950/40">
        <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-60 h-60 rounded-full bg-green-400/5 blur-2xl" />
        <svg className="pointer-events-none absolute right-0 bottom-0 opacity-10" width="340" height="130" viewBox="0 0 340 130">
          <path d="M0 90 Q85 30 170 70 Q255 110 340 40" stroke="#2ee571" strokeWidth="2.5" fill="none" />
          <path d="M0 110 Q85 50 170 90 Q255 130 340 60" stroke="#2ee571" strokeWidth="1.5" fill="none" />
        </svg>

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-[#2ee571] animate-pulse" />
              <span className="text-[10px] font-extrabold text-[#2ee571] uppercase tracking-widest">Real-Time Pricing Sync</span>
              <span className="text-[10px] text-emerald-300">· 50+1 Standard Rules</span>
            </div>
            <h1 className="text-3xl font-black text-white font-heading tracking-tight">
              Weekly Chicks Pricing & Quota Command
            </h1>
            <p className="text-emerald-200/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Synchronize commercial day-old chick rates across verified partner suppliers (CHI, ZAR, AMO, SAY, VAL). 
              Strict bi-weekly dispatch rhythm: <span className="text-[#2ee571] font-bold">Monday & Thursday only.</span>
            </p>

            {/* Meta capsules */}
            <div className="flex flex-wrap gap-2 pt-1.5">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-bold text-white/90 border border-white/10">
                <Calendar className="w-3 h-3 text-[#2ee571]" /> Next Mon: {getNextDispatch('Monday')} ({monDays}d)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-bold text-white/90 border border-white/10">
                <Calendar className="w-3 h-3 text-[#2ee571]" /> Next Thu: {getNextDispatch('Thursday')} ({thuDays}d)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-bold text-white/90 border border-white/10">
                <Clock className="w-3 h-3 text-emerald-300" /> Synced: {lastSync.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {publishedOk && (
              <div className="inline-flex items-center gap-2 bg-emerald-500/25 border border-[#2ee571]/40 rounded-2xl px-4 py-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ee571]" />
                <span className="text-xs font-extrabold text-[#2ee571]">Rates Published!</span>
              </div>
            )}
            {pendingChanges > 0 && (
              <div className="inline-flex items-center gap-2 bg-amber-500/25 border border-amber-400/40 rounded-2xl px-4 py-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-extrabold text-amber-200">{pendingChanges} Pending Change{pendingChanges > 1 ? 's' : ''}</span>
              </div>
            )}
            <button
              type="button"
              onClick={refreshData}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-4 py-2.5 text-xs font-bold text-white transition-all backdrop-blur-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => setShowPublish(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#2ee571] hover:bg-emerald-400 rounded-2xl px-5 py-2.5 text-xs font-black text-[#062413] transition-all shadow-lg shadow-[#2ee571]/20 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              Publish Rates
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Average Price */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute right-0 bottom-0 opacity-5">
            <svg width="90" height="60" viewBox="0 0 90 60"><path d="M0 50 Q30 10 60 30 Q75 40 90 15" stroke="#062413" strokeWidth="3" fill="none" /></svg>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100/80 flex items-center justify-center text-emerald-800">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5 flex items-center gap-0.5 border border-emerald-100">
              <ChevronUp className="w-3 h-3" />+2.4%
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 font-heading">{fmt(avgPrice)}</p>
          <p className="text-xs text-slate-500 font-extrabold mt-0.5">Average Rate / Carton</p>
          <p className="text-[10px] text-slate-400 mt-1">Across {activePrices.length} active commercial strains</p>
        </div>

        {/* Available Cartons */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute right-0 bottom-0 opacity-5">
            <svg width="90" height="60" viewBox="0 0 90 60"><path d="M0 40 Q30 60 60 20 Q75 10 90 35" stroke="#062413" strokeWidth="3" fill="none" /></svg>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100/80 flex items-center justify-center text-blue-800">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 rounded-full px-2 py-0.5 border border-blue-100">
              Live Allocation
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 font-heading">
            {totalOpenCartons > 0 ? totalOpenCartons.toLocaleString() : '85'}
          </p>
          <p className="text-xs text-slate-500 font-extrabold mt-0.5">Open Cartons Available</p>
          <p className="text-[10px] text-slate-400 mt-1">
            Across {quotas.length} upcoming dispatch slot{quotas.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Hatchery Partners */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute right-0 bottom-0 opacity-5">
            <svg width="90" height="60" viewBox="0 0 90 60"><path d="M0 30 Q45 5 90 40" stroke="#062413" strokeWidth="3" fill="none" /></svg>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100/80 flex items-center justify-center text-purple-800">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 rounded-full px-2 py-0.5 border border-purple-100">
              Certified
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 font-heading">{activeHatcheryCount}</p>
          <p className="text-xs text-slate-500 font-extrabold mt-0.5">Active Primary Hatcheries</p>
          <p className="text-[10px] text-slate-400 mt-1">CHI · ZAR · AMO · SAY · VAL</p>
        </div>

        {/* Next Dispatch Window */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062413] to-[#0a3d1f] p-5 shadow-sm hover:shadow-md transition-shadow text-white border border-emerald-950/40">
          <div className="absolute right-0 bottom-0 opacity-10">
            <svg width="90" height="60" viewBox="0 0 90 60"><path d="M0 50 Q30 10 90 25" stroke="#2ee571" strokeWidth="3" fill="none" /></svg>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-[#2ee571]">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold text-[#2ee571] bg-emerald-500/20 rounded-full px-2 py-0.5 border border-emerald-400/20">
              In {nextDispatchDays} day{nextDispatchDays !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-2xl font-black text-white font-heading">
            {nextDispatchDays === monDays ? 'Monday Run' : 'Thursday Run'}
          </p>
          <p className="text-xs text-emerald-200/90 font-extrabold mt-0.5">Upcoming Loading Day</p>
          <p className="text-[10px] text-emerald-300/80 mt-1">
            {getNextDispatch(nextDispatchDays === monDays ? 'Monday' : 'Thursday')}
          </p>
        </div>
      </div>

      {/* ── Pill Tabs Navigation ───────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 bg-slate-100/80 rounded-2xl p-1.5 border border-slate-200/60">
        {([
          { id: 'live-board', label: 'Live Price Board', icon: BarChart3 },
          { id: 'quota-health', label: 'Quota Health & Allocations', icon: Activity },
          { id: 'update-pricing', label: 'Rate Synchronizer', icon: Edit3 },
          { id: 'hatcheries', label: 'Certified Hatcheries', icon: Star },
        ] as { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[]).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all ${
              tab === id
                ? 'bg-[#062413] text-white shadow-md shadow-[#062413]/10'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: Live Price Board ───────────────────────────────────────── */}
      {tab === 'live-board' && (
        <div className="rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
          {/* Header Controls */}
          <div className="bg-gradient-to-r from-[#fafcfb] to-white px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-black text-slate-900 font-heading">Active Day-Old Chick Price Matrix</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Standard 50+1 packaging · 50% booking deposit strictly via Zenith Bank 1017894562
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Genetics / Categories</option>
                <option value="broiler">Broilers (Commercial)</option>
                <option value="layer">Layers (Pullets)</option>
                <option value="turkey">Turkeys (Hybrid / Local)</option>
                <option value="cockerel">Cockerels</option>
                <option value="noiler">Noilers</option>
              </select>

              <select
                value={dispatchFilter}
                onChange={(e) => setDispatchFilter(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Dispatch Cycles</option>
                <option value="monday">Monday Loading Only</option>
                <option value="thursday">Thursday Loading Only</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafcfb] text-[10px] uppercase font-extrabold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Genetic Strain & Breed</th>
                  <th className="py-3.5 px-4">Genetics</th>
                  <th className="py-3.5 px-4">Bird Supplier</th>
                  <th className="py-3.5 px-4">Dispatch Schedule</th>
                  <th className="py-3.5 px-4">Current Rate / Carton</th>
                  <th className="py-3.5 px-4">Deposit (50%)</th>
                  <th className="py-3.5 px-4">Allocation Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRates.map((row) => {
                  const deposit = Math.round(row.newPriceNgn * (row.depositPct / 100));
                  const delta = row.newPriceNgn - row.currentPriceNgn;
                  return (
                    <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-extrabold text-slate-900 text-sm">{row.breed}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{row.breedCode} · {row.birdsPerCarton} birds/carton</p>
                      </td>
                      <td className="py-4 px-4">
                        <CategoryPill cat={row.category} />
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-black text-slate-800 text-xs">{row.hatcheryCode}</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{row.hatcheryBrand}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="inline-flex items-center gap-1.5 text-slate-700 font-bold bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{row.dispatchDays}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-black text-slate-900 text-base font-heading">{fmt(row.newPriceNgn)}</p>
                        {delta !== 0 ? (
                          <p className={`text-[10px] font-bold flex items-center gap-0.5 ${delta > 0 ? 'text-amber-600' : 'text-emerald-700'}`}>
                            {delta > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {delta > 0 ? '+' : ''}{fmt(Math.abs(delta))} adjusted
                          </p>
                        ) : (
                          <p className="text-[10px] text-slate-400 font-medium">Standard baseline</p>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-black text-emerald-800 text-sm">{fmt(deposit)}</p>
                        <p className="text-[10px] text-slate-400">{row.depositPct}% deposit</p>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => setEditRow(row)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#062413] hover:bg-[#0a3d1f] text-white px-3.5 py-1.5 text-xs font-black transition-all shadow-sm"
                        >
                          <Edit3 className="w-3 h-3" /> Adjust
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>Deposit Verification Gate:</strong> Zenith Bank 1017894562 (D-AminGrow Agric Ltd). No dispatch is authorized without 50% deposit confirmation.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-slate-500 font-bold">
                Live Data Synchronized · {lastSync.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: Quota Health ───────────────────────────────────────────── */}
      {tab === 'quota-health' && (
        <div className="space-y-5">
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-5 flex items-start gap-3">
            <Activity className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                Dispatch & Carton Capacity Health
              </p>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                Cartons reserved, confirmed with 50% deposits, and remaining open allocations across weekly Monday & Thursday runs. 
                Any quota slot with less than 25% remaining capacity is highlighted for emergency allocation requests.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {quotas.map((q) => {
              const fill = fillRate(q);
              const isCritical = q.available_cartons <= Math.max(5, Math.round(q.total_cartons_quota * 0.2));
              return (
                <div key={q.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-base font-heading">
                          {q.hatchery_name || q.hatchery_code}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {q.breed_type.toUpperCase()} · {q.dispatch_day} Dispatch
                      </p>
                    </div>
                    <QuotaStatusBadge status={q.status} />
                  </div>

                  {/* Date badge */}
                  <div className="mb-4 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Loading Date</span>
                    <span className="text-xs font-black text-slate-800">
                      {new Date(q.dispatch_date).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                      <p className="text-base font-black text-slate-900 font-heading">{q.total_cartons_quota}</p>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Total</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-2.5 text-center">
                      <p className="text-base font-black text-emerald-800 font-heading">{q.available_cartons}</p>
                      <p className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider">Open</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-2.5 text-center">
                      <p className="text-base font-black text-blue-800 font-heading">{q.confirmed_cartons}</p>
                      <p className="text-[10px] text-blue-700 font-extrabold uppercase tracking-wider">Booked</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Slot Fill Rate</span>
                      <span className="font-black text-slate-800">{fill}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          fill >= 80 ? 'bg-emerald-600' : fill >= 50 ? 'bg-amber-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${fill}%` }}
                      />
                    </div>
                  </div>

                  {/* Bottom Rate & Status */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Rate / Carton</p>
                      <p className="text-base font-black text-slate-900 font-heading">{fmt(q.estimated_price_per_carton)}</p>
                    </div>
                    {isCritical ? (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-1 text-[10px] font-extrabold">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> Low Capacity
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1 text-[10px] font-extrabold">
                        <Check className="w-3 h-3 text-emerald-600" /> Healthy Quota
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 3: Rate Synchronizer ──────────────────────────────────────── */}
      {tab === 'update-pricing' && (
        <div className="space-y-5">
          {/* Header Configuration */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-base font-black text-slate-900 font-heading mb-1">Weekly Price Adjustment Setup</h2>
            <p className="text-xs text-slate-500 mb-5">
              Set effective dispatch dates and an audit reason before executing bulk rate synchronization.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Effective Date</label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
              <div className="sm:col-span-1 lg:col-span-2">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Internal Audit Note</label>
                <input
                  type="text"
                  value={publishNote}
                  onChange={(e) => setPublishNote(e.target.value)}
                  placeholder="e.g. Amo & Zartech weekly cost review — feed grain adjustment (+2.5%)"
                  className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-[#fafcfb] px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 font-heading">Strains Pending Synchronization</h3>
                <p className="text-[11px] text-slate-500">Click &apos;Adjust&apos; to change individual breed prices</p>
              </div>
              {pendingChanges > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-xs font-extrabold">
                  <AlertTriangle className="w-3.5 h-3.5" /> {pendingChanges} Unsaved Modification{pendingChanges !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fafcfb] text-[10px] uppercase font-extrabold text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-6">Breed Strain</th>
                    <th className="py-3.5 px-4">Code</th>
                    <th className="py-3.5 px-4">Current Rate</th>
                    <th className="py-3.5 px-4">Proposed Rate</th>
                    <th className="py-3.5 px-4">Variance</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rates.map((row) => {
                    const delta = row.newPriceNgn - row.currentPriceNgn;
                    const pct = row.currentPriceNgn > 0 ? ((delta / row.currentPriceNgn) * 100).toFixed(1) : '0';
                    return (
                      <tr key={row.id} className={`hover:bg-slate-50/70 transition-colors ${delta !== 0 ? 'bg-amber-50/20' : ''}`}>
                        <td className="py-4 px-6">
                          <p className="font-extrabold text-slate-900 text-sm">{row.breed}</p>
                          <p className="text-[10px] text-slate-400">{row.hatcheryBrand}</p>
                        </td>
                        <td className="py-4 px-4 font-mono text-slate-500 text-[11px] font-bold">{row.breedCode}</td>
                        <td className="py-4 px-4 font-bold text-slate-600">{fmt(row.currentPriceNgn)}</td>
                        <td className="py-4 px-4 font-black text-slate-900 text-sm">{fmt(row.newPriceNgn)}</td>
                        <td className="py-4 px-4">
                          {delta === 0 ? (
                            <span className="text-[10px] text-slate-400 font-bold">— No change</span>
                          ) : (
                            <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold rounded-full px-2 py-0.5 ${
                              delta > 0
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {delta > 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              {delta > 0 ? '+' : ''}{pct}%
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4"><StatusBadge status={row.status} /></td>
                        <td className="py-4 px-6 text-right">
                          <button
                            type="button"
                            onClick={() => setEditRow(row)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#062413] hover:bg-[#0a3d1f] text-white px-3.5 py-1.5 text-xs font-black transition-all shadow-sm"
                          >
                            <Edit3 className="w-3 h-3" /> Adjust
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                {pendingChanges > 0 ? (
                  <p className="text-xs font-extrabold text-amber-700 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {pendingChanges} rate modification{pendingChanges !== 1 ? 's' : ''} ready to synchronize
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 font-medium">All breed rates are synchronized with active baseline</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowPublish(true)}
                className="inline-flex items-center gap-2 bg-[#062413] hover:bg-[#0a3d1f] text-white rounded-2xl px-6 py-3 text-xs font-black transition-all shadow-lg shadow-[#062413]/10"
              >
                <Zap className="w-3.5 h-3.5 text-[#2ee571]" /> Publish & Synchronize Rates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: Certified Hatcheries ────────────────────────────────────── */}
      {tab === 'hatcheries' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hatcheries.map((h) => {
              const hatcheryRates = rates.filter((r) => r.hatcheryCode.includes(h.code));
              const lowestRate = hatcheryRates.length > 0 ? Math.min(...hatcheryRates.map((r) => r.newPriceNgn)) : null;
              return (
                <div key={h.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#062413] to-[#0a3d1f] flex items-center justify-center shadow-md shadow-[#062413]/10">
                      <span className="text-xs font-black text-[#2ee571]">{h.code}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                      h.is_active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${h.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                      {h.is_active ? 'Active Supplier' : 'Inactive'}
                    </span>
                  </div>

                  <h3 className="font-black text-slate-900 text-base font-heading mb-1">{h.name}</h3>

                  <div className="space-y-2 mt-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{h.headquarters_location}</span>
                    </div>
                    {h.contact_phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{h.contact_phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 mt-5 pt-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 rounded-2xl p-3">
                        <p className="text-base font-black text-slate-900 font-heading">{hatcheryRates.length || 1}</p>
                        <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Genetic Lines</p>
                      </div>
                      <div className="bg-emerald-50 rounded-2xl p-3">
                        <p className="text-base font-black text-emerald-800 font-heading">{lowestRate ? fmt(lowestRate) : '₦48,000'}</p>
                        <p className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider">Baseline / Carton</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTab('quota-health')}
                    className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:border-[#062413] hover:text-[#062413] py-2.5 text-xs font-bold text-slate-600 transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" /> View Quota Fill Rates
                  </button>
                </div>
              );
            })}
          </div>

          {/* Banking Note */}
          <div className="bg-gradient-to-r from-[#062413] via-[#093d1f] to-[#041a0d] rounded-3xl p-7 text-white border border-emerald-950/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-[10px] font-extrabold text-[#2ee571] uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Primary Commercial Bank Account
                </p>
                <h3 className="text-white font-black text-2xl font-heading">Zenith Bank · 1017894562</h3>
                <p className="text-emerald-200/80 text-xs mt-1">
                  Account Name: D-AminGrow Agric Ltd · 50% deposit required for locked booking allocation
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 text-center border border-white/10 shrink-0">
                <p className="text-[10px] text-[#2ee571] font-extrabold uppercase tracking-wider">Packaging Standard</p>
                <p className="text-white font-black text-2xl font-heading mt-1">50 + 1</p>
                <p className="text-emerald-200 text-[10px]">birds/carton guaranteed</p>
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
