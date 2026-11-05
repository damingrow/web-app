import React from 'react';
import { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import ProductsClient from './products-client';

export const metadata: Metadata = {
  title: 'Product Inventory Center — Admin Operations | D-AminGrow',
  description: 'Manage agricultural products, NAFDAC regulatory compliance dossiers, cold-chain specifications, and withdrawal timelines.',
};

export default function AdminProductsPage() {
  return <ProductsClient initialProducts={PRODUCTS} />;
}
