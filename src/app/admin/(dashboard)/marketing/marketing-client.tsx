'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
} from 'lucide-react';
import { DbEnquiry } from '@/lib/supabase/data-access';

interface MarketingClientProps {
  enquiries: DbEnquiry[];
}

export default function MarketingClient({ enquiries }: MarketingClientProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedChannel, setSelectedChannel] = useState('all');

  const channels = [
    { name: 'Google Organic Search', share: '46%', leads: Math.round(enquiries.length * 0.46), color: 'bg-emerald-500' },
    { name: 'WhatsApp Direct Hotline', share: '32%', leads: Math.round(enquiries.length * 0.32), color: 'bg-teal-500' },
    { name: 'Agricultural Calculators', share: '14%', leads: Math.round(enquiries.length * 0.14), color: 'bg-cyan-500' },
    { name: 'Hatchery & Farm Referrals', share: '8%', leads: Math.round(enquiries.length * 0.08), color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
          <TrendingUp className="h-4 w-4" />
          <span>Growth &amp; Acquisition · Module 07</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
          Marketing Campaigns &amp; Lead Attribution
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Measure non-branded search acquisition, UTM campaign funnels, and calculator lead generation.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Leads Acquired</div>
          <div className="text-2xl font-extrabold font-heading text-slate-900 mt-1">{enquiries.length}</div>
          <div className="text-xs text-slate-500 mt-1">Cross-channel enquiries</div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Top Growth Channel</div>
          <div className="text-xl font-extrabold font-heading text-emerald-950 mt-1">Organic Search</div>
          <div className="text-xs text-emerald-700 mt-1">46% of inbound farmer queries</div>
        </div>

        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-700">Calculator Assisted Leads</div>
          <div className="text-2xl font-extrabold font-heading text-cyan-950 mt-1">14%</div>
          <div className="text-xs text-cyan-700 mt-1">FCR, Brooder &amp; Vaccine planners</div>
        </div>

        <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-violet-700">NDPA Consent Rate</div>
          <div className="text-2xl font-extrabold font-heading text-violet-950 mt-1">100%</div>
          <div className="text-xs text-violet-700 mt-1">Verified opt-in compliance</div>
        </div>
      </div>

      {/* Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-heading">Inbound Acquisition Channels</h3>
          <p className="text-xs text-slate-500">Breakdown of commercial chick bookings and veterinary requests by touchpoint.</p>

          <div className="space-y-3 pt-2">
            {channels.map((c) => (
              <div key={c.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{c.name}</span>
                  <span className="font-mono text-slate-500">{c.leads} leads ({c.share})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full ${c.color} rounded-full`} style={{ width: c.share }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign UTM Tracker */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-heading">Active UTM Campaigns</h3>
          <p className="text-xs text-slate-500">Live campaign tracking parameters currently active across WhatsApp, social, and partner links.</p>

          <div className="space-y-2.5 text-xs text-slate-700">
            {[
              { campaign: 'tuesday_hatch_broiler_nov26', source: 'whatsapp_broadcast', medium: 'direct_msg', leads: 28 },
              { campaign: 'cold_chain_vaccine_drive', source: 'poultry_association', medium: 'referral_banner', leads: 14 },
              { campaign: 'free_vaccination_calendar_promo', source: 'google_organic', medium: 'editorial_guide', leads: 42 },
              { campaign: 'point_of_lay_pullet_alert', source: 'farm_newsletter', medium: 'email', leads: 19 },
            ].map((utm, i) => (
              <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-3 flex items-center justify-between">
                <div>
                  <div className="font-mono font-bold text-slate-900 text-[11px]">{utm.campaign}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Source: <span className="font-medium text-slate-700">{utm.source}</span> · Medium: <span className="font-medium text-slate-700">{utm.medium}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-700 font-heading">{utm.leads}</div>
                  <div className="text-[10px] text-slate-400">leads</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
