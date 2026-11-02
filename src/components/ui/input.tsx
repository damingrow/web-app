import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={twMerge(
            clsx(
              'w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 transition-colors',
              'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-400'
                : 'border-slate-300 focus:border-[#00BF62] focus:ring-[#00BF62]',
              'disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed',
              className
            )
          )}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-red-600 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-slate-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
