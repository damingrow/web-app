import { describe, it, expect } from 'vitest';
import { ARTICLES, getArticleBySlug } from '@/data/articles';
import { PRODUCTS } from '@/data/products';

describe('Knowledge Centre & Clinical Advisory Articles', () => {
  it('contains valid educational articles', () => {
    expect(ARTICLES.length).toBeGreaterThanOrEqual(3);
  });

  it('ensures all article slugs are unique and retrievable', () => {
    const slugs = ARTICLES.map((a) => a.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);

    slugs.forEach((slug) => {
      const art = getArticleBySlug(slug);
      expect(art).toBeDefined();
      expect(art?.title.length).toBeGreaterThan(10);
      expect(art?.content.length).toBeGreaterThan(100);
    });
  });

  it('guarantees all related products in articles exist in the catalog', () => {
    const catalogSlugs = new Set(PRODUCTS.map((p) => p.slug));

    ARTICLES.forEach((article) => {
      article.relatedProductSlugs.forEach((slug) => {
        expect(catalogSlugs.has(slug)).toBe(true);
      });
    });
  });

  it('ensures every article has at least one clinical FAQ', () => {
    ARTICLES.forEach((article) => {
      expect(article.faqs.length).toBeGreaterThan(0);
      article.faqs.forEach((faq) => {
        expect(faq.question.length).toBeGreaterThan(5);
        expect(faq.answer.length).toBeGreaterThan(10);
      });
    });
  });
});

describe('Brooder Calculator Ratios', () => {
  it('calculates proper equipment ratios for 1,000 chicks', () => {
    const flock = 1000;
    const gasBrooders = Math.max(1, Math.ceil(flock / 900));
    const feedingTrays = Math.max(2, Math.ceil(flock / 80));
    const drinkers = Math.max(2, Math.ceil(flock / 60));
    const floorAreaSqM = flock * 0.05;

    expect(gasBrooders).toBe(2); // 1000 / 900 = 2 units
    expect(feedingTrays).toBe(13); // 1000 / 80 = 13 trays
    expect(drinkers).toBe(17); // 1000 / 60 = 17 drinkers
    expect(floorAreaSqM).toBe(50); // 50 sq metres for 1000 brooding chicks
  });
});
