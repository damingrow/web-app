import React from 'react';
import { Metadata } from 'next';
import ToolsClient from './tools-client';

export const metadata: Metadata = {
  title: 'Farm Tools & Calculators Desk — Admin Operations | D-AminGrow',
  description: 'Manage agricultural calculators, biological formulas, downloadable pen charts, and farmer utility assets.',
};

export default function AdminToolsPage() {
  return <ToolsClient />;
}
