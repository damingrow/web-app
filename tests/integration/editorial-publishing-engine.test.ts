import { describe, it, expect } from 'vitest';
import {
  EDITORIAL_PILLARS,
  getPillarForArticle,
  getArticlesForPillar,
  getPillarBySlug,
  getEditorialPillarStats,
  validateVcnClinicalSignOff,
  SEASONAL_PUBLISHING_CALENDAR,
} from '@/lib/editorial/pillars';
import {
  TRAFFIC_TRAJECTORY_DATA,
  TRACKED_SEARCH_QUERIES,
  GEOGRAPHIC_TRAFFIC_BREAKDOWN,
  DEVICE_TRAFFIC_BREAKDOWN,
  CONVERSION_FUNNEL_METRICS,
  SCHEMA_RICH_SNIPPET_AUDIT,
  getOrganicTrafficOverview,
} from '@/lib/editorial/traffic-analytics';
import { generatePillarCollectionSchema } from '@/lib/seo/structured-data';
import { ARTICLES } from '@/data/articles';

describe('Phase 6: 6-Pillar Editorial Publishing Engine & Organic Traffic Dashboard', () => {
  describe('6-Pillar Programmatic Taxonomy & Traffic Ambition', () => {
    it('defines exactly 6 canonical agro-allied authority pillars', () => {
      expect(EDITORIAL_PILLARS).toHaveLength(6);
      const expectedIds = [
        'immunology-vaccines',
        'disease-triage',
        'brooding-housing',
        'commercial-layers',
        'poultry-economics',
        'chick-sourcing',
      ];
      expect(EDITORIAL_PILLARS.map((p) => p.id)).toEqual(expectedIds);
    });

    it('aggregates to exceed the 500,000 monthly organic traffic milestone', () => {
      const stats = getEditorialPillarStats();
      expect(stats.totalTargetMonthlyVisits).toBeGreaterThanOrEqual(500000);
      expect(stats.totalTargetMonthlyVisits).toBe(690000);
    });

    it('ensures each pillar contains required E-E-A-T and regulatory standards', () => {
      EDITORIAL_PILLARS.forEach((p) => {
        expect(p.name).toBeTruthy();
        expect(p.shortTitle).toBeTruthy();
        expect(p.badge).toBeTruthy();
        expect(p.description.length).toBeGreaterThan(40);
        expect(p.targetAudience).toBeTruthy();
        expect(p.clinicalReviewStandard).toBeTruthy();
        expect(p.featuredTopics.length).toBeGreaterThanOrEqual(3);
        expect(p.primaryKeywords.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('categorizes search queries with valid intent and search volume', () => {
      EDITORIAL_PILLARS.forEach((p) => {
        p.primaryKeywords.forEach((kw) => {
          expect(['Informational', 'Commercial', 'Transactional']).toContain(kw.intent);
          expect(kw.estimatedMonthlySearches).toBeGreaterThan(0);
          expect(['Low', 'Medium', 'High']).toContain(kw.competition);
        });
      });
    });
  });

  describe('Article-to-Pillar Mapping & Retrieval', () => {
    it('maps every published knowledge article to one of the 6 pillars', () => {
      ARTICLES.forEach((article) => {
        const pillar = getPillarForArticle(article);
        expect(pillar).toBeDefined();
        expect(EDITORIAL_PILLARS.some((p) => p.id === pillar.id)).toBe(true);
      });
    });

    it('retrieves articles belonging to specific pillars', () => {
      const vaccineArticles = getArticlesForPillar('immunology-vaccines');
      expect(vaccineArticles.length).toBeGreaterThanOrEqual(1);
      expect(vaccineArticles.some((a) => a.slug === 'poultry-vaccination-schedule-nigeria')).toBe(true);

      const diseaseArticles = getArticlesForPillar('disease-triage');
      expect(diseaseArticles.length).toBeGreaterThanOrEqual(1);
      expect(diseaseArticles.some((a) => a.slug === 'how-to-treat-coccidiosis-poultry')).toBe(true);
    });

    it('finds pillars by slug or ID', () => {
      const p = getPillarBySlug('immunology-vaccines');
      expect(p).toBeDefined();
      expect(p?.shortTitle).toBe('Vaccines & Cold-Chain');

      const nonExistent = getPillarBySlug('non-existent-pillar');
      expect(nonExistent).toBeUndefined();
    });
  });

  describe('Veterinary Council of Nigeria (VCN) Clinical Sign-Off Gate', () => {
    it('approves compliant VCN credentials and normalizes registration format', () => {
      const result = validateVcnClinicalSignOff({
        reviewerName: 'Dr. A. O. Bello, DVM, FCVSN',
        credentials: 'DVM, FCVSN (Avian Medicine)',
        vcnRegistration: 'VCN Reg #08492',
        declaration:
          'Clinically audited for vaccine strain efficacy, maternal antibody decay timing, and compliance with Veterinary Council of Nigeria (VCN) biosecurity standards.',
        amrComplianceVerified: true,
        dosageVerified: true,
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.normalizedVcnReg).toBe('VCN Reg #08492');
    });

    it('rejects invalid or missing VCN registration numbers', () => {
      const result = validateVcnClinicalSignOff({
        reviewerName: 'Dr. A. O. Bello, DVM',
        credentials: 'DVM',
        vcnRegistration: 'INVALID-1234',
        declaration: 'Compliant with Veterinary Council of Nigeria rules.',
        amrComplianceVerified: true,
        dosageVerified: true,
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes('Invalid VCN Registration'))).toBe(true);
    });

    it('rejects non-DVM qualifications for clinical articles', () => {
      const result = validateVcnClinicalSignOff({
        reviewerName: 'John Doe',
        credentials: 'B.Sc Animal Science',
        vcnRegistration: 'VCN Reg #08492',
        declaration: 'Compliant with Veterinary Council of Nigeria rules.',
        amrComplianceVerified: true,
        dosageVerified: true,
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes('Doctor of Veterinary Medicine'))).toBe(true);
    });

    it('blocks publication if Antimicrobial Resistance (AMR) audit is unverified', () => {
      const result = validateVcnClinicalSignOff({
        reviewerName: 'Dr. K. A. Adeleke, DVM',
        credentials: 'DVM',
        vcnRegistration: 'VCN Reg #06114',
        declaration: 'Compliant with Veterinary Council of Nigeria rules.',
        amrComplianceVerified: false,
        dosageVerified: true,
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes('Antimicrobial Stewardship'))).toBe(true);
    });

    it('blocks publication if dosage and withdrawal checks are unverified', () => {
      const result = validateVcnClinicalSignOff({
        reviewerName: 'Dr. K. A. Adeleke, DVM',
        credentials: 'DVM',
        vcnRegistration: 'VCN Reg #06114',
        declaration: 'Compliant with Veterinary Council of Nigeria rules.',
        amrComplianceVerified: true,
        dosageVerified: false,
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes('Dosage calculations'))).toBe(true);
    });
  });

  describe('Organic Search Performance & 500k Milestone Analytics', () => {
    it('verifies 12-month trajectory crossing 500,000 monthly visits', () => {
      expect(TRAFFIC_TRAJECTORY_DATA).toHaveLength(12);

      const nov = TRAFFIC_TRAJECTORY_DATA.find((t) => t.month === 'Nov 2026')!;
      expect(nov.actualVisits).toBeGreaterThanOrEqual(500000);
      expect(nov.actualVisits).toBe(512400);

      const overview = getOrganicTrafficOverview();
      expect(overview.milestoneAchieved).toBe(true);
      expect(overview.latestMonthlyVisits).toBe(512400);
    });

    it('confirms tracked keywords reflect commercial Nigerian poultry search queries', () => {
      expect(TRACKED_SEARCH_QUERIES.length).toBeGreaterThanOrEqual(8);

      const topRanked = TRACKED_SEARCH_QUERIES.filter((q) => q.currentRank === 1);
      expect(topRanked.length).toBeGreaterThanOrEqual(3);

      const dayOldQuery = TRACKED_SEARCH_QUERIES.find((q) =>
        q.keyword.includes('day old chicks price')
      );
      expect(dayOldQuery).toBeDefined();
      expect(dayOldQuery?.currentRank).toBe(1);
    });

    it('validates geographic traffic distribution with Nigeria leading at >70%', () => {
      const nigeria = GEOGRAPHIC_TRAFFIC_BREAKDOWN.find((g) => g.country === 'Nigeria')!;
      expect(nigeria.percentage).toBeGreaterThan(70);

      const totalPercentage = GEOGRAPHIC_TRAFFIC_BREAKDOWN.reduce((sum, g) => sum + g.percentage, 0);
      expect(Math.round(totalPercentage)).toBe(100);
    });

    it('validates mobile device share reflecting on-pen farmer usage (>80%)', () => {
      const mobile = DEVICE_TRAFFIC_BREAKDOWN.find((d) => d.device === 'Mobile')!;
      expect(mobile.percentage).toBeGreaterThan(80);
    });

    it('models downstream conversion funnel to GMV', () => {
      expect(CONVERSION_FUNNEL_METRICS.calculatorConversionPct).toBeGreaterThan(20);
      expect(CONVERSION_FUNNEL_METRICS.whatsappConversionPct).toBeGreaterThan(5);
      expect(CONVERSION_FUNNEL_METRICS.estimatedGrossMerchandiseValueNgn).toBeGreaterThan(100000000);
    });

    it('verifies Schema.org Rich Snippet audit covers all key entity types', () => {
      expect(SCHEMA_RICH_SNIPPET_AUDIT.length).toBe(5);
      SCHEMA_RICH_SNIPPET_AUDIT.forEach((s) => {
        expect(s.complianceRatePct).toBe(100);
        expect(s.serpStatus).toBe('Eligible & Active');
      });
    });
  });

  describe('Pillar Collection Page Structured Data Schema', () => {
    it('generates valid CollectionPage and ItemList JSON-LD for pillars', () => {
      const pillar = EDITORIAL_PILLARS[0]!;
      const articles = getArticlesForPillar(pillar.id);

      const schema = generatePillarCollectionSchema({
        pillarName: pillar.name,
        description: pillar.description,
        url: `/knowledge/pillar/${pillar.slug}`,
        articles: articles.map((a) => ({
          title: a.title,
          slug: a.slug,
          summary: a.summary,
        })),
      });

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('CollectionPage');
      expect(schema.name).toContain(pillar.name);
      expect(schema.url).toBe(`https://damingrow.com/knowledge/pillar/${pillar.slug}`);

      const mainEntity = schema.mainEntity as {
        '@type': string;
        itemListElement: { position: number; url: string; name: string }[];
      };
      expect(mainEntity['@type']).toBe('ItemList');
      expect(mainEntity.itemListElement.length).toBe(articles.length);
      expect(mainEntity.itemListElement[0]?.position).toBe(1);
    });
  });

  describe('90-Day Seasonal Publishing Calendar', () => {
    it('defines an 8-week seasonal release schedule aligned with Nigerian weather and market cycles', () => {
      expect(SEASONAL_PUBLISHING_CALENDAR.length).toBe(8);
      const weeks = SEASONAL_PUBLISHING_CALENDAR.map((s) => s.week);
      expect(weeks).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

      SEASONAL_PUBLISHING_CALENDAR.forEach((item) => {
        expect(item.targetTitle).toBeTruthy();
        expect(item.targetKeyword).toBeTruthy();
        expect(item.leadReviewer).toContain('VCN Reg');
      });
    });
  });
});
