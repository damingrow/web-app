import React from 'react';
import Link from 'next/link';
import { getDashboardMetrics } from '@/lib/supabase/data-access';
import {
  Inbox,
  TrendingUp,
  Package,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  CreditCard,
  Building2,
  MessageCircle,
} from 'lucide-react';

export const revalidate = 0; // Fresh live metrics on every admin visit

export default async function AdminDashboardPage() {
  const { pendingCount, totalCatalogCount, recentEnquiries } = await getDashboardMetrics();

  // Hatchery Quota Real-Time Status
  const HATCHERY_ALLOCATIONS = [
    { name: 'Chi Hatchery Ltd', breed: 'Broiler (Arbor Acres)', quota: 650, booked: 540, status: '83% Saturation', color: 'emerald' },
    { name: 'Amo Farm Sieberer', breed: 'Broiler & Noiler', quota: 500, booked: 410, status: '82% Saturation', color: 'teal' },
    { name: 'Zartech Farms', breed: 'Broiler (Ross 308)', quota: 400, booked: 320, status: '80% Saturation', color: 'blue' },
    { name: 'Supreme Poultry', breed: 'Commercial Pullets', quota: 300, booked: 210, status: '70% Saturation', color: 'purple' },
    { name: 'Agrited Hatchery', breed: 'Cobb 500 Broilers', quota: 250, booked: 185, status: '74% Saturation', color: 'amber' },
  ];

  // Logistics Hub Corridors
  const LOGISTICS_CORRIDORS = [
    { hub: 'Ibadan Central Hub (Iwo Road / Ojoo)', departures: 'Tues & Thurs 05:30 WAT', leadTime: 'Same Day', stateCount: 'Southwest (6 States)' },
    { hub: 'Lagos Gateway Hub (Berger / Ojota)', departures: 'Tues & Thurs 06:15 WAT', leadTime: 'Same Day', stateCount: 'Lagos & Ogun Coast' },
    { hub: 'Eastern Express Hub (Onitsha / Owerri)', departures: 'Tues & Thurs 12:00 WAT', leadTime: '18 Hours', stateCount: 'Southeast (5 States)' },
    { hub: 'North-Central Transit Hub (Abuja / Lokoja)', departures: 'Tues & Thurs 14:00 WAT', leadTime: '24 Hours', stateCount: 'FCT & Middle Belt' },
  ];

  return (
    <div className="space-y-8 font-body">
      {/* ====================================================================
          EXECUTIVE HERO COCKPIT BANNER
          ==================================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#06150D] to-slate-900 border border-emerald-500/20 p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300">
                <Sparkles className="h-3 w-3 text-emerald-400" />
                Enterprise Operations Cockpit · Module 01
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Zenith Bank Clearing Active (Acct 1017894562)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Commercial Poultry <br />
              <span className="text-gradient-green">Operations &amp; Fulfilment Desk</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Unified command center managing multi-hatchery chick quotas, deposit clearing, VCN clinical triaging, and nationwide motor park waybill manifests across Nigeria.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
            <Link
              href="/admin/chicks-pricing"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 text-xs font-bold transition-all shadow-lg shadow-emerald-600/20"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Sync Weekly Hatchery Rates</span>
            </Link>

            <Link
              href="/admin/bookings"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 px-5 py-3 text-xs font-bold backdrop-blur-md transition-all shadow"
            >
              <Calendar className="h-4 w-4 text-emerald-400" />
              <span>Dispatch Manifests &amp; Quotas</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ====================================================================
          FINANCIAL & OPERATIONAL KPI GLASS PANELS
          ==================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Pending Contacts */}
        <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-xl hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Actionable Enquiries
              </span>
              <div className="rounded-2xl bg-amber-50 border border-amber-200/60 p-2.5 text-amber-700">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                {pendingCount}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold mt-1">
                <span>{pendingCount > 0 ? 'Requires WhatsApp contact' : 'All leads contacted'}</span>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Target response: &lt;15 mins</span>
            <Link href="/admin/enquiries" className="font-bold text-amber-700 hover:underline flex items-center gap-1">
              <span>View queue</span> <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Next Hatchery Departure */}
        <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-xl hover:border-emerald-400/40 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Next Hatchery Runway
              </span>
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200/60 p-2.5 text-emerald-700">
                <Truck className="h-5 w-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-heading">
                Tuesday Run
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span>Booking window open (48h cutoff)</span>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Hub: Iwo Rd / Ojoo</span>
            <Link href="/admin/bookings" className="font-bold text-emerald-700 hover:underline flex items-center gap-1">
              <span>Allocations</span> <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Catalog & NAFDAC Integrity */}
        <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-xl hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Regulated Assets
              </span>
              <div className="rounded-2xl bg-cyan-50 border border-cyan-200/60 p-2.5 text-cyan-700">
                <Package className="h-5 w-5" />
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                {totalCatalogCount}
              </div>
              <div className="text-xs text-cyan-800 font-semibold mt-1">
                100% NAFDAC cleared catalog
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Cold-chain: 2°C–8°C safe</span>
            <Link href="/admin/products" className="font-bold text-cyan-800 hover:underline flex items-center gap-1">
              <span>Catalog desk</span> <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Zenith Escrow Gateway */}
        <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-xl hover:border-purple-400/40 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Zenith Bank Gateway
              </span>
              <div className="rounded-2xl bg-purple-50 border border-purple-200/60 p-2.5 text-purple-700">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                1017894562
              </div>
              <div className="text-xs text-purple-800 font-semibold mt-1">
                D-AminGrow Agro Allied Services
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">50% chick deposit rule</span>
            <span className="font-bold text-emerald-700">Online &amp; Active</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          TWO-COLUMN OPERATIONAL COCKPIT: HATCHERY QUOTAS & RECENT INGESTION
          ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Hatchery Quota Allocation Engine */}
        <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Building2 className="h-4 w-4" />
                <span>Hatchery Quota Allocation Matrix</span>
              </div>
              <h2 className="text-lg font-bold font-heading text-slate-900 mt-0.5">
                Weekly Broiler &amp; Pullet Allocations
              </h2>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Manage Quotas</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {HATCHERY_ALLOCATIONS.map((h) => {
              const pct = Math.round((h.booked / h.quota) * 100);
              return (
                <div key={h.name} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{h.name}</span>
                      <span className="text-[11px] text-slate-500 block">{h.breed}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 font-mono text-sm">
                        {h.booked} / {h.quota}
                      </span>
                      <span className="text-[10px] text-slate-400 block">cartons committed</span>
                    </div>
                  </div>

                  {/* Progress Saturation Bar */}
                  <div className="space-y-1">
                    <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                      <span>{h.status}</span>
                      <span>{h.quota - h.booked} cartons remaining</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Nationwide Motor Park Logistics Hubs */}
        <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Truck className="h-4 w-4" />
                <span>Nationwide Motor Park Logistics Corridors</span>
              </div>
              <h2 className="text-lg font-bold font-heading text-slate-900 mt-0.5">
                Active Transit Waybills &amp; Hub Departures
              </h2>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              99.2% Live Survival Rate
            </span>
          </div>

          <div className="space-y-3.5">
            {LOGISTICS_CORRIDORS.map((c) => (
              <div key={c.hub} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{c.hub}</span>
                  <span className="font-mono text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded">
                    {c.leadTime}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Schedule: <strong className="text-slate-700">{c.departures}</strong></span>
                  <span>Coverage: <strong className="text-slate-700">{c.stateCount}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Logistics SOP Callout */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-xs text-emerald-950 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-900">Cold Chain &amp; Dead-On-Arrival (DOA) Policy</span>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                50+1 packaging guarantees 1 extra chick per carton for transit mortality. Drivers must photograph carton seals at destination motor parks before farmer pickup.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          LIVE INGESTION: RECENT INQUIRIES & WHATSAPP ORDERS TABLE
          ==================================================================== */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden space-y-0">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-0.5">
              <Inbox className="h-4 w-4" />
              <span>Real-Time Inquiries Stream</span>
            </div>
            <h2 className="text-lg font-bold font-heading text-slate-900">
              Recent Customer Bookings &amp; Quotation Requests
            </h2>
            <p className="text-xs text-slate-500">
              Live farmer leads ingested through web booking engine and routed to the central WhatsApp desk.
            </p>
          </div>

          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all"
          >
            <span>Open Detailed Inbox</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {recentEnquiries.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
              <div className="font-semibold text-sm text-slate-800">
                Inquiry Queue is Fully Cleared
              </div>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                All customer inquiries have been addressed by the commercial desk. New submissions will stream here instantly.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5">Reference &amp; Date</th>
                  <th className="px-5 py-3.5">Farmer Name</th>
                  <th className="px-5 py-3.5">Phone (WhatsApp)</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Inquiry Type</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Quick Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="font-mono font-bold text-slate-900 text-xs">
                        {enquiry.enquiry_ref}
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
                      <div className="font-semibold text-slate-900 text-xs">
                        {enquiry.customer_name}
                      </div>
                      {enquiry.farm_name && (
                        <div className="text-[10px] text-slate-400">{enquiry.farm_name}</div>
                      )}
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap font-mono text-slate-700">
                      {enquiry.customer_phone}
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="font-medium text-slate-800">
                        {enquiry.delivery_state || 'Nigeria'}
                      </span>
                      {enquiry.delivery_city && (
                        <span className="text-slate-400 text-[10px] block">
                          {enquiry.delivery_city}
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 capitalize">
                        {enquiry.enquiry_type?.replace(/_/g, ' ') || 'General'}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          enquiry.status === 'pending'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : enquiry.status === 'quoted'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : enquiry.status === 'fulfilled'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {enquiry.status === 'pending' && <Clock className="h-3 w-3" />}
                        {enquiry.status === 'fulfilled' && <CheckCircle className="h-3 w-3" />}
                        {enquiry.status.replace(/_/g, ' ')}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <a
                        href={`https://wa.me/${enquiry.customer_phone.replace(/\+/g, '').replace(/\s+/g, '')}?text=Hello%20${encodeURIComponent(
                          enquiry.customer_name
                        )},%20this%20is%20D-AminGrow%20Commercial%20Desk%20regarding%20your%20inquiry%20${enquiry.enquiry_ref}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-bold transition-all shadow-2xs"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
