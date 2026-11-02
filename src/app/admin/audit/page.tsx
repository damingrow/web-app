'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ArrowLeft,
} from 'lucide-react';

const RECENT_AUDIT_LOGS = [
  {
    id: 'aud-001',
    timestamp: '2026-11-02 09:45:12',
    actorRole: 'sales_agent',
    action: 'enquiry.status_updated',
    resourceType: 'enquiry',
    resourceId: 'DAG-M8K-902',
    details: 'Status transitioned from pending_contact to contacted.',
  },
  {
    id: 'aud-002',
    timestamp: '2026-11-02 08:30:00',
    actorRole: 'super_admin',
    action: 'chick_pricing.bulk_updated',
    resourceType: 'product_variants',
    resourceId: 'weekly_batch_044',
    details: 'Commercial Broiler updated to ₦48,000. Commercial Pullet updated to ₦52,000.',
  },
  {
    id: 'aud-003',
    timestamp: '2026-11-01 16:15:22',
    actorRole: 'super_admin',
    action: 'staff.role_assigned',
    resourceType: 'staff_profiles',
    resourceId: 'staff-adeleke-01',
    details: 'Granted veterinary_consultant role with clinical enquiry view privileges.',
  },
];

export default function AdminAuditPage() {
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
            <span className="text-slate-800 font-semibold">Security Audit Log</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Administrative Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Immutable log of price modifications, staff permissions, and order lifecycle changes.
          </p>
        </div>
      </div>

      {/* Security Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-700 flex items-start space-x-3 shadow-sm">
        <ShieldAlert className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-900">Zero-Trust Audit Enforcement:</span>
          <p className="text-slate-600 leading-relaxed">
            All price synchronizations and administrative alterations are permanently recorded in the <code>audit_events</code> PostgreSQL table with actor role, IP address, and payload diffs.
          </p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/70 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-6">Actor Role</th>
                <th className="py-3.5 px-6">Action</th>
                <th className="py-3.5 px-6">Resource</th>
                <th className="py-3.5 px-6">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {RECENT_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-4 px-6">
                    <span className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-800">
                      {log.actorRole}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-800">
                    {log.action}
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {log.resourceType}:{log.resourceId}
                  </td>
                  <td className="py-4 px-6 text-slate-800 font-sans text-xs">
                    {log.details}
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
