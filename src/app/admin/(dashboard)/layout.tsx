import React from 'react';
import { Metadata } from 'next';
import { AdminShell } from '@/components/admin/admin-shell';

export const metadata: Metadata = {
  title: 'Operations Cockpit — D-AminGrow Enterprise Admin',
  description: 'Enterprise poultry commercial operations, NAFDAC regulatory compliance, and commercial consultations desk.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
