'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Printer,
  Search,
  Filter,
  Truck,
  Copy,
  Check,
  CreditCard,
  X,
  MessageCircle,
} from 'lucide-react';
import { DbBooking, DbQuota } from '@/lib/supabase/data-access';

interface BookingsClientProps {
  initialBookings: DbBooking[];
  initialQuotas: DbQuota[];
}

export default function BookingsClient({ initialBookings, initialQuotas }: BookingsClientProps) {
  const [bookings, setBookings] = useState<DbBooking[]>(initialBookings);
  const [quotas] = useState<DbQuota[]>(initialQuotas);
  const [activeTab, setActiveTab] = useState<'bookings' | 'quotas' | 'manifest'>('bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBookingForVerification, setSelectedBookingForVerification] = useState<DbBooking | null>(null);

  // Deposit verification form state
  const [bankName, setBankName] = useState('Zenith Bank Plc');
  const [paymentReference, setPaymentReference] = useState('');
  const [depositorName, setDepositorName] = useState('');
  const [amountPaidNgn, setAmountPaidNgn] = useState<number>(0);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.booking_ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer_phone.includes(searchQuery) ||
      b.delivery_state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destination_hub.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      b.booking_status === statusFilter ||
      (statusFilter === 'pending_deposit' && b.deposit_status === 'unpaid');

    return matchesSearch && matchesStatus;
  });

  const confirmedBookings = bookings.filter((b) => b.booking_status === 'confirmed');
  const totalCartonsConfirmed = confirmedBookings.reduce((sum, b) => sum + b.cartons_count, 0);
  const totalDepositsVerified = bookings.reduce((sum, b) => sum + (b.verified_deposit_ngn || 0), 0);
  const pendingHoldsCount = bookings.filter((b) => b.booking_status === 'quota_held' || b.deposit_status === 'unpaid').length;

  const handleOpenVerification = (b: DbBooking) => {
    setSelectedBookingForVerification(b);
    setDepositorName(b.customer_name);
    setAmountPaidNgn(b.required_deposit_ngn);
    setPaymentReference('');
    setVerificationFeedback(null);
  };

  const handleVerifyDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForVerification) return;

    setVerificationLoading(true);
    setVerificationFeedback(null);

    try {
      const res = await fetch('/api/admin/bookings/verify-deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingRef: selectedBookingForVerification.booking_ref,
          bankName,
          paymentReference,
          depositorName,
          amountPaidNgn: Number(amountPaidNgn),
          paymentDate: new Date().toISOString().slice(0, 10),
          staffNotes: `Verified on staff console by operations desk.`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Update local state
        setBookings((prev) =>
          prev.map((item) =>
            item.booking_ref === selectedBookingForVerification.booking_ref
              ? {
                  ...item,
                  booking_status: 'confirmed',
                  deposit_status: 'verified',
                  verified_deposit_ngn: Number(amountPaidNgn),
                }
              : item
          )
        );
        setSelectedBookingForVerification(null);
      } else {
        setVerificationFeedback(data.message || 'Deposit verification failed.');
      }
    } catch (err) {
      console.error('Failed to verify deposit:', err);
      setVerificationFeedback('Network error verifying deposit.');
    } finally {
      setVerificationLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <Truck className="h-4 w-4" />
            <span>Operations Desk · Module 02</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Chick Bookings &amp; Hatchery Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage live Day-Old Chick reservations, Zenith Bank deposits, weekly quotas, and dispatch manifests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('manifest')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
          >
            <Printer className="h-4 w-4 text-slate-500" />
            <span>Dispatch Manifest</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Reservations</div>
          <div className="text-2xl font-extrabold font-heading text-slate-900 mt-1">{bookings.length}</div>
          <div className="text-xs text-slate-500 mt-1">Active customer booking orders</div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Pending Holds (2h TTL)</div>
          <div className="text-2xl font-extrabold font-heading text-amber-900 mt-1">{pendingHoldsCount}</div>
          <div className="text-xs text-amber-700 mt-1">Awaiting Zenith Bank deposit</div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Confirmed Cartons</div>
          <div className="text-2xl font-extrabold font-heading text-emerald-900 mt-1">
            {totalCartonsConfirmed} Cartons
          </div>
          <div className="text-xs text-emerald-700 mt-1">
            ~{(totalCartonsConfirmed * 51).toLocaleString()} live chicks locked
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-700">Verified Deposits</div>
          <div className="text-2xl font-extrabold font-heading text-cyan-950 mt-1">
            ₦{totalDepositsVerified.toLocaleString()}
          </div>
          <div className="text-xs text-cyan-700 mt-1">Reconciled via Zenith Bank</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'bookings'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          All Reservations ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('quotas')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'quotas'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Hatchery Quotas ({quotas.length})
        </button>
        <button
          onClick={() => setActiveTab('manifest')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'manifest'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Motor Park Dispatch Manifest
        </button>
      </div>

      {/* ─── TAB 1: ALL BOOKINGS ─── */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search reference, customer name, phone, or state..."
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
                <option value="all">All Statuses</option>
                <option value="quota_held">Quota Held (2h TTL)</option>
                <option value="pending_deposit">Deposit Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="dispatched">Dispatched</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Booking Ref</th>
                    <th className="px-4 py-3">Customer / Phone</th>
                    <th className="px-4 py-3">Hatchery &amp; Breed</th>
                    <th className="px-4 py-3">Cartons &amp; Yield</th>
                    <th className="px-4 py-3">Destination</th>
                    <th className="px-4 py-3">Deposit Required</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-xs text-slate-400">
                        No chick reservations found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{b.booking_ref}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(b.booking_ref, b.id)}
                              className="text-slate-400 hover:text-emerald-600 p-0.5"
                            >
                              {copiedText === b.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                            </button>
                          </div>
                          <div className="text-[10px] text-slate-400 font-sans font-normal">
                            {new Date(b.created_at).toLocaleDateString('en-GB')}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{b.customer_name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{b.customer_phone}</div>
                          {b.farm_name && <div className="text-[10px] text-slate-400 italic">{b.farm_name}</div>}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-800">{b.hatchery_name}</div>
                          <div className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit mt-0.5">
                            {b.breed_type}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-bold text-slate-900">{b.cartons_count} Cartons</div>
                          <div className="text-[11px] text-slate-500">
                            {b.total_birds_count.toLocaleString()} chicks ({b.birds_per_carton}/box)
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-800">{b.delivery_state} State</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{b.destination_hub}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-bold text-slate-900">
                            ₦{b.required_deposit_ngn.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Total: ₦{b.estimated_total_ngn.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              b.booking_status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : b.booking_status === 'quota_held'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {b.booking_status === 'confirmed' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                            {b.booking_status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap space-x-2">
                          <a
                            href={`https://wa.me/${b.customer_phone.replace(/\+/g, '').replace(/\s+/g, '')}?text=Hello%20${encodeURIComponent(
                              b.customer_name
                            )},%20this%20is%20D-AminGrow%20Dispatch%20Desk%20regarding%20chick%20reservation%20${b.booking_ref}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </a>

                          {b.booking_status !== 'confirmed' ? (
                            <button
                              type="button"
                              onClick={() => handleOpenVerification(b)}
                              className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-2xs"
                            >
                              Verify Deposit
                            </button>
                          ) : (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              ✓ Verified
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: HATCHERY QUOTAS ─── */}
      {activeTab === 'quotas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Upcoming Dispatch Run Quotas</h3>
              <p className="text-xs text-slate-500">Atomic allocation capacities across Tuesday &amp; Thursday hatch days</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quotas.map((q) => (
              <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full">
                    {q.dispatch_day} Run
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{q.dispatch_date}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-heading">{q.hatchery_name}</h4>
                  <div className="text-xs text-slate-500 uppercase font-semibold mt-0.5">{q.breed_type}</div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                  <div className="rounded-xl bg-slate-50 p-2">
                    <div className="text-[10px] text-slate-400 uppercase">Total</div>
                    <div className="text-sm font-bold text-slate-900">{q.total_cartons_quota}</div>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-2">
                    <div className="text-[10px] text-amber-700 uppercase">Held</div>
                    <div className="text-sm font-bold text-amber-900">{q.reserved_cartons}</div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-2">
                    <div className="text-[10px] text-emerald-700 uppercase">Avail</div>
                    <div className="text-sm font-bold text-emerald-900">{q.available_cartons}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <span>Price per Carton:</span>
                  <span className="font-bold text-slate-900">₦{q.estimated_price_per_carton.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 3: DISPATCH MANIFEST ─── */}
      {activeTab === 'manifest' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Motor Park Dispatch Manifest
              </h3>
              <p className="text-xs text-slate-500">
                Official delivery sheet for logistics transit coordinators and bus park terminals.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow"
            >
              <Printer className="h-4 w-4" />
              <span>Print Manifest Sheet</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="p-3">Item #</th>
                  <th className="p-3">Booking Ref</th>
                  <th className="p-3">Farmer Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Cartons</th>
                  <th className="p-3">Breed</th>
                  <th className="p-3">Destination Terminal</th>
                  <th className="p-3">Deposit Verified</th>
                  <th className="p-3">Receiver Signature</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {confirmedBookings.map((b, idx) => (
                  <tr key={b.id} className="font-sans">
                    <td className="p-3 font-bold">{idx + 1}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">{b.booking_ref}</td>
                    <td className="p-3 font-semibold">{b.customer_name}</td>
                    <td className="p-3 font-mono">{b.customer_phone}</td>
                    <td className="p-3 font-bold text-slate-900">{b.cartons_count} ({b.total_birds_count} chicks)</td>
                    <td className="p-3 uppercase">{b.breed_type}</td>
                    <td className="p-3 font-medium">{b.destination_hub}, {b.delivery_state}</td>
                    <td className="p-3 text-emerald-700 font-bold">₦{b.verified_deposit_ngn.toLocaleString()}</td>
                    <td className="p-3 border-b border-dashed border-slate-300 w-32"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Deposit Verification Modal */}
      {selectedBookingForVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Verify Bank Deposit
                </h3>
              </div>
              <button
                onClick={() => setSelectedBookingForVerification(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {verificationFeedback && (
              <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                {verificationFeedback}
              </div>
            )}

            <form onSubmit={handleVerifyDepositSubmit} className="space-y-3.5 text-xs text-slate-700">
              <div>
                <label className="font-bold text-slate-600 block mb-1">Booking Reference</label>
                <input
                  type="text"
                  readOnly
                  value={selectedBookingForVerification.booking_ref}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2.5 font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">Settlement Bank</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">
                  Bank Transfer Reference / NIP Session ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1000042411030098124"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Depositor Name</label>
                  <input
                    type="text"
                    required
                    value={depositorName}
                    onChange={(e) => setDepositorName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-600 block mb-1">Amount Paid (₦)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={amountPaidNgn}
                    onChange={(e) => setAmountPaidNgn(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 p-2.5 font-bold text-emerald-800"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBookingForVerification(null)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={verificationLoading}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-md"
                >
                  {verificationLoading ? 'Confirming...' : 'Approve & Lock Cartons'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
