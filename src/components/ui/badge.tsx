import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'coldchain'
    | 'prescription'
    | 'nafdac'
    | 'chick';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border';

  const variants = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    destructive: 'bg-rose-50 text-rose-800 border-rose-200',
    coldchain: 'bg-sky-50 text-sky-800 border-sky-300 font-semibold',
    prescription: 'bg-rose-50 text-rose-900 border-rose-300 font-semibold',
    nafdac: 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold',
    chick: 'bg-amber-50 text-amber-900 border-amber-300 font-semibold',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
