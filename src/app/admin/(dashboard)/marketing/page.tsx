import React from 'react';
import { Metadata } from 'next';
import { getLiveEnquiries, getLiveBookings } from '@/lib/supabase/data-access';
import MarketingClient from './marketing-client';

export const metadata: Metadata = {
  title: 'Marketing & Lead Attribution Engine — Admin Operations | D-AminGrow',
  description: 'Track acquisition campaigns, lead sources, conversion funnels, and agricultural bio-math calculator ROI.',
};

export const revalidate = 0; // Fresh attribution data on every load

export default async function AdminMarketingPage() {
  const [enquiries, bookings] = await Promise.all([
    getLiveEnquiries(150).catch(() => []),
    getLiveBookings(150).catch(() => []),
  ]);

  return <MarketingClient enquiries={enquiries} bookings={bookings} />;
}
