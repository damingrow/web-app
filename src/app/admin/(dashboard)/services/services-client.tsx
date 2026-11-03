'use client';

import React, { useState } from 'react';
import {
  Stethoscope,
  AlertTriangle,
  Search,
  Filter,
  MessageCircle,
} from 'lucide-react';
import { DbEnquiry } from '@/lib/supabase/data-access';

interface ServicesClientProps {
  initialEnquiries: DbEnquiry[];
}

export default function ServicesClient({ initialEnquiries }: ServicesClientProps) {
  const [enquiries, setEnquiries] = useState<DbEnquiry[]>(initialEnquiries); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<DbEnquiry | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      e.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.customer_phone.includes(searchQuery) ||
      (e.user_notes && e.user_notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (e.delivery_state && e.delivery_state.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPriority = priorityFilter === 'all' || e.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const urgentCount = enquiries.filter((e) => e.priority === 'urgent').length;
  const highCount = enquiries.filter((e) => e.priority === 'high').length;

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <Stethoscope className="h-4 w-4" />
            <span>Consultancy Desk · Module 04</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Services &amp; Veterinary Consultations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage farm setup inquiries, pen design appointments, and emergency veterinary triage tickets across Nigeria.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Consultations</div>
          <div className="text-2xl font-extrabold font-heading text-slate-900 mt-1">{enquiries.length}</div>
          <div className="text-xs text-slate-500 mt-1">Recorded farmer requests</div>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-red-700">Urgent Triage (Immediate)</div>
          <div className="text-2xl font-extrabold font-heading text-red-950 mt-1">{urgentCount}</div>
          <div className="text-xs text-red-700 mt-1">Acute flock mortality &amp; symptoms</div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">High Priority</div>
          <div className="text-2xl font-extrabold font-heading text-amber-950 mt-1">{highCount}</div>
          <div className="text-xs text-amber-700 mt-1">Vaccination programs &amp; setup</div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Response SLA</div>
          <div className="text-2xl font-extrabold font-heading text-emerald-950 mt-1">&lt; 2 Hours</div>
          <div className="text-xs text-emerald-700 mt-1">Veterinary Council standard</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search customer, phone, farm name, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent / Emergency Triage</option>
            <option value="high">High Priority</option>
            <option value="routine">Routine</option>
          </select>
        </div>
      </div>

      {/* Consultations Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Client / Farm</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Clinical / Setup Summary</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-slate-400">
                    No service consultation requests found.
                  </td>
                </tr>
              ) : (
                filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{e.customer_name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{e.customer_phone}</div>
                      {e.farm_name && <div className="text-[10px] text-slate-400 italic">{e.farm_name}</div>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {e.enquiry_type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{e.delivery_state || 'Nigeria'}</div>
                      <div className="text-[11px] text-slate-400">{e.delivery_city || 'Regional Farm'}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-slate-700 line-clamp-2 max-w-sm">
                        {e.user_notes || 'No specific notes recorded.'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(e.created_at).toLocaleDateString('en-GB')}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          e.priority === 'urgent'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : e.priority === 'high'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {e.priority === 'urgent' && <AlertTriangle className="h-3 w-3 text-red-600" />}
                        {e.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {e.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <a
                        href={`https://wa.me/${e.customer_phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(e.customer_name)},%20this%20is%20the%20D-AminGrow%20Veterinary%20Desk%20following%20up%20on%20your%20consultation%20request.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Respond</span>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
