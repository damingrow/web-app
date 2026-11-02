export type ProductCategory = 'chicks' | 'drugs' | 'vaccines' | 'accessories' | 'point-of-lay';

export type RegulatoryStatus = 'nafdac_registered' | 'pending_registration' | 'exempt_accessory' | 'cold_chain_only';

export type StockStatus = 'in_stock' | 'pre_order_only' | 'low_stock' | 'out_of_stock';

export interface ProductSpecification {
  [key: string]: string;
}

export interface ProductCompliance {
  regulatoryStatus: RegulatoryStatus;
  nafdacNumber?: string;
  withdrawalPeriod?: string;
  coldChainRequired: boolean;
  storageTemp?: string;
  prescriptionRequired?: boolean;
  activeIngredients?: string;
  targetSpecies?: string[];
  amrWarning?: boolean;
}

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryName: string;
  shortDescription: string;
  description: string;
  price?: number; // in NGN (Nigerian Naira) - optional
  priceFormatted?: string;
  priceNotice?: string; // e.g. "Market Rate — Contact for Current Price"
  unit: string; // e.g. "Carton of 50", "1 Litre Bottle", "Unit", "Vial (1,000 Doses)"
  minOrderQty: number;
  stockStatus: StockStatus;
  primaryImage: string;
  galleryImages: string[];
  compliance: ProductCompliance;
  specifications: ProductSpecification;
  features: string[];
  dispatchDays?: string[];
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}
