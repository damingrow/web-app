import React from 'react';
import { Metadata } from 'next';
import { getLiveEnquiries } from '@/lib/supabase/data-access';
import ServicesClient from './services-client';

export const metadata: Metadata = {
  title: 'Services & Consultations Desk — Admin Operations | D-AminGrow',
  description: 'Manage commercial poultry farm setup requests, least-cost feed formulations, biosecurity audits, and consultation tickets across Nigeria.',
};

export const revalidate = 0;

export default async function AdminServicesPage() {
  const enquiries = await getLiveEnquiries(150).catch(() => []);
  const serviceEnquiries = enquiries.filter(
    (e) =>
      e.enquiry_type === 'veterinary_consultation' ||
      e.enquiry_type === 'farm_setup_inquiry' ||
      e.user_notes?.toLowerCase().includes('triage') ||
      e.user_notes?.toLowerCase().includes('consultation') ||
      e.user_notes?.toLowerCase().includes('vaccination') ||
      e.user_notes?.toLowerCase().includes('feed')
  );

  return (
    <ServicesClient
      initialEnquiries={serviceEnquiries.length > 0 ? serviceEnquiries : enquiries}
    />
  );
}
