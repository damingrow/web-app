'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Modal } from '@/components/ui/modal';
import { DbCustomer } from '@/lib/supabase/data-access';
import { getTierBadgeConfig } from '@/lib/crm/customer-utils';
import {
  Users,
  Search,
  Phone,
  ArrowLeft,
  Crown,
  Award,
  Building2,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

interface CrmClientProps {
  initialCustomers: DbCustomer[];
}

export function CrmClient({ initialCustomers }: CrmClientProps) {
  const [customers] = useState<DbCustomer[]>(initialCustomers);
  const [activeTier, setActiveTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<DbCustomer | null>(null);

  const filtered = customers.filter((c) => {
    const matchesTier = activeTier === 'all' || c.customer_tier === activeTier;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      c.full_name.toLowerCase().includes(query) ||
      c.phone_normalized.includes(query) ||
      c.raw_phone.includes(query) ||
      (c.farm_name && c.farm_name.toLowerCase().includes(query)) ||
      (c.primary_state && c.primary_state.toLowerCase().includes(query));
    return matchesTier && matchesSearch;
  });

  const totalVip = customers.filter((c) => c.customer_tier === 'vip_commercial').length;
  const totalGold = customers.filter((c) => c.customer_tier === 'gold').length;
  const totalLifetimeValue = customers.reduce((acc, c) => acc + (Number(c.lifetime_value_ngn) || 0), 0);

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
            <span className="text-slate-800 font-semibold">Farmer CRM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Deduplicated Farmer CRM & Accounts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Unified directory of poultry producers, order histories, and tier progression ({customers.length} customer records)
          </p>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Registered Farmers</span>
            <div className="h-8 w-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-heading">{customers.length}</div>
          <div className="text-[11px] text-slate-400">Deduplicated by E.164 phone</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">VIP Commercial</span>
            <div className="h-8 w-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Crown className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-purple-900 font-heading">{totalVip}</div>
          <div className="text-[11px] text-purple-700 font-medium">≥ ₦10M or 20+ orders</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Gold Producers</span>
            <div className="h-8 w-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-900 font-heading">{totalGold}</div>
          <div className="text-[11px] text-amber-700 font-medium">≥ ₦2M or 8+ orders</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Cumulative Lifetime Value</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-800 font-heading">
            ₦{totalLifetimeValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">Tracked commercial volume</div>
        </div>
      </div>

      {/* Toolbar: Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Tier Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Farmers' },
            { id: 'vip_commercial', label: '👑 VIP Commercial' },
            { id: 'gold', label: '🥇 Gold' },
            { id: 'silver', label: '🥈 Silver' },
            { id: 'bronze', label: '🥉 Bronze' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTier(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTier === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, phone, farm, state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 pl-9 pr-4 py-1.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="p-16 text-center text-slate-500 space-y-3">
              <CheckCircle className="h-10 w-10 text-slate-300 mx-auto" />
              <div className="font-semibold text-sm text-slate-800">No Farmers Found</div>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                {customers.length === 0
                  ? 'No farmer profiles have been created or synchronized yet.'
                  : 'No customer profiles match your current search and tier filter.'}
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50/70 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Farmer & Farm</th>
                  <th className="py-3.5 px-6">Normalized Phone (E.164)</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Loyalty Tier</th>
                  <th className="py-3.5 px-6">Orders & Bookings</th>
                  <th className="py-3.5 px-6">Lifetime Value</th>
                  <th className="py-3.5 px-6">Last Active</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((customer) => {
                  const badge = getTierBadgeConfig(customer.customer_tier);
                  const cleanPhone = customer.phone_normalized.replace(/\+/g, '');

                  return (
                    <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{customer.full_name}</div>
                        {customer.farm_name ? (
                          <div className="text-[10px] text-emerald-800 font-semibold flex items-center space-x-1 mt-0.5">
                            <Building2 className="h-3 w-3" />
                            <span>{customer.farm_name}</span>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-400">Independent Producer</div>
                        )}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-700 whitespace-nowrap">
                        {customer.phone_normalized}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800">{customer.primary_city || 'N/A'}</div>
                        <div className="text-[10px] text-slate-500">{customer.primary_state} State</div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.badgeClass}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${badge.dotClass}`} />
                          <span>{badge.label}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-semibold text-slate-900">
                          {customer.total_orders_count + customer.total_bookings_count} Activities
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {customer.total_orders_count} Inquiries · {customer.total_bookings_count} Bookings
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900 whitespace-nowrap">
                        {customer.lifetime_value_ngn && customer.lifetime_value_ngn > 0
                          ? `₦${Number(customer.lifetime_value_ngn).toLocaleString()}`
                          : '₦0'}
                      </td>
                      <td className="py-4 px-6 text-slate-500 whitespace-nowrap text-[11px]">
                        {new Date(customer.last_activity_at).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                          Profile
                        </button>
                        <a
                          href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(customer.full_name)},%20this%20is%20D-AminGrow%20contacting%20you%20regarding%20your%20farm%20operations.`}
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

      {/* Customer Profile Detail Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={Boolean(selectedCustomer)}
          onClose={() => setSelectedCustomer(null)}
          title={`Farmer Profile: ${selectedCustomer.full_name}`}
          description={`Customer Record: ${selectedCustomer.phone_normalized}`}
          maxWidth="lg"
        >
          <div className="space-y-5 text-xs text-slate-700">
            {/* Tier Banner */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                  Loyalty Tier Status
                </span>
                <span className="font-extrabold text-sm font-heading text-slate-900">
                  {getTierBadgeConfig(selectedCustomer.customer_tier).label}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                  Tracked Lifetime Value
                </span>
                <span className="font-extrabold text-sm text-emerald-700 font-heading">
                  ₦{Number(selectedCustomer.lifetime_value_ngn).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-2xl border border-slate-200">
              <div>
                <span className="font-semibold text-slate-500 block">Farmer Name:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedCustomer.full_name}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">WhatsApp Phone:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {selectedCustomer.phone_normalized}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">Farm Enterprise:</span>
                <span className="text-slate-800 font-medium">
                  {selectedCustomer.farm_name || 'Independent Farmer'}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">Location:</span>
                <span className="text-slate-800 font-medium">
                  {selectedCustomer.primary_city || 'City N/A'}, {selectedCustomer.primary_state} State
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">Inquiries Submitted:</span>
                <span className="text-slate-800 font-bold">{selectedCustomer.total_orders_count}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">Chick Reservations:</span>
                <span className="text-slate-800 font-bold">{selectedCustomer.total_bookings_count}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">First Seen:</span>
                <span className="text-slate-600">
                  {new Date(selectedCustomer.created_at).toLocaleDateString('en-GB')}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">Last Active:</span>
                <span className="text-slate-600">
                  {new Date(selectedCustomer.last_activity_at).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>

            {/* Staff Notes */}
            <div className="space-y-1">
              <span className="font-bold text-slate-800 block">Staff Account Notes:</span>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-xs leading-relaxed">
                {selectedCustomer.staff_notes || 'No custom notes recorded for this farmer account yet.'}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close Profile
              </button>
              <a
                href={`https://wa.me/${selectedCustomer.phone_normalized.replace(/\+/g, '')}?text=Hello%20${encodeURIComponent(selectedCustomer.full_name)},%20this%20is%20D-AminGrow%20contacting%20you%20regarding%20your%20farm%20orders.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow"
              >
                <Phone className="h-4 w-4 mr-1.5" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
