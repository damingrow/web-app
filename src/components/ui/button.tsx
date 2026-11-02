import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'teal' | 'outline' | 'ghost' | 'destructive' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed motion-reduce:transition-none';

    const variants = {
      primary:
        'bg-[#00BF62] text-white hover:bg-[#009e50] active:bg-[#007c40] focus:ring-[#00BF62] shadow-sm',
      secondary:
        'bg-[#7ED956] text-[#0f172a] hover:bg-[#5db720] active:bg-[#488c1c] focus:ring-[#7ED956] shadow-sm',
      teal:
        'bg-[#056782] text-white hover:bg-[#045268] active:bg-[#054355] focus:ring-[#056782] shadow-sm',
      outline:
        'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-[#00BF62]',
      ghost:
        'text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
      destructive:
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500',
      whatsapp:
        'bg-[#25D366] text-white hover:bg-[#128C7E] active:bg-[#075E54] focus:ring-[#25D366] shadow-sm font-semibold',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 min-h-[36px]',
      md: 'text-sm px-4 py-2.5 min-h-[44px]', // 44px min touch target for mobile a11y
      lg: 'text-base px-6 py-3 min-h-[48px]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
