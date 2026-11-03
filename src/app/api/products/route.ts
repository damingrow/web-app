import { NextResponse } from 'next/server';
import { PRODUCTS, getProductsByCategory } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q')?.toLowerCase();
  const complianceFilter = searchParams.get('compliance');
  const includeUnverified = searchParams.get('include_unverified') === 'true';

  let results = category ? getProductsByCategory(category) : PRODUCTS;

  // By default, public API strictly excludes unverified or restricted products
  if (!includeUnverified) {
    results = results.filter((p) => {
      const state = p.compliance.verificationState ?? 'verified_for_sale';
      return state === 'verified_for_sale';
    });
  }

  // Optional compliance facet filter
  if (complianceFilter === 'cold_chain') {
    results = results.filter((p) => p.compliance.coldChainRequired);
  } else if (complianceFilter === 'prescription') {
    results = results.filter((p) => p.compliance.prescriptionRequired || p.compliance.amrWarning);
  }

  if (query) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        (p.compliance.nafdacNumber && p.compliance.nafdacNumber.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({
    total: results.length,
    products: results,
  });
}
