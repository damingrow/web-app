import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import {
  Inbox,
  TrendingUp,
  Package,
  Calendar,
  Clock,
  ArrowRight,
  Phone,
} from 'lucide-react';

const RECENT_ENQUIRIES = [
  {
    ref: 'DAG-M8K-902',
    name: 'Alhaji Musa Ibrahim',
    phone: '+2348031234567',
    state: 'Kano State',
    city: 'Fagge LGA',
    type: 'whatsapp_order',
    items: 'Day-Old Broilers (x10 cartons), Ascorbic Acid (x2)',
    totalNgn: 490400,
    status: 'pending_contact',
    time: '12 mins ago',
  },
  {
    ref: 'DAG-M8K-781',
    name: 'Baraka Farms Ltd',
    phone: '+2348029876543',
    state: 'Ogun State',
    city: 'Sagamu',
    type: 'bulk_quote',
    items: 'Layer Battery Cages (x4 sets), Gas Brooders (x2)',
    totalNgn: 1217000,
    status: 'quoted',
    time: '1 hour ago',
  },
  {
    ref: 'DAG-M8K-644',
    name: 'Dr. Chidi Okafor',
    phone: '+2348187654321',
    state: 'Enugu State',
    city: 'Nsukka',
    type: 'veterinary_consultation',
    items: 'Consultation: Week 4 Broiler Heat Stress & Mortality',
    totalNgn: 0,
    status: 'contacted',
    time: '3 hours ago',
  },
  {
    ref: 'DAG-M8K-512',
    name: 'Mrs. Folake Adeleke',
    phone: '+2348051122334',
    state: 'Oyo State',
    city: 'Ibadan North',
    type: 'whatsapp_order',
    items: 'Newcastle LaSota Vaccine (x5 vials), Syringe (x1)',
    totalNgn: 41000,
    status: 'fulfilled',
    time: 'Yesterday',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Staff Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time customer inquiries, weekly chick rates, and order fulfillment status
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/chicks-pricing"
            className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow hover:bg-emerald-700 transition-colors"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            <span>Update Chick Rates</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow hover:bg-slate-800 transition-colors"
          >
            <Inbox className="h-4 w-4 mr-2" />
            <span>View All Enquiries</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pending Contacts
            </span>
            <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-heading mt-2">12</div>
          <p className="text-xs text-amber-600 font-medium mt-1">Requires WhatsApp follow-up</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Next Hatchery Dispatch
            </span>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-heading mt-2">
            Tuesday Departure
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">Bookings close 48h prior</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Catalog Items
            </span>
            <div className="rounded-xl bg-cyan-50 p-2 text-cyan-600">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-heading mt-2">
            {PRODUCTS.length}
          </div>
          <p className="text-xs text-cyan-700 font-medium mt-1">100% verified asset inventory</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              WhatsApp Desk Status
            </span>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
              <Phone className="h-5 w-5" />
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 font-heading mt-2">
            +234 813 916 9402
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1">Routing operational</p>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-heading">
              Recent Inquiries & WhatsApp Orders
            </h2>
            <p className="text-xs text-slate-500">
              Live incoming farmer leads and quotation requests
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center"
          >
            <span>View all in detail</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Ref & Customer</th>
                <th className="py-3.5 px-6">Destination</th>
                <th className="py-3.5 px-6">Items Requested</th>
                <th className="py-3.5 px-6">Est. Total</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RECENT_ENQUIRIES.map((enq) => (
                <tr key={enq.ref} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{enq.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{enq.ref}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800 font-medium">{enq.city}</div>
                    <div className="text-[11px] text-slate-500">{enq.state}</div>
                  </td>
                  <td className="py-4 px-6 max-w-xs">
                    <span className="line-clamp-1">{enq.items}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    {enq.totalNgn > 0 ? `₦${enq.totalNgn.toLocaleString()}` : 'Advisory / Free'}
                  </td>
                  <td className="py-4 px-6">
                    {enq.status === 'pending_contact' && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
                        Pending Contact
                      </span>
                    )}
                    {enq.status === 'quoted' && (
                      <span className="inline-flex items-center rounded-full bg-cyan-50 px-2.5 py-0.5 text-[10px] font-bold text-cyan-800 border border-cyan-200">
                        Quoted
                      </span>
                    )}
                    {enq.status === 'contacted' && (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-800 border border-blue-200">
                        Contacted
                      </span>
                    )}
                    {enq.status === 'fulfilled' && (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                        Fulfilled
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <a
                      href={`https://wa.me/${enq.phone.replace(/\+/g, '')}?text=Hello%20${encodeURIComponent(enq.name)},%20this%20is%20D-AminGrow%20regarding%20your%20order%20ref%20${enq.ref}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      <Phone className="h-3 w-3 mr-1.5" />
                      <span>Chat</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
