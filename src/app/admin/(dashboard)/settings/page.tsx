import React from 'react';
import { Metadata } from 'next';
import SettingsClient from './settings-client';

export const metadata: Metadata = {
  title: 'Platform Settings — Admin Operations | D-AminGrow',
  description: 'Manage platform parameters, commercial banking accounts, motor park hubs, and regulatory compliance standards.',
};

export default function AdminSettingsPage() {
  return <SettingsClient />;
}
