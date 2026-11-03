import React from 'react';
import { Metadata } from 'next';
import { getLiveEnquiries } from '@/lib/supabase/data-access';
import MarketingClient from './marketing-client';

export const metadata: Metadata = {
  title: 'Marketing & Lead Attribution — Admin Operations | D-AminGrow',
  description: 'Track acquisition campaigns, lead sources, conversion funnels, and marketing consents.',
};

export default async function AdminMarketingPage() {
  const enquiries = await getLiveEnquiries(50);
  return <MarketingClient enquiries={enquiries} />;
}
