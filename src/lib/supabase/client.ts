import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/lib/env';

/**
 * Browser-side Supabase client.
 * Uses public anon key. Enforces Row Level Security (RLS) automatically.
 */
export function createClient() {
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
