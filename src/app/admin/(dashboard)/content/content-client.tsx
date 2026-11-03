'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ArticleItem } from '@/data/articles';

interface ContentClientProps {
  articles: ArticleItem[];
}

export default function ContentClient({ articles }: ContentClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pillarFilter, setPillarFilter] = useState('all');

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPillar = pillarFilter === 'all' || a.category === pillarFilter;
    return matchesSearch && matchesPillar;
  });

  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const vcnReviewedCount = articles.filter((a) => a.clinicalReview).length;

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <BookOpen className="h-4 w-4" />
            <span>Editorial Engine · Module 06</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Content &amp; Editorial SEO Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage the 6 content authority pillars, VCN clinical reviews, and organic search knowledge architecture.
          </p>
        </div>

        <Link
          href="/knowledge"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
        >
          <span>View Public Knowledge Base</span>
          <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Published Guides</div>
          <div className="text-2xl font-extrabold font-heading text-slate-900 mt-1">{articles.length}</div>
          <div className="text-xs text-slate-500 mt-1">Cornerstone &amp; technical guides</div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">VCN Reviewed Guides</div>
          <div className="text-2xl font-extrabold font-heading text-emerald-950 mt-1">{vcnReviewedCount}</div>
          <div className="text-xs text-emerald-700 mt-1">Verified veterinary sign-off</div>
        </div>

        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-700">Authority Pillars</div>
          <div className="text-2xl font-extrabold font-heading text-cyan-950 mt-1">{categories.length}</div>
          <div className="text-xs text-cyan-700 mt-1">Core topical categories</div>
        </div>

        <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-violet-700">Organic Ranking Target</div>
          <div className="text-2xl font-extrabold font-heading text-violet-950 mt-1">500K+ / mo</div>
          <div className="text-xs text-violet-700 mt-1">West African search audience</div>
        </div>
      </div>

      {/* 4 Content Quality Classifications */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 shadow-md">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
          Editorial Classification Framework
        </div>
        <h3 className="text-base font-bold font-heading mb-3">Enforced Publishing Approval Standards</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="font-bold text-emerald-300">1. Agricultural Education</div>
            <div className="text-[11px] text-slate-400 mt-0.5">General brooder setup &amp; farming tips. Reviewed by content editor.</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="font-bold text-cyan-300">2. Technical Management</div>
            <div className="text-[11px] text-slate-400 mt-0.5">FCR math, lighting programs &amp; cage engineering. Technical lead approval.</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-emerald-500/30 p-3 bg-emerald-950/20">
            <div className="font-bold text-amber-300">3. Veterinary Clinical (VCN)</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Vaccine protocols &amp; disease triage. Mandatory VCN surgeon review.</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="font-bold text-purple-300">4. Commercial Sourcing</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Parent-stock hatchery specifications &amp; cold-chain distribution docs.</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search guide titles, keywords, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={pillarFilter}
            onChange={(e) => setPillarFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Topical Pillars</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Directory */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Guide Title</th>
                <th className="px-4 py-3">Pillar / Category</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">VCN Clinical Reviewer</th>
                <th className="px-4 py-3">Read Time</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3 text-right">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900 line-clamp-1">{a.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{a.summary}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      {a.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-slate-800">{a.author.name}</div>
                    <div className="text-[10px] text-slate-400">{a.author.role}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {a.clinicalReview ? (
                      <div>
                        <div className="font-bold text-emerald-800 flex items-center gap-1">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          <span>{a.clinicalReview.reviewerName}</span>
                        </div>
                        <div className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded w-fit mt-0.5">
                          {a.clinicalReview.vcnRegistration}
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">General Education</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500 font-medium">{a.readTime}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400 font-mono text-[11px]">{a.publishedDate}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link
                      href={`/knowledge/${a.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <span>View</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
