import React from 'react';
import { Metadata } from 'next';
import { ARTICLES } from '@/data/articles';
import ContentClient from './content-client';

export const metadata: Metadata = {
  title: 'Content & Editorial SEO Engine — Admin Operations | D-AminGrow',
  description: 'Manage agricultural guides, VCN veterinary clinical reviews, keyword authority pillars, and publishing schedules.',
};

export default function AdminContentPage() {
  return <ContentClient articles={ARTICLES} />;
}
