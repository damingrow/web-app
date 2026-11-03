import { describe, it, expect } from 'vitest';
import {
  getSupabaseMediaUrl,
  getSupabaseVideoUrl,
  SUPABASE_STORAGE_BUCKETS,
} from '@/lib/supabase/storage';

describe('Supabase Storage Media URL Resolver', () => {
  it('correctly formats public video streaming URLs from the videos bucket', () => {
    const url = getSupabaseVideoUrl('brooding-guide-2026.mp4');
    expect(url).toContain('/storage/v1/object/public/videos/brooding-guide-2026.mp4');
  });

  it('correctly handles full absolute URLs without modifying them', () => {
    const externalUrl = 'https://cdn.example.com/videos/flock-demo.mp4';
    const result = getSupabaseMediaUrl('videos', externalUrl);
    expect(result).toBe(externalUrl);
  });

  it('correctly handles local static paths starting with /', () => {
    const localPath = '/products/Chicks/day-old-broiler.jpeg';
    const result = getSupabaseMediaUrl('product-media', localPath);
    expect(result).toBe(localPath);
  });

  it('correctly formats custom image transformation URLs', () => {
    const url = getSupabaseMediaUrl('product-media', 'layers/pullet-51.jpg', {
      transform: { width: 800, quality: 80, format: 'webp' },
    });
    expect(url).toContain('/storage/v1/render/image/public/product-media/layers/pullet-51.jpg');
    expect(url).toContain('width=800');
    expect(url).toContain('quality=80');
    expect(url).toContain('format=webp');
  });

  it('handles empty path gracefully', () => {
    expect(getSupabaseMediaUrl('videos', '')).toBe('');
  });

  it('provides expected bucket constants', () => {
    expect(SUPABASE_STORAGE_BUCKETS.VIDEOS).toBe('videos');
    expect(SUPABASE_STORAGE_BUCKETS.PRODUCT_MEDIA).toBe('product-media');
  });
});
