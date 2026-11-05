import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';
import {
  BASELINE_CHICK_RATES,
  formatPriceItem,
  getInMemoryChickRates,
  setInMemoryChickRates,
  ChickRateItem,
} from '@/lib/chicks/pricing-store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    let resolvedRates: ChickRateItem[] = getInMemoryChickRates();

    // Query Supabase for persisted admin rate overrides if database is configured
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        const { data: settingsData } = await supabase
          .from('application_settings')
          .select('value_json, updated_at')
          .eq('key', 'chick_pricing_rates')
          .maybeSingle();

        if (settingsData && Array.isArray(settingsData.value_json) && settingsData.value_json.length > 0) {
          const dbRates = settingsData.value_json;

          // Merge DB rates into baseline metadata to preserve badges, accents, and carton counts
          const merged = BASELINE_CHICK_RATES.map((base) => {
            const dbMatch = dbRates.find(
              (r: { id?: string; breed?: string; priceNgn?: number; status?: string }) =>
                r.id === base.id || r.breed?.toLowerCase() === base.breed.toLowerCase()
            );

            if (dbMatch && typeof dbMatch.priceNgn === 'number') {
              return formatPriceItem({
                ...base,
                priceNgn: dbMatch.priceNgn,
                currentPriceNgn: dbMatch.priceNgn,
                status: (dbMatch.status as ChickRateItem['status']) || base.status,
              });
            }
            return base;
          });

          resolvedRates = merged;
          setInMemoryChickRates(merged);
        }
      } catch (dbErr) {
        console.warn('Could not read chick_pricing_rates from Supabase, using in-memory store:', dbErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        rates: resolvedRates,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    console.error('Error serving live chick pricing:', error);
    return NextResponse.json(
      {
        success: true,
        rates: BASELINE_CHICK_RATES,
        fallback: true,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  }
}
