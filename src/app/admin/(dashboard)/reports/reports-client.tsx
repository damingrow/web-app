'use client';

import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  CreditCard,
  Package,
  Calendar,
  Download,
  Building2,
  PieChart,
  BarChart3,
  Search,
} from 'lucide-react';
import { DbBooking, DbEnquiry, DbQuota } from '@/lib/supabase/data-access';

interface ReportsClientProps {
  bookings: DbBooking[];
  enquiries: DbEnquiry[];
  metrics: {
    pendingEnquiries: number;
    totalEnquiries: number;
    totalCatalogCount: number;
    activeHatcheries: number;
    totalOpenQuota: number;
    totalBookings: number;
  };
  quotas: DbQuota[];
}

export default function ReportsClient({
  bookings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enquiries,
  metrics,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  quotas,
}: ReportsClientProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('all');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedState, setSelectedState] = useState<string>('all');

  // Filter bookings based on state filter
  const filteredBookings = useMemo(() => {
    if (selectedState === 'all') return bookings;
    return bookings.filter(b => b.delivery_state.toLowerCase().includes(selectedState.toLowerCase()));
  }, [bookings, selectedState]);

  // Financial aggregates
  const financialSummary = useMemo(() => {
    let pipelineTotal = 0;
    let verifiedDeposits = 0;
    let totalCartons = 0;
    let totalBirds = 0;

    filteredBookings.forEach((b) => {
      pipelineTotal += b.estimated_total_ngn || 0;
      verifiedDeposits += b.verified_deposit_ngn || 0;
      totalCartons += b.cartons_count || 0;
      totalBirds += b.total_birds_count || (b.cartons_count * (b.birds_per_carton || 51));
    });

    const depositCollectionRate = pipelineTotal > 0 ? (verifiedDeposits / (pipelineTotal * 0.5)) * 100 : 0;

    return {
      pipelineTotal,
      verifiedDeposits,
      totalCartons,
      totalBirds,
      depositCollectionRate: Math.min(Math.round(depositCollectionRate), 100),
    };
  }, [filteredBookings]);

  // Breed breakdown
  const breedStats = useMemo(() => {
    const map: Record<string, { count: number; cartons: number; revenue: number }> = {};
    filteredBookings.forEach((b) => {
      const breed = b.breed_type || 'Broiler (Cobb 500 / Ross 308)';
      if (!map[breed]) {
        map[breed] = { count: 0, cartons: 0, revenue: 0 };
      }
      map[breed].count += 1;
      map[breed].cartons += b.cartons_count || 0;
      map[breed].revenue += b.estimated_total_ngn || 0;
    });
    return Object.entries(map).sort((a, b) => b[1].cartons - a[1].cartons);
  }, [filteredBookings]);

  // Hatchery distribution
  const hatcheryDistribution = [
    { name: 'CHI Farms', code: 'CHI', share: 34, location: 'Ajanla, Ibadan', leadTime: '48h' },
    { name: 'AMO Farm Sieberer', code: 'AMO', share: 28, location: 'Awe, Oyo State', leadTime: '48h' },
    { name: 'Zartech Farms', code: 'ZAR', share: 18, location: 'Oluyole, Ibadan', leadTime: '72h' },
    { name: 'Supreme Poultry', code: 'SUP', share: 12, location: 'Ibadan Depot', leadTime: '48h' },
    { name: 'AGRITED', code: 'AGR', share: 8, location: 'Ajebo / Lagos Hub', leadTime: '72h' },
  ];

  // State distribution
  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    bookings.forEach((b) => {
      const state = b.delivery_state || 'Oyo';
      counts[state] = (counts[state] || 0) + (b.cartons_count || 1);
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [bookings]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Booking Ref',
      'Customer Name',
      'Phone',
      'Farm Name',
      'Breed',
      'Hatchery',
      'Cartons',
      'Total Birds',
      'Total NGN',
      'Deposit NGN',
      'Deposit Status',
      'State',
      'Destination Hub',
    ];

    const rows = filteredBookings.map((b) => [
      b.booking_ref,
      `"${b.customer_name}"`,
      b.customer_phone,
      `"${b.farm_name || 'N/A'}"`,
      `"${b.breed_type}"`,
      `"${b.hatchery_name || 'Designated Hatchery'}"`,
      b.cartons_count,
      b.total_birds_count,
      b.estimated_total_ngn,
      b.verified_deposit_ngn,
      b.deposit_status,
      `"${b.delivery_state}"`,
      `"${b.destination_hub}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `D-AminGrow-Commercial-Report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
              MODULE 10
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              COMMERCIAL PERFORMANCE & AUDIT
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 font-heading">
            Reports & Operational Analytics
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Financial reconciliation, bird reservation volume, partner hatchery throughput, and regional demand dynamics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time range selector */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
            {(['7d', '30d', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  timeRange === range
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'All Time'}
              </button>
            ))}
          </div>

          {/* Export CSV button */}
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Pipeline */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Gross Pipeline
            </span>
            <span className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900 font-heading">
              ₦{financialSummary.pipelineTotal.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>Bookings & Quote Requests</span>
            <span className="font-semibold text-emerald-600">Active</span>
          </div>
        </div>

        {/* Verified Deposits */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Deposits Verified
            </span>
            <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <CreditCard className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-blue-900 font-heading">
              ₦{financialSummary.verifiedDeposits.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>Zenith Bank 1017894562</span>
            <span className="font-semibold text-blue-600">{financialSummary.depositCollectionRate}% target</span>
          </div>
        </div>

        {/* Total Birds Booked */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Birds Allocated
            </span>
            <span className="rounded-lg bg-amber-50 p-2 text-amber-600">
              <Package className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900 font-heading">
              {financialSummary.totalBirds.toLocaleString()}{' '}
              <span className="text-sm font-normal text-slate-500">birds</span>
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>{financialSummary.totalCartons.toLocaleString()} total cartons</span>
            <span className="font-semibold text-amber-600">51 / 25 / 10 rules</span>
          </div>
        </div>

        {/* Quota Fill Rate */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Upcoming Open Quotas
            </span>
            <span className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <Calendar className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-purple-900 font-heading">
              {metrics.totalOpenQuota.toLocaleString()}{' '}
              <span className="text-sm font-normal text-slate-500">cartons</span>
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>Across {metrics.activeHatcheries} hatcheries</span>
            <span className="font-semibold text-purple-600">Tuesday / Thursday</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Breed Performance & Hatchery Share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Breed Demand Table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-emerald-600" />
                Breed Demand & Volume Breakdown
              </h2>
              <p className="text-xs text-slate-500">Aggregated from active reservations and farm enquiries</p>
            </div>
            <span className="rounded bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
              {breedStats.length} Breeds Active
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="px-3 py-2.5 rounded-l-lg">Breed Specification</th>
                  <th className="px-3 py-2.5 text-center">Cartons</th>
                  <th className="px-3 py-2.5 text-right">Est. Revenue</th>
                  <th className="px-3 py-2.5 rounded-r-lg text-right">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {breedStats.map(([breed, stats]) => {
                  const percent = financialSummary.totalCartons > 0
                    ? Math.round((stats.cartons / financialSummary.totalCartons) * 100)
                    : 0;
                  return (
                    <tr key={breed} className="hover:bg-slate-50/60">
                      <td className="px-3 py-3 font-semibold text-slate-900">
                        {breed}
                      </td>
                      <td className="px-3 py-3 text-center font-bold text-slate-800">
                        {stats.cartons.toLocaleString()}
                      </td>
                      <td className="px-3 py-3 text-right font-medium text-emerald-700">
                        ₦{stats.revenue.toLocaleString()}
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="inline-flex items-center space-x-1">
                          <span className="font-bold text-slate-800">{percent}%</span>
                          <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {breedStats.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-400">
                      No breed data recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hatchery Partner Distribution */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                Hatchery Partner Allocation Throughput
              </h2>
              <p className="text-xs text-slate-500">Distribution among accredited institutional hatcheries</p>
            </div>
            <span className="rounded bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[11px] font-bold">
              5 Tier-1 Partners
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {hatcheryDistribution.map((hatchery) => (
              <div key={hatchery.code} className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-6 w-6 rounded bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                      {hatchery.code}
                    </span>
                    <span className="font-bold text-slate-900 text-xs">{hatchery.name}</span>
                    <span className="text-[10px] text-slate-400">({hatchery.location})</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-slate-500 text-[11px]">Lead: {hatchery.leadTime}</span>
                    <span className="font-bold text-slate-900">{hatchery.share}%</span>
                  </div>
                </div>
                <div className="mt-2.5 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${hatchery.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional State Demand & Commercial Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Dispatch States */}
        <div className="lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="h-4 w-4 text-emerald-600" />
                State Demand
              </h2>
              <p className="text-xs text-slate-500">Destination Hub distribution</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {stateCounts.slice(0, 6).map(([state, count]) => {
              const total = financialSummary.totalCartons || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={state} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                  <span className="text-xs font-semibold text-slate-800">{state} State</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{count} ctn</span>
                    <span className="text-[10px] text-slate-400">({pct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Existing Commercial Client Farms */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Commercial Client Accounts & Farms</h2>
              <p className="text-xs text-slate-500">Key commercial poultry & livestock producers powered by D-AminGrow</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
              Verified Producers
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: 'Ajila Farm', category: 'Broiler Commercial', region: 'Oyo State' },
              { name: 'Owenaze Farm', category: 'Commercial Layers', region: 'Edo / Delta' },
              { name: 'Loveday Farm', category: 'Integrated Poultry', region: 'Rivers Hub' },
              { name: 'Dr Austin Farm', category: 'Clinical & Broiler', region: 'Ogun State' },
              { name: 'Grace Farm', category: 'Pullet / POL Depot', region: 'Lagos Hub' },
              { name: 'Anita Farm', category: 'Day-Old Broilers', region: 'Osun State' },
              { name: 'Vivian Farm', category: 'Broiler & Feed', region: 'Kwara State' },
              { name: 'Taghini Farm', category: 'Breeder / Commercial', region: 'Ibadan' },
            ].map((farm) => (
              <div key={farm.name} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <span className="text-xs font-bold text-slate-900 block">{farm.name}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{farm.category}</span>
                <span className="text-[9px] font-semibold text-emerald-700 uppercase mt-1 inline-block">
                  {farm.region}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO & Organic Farmer Acquisition Metrics */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Search className="h-4 w-4 text-emerald-600" />
              Non-Branded Organic Search Inflow & High-Intent Queries
            </h2>
            <p className="text-xs text-slate-500">
              Farmers discovering D-AminGrow through educational guides, calculators, and daily chick price updates.
            </p>
          </div>
          <span className="rounded bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
            SEO Infrastructure
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top Organic Landing Page</span>
            <span className="text-sm font-bold text-slate-900 block mt-1">/chicks (Live Booking Engine)</span>
            <span className="text-[11px] text-emerald-600 block mt-1">38.4% total organic entrance rate</span>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top Agricultural Tool</span>
            <span className="text-sm font-bold text-slate-900 block mt-1">/tools/feed-formulation</span>
            <span className="text-[11px] text-emerald-600 block mt-1">Pearson Square crude protein calculator</span>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top Educational Article</span>
            <span className="text-sm font-bold text-slate-900 block mt-1">/learn/broiler-brooding-guide</span>
            <span className="text-[11px] text-emerald-600 block mt-1">VCN clinical review stamp verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
