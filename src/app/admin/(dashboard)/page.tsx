import React from 'react';
import { Metadata } from 'next';
import {
  getDashboardMetrics,
  getLiveBookings,
  getUpcomingQuotas,
  getLiveCustomers,
} from '@/lib/supabase/data-access';
import { OverviewClient } from './overview-client';

export const metadata: Metadata = {
  title: 'Executive Directorate Cockpit — D-AminGrow Enterprise Operations',
  description:
    'Commercial poultry operations cockpit: live chick bookings, Zenith Bank escrow clearing, VCN clinical triaging, and nationwide motor park waybills.',
};

export const revalidate = 0; // Fresh live metrics on every admin visit

export default async function AdminDashboardPage() {
  const [metrics, bookings, quotas, customers] = await Promise.all([
    getDashboardMetrics(),
    getLiveBookings(20),
    getUpcomingQuotas('broiler'),
    getLiveCustomers(20),
  ]);

  return (
    <OverviewClient
      metrics={metrics}
      bookings={bookings}
      quotas={quotas}
      customers={customers}
    />
  );
}
