import { describe, it, expect } from 'vitest';
import { PRODUCTS, getProductBySlug, getProductsByCategory } from '@/data/products';

describe('Product Catalog Data Integrity', () => {
  it('contains products for all 4 core business categories', () => {
    const chicks = getProductsByCategory('chicks');
    const drugs = getProductsByCategory('drugs');
    const vaccines = getProductsByCategory('vaccines');
    const accessories = getProductsByCategory('accessories');

    expect(chicks.length).toBeGreaterThanOrEqual(2);
    expect(drugs.length).toBeGreaterThanOrEqual(5);
    expect(vaccines.length).toBeGreaterThanOrEqual(2);
    expect(accessories.length).toBeGreaterThanOrEqual(8);
  });

  it('guarantees unique slugs across all products', () => {
    const slugs = PRODUCTS.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('guarantees valid NAFDAC metadata for regulated veterinary drugs', () => {
    const drugs = getProductsByCategory('drugs');
    const registeredDrugs = drugs.filter((d) => d.compliance.regulatoryStatus === 'nafdac_registered');

    expect(registeredDrugs.length).toBeGreaterThan(0);
    registeredDrugs.forEach((drug) => {
      expect(drug.compliance.nafdacNumber).toBeDefined();
      expect(drug.compliance.nafdacNumber?.length).toBeGreaterThan(3);
    });
  });

  it('enforces 2°C–8°C cold-chain requirements on all vaccines', () => {
    const vaccines = getProductsByCategory('vaccines');
    expect(vaccines.length).toBeGreaterThan(0);

    vaccines.forEach((v) => {
      expect(v.compliance.coldChainRequired).toBe(true);
      expect(v.compliance.storageTemp).toContain('2°C to 8°C');
    });
  });

  it('correctly retrieves product by slug', () => {
    const product = getProductBySlug('commercial-day-old-broiler-chicks');
    expect(product).toBeDefined();
    expect(product?.name).toBe('Commercial Day-Old Broiler Chicks');
    expect(product?.category).toBe('chicks');
  });
});
