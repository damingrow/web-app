import React from 'react';
import { getLiveCustomers } from '@/lib/supabase/data-access';
import { CrmClient } from './crm-client';

export const revalidate = 0;

export default async function AdminCrmPage() {
  const customers = await getLiveCustomers(150);

  return <CrmClient initialCustomers={customers} />;
}
