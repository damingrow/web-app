import React from 'react';
import { Metadata } from 'next';
import { getLiveEnquiries } from '@/lib/supabase/data-access';
import ServicesClient from './services-client';

export const metadata: Metadata = {
  title: 'Services & Farm Consultations — Admin Operations | D-AminGrow',
  description: 'Manage commercial poultry farm setup requests, technical advisory bookings, and veterinary triage tickets.',
};

export default async function AdminServicesPage() {
  const enquiries = await getLiveEnquiries(100);
  // Filter for consultation, farm setup, and veterinary triage enquiries
  const serviceEnquiries = enquiries.filter(
    (e) =>
      e.enquiry_type === 'veterinary_consultation' ||
      e.enquiry_type === 'farm_setup_inquiry' ||
      e.user_notes?.toLowerCase().includes('triage') ||
      e.user_notes?.toLowerCase().includes('consultation') ||
      e.user_notes?.toLowerCase().includes('vaccination')
  );

  return <ServicesClient initialEnquiries={serviceEnquiries.length > 0 ? serviceEnquiries : enquiries.slice(0, 15)} />;
}
