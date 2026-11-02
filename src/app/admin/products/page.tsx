'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import {
  Search,
  ExternalLink,
  ShieldCheck,
  Thermometer,
  ArrowLeft,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = PRODUCTS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <Link href="/admin" className="hover:text-emerald-700 flex items-center">
              <ArrowLeft className="h-3 w-3 mr-1" />
              <span>Dashboard</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Catalog Inventory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Product Inventory & Asset Health
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Verified local assets, compliance status, and retail pricing ({PRODUCTS.length} total products)
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'chicks', label: 'Chicks' },
            { id: 'drugs', label: 'Drugs' },
            { id: 'vaccines', label: 'Vaccines' },
            { id: 'accessories', label: 'Accessories' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 pl-9 pr-4 py-1.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/70 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Product & Asset</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Retail Price</th>
                <th className="py-3.5 px-6">Packaging Unit</th>
                <th className="py-3.5 px-6">Regulatory Compliance</th>
                <th className="py-3.5 px-6 text-right">Storefront</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-12 w-12 shrink-0 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                        <Image
                          src={item.primaryImage}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{item.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="capitalize font-semibold text-slate-700">
                      {item.categoryName}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    {item.priceFormatted}
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {item.unit}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      {item.compliance.coldChainRequired && (
                        <span className="inline-flex items-center text-[10px] font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 w-fit">
                          <Thermometer className="h-3 w-3 mr-1" />
                          2°C–8°C Cold-Chain
                        </span>
                      )}
                      {item.compliance.nafdacNumber && (
                        <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 w-fit">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          NAFDAC: {item.compliance.nafdacNumber}
                        </span>
                      )}
                      {item.compliance.regulatoryStatus === 'exempt_accessory' && (
                        <span className="text-[10px] text-slate-500">
                          Exempt Equipment
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/${item.category}/${item.slug}`}
                      target="_blank"
                      className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      <span>View</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
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
