/**
 * D-AminGrow Structured Data (JSON-LD) Generator
 * Implements Google-compliant Schema.org specifications for rich snippets,
 * Knowledge Graph, and 500k monthly search footprint expansion.
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'VeterinaryCare', 'AgriculturalService'],
    name: 'D-AminGrow Agro-Allied Services',
    alternateName: 'D-AminGrow Nigeria',
    url: 'https://damingrow.com',
    logo: 'https://damingrow.com/Brand%20identity/damingrow%20logo.png',
    image: 'https://damingrow.com/Brand%20identity/damingrow%20logo.png',
    description:
      'Premier Nigerian agro-allied solutions provider specialising in day-old chicks, point-of-lay pullets, cold-chain vaccines, NAFDAC-registered veterinary pharmaceuticals, and professional poultry farm advisory.',
    telephone: '+2348139169402',
    priceRange: '₦₦ - ₦₦₦₦',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG',
      addressRegion: 'Oyo State',
      addressLocality: 'Ibadan',
    },
    areaServed: [
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'AdministrativeArea', name: 'Lagos' },
      { '@type': 'AdministrativeArea', name: 'Oyo' },
      { '@type': 'AdministrativeArea', name: 'Ogun' },
      { '@type': 'AdministrativeArea', name: 'Kano' },
      { '@type': 'AdministrativeArea', name: 'Kaduna' },
      { '@type': 'AdministrativeArea', name: 'Enugu' },
      { '@type': 'AdministrativeArea', name: 'Rivers' },
      { '@type': 'AdministrativeArea', name: 'FCT Abuja' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:30',
        closes: '18:30',
      },
    ],
    sameAs: [
      'https://wa.me/2348139169402',
    ],
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://damingrow.com${item.url}`,
    })),
  };
}

export function generateArticleSchema({
  title,
  subtitle,
  summary,
  slug,
  publishedDate,
  authorName,
  authorRole,
  reviewerName,
  reviewerCredentials,
  reviewerVcnReg,
  reviewDate,
}: {
  title: string;
  subtitle: string;
  summary: string;
  slug: string;
  publishedDate: string;
  authorName: string;
  authorRole: string;
  reviewerName?: string;
  reviewerCredentials?: string;
  reviewerVcnReg?: string;
  reviewDate?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: title,
    alternativeHeadline: subtitle,
    description: summary,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://damingrow.com/knowledge/${slug}`,
    },
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'D-AminGrow Agro-Allied Services',
      logo: {
        '@type': 'ImageObject',
        url: 'https://damingrow.com/Brand%20identity/damingrow%20logo.png',
      },
    },
    datePublished: publishedDate,
    dateModified: reviewDate || publishedDate,
  };

  if (reviewerName && reviewerVcnReg) {
    schema.reviewedBy = {
      '@type': 'Person',
      name: reviewerName,
      jobTitle: `Veterinary Consultant (${reviewerCredentials || 'DVM'})`,
      identifier: reviewerVcnReg,
    };
  }

  return schema;
}

export function generatePillarCollectionSchema({
  pillarName,
  description,
  url,
  articles,
}: {
  pillarName: string;
  description: string;
  url: string;
  articles: { title: string; slug: string; summary: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${pillarName} — Poultry Knowledge Pillar | D-AminGrow Nigeria`,
    description,
    url: url.startsWith('http') ? url : `https://damingrow.com${url}`,
    publisher: {
      '@type': 'Organization',
      name: 'D-AminGrow Agro-Allied Services',
      logo: {
        '@type': 'ImageObject',
        url: 'https://damingrow.com/Brand%20identity/damingrow%20logo.png',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://damingrow.com/knowledge/${article.slug}`,
        name: article.title,
        description: article.summary,
      })),
    },
  };
}
