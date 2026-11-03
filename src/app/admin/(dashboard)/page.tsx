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
  Phone,
  CheckCircle,
} from 'lucide-react';

export const revalidate = 0; // Fresh live metrics on every admin visit

export default async function AdminDashboardPage() {
  const { pendingCount, totalCatalogCount, recentEnquiries } = await getDashboardMetrics();

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
          <div className="text-3xl font-extrabold text-slate-900 font-heading mt-2">
            {pendingCount}
          </div>
          <p className="text-xs text-amber-600 font-medium mt-1">
            {pendingCount > 0 ? 'Requires WhatsApp follow-up' : 'All inquiries up to date'}
          </p>
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
            {totalCatalogCount}
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
              Live incoming farmer leads and quotation requests from Supabase
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
          {recentEnquiries.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
              <div className="font-semibold text-sm text-slate-800">
                Enquiry Queue is Current
              </div>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                No pending customer enquiries found in the database. When farmers submit bookings or quotation requests, they will populate here in real-time.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/70 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Ref & Customer</th>
                  <th className="py-3.5 px-6">Destination</th>
                  <th className="py-3.5 px-6">Enquiry Type</th>
                  <th className="py-3.5 px-6">Est. Total</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{enq.customer_name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{enq.enquiry_ref}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-800 font-medium">{enq.delivery_city}</div>
                      <div className="text-[11px] text-slate-500">{enq.delivery_state}</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs">
                      <span className="capitalize font-semibold text-slate-700">
                        {enq.enquiry_type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {enq.estimated_subtotal_ngn && enq.estimated_subtotal_ngn > 0
                        ? `₦${enq.estimated_subtotal_ngn.toLocaleString()}`
                        : 'Price on Request'}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-800 border border-slate-200 capitalize">
                        {enq.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a
                        href={`https://wa.me/${enq.customer_phone.replace(/\+/g, '')}?text=Hello%20${encodeURIComponent(enq.customer_name)},%20this%20is%20D-AminGrow%20regarding%20your%20inquiry%20ref%20${enq.enquiry_ref}.`}
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
          )}
        </div>
      </div>
    </div>
  );
}
