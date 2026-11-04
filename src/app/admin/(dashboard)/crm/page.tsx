import React from 'react';
import { Metadata } from 'next';
import { getLiveCustomers } from '@/lib/supabase/data-access';
import { CrmClient } from './crm-client';

export const metadata: Metadata = {
  title: 'Farmer CRM & Commercial Accounts — Admin Operations | D-AminGrow',
  description: 'Deduplicated directory of poultry producers, E.164 phone identity, lifetime order value (LTV), loyalty tiers, and WhatsApp re-engagement.',
};

export const revalidate = 0; // Fresh CRM sync on every visit

export default async function AdminCrmPage() {
  const customers = await getLiveCustomers(200).catch(() => []);

  return <CrmClient initialCustomers={customers} />;
}
