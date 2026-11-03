import React from 'react';
import { Metadata } from 'next';
import SupportClient from './support-client';

export const metadata: Metadata = {
  title: 'Customer Support & Issue Resolution — Admin Operations | D-AminGrow',
  description: 'Manage post-dispatch chick arrival tickets, transit mortality reviews, and client inquiries.',
};

export default function AdminSupportPage() {
  return <SupportClient />;
}
