'use client';

import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';

export interface MediaVideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  badge?: string;
  caption?: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

export function MediaVideoPlayer({
  src,
  poster,
  title,
  badge = 'Verified Operations',
  caption,
  aspectRatio = 'video',
  autoPlay = true,
  loop = true,
  className = '',
}: MediaVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const ratioClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
  }[aspectRatio];

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border border-white/15 bg-slate-950 shadow-xl group ${className}`}
    >
      <div className={`relative w-full ${ratioClass} overflow-hidden`}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={isMuted}
          loop={loop}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        >
          Your browser does not support HTML5 video playback.
        </video>

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 pointer-events-none" />

        {/* Top Badge */}
        {badge && (
          <div className="absolute top-3 right-3 z-10 bg-slate-950/80 backdrop-blur-md border border-white/15 rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-emerald-300 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{badge}</span>
          </div>
        )}

        {/* Play/Pause Button on Hover */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="absolute inset-0 m-auto h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 shadow-lg scale-95 hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5 fill-current" />
          )}
        </button>

        {/* Sound Toggle Button */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="absolute bottom-3 right-3 z-20 bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 rounded-full p-2 transition-all shadow-md hover:scale-110 active:scale-95"
          title={isMuted ? 'Click for sound' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-300" />
          ) : (
            <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" />
          )}
        </button>

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-3 left-3 right-12 z-10">
          <h4 className="text-xs sm:text-sm font-bold text-white font-heading truncate drop-shadow-sm">
            {title}
          </h4>
          {caption && (
            <p className="text-[10px] sm:text-xs text-slate-300 truncate drop-shadow-sm mt-0.5">
              {caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MediaVideoPlayer;
