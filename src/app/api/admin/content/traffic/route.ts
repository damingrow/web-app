import { NextResponse } from 'next/server';
import { requireStaffSession } from '@/lib/auth/server-guard';
import {
  TRAFFIC_TRAJECTORY_DATA,
  TRACKED_SEARCH_QUERIES,
  GEOGRAPHIC_TRAFFIC_BREAKDOWN,
  DEVICE_TRAFFIC_BREAKDOWN,
  CONVERSION_FUNNEL_METRICS,
  SCHEMA_RICH_SNIPPET_AUDIT,
  getOrganicTrafficOverview,
} from '@/lib/editorial/traffic-analytics';
import { getEditorialPillarStats } from '@/lib/editorial/pillars';

export async function GET() {
  const { errorResponse } = await requireStaffSession(['super_admin', 'content_editor', 'sales_agent']);
  if (errorResponse) {
    return errorResponse;
  }

  const overview = getOrganicTrafficOverview();
  const pillarStats = getEditorialPillarStats();

  return NextResponse.json({
    ok: true,
    overview,
    trajectory: TRAFFIC_TRAJECTORY_DATA,
    keywordRankings: TRACKED_SEARCH_QUERIES,
    geographicShare: GEOGRAPHIC_TRAFFIC_BREAKDOWN,
    deviceShare: DEVICE_TRAFFIC_BREAKDOWN,
    funnel: CONVERSION_FUNNEL_METRICS,
    schemaAudits: SCHEMA_RICH_SNIPPET_AUDIT,
    pillarStats,
  });
}
