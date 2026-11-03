'use client';

import React, { useState } from 'react';
import { getSupabaseVideoUrl } from '@/lib/supabase/storage';
import { Play, AlertCircle } from 'lucide-react';

export interface SupabaseVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /**
   * Video filename or relative path inside the Supabase 'videos' bucket,
   * or a full URL/local path.
   * Example: 'farm-tours/kano-hatchery-dispatch.mp4'
   */
  videoPath: string;
  /**
   * Optional poster image path (local /products/... or Supabase storage path)
   */
  posterPath?: string;
  /**
   * Accessible title or description for the video
   */
  title?: string;
  /**
   * Custom CSS wrapper classes
   */
  containerClassName?: string;
}

/**
 * High-performance, data-conscious HTML5 Video Player for D-AminGrow.
 * Streams directly from Supabase Storage CDN using HTTP 206 Byte-Range requests.
 * Consumes 0 Cloudflare Worker CPU cycles and stays 100% within Cloudflare Free Tier.
 */
export function SupabaseVideo({
  videoPath,
  posterPath,
  title,
  containerClassName = '',
  className = '',
  controls = true,
  preload = 'metadata',
  playsInline = true,
  ...props
}: SupabaseVideoProps) {
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoUrl = getSupabaseVideoUrl(videoPath);

  if (!videoPath) {
    return null;
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-md ${containerClassName}`}
    >
      {hasError ? (
        <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400 min-h-[200px]">
          <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
          <p className="text-sm font-medium text-slate-300">Video temporarily unavailable</p>
          <p className="text-xs text-slate-500 mt-1">
            Please ensure this video is published in the Supabase &ldquo;videos&rdquo; storage bucket.
          </p>
        </div>
      ) : (
        <video
          src={videoUrl}
          poster={posterPath}
          title={title}
          controls={controls}
          preload={preload}
          playsInline={playsInline}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setHasError(true)}
          className={`w-full h-auto block object-cover ${className}`}
          {...props}
        >
          Your browser does not support the video tag.
        </video>
      )}

      {/* Subtle brand watermarking badge for enterprise video presentation */}
      {!isPlaying && !hasError && (
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
          <Play className="h-2.5 w-2.5 fill-current" />
          <span>D-AminGrow Media</span>
        </div>
      )}
    </div>
  );
}

export default SupabaseVideo;
