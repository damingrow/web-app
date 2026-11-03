import { NextResponse } from 'next/server';
import {
  getUpcomingDispatchDates,
  generateMockQuotasForDates,
} from '@/lib/booking/booking-service';
import { getUpcomingQuotas } from '@/lib/supabase/data-access';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const breedType = searchParams.get('breedType') || 'broiler';

    const upcomingDates = getUpcomingDispatchDates(6);

    // Try fetching live DB quotas, fallback to generated deterministic quotas
    let quotas = await getUpcomingQuotas(breedType);
    if (!quotas || quotas.length === 0) {
      quotas = generateMockQuotasForDates(upcomingDates, breedType) as unknown as typeof quotas;
    }

    return NextResponse.json(
      {
        success: true,
        breedType,
        dispatchScheduleNote: 'Nationwide dispatch departs every Tuesday and Thursday morning. Bookings close 48 hours prior.',
        upcomingDates,
        quotas,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('Failed to load dispatch quotas:', error);
    const upcomingDates = getUpcomingDispatchDates(6);
    const quotas = generateMockQuotasForDates(upcomingDates, 'broiler');

    return NextResponse.json(
      {
        success: true,
        upcomingDates,
        quotas,
      },
      { status: 200 }
    );
  }
}
