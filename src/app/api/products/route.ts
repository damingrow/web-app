import { NextResponse } from 'next/server';
import { PRODUCTS, getProductsByCategory } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q')?.toLowerCase();

  let results = category ? getProductsByCategory(category) : PRODUCTS;

  if (query) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    total: results.length,
    products: results,
  });
}
