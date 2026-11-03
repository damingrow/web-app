import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';

/**
 * Privileged Service-Role Supabase Client (STRICTLY SERVER-SIDE)
 * Bypasses RLS for administrative operations, webhooks, and background jobs.
 * Uses pure Supabase JS SDK with zero dependency on next/headers cookies.
 */
export function createAdminClient() {
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    // Graceful fallback to public anon key if service role is not provided in dev/test
    return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
