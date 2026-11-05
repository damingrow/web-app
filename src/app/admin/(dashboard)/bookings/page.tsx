import React from 'react';
import { Metadata } from 'next';
import { getLiveBookings, getUpcomingQuotas } from '@/lib/supabase/data-access';
import BookingsClient from './bookings-client';

export const metadata: Metadata = {
  title: 'Chick Bookings & Management — Admin Operations | D-AminGrow',
  description: 'Manage Day-Old Chick reservations, deposit verifications, weekly quotas, and motor park dispatch manifests.',
};

export default async function AdminBookingsPage() {
  const [initialBookings, initialQuotas] = await Promise.all([
    getLiveBookings(100),
    getUpcomingQuotas('broiler'),
  ]);

  return <BookingsClient initialBookings={initialBookings} initialQuotas={initialQuotas} />;
}
