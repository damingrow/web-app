import { z } from 'zod';

/**
 * Server and Client Environment Variable Schema
 * Validates required configuration at boot time to prevent runtime silent failures.
 */
const envSchema = z.object({
  // Public Client Variables
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string()
    .regex(/^\+[1-9]\d{1,14}$/, 'Must be a valid E.164 phone number (e.g. +2348139169402)')
    .default('+2348139169402'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default('https://placeholder.supabase.co'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default('placeholder-anon-key'),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().optional(),

  // Private Server Variables (Optional locally, required in production)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const raw = {
    ...process.env,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      'placeholder-anon-key',
  };
  const result = envSchema.safeParse(raw);
  if (!result.success) {
    console.error('Invalid environment variables detected:', result.error.flatten().fieldErrors);
    // In production, throw to fail early; in test/dev, fall back safely
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Invalid environment configuration.');
    }
  }
  return result.success ? result.data : (envSchema.parse({}) as Env);
}

export const env = parseEnv();
