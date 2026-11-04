import React from 'react';
import { Metadata } from 'next';
import { getPartnerHatcheries, getUpcomingQuotas } from '@/lib/supabase/data-access';
import ChicksPricingClient from './chicks-pricing-client';

export const metadata: Metadata = {
  title: 'Chicks Pricing & Quota Command — Admin Operations | D-AminGrow',
  description:
    'Live synchronizer for commercial day-old chick rates across partner hatcheries (CHI, Zartech, Amo, Sayed, Valentine), bi-weekly Tuesday & Thursday dispatch allocations, and pricing matrix.',
};

export const revalidate = 0;

export default async function AdminChicksPricingPage() {
  const [hatcheries, quotas] = await Promise.all([
    getPartnerHatcheries().catch(() => []),
    getUpcomingQuotas('broiler').catch(() => []),
  ]);

  return (
    <ChicksPricingClient
      initialHatcheries={hatcheries}
      initialQuotas={quotas}
    />
  );
}
