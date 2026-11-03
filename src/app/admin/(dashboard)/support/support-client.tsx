'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  MessageCircle,
} from 'lucide-react';

interface SupportTicket {
  id: string;
  ticketRef: string;
  customerName: string;
  customerPhone: string;
  farmName?: string;
  category: 'transit_mortality' | 'cold_chain_check' | 'waybill_tracking' | 'dosage_query' | 'general';
  subject: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved';
  priority: 'urgent' | 'high' | 'normal';
  createdAt: string;
}

export default function SupportClient() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'tkt-01',
      ticketRef: 'TCK-202611-001',
      customerName: 'Alhaji M. Ajila',
      customerPhone: '+2348039123456',
      farmName: 'Ajila Farm',
      category: 'waybill_tracking',
      subject: 'Tuesday morning chick waybill arrival at Bodija Depot',
      description: 'Customer requesting driver phone number and bus registration number for carton pickup.',
      status: 'resolved',
      priority: 'high',
      createdAt: '2026-11-03T07:15:00Z',
    },
    {
      id: 'tkt-02',
      ticketRef: 'TCK-202611-002',
      customerName: 'Dr. Austin',
      customerPhone: '+2348056789012',
      farmName: 'Dr Austin Farm',
      category: 'dosage_query',
      subject: 'Clarification on Gumboro IBD water withdrawal time in hot weather',
      description: 'Ambient temp at 33°C; confirming if water starvation should be 1.5 hours instead of 2 hours.',
      status: 'open',
      priority: 'urgent',
      createdAt: '2026-11-03T09:40:00Z',
    },
    {
      id: 'tkt-03',
      ticketRef: 'TCK-202611-003',
      customerName: 'Loveday Agro',
      customerPhone: '+2348023456789',
      farmName: 'Loveday Farm',
      category: 'cold_chain_check',
      subject: 'Ice pack temperature check on Newcastle LaSota delivery',
      description: 'Confirmed receipt of 10 vials; thermal ice pack arrived intact at 4°C.',
      status: 'resolved',
      priority: 'normal',
      createdAt: '2026-11-02T16:20:00Z',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = tickets.filter((t) => {
    const matchesSearch =
      t.ticketRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <HelpCircle className="h-4 w-4" />
            <span>Customer Care · Module 09</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Customer Support &amp; Issue Resolution
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track post-dispatch arrival inquiries, waybill confirmations, transit checks, and dosage assistance.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Tickets</div>
          <div className="text-2xl font-extrabold font-heading text-slate-900 mt-1">{tickets.length}</div>
          <div className="text-xs text-slate-500 mt-1">Logged client interactions</div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Open Tickets</div>
          <div className="text-2xl font-extrabold font-heading text-amber-950 mt-1">
            {tickets.filter((t) => t.status === 'open').length}
          </div>
          <div className="text-xs text-amber-700 mt-1">Requiring staff response</div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Resolved Rate</div>
          <div className="text-2xl font-extrabold font-heading text-emerald-950 mt-1">
            {Math.round((tickets.filter((t) => t.status === 'resolved').length / tickets.length) * 100)}%
          </div>
          <div className="text-xs text-emerald-700 mt-1">Satisfactory resolution</div>
        </div>

        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-700">Response Window</div>
          <div className="text-2xl font-extrabold font-heading text-cyan-950 mt-1">&lt; 30 Mins</div>
          <div className="text-xs text-cyan-700 mt-1">WhatsApp hotline support</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search ticket ref, customer name, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Ticket Statuses</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Ticket Ref</th>
                <th className="px-4 py-3">Customer / Phone</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Subject &amp; Notes</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {t.ticketRef}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-bold text-slate-900">{t.customerName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{t.customerPhone}</div>
                    {t.farmName && <div className="text-[10px] text-slate-400">{t.farmName}</div>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-[10px] uppercase font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {t.category.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{t.subject}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{t.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        t.priority === 'urgent'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : t.priority === 'high'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        t.status === 'resolved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {t.status === 'resolved' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <a
                      href={`https://wa.me/${t.customerPhone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(t.customerName)},%20this%20is%20D-AminGrow%20Support%20regarding%20ticket%20${t.ticketRef}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
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
