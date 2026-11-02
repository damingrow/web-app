'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Modal } from '@/components/ui/modal';
import {
  Phone,
  ArrowLeft,
  Search,
} from 'lucide-react';

interface EnquiryRecord {
  id: string;
  ref: string;
  customerName: string;
  phone: string;
  state: string;
  city: string;
  farmName?: string;
  enquiryType: 'whatsapp_order' | 'bulk_quote' | 'veterinary_consultation' | 'general';
  itemsSummary: string;
  estimatedTotalNgn: number;
  userNotes?: string;
  status: 'pending_contact' | 'contacted' | 'quoted' | 'deposit_received' | 'fulfilled' | 'cancelled';
  createdAt: string;
}

const INITIAL_ENQUIRIES: EnquiryRecord[] = [
  {
    id: 'enq-001',
    ref: 'DAG-M8K-902',
    customerName: 'Alhaji Musa Ibrahim',
    phone: '+2348031234567',
    state: 'Kano State',
    city: 'Fagge LGA',
    farmName: 'Musa Broiler Farm',
    enquiryType: 'whatsapp_order',
    itemsSummary: '10x Commercial Day-Old Broilers (510 chicks), 2x Ascorbic Acid Vitamin C 100g',
    estimatedTotalNgn: 490400,
    userNotes: 'Requires Tuesday early morning waybill to Kano luxury bus depot.',
    status: 'pending_contact',
    createdAt: '2026-11-02 09:42',
  },
  {
    id: 'enq-002',
    ref: 'DAG-M8K-781',
    customerName: 'Baraka Farms Ltd',
    phone: '+2348029876543',
    state: 'Ogun State',
    city: 'Sagamu',
    farmName: 'Baraka Poultry Ltd',
    enquiryType: 'bulk_quote',
    itemsSummary: '4x Commercial Layer Battery Cage (Tiered System), 2x Infrared Gas Brooder Canopy',
    estimatedTotalNgn: 1217000,
    userNotes: 'Requesting installation quote and technician availability for Sagamu farm.',
    status: 'quoted',
    createdAt: '2026-11-02 08:15',
  },
  {
    id: 'enq-003',
    ref: 'DAG-M8K-644',
    customerName: 'Dr. Chidi Okafor',
    phone: '+2348187654321',
    state: 'Enugu State',
    city: 'Nsukka',
    farmName: 'Okafor Agro Ventures',
    enquiryType: 'veterinary_consultation',
    itemsSummary: 'Consultation: Week 4 Broiler Heat Stress Mortality & Gumboro Titers',
    estimatedTotalNgn: 0,
    userNotes: 'Lost 25 birds yesterday after temperature spike. Need autopsy & medication guidance.',
    status: 'contacted',
    createdAt: '2026-11-02 06:30',
  },
  {
    id: 'enq-004',
    ref: 'DAG-M8K-512',
    customerName: 'Mrs. Folake Adeleke',
    phone: '+2348051122334',
    state: 'Oyo State',
    city: 'Ibadan North',
    enquiryType: 'whatsapp_order',
    itemsSummary: '5x Newcastle Disease LaSota Vaccine (1,000 doses), 1x Automatic Continuous Vaccinator Syringe',
    estimatedTotalNgn: 41000,
    userNotes: 'Pickup at Bodija depot. Cold pack needed.',
    status: 'fulfilled',
    createdAt: '2026-11-01 14:20',
  },
];

export default function EnquiriesManagementPage() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(INITIAL_ENQUIRIES);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);

  const filtered = enquiries.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.status === activeFilter;
    const matchesSearch =
      !searchQuery ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: EnquiryRecord['status']) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <Link href="/admin" className="hover:text-emerald-700 flex items-center">
              <ArrowLeft className="h-3 w-3 mr-1" />
              <span>Dashboard</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Enquiries Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Customer Enquiries & Order Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage incoming farmer leads, quotation tickets, and WhatsApp order fulfillment.
          </p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'pending_contact', label: 'Pending' },
            { id: 'contacted', label: 'Contacted' },
            { id: 'quoted', label: 'Quoted' },
            { id: 'fulfilled', label: 'Fulfilled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeFilter === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, phone, ref, state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 pl-9 pr-4 py-1.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Enquiries Data Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/70 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Ref & Customer</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6">Enquiry Type</th>
                <th className="py-3.5 px-6">Order Details</th>
                <th className="py-3.5 px-6">Est. Total</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{item.customerName}</div>
                    <div className="text-[10px] font-mono text-slate-400">{item.ref}</div>
                    <div className="text-[10px] text-slate-500">{item.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-800 font-medium">{item.city}</div>
                    <div className="text-[10px] text-slate-500">{item.state}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="capitalize font-semibold text-slate-700">
                      {item.enquiryType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 max-w-xs">
                    <p className="line-clamp-2 text-slate-600">{item.itemsSummary}</p>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    {item.estimatedTotalNgn > 0
                      ? `₦${item.estimatedTotalNgn.toLocaleString()}`
                      : 'Consultation'}
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleUpdateStatus(
                          item.id,
                          e.target.value as EnquiryRecord['status']
                        )
                      }
                      className="rounded-lg border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-800 bg-white"
                    >
                      <option value="pending_contact">Pending Contact</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="deposit_received">Deposit Received</option>
                      <option value="fulfilled">Fulfilled</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => setSelectedEnquiry(item)}
                      className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      Details
                    </button>
                    <a
                      href={`https://wa.me/${item.phone.replace(/\+/g, '')}?text=Hello%20${encodeURIComponent(item.customerName)},%20this%20is%20D-AminGrow%20regarding%20your%20order%20ref%20${item.ref}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      <span>Chat</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={Boolean(selectedEnquiry)}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry Ticket: ${selectedEnquiry.ref}`}
          description={`Submitted on ${selectedEnquiry.createdAt}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="font-semibold text-slate-500 block">Customer Name:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedEnquiry.customerName}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">WhatsApp Phone:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedEnquiry.phone}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">Destination:</span>
                <span className="text-slate-900">{selectedEnquiry.city}, {selectedEnquiry.state}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">Farm Enterprise:</span>
                <span className="text-slate-900">{selectedEnquiry.farmName || 'N/A'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-900 block">Requested Items & Scope:</span>
              <div className="p-3 bg-white border border-slate-200 rounded-xl leading-relaxed">
                {selectedEnquiry.itemsSummary}
              </div>
            </div>

            {selectedEnquiry.userNotes && (
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">Customer Instructions:</span>
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl leading-relaxed">
                  {selectedEnquiry.userNotes}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <span className="text-xs text-slate-500">Estimated Total:</span>
                <span className="text-base font-extrabold text-slate-900 ml-2 font-heading">
                  {selectedEnquiry.estimatedTotalNgn > 0
                    ? `₦${selectedEnquiry.estimatedTotalNgn.toLocaleString()}`
                    : 'Advisory Consultation'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/\+/g, '')}?text=Hello%20${encodeURIComponent(selectedEnquiry.customerName)},%20this%20is%20D-AminGrow%20contacting%20you%20regarding%20your%20order%20ref%20${selectedEnquiry.ref}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow"
                >
                  <Phone className="h-4 w-4 mr-1.5" />
                  <span>Open Customer WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
