import React from 'react';
import { getLiveEnquiries, DbEnquiry } from '@/lib/supabase/data-access';
import { EnquiriesClient } from './enquiries-client';

export const revalidate = 0; // Fresh inquiries on every page visit

export default async function EnquiriesManagementPage() {
  let enquiries: DbEnquiry[] = [];
  try {
    enquiries = await getLiveEnquiries(100);
  } catch (err) {
    console.error('Failed to load live enquiries safely:', err);
  }

  return <EnquiriesClient initialEnquiries={enquiries} />;
}
