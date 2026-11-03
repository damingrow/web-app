import { env } from '@/lib/env';

/**
 * Storage bucket constants conforming to D-AminGrow media architecture.
 * Keeping video and large image assets decoupled from Cloudflare Worker bundle
 * ensures zero worker CPU consumption and 100% compliance with Cloudflare Free Tier.
 */
export const SUPABASE_STORAGE_BUCKETS = {
  VIDEOS: 'videos',
  PRODUCT_MEDIA: 'product-media',
  CLINICAL_ATTACHMENTS: 'clinical-attachments',
  STATIC_ASSETS: 'static-assets',
} as const;

export type SupabaseBucket =
  (typeof SUPABASE_STORAGE_BUCKETS)[keyof typeof SUPABASE_STORAGE_BUCKETS];

export interface MediaUrlOptions {
  /**
   * If true and using Supabase Image Transformations, requests WebP/AVIF format.
   */
  transform?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'origin' | 'avif' | 'webp';
  };
}

/**
 * Extracts the base Supabase storage public URL endpoint.
 */
export function getStorageBaseUrl(): string {
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/+$/, '');
  return `${supabaseUrl}/storage/v1/object/public`;
}

/**
 * Computes the direct public CDN URL for an asset stored in Supabase Storage.
 * Bypasses Cloudflare Workers completely, consuming 0 Worker invocations.
 *
 * @param bucket Name of the Supabase storage bucket (e.g. 'videos', 'product-media')
 * @param path Relative path inside the bucket (e.g. 'training/brooding-guide.mp4')
 */
export function getSupabaseMediaUrl(
  bucket: SupabaseBucket | string,
  path: string,
  options?: MediaUrlOptions
): string {
  if (!path) return '';

  // If path is already a full absolute URL, return it directly
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If path is a local static asset (e.g. /products/Chicks/broiler.jpeg), return local path
  if (path.startsWith('/')) {
    return path;
  }

  const cleanPath = path.replace(/^\/+/, '');
  const cleanBucket = bucket.replace(/^\/+|\/+$/g, '');
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/+$/, '');

  // If image transform options are provided, use render/image endpoint
  if (options?.transform) {
    const params = new URLSearchParams();
    if (options.transform.width) params.set('width', options.transform.width.toString());
    if (options.transform.height) params.set('height', options.transform.height.toString());
    if (options.transform.quality) params.set('quality', options.transform.quality.toString());
    if (options.transform.format) params.set('format', options.transform.format);

    const query = params.toString() ? `?${params.toString()}` : '';
    return `${supabaseUrl}/storage/v1/render/image/public/${cleanBucket}/${cleanPath}${query}`;
  }

  return `${supabaseUrl}/storage/v1/object/public/${cleanBucket}/${cleanPath}`;
}

/**
 * Specialized helper to get high-performance video streaming URLs from the 'videos' bucket.
 * Videos stream via HTTP 206 Partial Content directly from Supabase Edge CDN.
 *
 * @param path Video filename or relative path inside the 'videos' bucket
 */
export function getSupabaseVideoUrl(path: string): string {
  return getSupabaseMediaUrl(SUPABASE_STORAGE_BUCKETS.VIDEOS, path);
}
