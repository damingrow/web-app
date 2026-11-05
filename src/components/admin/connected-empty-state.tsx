import React from 'react';
import { LucideIcon, Database, RefreshCw } from 'lucide-react';

export interface AdminConnectedEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tableName: string;
  badgeLabel?: string;
  isFiltered?: boolean;
  onClearFilters?: () => void;
  primaryAction?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  };
}

export function AdminConnectedEmptyState({
  icon: Icon,
  title,
  description,
  tableName,
  badgeLabel,
  isFiltered = false,
  onClearFilters,
  primaryAction,
  secondaryAction,
}: AdminConnectedEmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-10 sm:p-14 text-center shadow-xs">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/70 via-transparent to-transparent pointer-events-none" />

      {/* Decorative SVG topo lines matching executive theme */}
      <div className="absolute -top-12 -right-12 w-48 h-48 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-emerald-600">
          <circle cx="50" cy="50" r="20" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="35" strokeWidth="1" />
          <circle cx="50" cy="50" r="48" strokeWidth="0.75" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-lg mx-auto space-y-5">
        {/* Central Icon Pod with Pulsing Indicator */}
        <div className="relative inline-flex items-center justify-center">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50 border border-emerald-100/80 flex items-center justify-center shadow-xs">
            <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-600 drop-shadow-xs" />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-white items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </span>
        </div>

        {/* Real-time Backend Sync Health Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200/70 px-3.5 py-1 text-[11px] font-mono text-slate-600 shadow-2xs">
            <Database className="h-3 w-3 text-emerald-600" />
            <span className="font-semibold text-slate-800">Supabase:</span>
            <span className="text-emerald-700 font-bold">LIVE</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">public.{tableName}</span>
            <span className="text-slate-300">·</span>
            <span className="text-emerald-800 font-bold">0 records</span>
          </div>

          {badgeLabel && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-800">
              {badgeLabel}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 font-heading tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {isFiltered && onClearFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
              <span>Reset Filters</span>
            </button>
          )}

          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="inline-flex items-center gap-2 rounded-xl bg-[#00a854] hover:bg-[#009249] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs hover:shadow-sm transform active:scale-[0.98]"
            >
              {primaryAction.icon && (
                <primaryAction.icon className="h-4 w-4 text-white" />
              )}
              <span>{primaryAction.label}</span>
            </button>
          )}

          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              {secondaryAction.icon && (
                <secondaryAction.icon className="h-4 w-4 text-slate-500" />
              )}
              <span>{secondaryAction.label}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
