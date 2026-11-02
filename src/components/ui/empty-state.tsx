import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => (
  <div
    className={twMerge(
      clsx('flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50', className)
    )}
  >
    {icon && <div className="mb-4 text-slate-400">{icon}</div>}
    <h4 className="text-base font-semibold text-slate-900 font-heading">{title}</h4>
    <p className="text-sm text-slate-500 max-w-sm mt-1">{description}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div
    className={twMerge(clsx('animate-pulse rounded-md bg-slate-200/80', className))}
    {...props}
  />
);
