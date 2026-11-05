import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';
import { requireStaffSession } from '@/lib/auth/server-guard';

export interface MarketingCampaign {
  id: string;
  campaign: string;
  title: string;
  source: string;
  medium: string;
  targetUrl: string;
  status: 'active' | 'paused' | 'completed';
  clicks: number;
  leads: number;
  conversions: number;
  budgetNgn: number;
  revenueAttributedNgn: number;
  createdAt: string;
  notes?: string;
}

export interface ChannelAttribution {
  channel: string;
  source: string;
  count: number;
  share: string;
  leads: number;
  conversionRate: string;
  revenueAttributedNgn: number;
  color: string;
  bg: string;
  badge: string;
}

const createCampaignSchema = z.object({
  campaign: z.string().min(3).regex(/^[a-z0-9_-]+$/, 'Campaign must use lowercase alphanumeric, hyphens or underscores'),
  title: z.string().min(3),
  source: z.string().min(2),
  medium: z.string().min(2),
  targetUrl: z.string().url(),
  budgetNgn: z.number().nonnegative().default(0),
  notes: z.string().optional(),
});

const updateCampaignStatusSchema = z.object({
  campaignId: z.string().min(1),
  status: z.enum(['active', 'paused', 'completed']),
});

/** Derive channel attribution analytics from live enquiries UTM data */
async function computeChannelAttribution(supabase: ReturnType<typeof createAdminClient>): Promise<ChannelAttribution[]> {
  const { data: enquiries } = await supabase
    .from('enquiries')
    .select('utm_source, utm_medium, utm_campaign, estimated_subtotal_ngn, status')
    .order('created_at', { ascending: false })
    .limit(500);

  if (!enquiries || enquiries.length === 0) return [];

  // Aggregate by channel
  const channelMap = new Map<string, { count: number; leads: number; revenue: number }>();
  for (const e of enquiries) {
    const src = (e.utm_source as string | null) || 'direct';
    const existing = channelMap.get(src) || { count: 0, leads: 0, revenue: 0 };
    existing.count++;
    if (e.status === 'fulfilled' || e.status === 'deposit_received') {
      existing.leads++;
      existing.revenue += (e.estimated_subtotal_ngn as number | null) || 0;
    }
    channelMap.set(src, existing);
  }

  const totalCount = enquiries.length;
  const colorMap: Record<string, { color: string; bg: string; badge: string }> = {
    whatsapp:    { color: '#25D366', bg: 'bg-green-500',  badge: 'Direct Conversion' },
    google:      { color: '#4285F4', bg: 'bg-blue-500',   badge: 'Organic Search' },
    google_ads:  { color: '#FBBC04', bg: 'bg-yellow-500', badge: 'Paid Acquisition' },
    facebook:    { color: '#1877F2', bg: 'bg-blue-600',   badge: 'Social Media' },
    referral:    { color: '#8B5CF6', bg: 'bg-purple-500', badge: 'Referral Network' },
    calculator:  { color: '#10B981', bg: 'bg-emerald-500',badge: 'Bio-Math Tool' },
    direct:      { color: '#6B7280', bg: 'bg-slate-500',  badge: 'Direct Traffic' },
  };

  const result: ChannelAttribution[] = [];
  channelMap.forEach((stats, src) => {
    const pct = totalCount > 0 ? ((stats.count / totalCount) * 100).toFixed(1) : '0';
    const convRate = stats.count > 0 ? ((stats.leads / stats.count) * 100).toFixed(1) : '0';
    const c = colorMap[src] || { color: '#6B7280', bg: 'bg-slate-500', badge: 'Other Channel' };
    result.push({
      channel: src.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      source: src,
      count: stats.count,
      share: `${pct}%`,
      leads: stats.leads,
      conversionRate: `${convRate}%`,
      revenueAttributedNgn: stats.revenue,
      color: c.color,
      bg: c.bg,
      badge: c.badge,
    });
  });

  return result.sort((a, b) => b.count - a.count);
}

