'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShieldCheck,
  Thermometer,
  Layers,
  Sparkles,
} from 'lucide-react';

interface VideoOption {
  id: string;
  label: string;
  badge: string;
  src: string;
  poster: string;
  livability: string;
  description: string;
}

const HERO_VIDEOS: VideoOption[] = [
  {
    id: 'chicks-cartons',
    label: 'Chicks in Cartons',
    badge: 'Direct Hatchery Allotment',
    src: 'https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/supreme%20pullets%20inside%20cartons.mp4',
    poster: '/images/poultry-hero.jpg',
    livability: '98.4% Target Livability',
    description: 'Vigorous Day-Old Broilers & Pullets verified at primary dispatch',
  },
  {
    id: 'battery-system',
    label: 'Automated Battery Cage',
    badge: 'Industrial Farm Systems',
    src: 'https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/fully%20automated%20battery%20cage%20system.mp4',
    poster: '/products/Acessories/Battery cage.jpeg',
    livability: 'Tier-1 Galvanized Systems',
    description: 'Automated drinking, feeding & egg collection architecture',
  },
  {
    id: 'amo-collections',
    label: 'AMO Pullets Collection',
    badge: 'Accredited Supplier Hub',
    src: 'https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/AMO%20pullets%20collections.mp4',
    poster: '/products/Chicks/Point of Lay.jpeg',
    livability: '100% Pre-Vaccinated',
    description: 'High-yield commercial layer stock ready for nationwide transit',
  },
];

export function HeroVideoPlayer() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = (HERO_VIDEOS[activeVideoIndex] ?? HERO_VIDEOS[0]) as VideoOption;

  // Keep playback smooth when switching video channels
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Browser autoplay restrictions handled gracefully with muted state
            setIsPlaying(false);
          });
      }
    }
  }, [activeVideoIndex]);

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

  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md p-2 sm:p-2.5 shadow-2xl group">
      {/* Main Video Screen Container */}
      <div className="relative h-[430px] sm:h-[490px] w-full rounded-2xl overflow-hidden bg-slate-950">
        <video
          ref={videoRef}
          src={current.src}
          poster={current.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setHasLoaded(true)}
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
        >
          Your browser does not support HTML5 video playback.
        </video>

        {/* Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-slate-950/50 pointer-events-none" />

        {/* Top Floating Badge: Pan-African Dispatch with radar animation */}
        <div className="absolute top-3.5 right-3.5 z-10 bg-slate-950/85 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 flex items-center gap-2 shadow-lg">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-wide">
            Verified Live Footage
          </span>
        </div>

        {/* Top Left Floating Badge: Cold-Chain & Category */}
        <div className="absolute top-3.5 left-3.5 z-10 bg-emerald-950/85 backdrop-blur-md border border-emerald-500/30 rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-emerald-300 shadow-lg">
          <Thermometer className="h-3 w-3 text-emerald-400" />
          <span>2°C–8°C Cold-Chain Verified</span>
        </div>

        {/* Center Quick Play/Pause Tap Target */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="absolute inset-0 m-auto h-14 w-14 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 shadow-xl scale-95 hover:scale-105"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5 fill-current" />}
        </button>

        {/* Floating Sound Toggle (Bottom Right of Video Area) */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          className="absolute bottom-24 sm:bottom-24 right-3.5 z-20 bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 rounded-full p-2.5 transition-all shadow-lg hover:scale-110 active:scale-95"
          title={isMuted ? 'Click to hear sound' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-slate-300" />
          ) : (
            <Volume2 className="h-4 w-4 text-emerald-400" />
          )}
        </button>

        {/* Bottom Floating Telemetry Card */}
        <div className="absolute bottom-3 inset-x-3 sm:inset-x-3.5 z-10 bg-slate-950/90 backdrop-blur-md border border-white/15 rounded-xl p-3 sm:p-3.5 space-y-2 shadow-2xl">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              {current.badge}
            </span>
            <span className="font-extrabold text-emerald-400 font-heading">
              {current.livability}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 pt-2">
            <div className="flex items-center gap-1.5 truncate mr-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{current.description}</span>
            </div>
            <span className="text-slate-300 font-semibold whitespace-nowrap">Mon &amp; Thu</span>
          </div>
        </div>
      </div>

      {/* Multi-Channel Switcher Tabs Beneath Video */}
      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-1 sm:gap-2 px-1">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mr-1 hidden sm:flex">
          <Layers className="h-3.5 w-3.5 text-emerald-400" />
          <span>Live Feeds:</span>
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
          {HERO_VIDEOS.map((video, idx) => {
            const isActive = idx === activeVideoIndex;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveVideoIndex(idx)}
                className={`text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? 'bg-slate-950' : 'bg-emerald-400'
                  }`}
                />
                <span>{video.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HeroVideoPlayer;
