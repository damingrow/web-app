'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArticleItem } from '@/data/articles';
import {
  Clock,
  ArrowRight,
  Search,
  BookOpen,
} from 'lucide-react';

interface Props {
  articles: ArticleItem[];
}

const CATEGORIES = [
  'All Guides',
  'Immunology & Vaccines',
  'Disease Management',
  'Brooding & Housing',
  'Poultry Economics & Nutrition',
  'Commercial Layers & Eggs',
  'Biosecurity & Disease Prevention',
  'Flock Health & Climate Adaptation',
  'Day-Old Chick Sourcing',
] as const;

export function KnowledgeList({ articles }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Guides');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'All Guides' || art.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clinical topics, diseases (e.g. Coccidiosis, Gumboro, Brooding)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900 font-bold">{filteredArticles.length}</strong> verified field guides
        </span>
        {selectedCategory !== 'All Guides' && (
          <span>Category: <strong className="text-emerald-700">{selectedCategory}</strong></span>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-3 bg-white">
          <BookOpen className="h-10 w-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 font-heading">No matching articles found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or browse across all categories to find what you need.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Guides');
            }}
            className="text-xs font-bold text-emerald-700 underline mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/knowledge/${article.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/10 hover:border-emerald-300 hover:-translate-y-1.5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-[11px]">
                    {article.category}
                  </span>
                  <span className="flex items-center font-medium">
                    <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                    {article.readTime}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-950 font-heading group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <div className="text-[11px] text-slate-500">
                  By <span className="font-semibold text-slate-800">{article.author.name}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:gap-2 transition-all">
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
