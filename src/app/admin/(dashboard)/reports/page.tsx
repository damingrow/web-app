import React from 'react';
import { Metadata } from 'next';
import { getLiveBookings, getLiveEnquiries, getDashboardMetrics, getUpcomingQuotas, getPartnerHatcheries } from '@/lib/supabase/data-access';
import ReportsClient from './reports-client';

export const metadata: Metadata = {
  title: 'Reports & Agricultural Analytics — Admin Operations | D-AminGrow',
  description: 'Commercial performance metrics, booking pipelines, regional state distribution, and financial deposit reconciliation.',
};

export default async function AdminReportsPage() {
  const [bookings, enquiries, dashMetrics, quotas, hatcheries] = await Promise.all([
    getLiveBookings(200),
    getLiveEnquiries(200),
    getDashboardMetrics(),
    getUpcomingQuotas('broiler'),
    getPartnerHatcheries(),
  ]);

  // Compute derived metrics from actual data shapes
  const metrics = {
    pendingEnquiries: dashMetrics.pendingCount,
    totalEnquiries: enquiries.length,
    totalCatalogCount: dashMetrics.totalCatalogCount,
    activeHatcheries: hatcheries.filter((h) => h.is_active).length,
    totalOpenQuota: quotas.reduce((sum, q) => sum + (q.available_cartons ?? 0), 0),
    totalBookings: bookings.length,
  };

  return (
    <ReportsClient
      bookings={bookings}
      enquiries={enquiries}
      metrics={metrics}
      quotas={quotas}
    />
  );
}
