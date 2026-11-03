import { describe, it, expect } from 'vitest';
import { ARTICLES } from '@/data/articles';
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
} from '@/lib/seo/structured-data';

describe('Phase 6: Editorial CMS, VCN Veterinary Sign-Off & Rich Structured Data', () => {
  describe('Veterinary Council of Nigeria (VCN) Clinical Sign-off Compliance', () => {
    it('ensures every published knowledge article has a verified clinical review', () => {
      expect(ARTICLES.length).toBeGreaterThanOrEqual(12);

      ARTICLES.forEach((article) => {
        expect(article.clinicalReview).toBeDefined();
        expect(article.clinicalReview.reviewerName).toBeTruthy();
        expect(article.clinicalReview.credentials).toContain('DVM');
      });
    });

    it('enforces valid VCN registration numbers on all reviewed articles', () => {
      const vcnRegex = /^VCN Reg #\d{4,6}$/;

      ARTICLES.forEach((article) => {
        expect(
          vcnRegex.test(article.clinicalReview.vcnRegistration),
          `Article "${article.slug}" has invalid VCN reg format: ${article.clinicalReview.vcnRegistration}`
        ).toBe(true);
      });
    });

    it('guarantees review declarations explicitly cite Veterinary Council of Nigeria', () => {
      ARTICLES.forEach((article) => {
        expect(article.clinicalReview.declaration).toContain('Veterinary Council of Nigeria');
      });
    });

    it('ensures review dates are valid ISO format', () => {
      ARTICLES.forEach((article) => {
        const timestamp = Date.parse(article.clinicalReview.reviewDate);
        expect(isNaN(timestamp)).toBe(false);
      });
    });
  });

  describe('Structured Data (JSON-LD) Generators', () => {
    it('generates compliant LocalBusiness & VeterinaryCare schema', () => {
      const schema = generateLocalBusinessSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toContain('LocalBusiness');
      expect(schema['@type']).toContain('VeterinaryCare');
      expect(schema.telephone).toBe('+2348139169402');
      expect(schema.address.addressCountry).toBe('NG');
      expect(schema.areaServed.length).toBeGreaterThan(0);
    });

    it('generates compliant BreadcrumbList schema with sequential positions', () => {
      const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Drugs', url: '/drugs' },
        { name: 'Antibiotic Powder', url: '/drugs/oxytetracycline-hcl-powder' },
      ];

      const schema = generateBreadcrumbSchema(breadcrumbs);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(3);
      expect(schema.itemListElement[0]?.position).toBe(1);
      expect(schema.itemListElement[1]?.position).toBe(2);
      expect(schema.itemListElement[2]?.position).toBe(3);
      expect(schema.itemListElement[2]?.item).toBe(
        'https://damingrow.com/drugs/oxytetracycline-hcl-powder'
      );
    });

    it('generates compliant MedicalWebPage schema with VCN reviewer linkage', () => {
      const article = ARTICLES[0]!;
      const schema = generateArticleSchema({
        title: article.title,
        subtitle: article.subtitle,
        summary: article.summary,
        slug: article.slug,
        publishedDate: article.publishedDate,
        authorName: article.author.name,
        authorRole: article.author.role,
        reviewerName: article.clinicalReview.reviewerName,
        reviewerCredentials: article.clinicalReview.credentials,
        reviewerVcnReg: article.clinicalReview.vcnRegistration,
        reviewDate: article.clinicalReview.reviewDate,
      });

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('MedicalWebPage');
      expect(schema.headline).toBe(article.title);
      expect(schema.reviewedBy).toBeDefined();

      const reviewer = schema.reviewedBy as { name: string; identifier: string };
      expect(reviewer.name).toBe(article.clinicalReview.reviewerName);
      expect(reviewer.identifier).toBe(article.clinicalReview.vcnRegistration);
    });
  });

  describe('Antimicrobial Stewardship (AMR) & Clinical Warnings', () => {
    it('ensures articles dealing with infectious diseases enforce ethical usage warnings', () => {
      const coccidiosisArticle = ARTICLES.find((a) => a.slug === 'how-to-treat-coccidiosis-poultry');
      expect(coccidiosisArticle).toBeDefined();
      expect(coccidiosisArticle?.content).toContain('Withdrawal Period');

      const vaccineArticle = ARTICLES.find((a) => a.slug === 'poultry-vaccination-schedule-nigeria');
      expect(vaccineArticle).toBeDefined();
      const hasClinicalWarning =
        vaccineArticle?.content.includes('Never vaccinate clinically sick birds') ||
        vaccineArticle?.faqs.some((f) => f.answer.includes('Never vaccinate clinically sick birds'));
      expect(hasClinicalWarning).toBe(true);
    });
  });
});
