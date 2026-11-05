/**
 * D-AminGrow Live Chick Pricing Data Store
 * Provides unified schema, baseline seed rates, and helper formatters
 * for zero-latency synchronisation between /admin and storefront components.
 */

export interface ChickRateItem {
  id: string;
  breed: string;
  breedCode: string;
  hatcheryBrand: string;
  hatcheryCode?: string;
  priceNgn: number; // Price per carton (e.g. 100000)
  currentPriceNgn: number;
  birdsPerCarton: number; // 50 or 30
  unitPriceNgn: number; // Price per single bird (e.g. 2000)
  rateFormatted: string; // e.g. "₦2,000"
  unitLabel: string; // "per chick" or "per poult"
  cartonQtyLabel: string; // "50 in carton" or "30 in carton"
  cartonTotalFormatted: string; // "₦100,000"
  badge: string;
  accent: string;
  status: 'active' | 'limited_allocation' | 'sold_out';
  dispatchDays: string;
}

export const BASELINE_CHICK_RATES: ChickRateItem[] = [
  {
    id: 'brl-cobb500',
    breed: 'Commercial Broilers',
    breedCode: 'BRL-COMM',
    hatcheryBrand: 'Chi / Amo / Zartech Certified Grade',
    hatcheryCode: 'CHI/AMO/ZAR',
    priceNgn: 100000,
    currentPriceNgn: 100000,
    birdsPerCarton: 50,
    unitPriceNgn: 2000,
    rateFormatted: '₦2,000',
    unitLabel: 'per chick',
    cartonQtyLabel: '50 in carton',
    cartonTotalFormatted: '₦100,000',
    badge: 'Fast FCR (1.60)',
    accent: 'border-emerald-300 bg-emerald-50/50',
    status: 'active',
    dispatchDays: 'Mon & Thu',
  },
  {
    id: 'lay-zarblack',
    breed: 'Zartech Pullet',
    breedCode: 'ZAR-PLT',
    hatcheryBrand: 'Zartech Farms — Certified Pullets',
    hatcheryCode: 'ZAR',
    priceNgn: 135000,
    currentPriceNgn: 135000,
    birdsPerCarton: 50,
    unitPriceNgn: 2700,
    rateFormatted: '₦2,700',
    unitLabel: 'per chick',
    cartonQtyLabel: '50 in carton',
    cartonTotalFormatted: '₦135,000',
    badge: 'High Egg Yield',
    accent: 'border-teal-300 bg-teal-50/50',
    status: 'active',
    dispatchDays: 'Mon & Thu',
  },
  {
    id: 'tky-hybrid',
    breed: 'Hybrid Turkey',
    breedCode: 'TKY-HYB',
    hatcheryBrand: 'Amo / Zartech Hybrid Line',
    hatcheryCode: 'AMO/ZAR',
    priceNgn: 165000,
    currentPriceNgn: 165000,
    birdsPerCarton: 30,
    unitPriceNgn: 5500,
    rateFormatted: '₦5,500',
    unitLabel: 'per poult',
    cartonQtyLabel: '30 in carton',
    cartonTotalFormatted: '₦165,000',
    badge: 'Heavyweight',
    accent: 'border-amber-300 bg-amber-50/50',
    status: 'active',
    dispatchDays: 'Mon & Thu',
  },
  {
    id: 'tky-local',
    breed: 'Local Turkey',
    breedCode: 'TKY-LOC',
    hatcheryBrand: 'Indigenous Improved Turkey Line',
    hatcheryCode: 'VAL',
    priceNgn: 69000,
    currentPriceNgn: 69000,
    birdsPerCarton: 30,
    unitPriceNgn: 2300,
    rateFormatted: '₦2,300',
    unitLabel: 'per poult',
    cartonQtyLabel: '30 in carton',
    cartonTotalFormatted: '₦69,000',
    badge: 'High Hardiness',
    accent: 'border-orange-300 bg-orange-50/50',
    status: 'active',
    dispatchDays: 'Mon & Thu',
  },
  {
    id: 'noi-kuroiler',
    breed: 'Noiler',
    breedCode: 'NOI-STD',
    hatcheryBrand: 'Dual-Yield Heavy Line',
    hatcheryCode: 'AMO/VAL',
    priceNgn: 37500,
    currentPriceNgn: 37500,
    birdsPerCarton: 50,
    unitPriceNgn: 750,
    rateFormatted: '₦750',
    unitLabel: 'per chick',
    cartonQtyLabel: '50 in carton',
    cartonTotalFormatted: '₦37,500',
    badge: 'Dual Purpose',
    accent: 'border-lime-300 bg-lime-50/50',
    status: 'active',
    dispatchDays: 'Mon & Thu',
  },
  {
    id: 'ckr-heavy',
    breed: 'Cockerel',
    breedCode: 'CKR-STD',
    hatcheryBrand: 'Certified Cockerel Brooder Grade',
    hatcheryCode: 'AMO/CHI',
    priceNgn: 5000,
    currentPriceNgn: 5000,
    birdsPerCarton: 50,
    unitPriceNgn: 100,
    rateFormatted: '₦100',
    unitLabel: 'per chick',
    cartonQtyLabel: '50 in carton',
    cartonTotalFormatted: '₦5,000',
    badge: 'Budget Friendly',
    accent: 'border-slate-300 bg-slate-50/50',
    status: 'active',
    dispatchDays: 'Mon & Thu',
  },
];

export function formatPriceItem(item: Partial<ChickRateItem> & { priceNgn: number }): ChickRateItem {
  const birdsPerCarton = item.birdsPerCarton || (item.breed?.toLowerCase().includes('turkey') ? 30 : 50);
  const unitPrice = Math.round(item.priceNgn / birdsPerCarton);
  const isTurkey = item.breed?.toLowerCase().includes('turkey');

  return {
    id: item.id || 'breed-custom',
    breed: item.breed || 'Commercial Chick',
    breedCode: item.breedCode || 'DOC',
    hatcheryBrand: item.hatcheryBrand || 'Certified Partner Hatcheries',
    hatcheryCode: item.hatcheryCode || 'PARTNER',
    priceNgn: item.priceNgn,
    currentPriceNgn: item.priceNgn,
    birdsPerCarton,
    unitPriceNgn: unitPrice,
    rateFormatted: '₦' + unitPrice.toLocaleString('en-NG'),
    unitLabel: isTurkey ? 'per poult' : 'per chick',
    cartonQtyLabel: `${birdsPerCarton} in carton`,
    cartonTotalFormatted: '₦' + item.priceNgn.toLocaleString('en-NG'),
    badge: item.badge || 'Verified Batch',
    accent: item.accent || 'border-emerald-300 bg-emerald-50/50',
    status: item.status || 'active',
    dispatchDays: item.dispatchDays || 'Mon & Thu',
  };
}

// In-memory cache for ultra-fast serverless/local synchronization
declare global {
  var __damingrow_live_chick_rates: ChickRateItem[] | undefined;
}

export function getInMemoryChickRates(): ChickRateItem[] {
  if (globalThis.__damingrow_live_chick_rates && globalThis.__damingrow_live_chick_rates.length > 0) {
    return globalThis.__damingrow_live_chick_rates;
  }
  return BASELINE_CHICK_RATES;
}

export function setInMemoryChickRates(rates: ChickRateItem[]): void {
  globalThis.__damingrow_live_chick_rates = rates;
}
