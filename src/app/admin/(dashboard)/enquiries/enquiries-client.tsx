'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Modal } from '@/components/ui/modal';
import { DbEnquiry } from '@/lib/supabase/data-access';
import {
  Phone,
  ArrowLeft,
  Search,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Stethoscope,
} from 'lucide-react';

interface EnquiriesClientProps {
  initialEnquiries: DbEnquiry[];
}

export function EnquiriesClient({ initialEnquiries }: EnquiriesClientProps) {
  const [enquiries, setEnquiries] = useState<DbEnquiry[]>(initialEnquiries);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<DbEnquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const filtered = enquiries.filter((item) => {
    let matchesFilter = false;
    if (activeFilter === 'all') {
      matchesFilter = true;
    } else if (activeFilter === 'urgent_cases') {
      matchesFilter =
        item.priority === 'urgent' ||
        item.priority === 'high' ||
        item.enquiry_type === 'veterinary_consultation';
    } else {
      matchesFilter = item.status === activeFilter;
    }

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (item.customer_name || '').toLowerCase().includes(q) ||
      (item.enquiry_ref || '').toLowerCase().includes(q) ||
      (item.delivery_state || '').toLowerCase().includes(q) ||
      (item.delivery_city || '').toLowerCase().includes(q) ||
      (item.customer_phone || '').includes(q);
    return matchesFilter && matchesSearch;
  });

  const handleUpdateStatus = async (enquiry: DbEnquiry, newStatus: string) => {
    setUpdatingId(enquiry.id);
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enquiryId: enquiry.enquiry_ref,
          newStatus,
          staffNote: `Status updated to ${newStatus} from admin enquiries desk.`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === enquiry.id ? { ...item, status: newStatus } : item
          )
        );
        if (selectedEnquiry && selectedEnquiry.id === enquiry.id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setToastType('success');
        setToastMessage(`Ref ${enquiry.enquiry_ref} transitioned to ${newStatus.replace(/_/g, ' ')}`);
      } else {
        setToastType('error');
        setToastMessage(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setToastType('error');
      setToastMessage('Network error updating status');
    } finally {
      setUpdatingId(null);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center space-x-2 rounded-xl px-4 py-3 text-xs font-semibold shadow-lg transition-all ${
            toastType === 'success'
              ? 'bg-emerald-900 text-white border border-emerald-700'
              : 'bg-red-900 text-white border border-red-700'
          }`}
        >
          {toastType === 'success' ? (
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-400" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

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
            Manage incoming farmer leads, quotation tickets, and WhatsApp order fulfillment ({enquiries.length} live records)
          </p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'urgent_cases', label: '🚨 Urgent / Vet Triage' },
            { id: 'pending_contact', label: 'Pending' },
            { id: 'contacted', label: 'Contacted' },
            { id: 'quoted', label: 'Quoted' },
            { id: 'deposit_received', label: 'Deposit Received' },
            { id: 'fulfilled', label: 'Fulfilled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors flex items-center space-x-1 ${
                activeFilter === tab.id
                  ? tab.id === 'urgent_cases'
                    ? 'bg-red-700 text-white'
                    : 'bg-slate-900 text-white'
                  : tab.id === 'urgent_cases'
                  ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
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
          {filtered.length === 0 ? (
            <div className="p-16 text-center text-slate-500 space-y-3">
              <CheckCircle className="h-10 w-10 text-slate-300 mx-auto" />
              <div className="font-semibold text-sm text-slate-800">No Inquiries Found</div>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                {enquiries.length === 0
                  ? 'No incoming customer enquiries have been recorded in the database yet.'
                  : 'No customer enquiries match your active filter and search query.'}
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50/70 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Priority & Ref</th>
                  <th className="py-3.5 px-6">Customer & Farm</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Enquiry Type</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Est. Total</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => {
                  const isUrgent = item.priority === 'urgent';
                  const isHigh = item.priority === 'high' || (!isUrgent && item.enquiry_type === 'veterinary_consultation');
                  const isVet = item.enquiry_type === 'veterinary_consultation';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/50 transition-colors ${
                        isUrgent ? 'bg-red-50/30' : isVet ? 'bg-amber-50/20' : ''
                      }`}
                    >
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          {isUrgent ? (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-300 w-fit">
                              <AlertCircle className="h-3 w-3 text-red-600" />
                              <span>URGENT</span>
                            </span>
                          ) : isHigh ? (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 w-fit">
                              <AlertTriangle className="h-3 w-3 text-amber-600" />
                              <span>HIGH</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 w-fit">
                              Normal
                            </span>
                          )}
                          <span className="font-mono text-[10px] text-slate-500 font-semibold">
                            {item.enquiry_ref}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{item.customer_name}</div>
                        {item.farm_name && (
                          <div className="text-[10px] text-emerald-800 font-medium">
                            {item.farm_name}
                          </div>
                        )}
                        <div className="text-[10px] text-slate-500">{item.customer_phone}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-slate-800 font-medium">{item.delivery_city}</div>
                        <div className="text-[10px] text-slate-500">{item.delivery_state}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-1.5">
                          {isVet && <Stethoscope className="h-3.5 w-3.5 text-violet-600 shrink-0" />}
                          <span className="capitalize font-semibold text-slate-700">
                            {(item.enquiry_type || 'General').replace(/_/g, ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        }) : 'Recent'}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">
                        {item.estimated_subtotal_ngn && item.estimated_subtotal_ngn > 0
                          ? `₦${item.estimated_subtotal_ngn.toLocaleString()}`
                          : 'On Request'}
                      </td>
                      <td className="py-4 px-6">
                        <select
                          disabled={updatingId === item.id}
                          value={item.status || 'pending_contact'}
                          onChange={(e) => handleUpdateStatus(item, e.target.value)}
                          className="rounded-lg border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="pending_contact">Pending Contact</option>
                          <option value="contacted">Contacted</option>
                          <option value="quoted">Quoted</option>
                          <option value="deposit_received">Deposit Received</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="fulfilled">Fulfilled</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedEnquiry(item)}
                          className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                          Details
                        </button>
                        <a
                          href={`https://wa.me/${(item.customer_phone || '').replace(/\+/g, '')}?text=Hello%20${encodeURIComponent(item.customer_name || 'Customer')},%20this%20is%20D-AminGrow%20regarding%20your%20inquiry%20ref%20${item.enquiry_ref || ''}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          <span>Chat</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={Boolean(selectedEnquiry)}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry Ticket: ${selectedEnquiry.enquiry_ref}`}
          description={`Recorded on ${new Date(selectedEnquiry.created_at).toLocaleString()}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="font-semibold text-slate-500 block">Customer Name:</span>
                <span className="font-bold text-slate-900 text-sm">
                  {selectedEnquiry.customer_name}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">WhatsApp Phone:</span>
                <span className="font-bold text-slate-900 text-sm">
                  {selectedEnquiry.customer_phone}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">Destination:</span>
                <span className="text-slate-900">
                  {selectedEnquiry.delivery_city}, {selectedEnquiry.delivery_state}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">Farm Enterprise:</span>
                <span className="text-slate-900">{selectedEnquiry.farm_name || 'N/A'}</span>
              </div>
            </div>

            {/* Priority and Type Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-100 rounded-xl">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-700">Priority Level:</span>
                {selectedEnquiry.priority === 'urgent' ? (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-red-600 text-white shadow-sm">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>🚨 CRITICAL / URGENT (Immediate Action)</span>
                  </span>
                ) : selectedEnquiry.priority === 'high' || selectedEnquiry.enquiry_type === 'veterinary_consultation' ? (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>⚠️ HIGH PRIORITY</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
                    Normal Priority
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1 text-slate-600 font-semibold">
                {selectedEnquiry.enquiry_type === 'veterinary_consultation' && (
                  <Stethoscope className="h-4 w-4 text-violet-600" />
                )}
                <span className="capitalize">{(selectedEnquiry.enquiry_type || 'General').replace(/_/g, ' ')}</span>
              </div>
            </div>

            {/* Clinical Triage Callout for Veterinary Consultations */}
            {selectedEnquiry.enquiry_type === 'veterinary_consultation' && (
              <div className="p-4 bg-violet-50 border border-violet-200 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-violet-900 font-bold text-sm">
                  <Stethoscope className="h-4 w-4 text-violet-700" />
                  <span>Clinical Case Triage & Diagnostic Handover</span>
                </div>
                <p className="text-[11px] text-violet-800 leading-relaxed">
                  Farmer requested urgent veterinary guidance. Review symptoms below. Request necropsy or flock videos on WhatsApp before prescribing antibiotics to ensure antimicrobial stewardship compliance.
                </p>
              </div>
            )}

            {selectedEnquiry.user_notes && (
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">
                  {selectedEnquiry.enquiry_type === 'veterinary_consultation'
                    ? 'Clinical Triage Intake Report:'
                    : 'Customer Request & Specifications:'}
                </span>
                <div className="p-3 bg-amber-50/80 border border-amber-200 text-slate-800 rounded-xl leading-relaxed whitespace-pre-wrap font-sans text-xs">
                  {selectedEnquiry.user_notes}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <span className="text-xs text-slate-500">Current Status:</span>
                <span className="text-xs font-bold uppercase text-slate-800 ml-2">
                  {(selectedEnquiry.status || 'pending').replace(/_/g, ' ')}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={`https://wa.me/${(selectedEnquiry.customer_phone || '').replace(/\+/g, '')}?text=Hello%20${encodeURIComponent(selectedEnquiry.customer_name || 'Customer')},%20this%20is%20D-AminGrow%20contacting%20you%20regarding%20your%20inquiry%20ref%20${selectedEnquiry.enquiry_ref || ''}.`}
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
