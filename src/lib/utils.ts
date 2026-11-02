import { clsx, type ClassValue } from 'clsx';

/**
 * Robust class names utility without external vendor-chunk issues.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
