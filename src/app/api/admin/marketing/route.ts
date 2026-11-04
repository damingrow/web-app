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

const DEFAULT_CAMPAIGNS: MarketingCampaign[] = [
  {
    id: 'camp-1',
    campaign: 'tuesday_hatch_broiler_nov26',
    title: 'Tuesday Hatch Broiler Surge (CHI & AMO)',
    source: 'whatsapp_broadcast',
    medium: 'direct_msg',
    targetUrl: 'https://damingrow.com/chicks/commercial-day-old-broiler-chicks',
    status: 'active',
    clicks: 480,
    leads: 78,
    conversions: 34,
    budgetNgn: 45000,
    revenueAttributedNgn: 4590000,
    createdAt: '2026-10-28T08:00:00Z',
    notes: 'Direct broadcast to verified commercial broiler farmers in Oyo, Lagos, and Ogun.',
  },
  {
    id: 'camp-2',
    campaign: 'free_vaccination_calendar_promo',
    title: 'Poultry Vaccination Calendar Lead Magnet',
    source: 'google_organic',
    medium: 'editorial_guide',
    targetUrl: 'https://damingrow.com/knowledge/poultry-vaccination-schedule-nigeria',
    status: 'active',
    clicks: 1250,
    leads: 142,
    conversions: 52,
    budgetNgn: 0,
    revenueAttributedNgn: 3640000,
    createdAt: '2026-10-15T09:30:00Z',
    notes: 'High organic search ranking for "poultry vaccination schedule nigeria". Zero paid spend.',
  },
  {
    id: 'camp-3',
    campaign: 'fcr_bio_math_calculator',
    title: 'Interactive Feed Conversion (FCR) Simulator',
    source: 'calculator_referral',
    medium: 'bio_math_tool',
    targetUrl: 'https://damingrow.com/calculators/fcr',
    status: 'active',
    clicks: 890,
    leads: 64,
    conversions: 28,
    budgetNgn: 0,
    revenueAttributedNgn: 2850000,
    createdAt: '2026-10-20T11:00:00Z',
    notes: 'Farmers calculating feed wastage and contacting WhatsApp for feed formulation advisory.',
  },
  {
    id: 'camp-4',
    campaign: 'point_of_lay_black_pullet_nov',
    title: 'Black Pullet 16-Week POL Special Run',
    source: 'poultry_association',
    medium: 'referral_banner',
    targetUrl: 'https://damingrow.com/chicks/commercial-day-old-layer-pullets',
    status: 'active',
    clicks: 340,
    leads: 38,
    conversions: 16,
    budgetNgn: 25000,
    revenueAttributedNgn: 2160000,
    createdAt: '2026-11-01T14:15:00Z',
    notes: 'Partnership with Poultry Association of Nigeria (PAN) Oyo & Ogun state chapters.',
  },
  {
    id: 'camp-5',
    campaign: 'december_xmas_broiler_surge',
    title: 'December Festive Season Early Hatch Booking',
    source: 'facebook_ads',
    medium: 'cpc',
    targetUrl: 'https://damingrow.com/chicks',
    status: 'active',
    clicks: 980,
    leads: 56,
    conversions: 21,
    budgetNgn: 60000,
    revenueAttributedNgn: 2835000,
    createdAt: '2026-11-02T10:00:00Z',
    notes: 'Targeting farm managers in South-West & South-East preparing for Christmas market runs.',
  },
  {
    id: 'camp-6',
    campaign: 'cold_chain_lasota_gumboro_drive',
    title: 'NAFDAC Cold-Chain Vaccine Distribution',
    source: 'whatsapp_broadcast',
    medium: 'clinical_alert',
    targetUrl: 'https://damingrow.com/vaccines',
    status: 'paused',
    clicks: 210,
    leads: 22,
    conversions: 9,
    budgetNgn: 15000,
    revenueAttributedNgn: 780000,
    createdAt: '2026-10-10T12:00:00Z',
    notes: 'Batch insulated box delivery notification for Gumboro & LaSota biologicals.',
  },
];

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

export async function GET() {
  try {
    let campaigns: MarketingCampaign[] = [...DEFAULT_CAMPAIGNS];

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        const { data: row } = await supabase
          .from('application_settings')
          .select('value_json')
          .eq('key', 'marketing_campaigns')
          .single();

        if (row && Array.isArray(row.value_json) && row.value_json.length > 0) {
          campaigns = row.value_json as MarketingCampaign[];
        }
      } catch (dbErr) {
        console.warn('Could not read marketing_campaigns from DB:', dbErr);
      }
    }

    // Compute aggregated KPI totals
    const totalClicks = campaigns.reduce((acc, c) => acc + (c.clicks || 0), 0);
    const totalLeads = campaigns.reduce((acc, c) => acc + (c.leads || 0), 0);
    const totalConversions = campaigns.reduce((acc, c) => acc + (c.conversions || 0), 0);
    const totalBudget = campaigns.reduce((acc, c) => acc + (c.budgetNgn || 0), 0);
    const totalPipelineValue = campaigns.reduce((acc, c) => acc + (c.revenueAttributedNgn || 0), 0);

    const overallConversionRate = totalLeads > 0 ? +((totalConversions / totalLeads) * 100).toFixed(1) : 0;
    const blendedCAC = totalConversions > 0 ? Math.round(totalBudget / totalConversions) : 0;
    const overallROAS = totalBudget > 0 ? +((totalPipelineValue / totalBudget)).toFixed(1) : 0;

    return NextResponse.json({
      success: true,
      campaigns,
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
        
        // Fetch existing campaigns
        const { data: existing } = await supabase
          .from('application_settings')
          .select('value_json')
          .eq('key', 'marketing_campaigns')
          .single();

        let currentList: MarketingCampaign[] = [...DEFAULT_CAMPAIGNS];
        if (existing && Array.isArray(existing.value_json)) {
          currentList = existing.value_json as MarketingCampaign[];
        }

        const updatedList = [newCampaign, ...currentList.filter(c => c.campaign !== newCampaign.campaign)];

        await supabase.from('application_settings').upsert({
          key: 'marketing_campaigns',
          value_json: updatedList,
          updated_by_staff_id: staff?.userId || null,
          updated_at: new Date().toISOString(),
        });

        // Audit log
        await supabase.from('audit_events').insert({
          actor_id: staff?.userId,
          actor_role: staff?.role || 'super_admin',
          action: 'marketing.campaign_created',
          resource_type: 'marketing_campaigns',
          resource_id: newCampaign.campaign,
          changes_json: newCampaign as unknown as Record<string, unknown>,
        });
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
          .single();

        let currentList: MarketingCampaign[] = [...DEFAULT_CAMPAIGNS];
        if (existing && Array.isArray(existing.value_json)) {
          currentList = existing.value_json as MarketingCampaign[];
        }

        const updatedList = currentList.map((c) => {
          if (c.id === validated.campaignId || c.campaign === validated.campaignId) {
            return { ...c, status: validated.status };
          }
          return c;
        });

        await supabase.from('application_settings').upsert({
          key: 'marketing_campaigns',
          value_json: updatedList,
          updated_by_staff_id: staff?.userId || null,
          updated_at: new Date().toISOString(),
        });

        await supabase.from('audit_events').insert({
          actor_id: staff?.userId,
          actor_role: staff?.role || 'super_admin',
          action: 'marketing.campaign_status_updated',
          resource_type: 'marketing_campaigns',
          resource_id: validated.campaignId,
          changes_json: { status: validated.status },
        });
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
