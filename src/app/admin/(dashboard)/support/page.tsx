import React from 'react';
import { Metadata } from 'next';
import { getLiveEnquiries, getLiveBookings } from '@/lib/supabase/data-access';
import SupportClient from './support-client';

export const metadata: Metadata = {
  title: 'Customer Support Center — Admin Operations | D-AminGrow',
  description:
    'Manage post-dispatch chick arrival tickets, transit mortality reviews, waybill tracking, cold chain verification, and VCN clinical triage.',
};

export const revalidate = 0;

export default async function AdminSupportPage() {
  const [enquiries, bookings] = await Promise.all([
    getLiveEnquiries(100).catch(() => []),
    getLiveBookings(50).catch(() => []),
  ]);

  return <SupportClient initialEnquiries={enquiries} initialBookings={bookings} />;
}
