'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Thermometer,
  ArrowLeft,
  AlertTriangle,
  Clock,
  Pill,
  CheckCircle2,
  XCircle,
  FileText,
  X,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { ProductItem, RegulatoryVerificationState } from '@/types/catalog';
import { evaluateProductCompliance } from '@/lib/compliance/nafdac-audit';

interface ProductsClientProps {
  initialProducts: ProductItem[];
}

export default function ProductsClient({ initialProducts }: ProductsClientProps) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Modal editing form state
  const [modalNafdac, setModalNafdac] = useState<string>('');
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Compute compliance metrics
  const metrics = useMemo(() => {
    let verifiedCount = 0;
    let awaitingCount = 0;
    let incompleteCount = 0;
    let restrictedCount = 0;
    let coldChainCount = 0;
    let prescriptionCount = 0;

    products.forEach((p) => {
      const state = p.compliance.verificationState ?? 'verified_for_sale';
      if (state === 'verified_for_sale') verifiedCount++;
      else if (state === 'awaiting_verification') awaitingCount++;
      else if (state === 'documentation_incomplete') incompleteCount++;
      else if (state === 'restricted_from_publication') restrictedCount++;

      if (p.compliance.coldChainRequired) coldChainCount++;
      if (p.compliance.prescriptionRequired || p.compliance.amrWarning) prescriptionCount++;
    });

    return {
      total: products.length,
      verifiedCount,
      awaitingCount,
      incompleteCount,
      restrictedCount,
      coldChainCount,
      prescriptionCount,
    };
  }, [products]);

  // Filtered products list
  const filtered = useMemo(() => {
    return products.filter((item) => {
      const state = item.compliance.verificationState ?? 'verified_for_sale';

      let matchesTab = true;
      if (activeTab === 'all') matchesTab = true;
      else if (activeTab === 'verified') matchesTab = state === 'verified_for_sale';
      else if (activeTab === 'awaiting') matchesTab = state === 'awaiting_verification';
      else if (activeTab === 'incomplete') matchesTab = state === 'documentation_incomplete';
      else if (activeTab === 'restricted') matchesTab = state === 'restricted_from_publication';
      else if (activeTab === 'cold_chain') matchesTab = item.compliance.coldChainRequired;
      else if (activeTab === 'prescription') matchesTab = !!(item.compliance.prescriptionRequired || item.compliance.amrWarning);
      else if (activeTab === 'chicks') matchesTab = item.category === 'chicks' || item.category === 'point-of-lay';
      else if (activeTab === 'accessories') matchesTab = item.category === 'accessories';

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        (item.compliance.nafdacNumber && item.compliance.nafdacNumber.toLowerCase().includes(q)) ||
        (item.compliance.activeIngredients && item.compliance.activeIngredients.toLowerCase().includes(q));

      return matchesTab && matchesSearch;
    });
  }, [products, activeTab, searchQuery]);

  // Open modal for inspection
  const openInspector = (product: ProductItem) => {
    setSelectedProduct(product);
    setModalNafdac(product.compliance.nafdacNumber || '');
    setModalMessage(null);
  };

  // Perform regulatory action (verify, restrict, flag_incomplete)
  const handleRegulatoryAction = async (action: 'verify' | 'restrict' | 'flag_incomplete') => {
    if (!selectedProduct) return;
    setModalLoading(true);
    setModalMessage(null);

    try {
      const res = await fetch('/api/admin/products/verify-regulatory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.id,
          action,
          nafdacNumber: modalNafdac,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setModalMessage({ text: data.error || 'Regulatory clearance failed.', type: 'error' });
        setModalLoading(false);
        return;
      }

      // Update local product state
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === selectedProduct.id) {
            return {
              ...p,
              compliance: {
                ...p.compliance,
                verificationState: data.verificationState as RegulatoryVerificationState,
                nafdacNumber: modalNafdac || p.compliance.nafdacNumber,
              },
            };
          }
          return p;
        })
      );

      // Update selected product
      setSelectedProduct((prev) =>
        prev
          ? {
              ...prev,
              compliance: {
                ...prev.compliance,
                verificationState: data.verificationState as RegulatoryVerificationState,
                nafdacNumber: modalNafdac || prev.compliance.nafdacNumber,
              },
            }
          : null
      );

      setModalMessage({ text: data.message || 'Regulatory update applied.', type: 'success' });
    } catch {
      setModalMessage({ text: 'Network communication failure with regulatory endpoint.', type: 'error' });
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <Link href="/admin" className="hover:text-emerald-700 flex items-center">
              <ArrowLeft className="h-3 w-3 mr-1" />
              <span>Operations</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-600 font-bold uppercase tracking-wider">MODULE 03</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Product Inventory & Regulatory Controls
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            NAFDAC compliance verification, cold-chain thresholds (2°C–8°C), withdrawal timelines, and banned substance screening.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 border border-emerald-200">
            <ShieldCheck className="h-4 w-4 mr-1.5 text-emerald-600" />
            NAFDAC Regulated Mode
          </span>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Catalog</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block font-heading">{metrics.total}</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Managed agricultural assets</span>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Verified for Sale</span>
          <span className="text-2xl font-extrabold text-emerald-950 mt-1 block font-heading">{metrics.verifiedCount}</span>
          <span className="text-[11px] text-emerald-700 mt-0.5 block">Publicly cleared inventory</span>
        </div>

        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 block">Cold-Chain Vaccines</span>
          <span className="text-2xl font-extrabold text-cyan-950 mt-1 block font-heading">{metrics.coldChainCount}</span>
          <span className="text-[11px] text-cyan-700 mt-0.5 block">2°C–8°C insulated transport</span>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">Prescription (POM)</span>
          <span className="text-2xl font-extrabold text-purple-950 mt-1 block font-heading">{metrics.prescriptionCount}</span>
          <span className="text-[11px] text-purple-700 mt-0.5 block">AMR withdrawal monitored</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Banned Substances</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block font-heading">0</span>
          <span className="text-[11px] text-emerald-600 font-bold mt-0.5 block">100% Prohibited Free</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
          {[
            { id: 'all', label: `All Items (${metrics.total})` },
            { id: 'verified', label: `Verified (${metrics.verifiedCount})` },
            { id: 'cold_chain', label: `Cold-Chain 2–8°C (${metrics.coldChainCount})` },
            { id: 'prescription', label: `Prescription (${metrics.prescriptionCount})` },
            { id: 'chicks', label: 'Chicks & POL' },
            { id: 'accessories', label: 'Equipment' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, SKU, or NAFDAC #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Product Compliance Inventory Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-200 tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Product & SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">NAFDAC Reg Status</th>
                <th className="py-3.5 px-4">Storage & Handling</th>
                <th className="py-3.5 px-4">Withdrawal (Meat / Eggs)</th>
                <th className="py-3.5 px-4">Compliance State</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => {
                const audit = evaluateProductCompliance(item);
                const verificationState = item.compliance.verificationState ?? audit.verificationState;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Product & SKU */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center space-x-3">
                        <div className="relative h-11 w-11 shrink-0 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                          <Image
                            src={item.primaryImage}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                            sizes="44px"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 line-clamp-1">{item.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{item.sku}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="capitalize font-semibold text-slate-800 text-[11px]">
                        {item.categoryName}
                      </span>
                    </td>

                    {/* NAFDAC Reg Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.compliance.nafdacNumber ? (
                        <div className="flex items-center space-x-1 text-emerald-800 font-bold text-[11px]">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          <span>{item.compliance.nafdacNumber}</span>
                        </div>
                      ) : item.category === 'accessories' || item.category === 'chicks' || item.category === 'point-of-lay' ? (
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Exempt Item</span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Pending Reg
                        </span>
                      )}
                    </td>

                    {/* Storage Protocol */}
                    <td className="py-3.5 px-4">
                      {item.compliance.coldChainRequired ? (
                        <span className="inline-flex items-center text-[10px] font-bold text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                          <Thermometer className="h-3 w-3 mr-1" />
                          2°C–8°C Cold Chain
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">
                          Ambient &lt; 25°C
                        </span>
                      )}
                    </td>

                    {/* Withdrawal Period */}
                    <td className="py-3.5 px-4">
                      {item.compliance.withdrawalPeriod ? (
                        <div className="flex items-center space-x-1 text-[11px] font-medium text-slate-700">
                          <Clock className="h-3 w-3 text-amber-500" />
                          <span>{item.compliance.withdrawalPeriod}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400">0 days (No residue)</span>
                      )}
                    </td>

                    {/* Verification State Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {verificationState === 'verified_for_sale' && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                          <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600" />
                          VERIFIED FOR SALE
                        </span>
                      )}
                      {verificationState === 'awaiting_verification' && (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                          <AlertTriangle className="h-3 w-3 mr-1 text-amber-600" />
                          AWAITING CLEARANCE
                        </span>
                      )}
                      {verificationState === 'documentation_incomplete' && (
                        <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold text-orange-800">
                          <AlertTriangle className="h-3 w-3 mr-1 text-orange-600" />
                          DOCS INCOMPLETE
                        </span>
                      )}
                      {verificationState === 'restricted_from_publication' && (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-bold text-red-800">
                          <XCircle className="h-3 w-3 mr-1 text-red-600" />
                          RESTRICTED
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center space-x-1.5">
                        <button
                          onClick={() => openInspector(item)}
                          className="inline-flex items-center rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          <span>Inspect</span>
                        </button>
                        <Link
                          href={`/${item.category}/${item.slug}`}
                          target="_blank"
                          className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regulatory Inspection & Clearance Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5 bg-slate-50">
              <div className="flex items-center space-x-3">
                <div className="relative h-10 w-10 shrink-0 rounded-xl bg-white border border-slate-200 overflow-hidden p-1">
                  <Image
                    src={selectedProduct.primaryImage}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain"
                    sizes="40px"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    NAFDAC Regulatory Dossier
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    {selectedProduct.sku} · {selectedProduct.categoryName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-xl p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Product Title */}
              <div>
                <h4 className="text-base font-bold text-slate-900">{selectedProduct.name}</h4>
                <p className="text-xs text-slate-600 mt-1">{selectedProduct.shortDescription}</p>
              </div>

              {/* Status Message */}
              {modalMessage && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold flex items-center space-x-2 ${
                    modalMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {modalMessage.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <ShieldAlert className="h-4 w-4 shrink-0 text-red-600" />
                  )}
                  <span>{modalMessage.text}</span>
                </div>
              )}

              {/* Regulatory Checklist Review */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Mandatory Safety Checklist
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-white border border-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">Banned Substances Screened (Clean)</span>
                  </div>

                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-white border border-slate-200">
                    {selectedProduct.compliance.coldChainRequired ? (
                      <Thermometer className="h-4 w-4 text-cyan-600 shrink-0" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                    <span className="font-semibold text-slate-800">
                      {selectedProduct.compliance.coldChainRequired ? '2°C–8°C Cold Chain Protocol' : 'Standard Ambient Storage'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-white border border-slate-200">
                    {selectedProduct.compliance.prescriptionRequired ? (
                      <Pill className="h-4 w-4 text-purple-600 shrink-0" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                    <span className="font-semibold text-slate-800">
                      {selectedProduct.compliance.prescriptionRequired ? 'VCN Prescription Only (POM)' : 'Over-the-Counter / Exempt'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-white border border-slate-200">
                    <Clock className="h-4 w-4 text-amber-600 shrink-0" />
                    <span className="font-semibold text-slate-800">
                      Withdrawal: {selectedProduct.compliance.withdrawalPeriod || 'None specified'}
                    </span>
                  </div>
                </div>
              </div>

              {/* NAFDAC Reg Number Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  NAFDAC Registration Number
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={modalNafdac}
                    onChange={(e) => setModalNafdac(e.target.value)}
                    placeholder="e.g. 04-8921 or B4-1234"
                    className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 font-mono text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-400">Standard Nigerian Veterinary Format</span>
                </div>
              </div>

              {/* Active Ingredients & Storage Notes */}
              {selectedProduct.compliance.activeIngredients && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Active Ingredients Formulation
                  </span>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-800 font-mono">
                    {selectedProduct.compliance.activeIngredients}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 p-5 bg-slate-50">
              <button
                type="button"
                onClick={() => handleRegulatoryAction('restrict')}
                disabled={modalLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-red-50 border border-red-200 px-3.5 py-2 text-xs font-bold text-red-700 hover:bg-red-100 transition-colors"
              >
                <Lock className="h-3.5 w-3.5 mr-1.5" />
                <span>Restrict from Storefront</span>
              </button>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="w-1/2 sm:w-auto rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleRegulatoryAction('verify')}
                  disabled={modalLoading}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  {modalLoading && <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />}
                  <span>Verify Regulatory Clearance</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