export async function GET() {
  const { errorResponse } = await requireStaffSession(['super_admin', 'sales_agent', 'content_editor']);
  if (errorResponse) return errorResponse;

  try {
    let campaigns: MarketingCampaign[] = [];
    let channelAttribution: ChannelAttribution[] = [];

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();

        const [settingsResult, channelResult] = await Promise.all([
          supabase
            .from('application_settings')
            .select('value_json')
            .eq('key', 'marketing_campaigns')
            .maybeSingle(),
          computeChannelAttribution(supabase),
        ]);

        if (settingsResult.data && Array.isArray(settingsResult.data.value_json)) {
          campaigns = settingsResult.data.value_json as MarketingCampaign[];
        }
        channelAttribution = channelResult;
      } catch (dbErr) {
        console.warn('Could not read marketing data from DB:', dbErr);
      }
    }

    // Compute aggregated KPI totals from actual campaigns only
    const totalClicks = campaigns.reduce((acc, c) => acc + (c.clicks || 0), 0);
    const totalLeads = campaigns.reduce((acc, c) => acc + (c.leads || 0), 0);
    const totalConversions = campaigns.reduce((acc, c) => acc + (c.conversions || 0), 0);
    const totalBudget = campaigns.reduce((acc, c) => acc + (c.budgetNgn || 0), 0);
    const totalPipelineValue = campaigns.reduce((acc, c) => acc + (c.revenueAttributedNgn || 0), 0);
    const overallConversionRate = totalLeads > 0 ? +((totalConversions / totalLeads) * 100).toFixed(1) : 0;
    const blendedCAC = totalConversions > 0 ? Math.round(totalBudget / totalConversions) : 0;
    const overallROAS = totalBudget > 0 ? +(totalPipelineValue / totalBudget).toFixed(1) : 0;

    return NextResponse.json({
      success: true,
      campaigns,
      channelAttribution,
      kpis: {
        totalClicks,
        totalLeads,
        totalConversions,
        totalBudgetNgn: totalBudget,
        totalPipelineValueNgn: totalPipelineValue,
        overallConversionRate,
        blendedCAC,
        overallROAS,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Marketing API GET error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error fetching marketing metrics' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent', 'content_editor']);
  if (errorResponse) {
    if (env.SUPABASE_SERVICE_ROLE_KEY) return errorResponse;
  }

  try {
    const body = await request.json();
    const validated = createCampaignSchema.parse(body);

    const newCampaign: MarketingCampaign = {
      id: `camp-${Date.now()}`,
      campaign: validated.campaign,
      title: validated.title,
      source: validated.source,
      medium: validated.medium,
      targetUrl: validated.targetUrl,
      status: 'active',
      clicks: 0,
      leads: 0,
      conversions: 0,
      budgetNgn: validated.budgetNgn,
      revenueAttributedNgn: 0,
      createdAt: new Date().toISOString(),
      notes: validated.notes,
    };

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        const { data: existing } = await supabase
          .from('application_settings')
          .select('value_json')
          .eq('key', 'marketing_campaigns')
          .maybeSingle();

        const currentList: MarketingCampaign[] = (existing && Array.isArray(existing.value_json))
          ? (existing.value_json as MarketingCampaign[])
          : [];

        const updatedList = [newCampaign, ...currentList.filter(c => c.campaign !== newCampaign.campaign)];

        await Promise.all([
          supabase.from('application_settings').upsert({
            key: 'marketing_campaigns',
            value_json: updatedList,
            updated_at: new Date().toISOString(),
          }),
          supabase.from('audit_events').insert({
            actor_id: staff?.userId,
            actor_role: staff?.role || 'super_admin',
            action: 'marketing.campaign_created',
            resource_type: 'marketing_campaigns',
            resource_id: newCampaign.campaign,
            changes_json: newCampaign as unknown as Record<string, unknown>,
          }),
        ]);
      } catch (dbErr) {
        console.error('Failed to persist campaign in Supabase:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Campaign "${newCampaign.title}" created successfully and tracking activated.`,
      campaign: newCampaign,
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid campaign parameters', errors: err.flatten().fieldErrors },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error creating marketing campaign' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'sales_agent', 'content_editor']);
  if (errorResponse) {
    if (env.SUPABASE_SERVICE_ROLE_KEY) return errorResponse;
  }

  try {
    const body = await request.json();
    const validated = updateCampaignStatusSchema.parse(body);

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        const { data: existing } = await supabase
          .from('application_settings')
          .select('value_json')
          .eq('key', 'marketing_campaigns')
          .maybeSingle();

        const currentList: MarketingCampaign[] = (existing && Array.isArray(existing.value_json))
          ? (existing.value_json as MarketingCampaign[])
          : [];

        const updatedList = currentList.map(c =>
          (c.id === validated.campaignId || c.campaign === validated.campaignId)
            ? { ...c, status: validated.status }
            : c
        );

        await Promise.all([
          supabase.from('application_settings').upsert({
            key: 'marketing_campaigns',
            value_json: updatedList,
            updated_at: new Date().toISOString(),
          }),
          supabase.from('audit_events').insert({
            actor_id: staff?.userId,
            actor_role: staff?.role || 'super_admin',
            action: 'marketing.campaign_status_updated',
            resource_type: 'marketing_campaigns',
            resource_id: validated.campaignId,
            changes_json: { status: validated.status },
          }),
        ]);
      } catch (dbErr) {
        console.error('Failed to update campaign status in Supabase:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Campaign status updated to ${validated.status}.`,
      campaignId: validated.campaignId,
      status: validated.status,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to update campaign status' },
      { status: 500 }
    );
  }
}
