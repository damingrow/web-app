import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES, getArticleBySlug } from '@/data/articles';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Calendar,
  Phone,
  HelpCircle,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | D-AminGrow',
    };
  }

  return {
    title: `${article.title} | D-AminGrow Knowledge Centre`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author.name],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) =>
    article.relatedProductSlugs.includes(p.slug)
  );

  // Structured Data Schema for Article & FAQ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'D-AminGrow Agro-Allied Co.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://damingrow.com/Brand%20identity/damingrow%20logo.png',
      },
    },
    datePublished: article.publishedDate,
    mainEntityOfPage: `https://damingrow.com/knowledge/${article.slug}`,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <Link href="/knowledge" className="hover:text-emerald-700">Knowledge Centre</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Header Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              {article.category}
            </span>
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
              {article.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1 text-slate-400" />
              Published {article.publishedDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 font-heading leading-tight">
            {article.title}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed font-medium">
            {article.subtitle}
          </p>

          {/* Author Byline */}
          <div className="flex items-center justify-between border-y border-slate-100 py-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold font-heading text-sm">
                {article.author.name.charAt(3) || 'D'}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{article.author.name}</div>
                <div className="text-[11px] text-slate-500">{article.author.role}</div>
              </div>
            </div>

            <a
              href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20am%20reading%20your%20guide%20on%20"${encodeURIComponent(article.title)}"%20and%20would%20like%20to%20consult.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="sm" className="hidden sm:inline-flex">
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                <span>Consult Author on WhatsApp</span>
              </Button>
            </a>
          </div>

          {/* Article Summary Box */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 text-xs text-emerald-950 leading-relaxed">
            <strong className="block text-emerald-900 font-semibold mb-1">Executive Summary:</strong>
            {article.summary}
          </div>

          {/* Markdown Content Body */}
          <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4 pt-2">
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h2 key={idx} className="text-xl font-bold font-heading text-slate-950 pt-4 pb-1">
                    {paragraph.replace('### ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('#### ')) {
                return (
                  <h3 key={idx} className="text-base font-bold font-heading text-slate-900 pt-2">
                    {paragraph.replace('#### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('---')) {
                return <hr key={idx} className="my-6 border-slate-200" />;
              }
              if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                const lines = paragraph.split('\n');
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    {lines.map((line, lIdx) => (
                      <li key={lIdx}>
                        {line.replace(/^[-*]\s+|\d+\.\s+/, '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Clinical FAQs Accordion Section */}
        {article.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
              <HelpCircle className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Frequently Asked Veterinary Questions
              </h2>
            </div>

            <div className="space-y-3">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mentioned Products in Article */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Verified Products & Formulations Mentioned in this Guide
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Order genuine inputs directly with nationwide delivery
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
