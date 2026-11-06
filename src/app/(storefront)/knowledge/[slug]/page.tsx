import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES, getArticleBySlug } from '@/data/articles';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data';
import {
  Clock,
  Calendar,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Sparkles,
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
      title: 'Article Not Found | D-AminGrow Knowledge Centre',
    };
  }

  return {
    title: `${article.title} | D-AminGrow Nigeria`,
    description: article.summary,
    openGraph: {
      title: `${article.title} — Veterinary Guide`,
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

  const otherArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  // Structured Data Schemas (MedicalWebPage, BreadcrumbList & FAQPage for Google SEO)
  const articleJsonLd = generateArticleSchema({
    title: article.title,
    subtitle: article.subtitle,
    summary: article.summary,
    slug: article.slug,
    publishedDate: article.publishedDate,
    authorName: article.author.name,
    authorRole: article.author.role,
    reviewerName: article.clinicalReview?.reviewerName,
    reviewerCredentials: article.clinicalReview?.credentials,
    reviewerVcnReg: article.clinicalReview?.vcnRegistration,
    reviewDate: article.clinicalReview?.reviewDate,
  });

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Knowledge Centre', url: '/knowledge' },
    { name: article.title, url: `/knowledge/${article.slug}` },
  ]);

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
    <div className="min-h-screen bg-slate-50/80">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ====================================================================
          ARTICLE HEADER (DARK HERO)
          ==================================================================== */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden border-b border-emerald-950/60">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <Link href="/knowledge" className="hover:text-emerald-400 transition-colors">Knowledge Centre</Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-emerald-400 truncate max-w-xs">{article.category}</span>
          </nav>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="section-label-dark">
                <Sparkles className="h-3 w-3 text-emerald-400" />
                {article.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {article.readTime}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                Published {article.publishedDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white leading-tight tracking-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {article.subtitle}
            </p>
          </div>

          {/* Author Byline & Direct WhatsApp Consultation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center space-x-3.5">
              <div className="h-11 w-11 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-extrabold font-heading text-base shadow-md">
                {article.author.name.charAt(4) || 'D'}
              </div>
              <div>
                <div className="text-sm font-bold text-white font-heading">{article.author.name}</div>
                <div className="text-xs text-slate-400">{article.author.role}</div>
              </div>
            </div>

            <a
              href={`https://wa.me/2348139169402?text=Hello%20Dr.%20Adeleke%20/%20D-AminGrow,%20I%20am%20reading%20your%20guide%20on%20"${encodeURIComponent(article.title)}"%20and%20need%20veterinary%20advice.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-5 py-2.5 rounded-xl transition-all text-xs shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Ask Author on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          ARTICLE CONTENT CONTAINER
          ==================================================================== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Main Article Body Card */}
        <article className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-8">
          {/* VCN Clinical Peer Review Callout */}
          {article.clinicalReview && (
            <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50/80 to-slate-50 p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-violet-200/60 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 rounded-lg bg-violet-600 text-white flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-violet-950 font-heading block">
                      Clinically Reviewed & Verified
                    </span>
                    <span className="text-[11px] text-violet-800 font-semibold">
                      {article.clinicalReview.reviewerName} · {article.clinicalReview.credentials}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-200/80 text-violet-900 border border-violet-300">
                    {article.clinicalReview.vcnRegistration}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Audited: {article.clinicalReview.reviewDate}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed italic">
                &ldquo;{article.clinicalReview.declaration}&rdquo;
              </p>
            </div>
          )}

          {/* Executive Summary Callout */}
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 to-teal-50/40 p-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-900 font-heading">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Veterinary Executive Summary
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {article.summary}
            </p>
          </div>

          {/* Formatted Content Body */}
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-6">
            {article.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();

              if (trimmed.startsWith('### ')) {
                return (
                  <h2 key={idx} className="text-xl sm:text-2xl font-extrabold font-heading text-slate-950 pt-6 pb-1 border-b border-slate-100 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {trimmed.replace('### ', '')}
                  </h2>
                );
              }

              if (trimmed.startsWith('#### ')) {
                return (
                  <h3 key={idx} className="text-base sm:text-lg font-bold font-heading text-slate-900 pt-4">
                    {trimmed.replace('#### ', '')}
                  </h3>
                );
              }

              if (trimmed.startsWith('---')) {
                return <hr key={idx} className="my-8 border-slate-200" />;
              }

              if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
                const lines = trimmed.split('\n');
                return (
                  <ul key={idx} className="space-y-2.5 my-4">
                    {lines.map((line, lIdx) => {
                      const cleanText = line.replace(/^[-*]\s+|\d+\.\s+/, '');
                      return (
                        <li key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{cleanText}</span>
                        </li>
                      );
                    })}
                  </ul>
                );
              }

              return (
                <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* In-Article Consultation CTA */}
          <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Direct Veterinary Advisory
              </span>
              <h4 className="text-base sm:text-lg font-bold font-heading">
                Have questions about executing this protocol on your farm?
              </h4>
              <p className="text-xs text-slate-300">
                Our farm consultation desk is available 7 days a week to guide your stocking and treatments.
              </p>
            </div>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20have%20questions%20regarding%20the%20veterinary%20protocol%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-xs whitespace-nowrap shadow-lg shrink-0"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Advisory</span>
            </a>
          </div>
        </article>

        {/* Clinical FAQs Section */}
        {article.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-4">
              <HelpCircle className="h-6 w-6 text-emerald-600" />
              <div>
                <h2 className="text-xl font-extrabold text-slate-950 font-heading">
                  Frequently Asked Veterinary Questions
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Clinical answers to common field complications</p>
              </div>
            </div>

            <div className="space-y-4">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 font-heading flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      Q
                    </span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mentioned Products in Article */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <div className="section-label mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                Verified Clinical Inputs
              </div>
              <h2 className="text-2xl font-extrabold text-slate-950 font-heading">
                Supplies & Formulations Mentioned in this Guide
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Order genuine inputs directly with nationwide delivery to your farm location.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

        {/* Read Next / Related Articles */}
        {otherArticles.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950 font-heading">
                  More Clinical Guides & Farm Research
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Continue building your livestock management knowledge</p>
              </div>
              <Link
                href="/knowledge"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>All Guides</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherArticles.map((other) => (
                <Link
                  key={other.id}
                  href={`/knowledge/${other.slug}`}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {other.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {other.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {other.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>Read Article</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
