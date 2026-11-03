-- ==============================================================================
-- D-AMINGROW MIGRATION: 6-PILLAR EDITORIAL PUBLISHING & ORGANIC TRAFFIC DASHBOARD
-- Migration ID: 20261103000007_editorial_pillars_and_traffic
-- Description: Creates 6-pillar taxonomy tables, editorial workflow states,
--              SEO keyword tracking, and organic traffic snapshot tables.
-- ==============================================================================

-- 1. EDITORIAL WORKFLOW STATUS ENUM
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'editorial_workflow_status') THEN
        CREATE TYPE editorial_workflow_status AS ENUM (
            'draft',
            'editorial_review',
            'veterinary_review',
            'published',
            'archived'
        );
    END IF;
END$$;

-- 2. EDITORIAL PILLARS TABLE
CREATE TABLE IF NOT EXISTS editorial_pillars (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    short_title TEXT NOT NULL,
    badge TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    description TEXT NOT NULL,
    target_audience TEXT NOT NULL,
    monthly_traffic_target INTEGER NOT NULL DEFAULT 100000,
    clinical_review_standard TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed 6 Canonical Editorial Pillars
INSERT INTO editorial_pillars (id, slug, name, short_title, badge, icon_name, description, target_audience, monthly_traffic_target, clinical_review_standard)
VALUES
    ('immunology-vaccines', 'immunology-vaccines', 'Immunology, Cold Chain & Vaccination Schedules', 'Vaccines & Cold-Chain', 'Clinical Immunization', 'Syringe', 'Calibrated immunization timetables, maternal antibody decay timelines, and cold-chain protocols.', 'Broiler rearers, layer pullet managers & hatcheries', 120000, 'Mandatory VCN Surgeon audit for serological timing and water sanitizer neutralisation.'),
    ('disease-triage', 'disease-triage', 'Clinical Disease Triage & Antimicrobial Stewardship', 'Disease Triage & AMR', 'Veterinary Clinical SOS', 'Stethoscope', 'Symptom matching for acute mortality, post-mortem differential diagnosis, and strict NAFDAC withdrawal periods.', 'Farm owners managing disease outbreaks and mortality', 145000, 'Mandatory VCN clinical review with explicit NAFDAC withdrawal periods and AMR warnings.'),
    ('brooding-housing', 'brooding-housing', 'Brooding Engineering & Tropical Housing Design', 'Brooding & Housing', 'Farm Infrastructure', 'Flame', 'Thermal brooding (32°C–35°C), radiant gas canopy calibration, open-sided pen cross-ventilation.', 'Broiler attendants, farm builders & startup poultry entrepreneurs', 85000, 'Agricultural engineering and microclimate audit for tropical thermal stress abatement.'),
    ('commercial-layers', 'commercial-layers', 'Commercial Layers & Point-of-Lay Optimization', 'Layers & Point-of-Lay', 'Egg Production Scale', 'Egg', 'Laying curve management, Hen-Day Production (HDP) benchmarks, step-up lighting, and coarse calcium feeding.', 'Commercial layer farmers, Point-of-Lay pullet buyers, egg aggregators', 95000, 'Reproductive physiology, pre-lay booster immunization, and metabolic calcium balance review.'),
    ('poultry-economics', 'poultry-economics', 'Poultry Economics, Feed Formulation & FCR', 'Feed & FCR Economics', 'Margin Engineering', 'Scale', 'Feed Conversion Ratio (FCR) targets, Pearson Square feed formulation, and net margin cost per kg live weight.', 'Farm controllers, commercial feed millers, independent on-farm mixers', 110000, 'Avian nutrition review for amino acid and metabolizable energy density balance.'),
    ('chick-sourcing', 'chick-sourcing', 'Hatchery Genetics & Day-Old Chick Sourcing', 'Hatcheries & Genetics', 'Breeder Genetics', 'Building2', 'Performance benchmarks across Zartech, Amo, Chi, Supreme, and Agrited parent stocks. Tuesday & Thursday dispatches.', 'Broiler growers, layer farmers, turkey rearers & cooperatives', 135000, 'Biosecurity inspection and maternal immunity verification for parent breeding flocks.')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    monthly_traffic_target = EXCLUDED.monthly_traffic_target;

-- 3. ENHANCE KNOWLEDGE ARTICLES WITH PILLAR SLUG & WORKFLOW STATUS
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'knowledge_articles' AND column_name = 'pillar_slug') THEN
        ALTER TABLE knowledge_articles ADD COLUMN pillar_slug TEXT REFERENCES editorial_pillars(slug) ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'knowledge_articles' AND column_name = 'workflow_status') THEN
        ALTER TABLE knowledge_articles ADD COLUMN workflow_status editorial_workflow_status NOT NULL DEFAULT 'published';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'knowledge_articles' AND column_name = 'target_keywords') THEN
        ALTER TABLE knowledge_articles ADD COLUMN target_keywords JSONB NOT NULL DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'knowledge_articles' AND column_name = 'seo_score') THEN
        ALTER TABLE knowledge_articles ADD COLUMN seo_score INTEGER NOT NULL DEFAULT 95;
    END IF;
END$$;

-- 4. SEO KEYWORD RANKING TRACKER TABLE
CREATE TABLE IF NOT EXISTS seo_keyword_rankings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword TEXT UNIQUE NOT NULL,
    pillar_slug TEXT REFERENCES editorial_pillars(slug) ON DELETE CASCADE,
    intent TEXT NOT NULL CHECK (intent IN ('Informational', 'Commercial', 'Transactional')),
    current_rank INTEGER NOT NULL,
    previous_rank INTEGER NOT NULL,
    monthly_search_volume INTEGER NOT NULL,
    estimated_visits INTEGER NOT NULL,
    serp_features JSONB NOT NULL DEFAULT '[]'::jsonb,
    ranking_url TEXT NOT NULL,
    tracked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_seo_rankings_pillar ON seo_keyword_rankings(pillar_slug);
CREATE INDEX IF NOT EXISTS idx_seo_rankings_rank ON seo_keyword_rankings(current_rank);

-- 5. ORGANIC TRAFFIC MONTHLY SNAPSHOTS TABLE
CREATE TABLE IF NOT EXISTS organic_traffic_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    snapshot_month TEXT UNIQUE NOT NULL, -- e.g. "2026-11"
    month_label TEXT NOT NULL,          -- e.g. "Nov 2026"
    actual_visits INTEGER NOT NULL,
    target_visits INTEGER NOT NULL,
    organic_impressions INTEGER NOT NULL,
    click_through_rate_pct NUMERIC(4,2) NOT NULL,
    indexed_urls_count INTEGER NOT NULL,
    calculator_launches INTEGER NOT NULL DEFAULT 0,
    whatsapp_consultation_clicks INTEGER NOT NULL DEFAULT 0,
    chick_booking_submissions INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed initial snapshots
INSERT INTO organic_traffic_snapshots (snapshot_month, month_label, actual_visits, target_visits, organic_impressions, click_through_rate_pct, indexed_urls_count, calculator_launches, whatsapp_consultation_clicks, chick_booking_submissions)
VALUES
    ('2026-09', 'Sep 2026', 418000, 410000, 5320000, 7.9, 118, 118000, 28400, 5020),
    ('2026-10', 'Oct 2026', 472500, 460000, 5950000, 7.9, 124, 132000, 31900, 5680),
    ('2026-11', 'Nov 2026', 512400, 500000, 6420000, 8.0, 132, 143500, 34800, 6150)
ON CONFLICT (snapshot_month) DO UPDATE SET
    actual_visits = EXCLUDED.actual_visits,
    organic_impressions = EXCLUDED.organic_impressions;

-- 6. STORED PROCEDURES FOR EDITORIAL PUBLISHING & VCN VALIDATION
CREATE OR REPLACE FUNCTION submit_article_for_vcn_review(
    p_article_id UUID,
    p_reviewer_name TEXT,
    p_reviewer_credentials TEXT,
    p_reviewer_vcn_reg TEXT,
    p_review_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_is_staff BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM staff_profiles sp WHERE sp.id = auth.uid()
    ) INTO v_is_staff;

    -- Update article state
    UPDATE knowledge_articles
    SET
        reviewer_name = p_reviewer_name,
        reviewer_credentials = p_reviewer_credentials,
        reviewer_vcn_reg = p_reviewer_vcn_reg,
        workflow_status = 'veterinary_review',
        updated_at = NOW()
    WHERE id = p_article_id;

    -- Record in audit log
    INSERT INTO clinical_review_audits (
        article_id, reviewer_name, reviewer_vcn_reg, review_notes
    ) VALUES (
        p_article_id, p_reviewer_name, p_reviewer_vcn_reg, p_review_notes
    );

    RETURN jsonb_build_object('ok', TRUE, 'workflow_status', 'veterinary_review');
END;
$$;

-- 7. ROW LEVEL SECURITY POLICIES
ALTER TABLE editorial_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_keyword_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE organic_traffic_snapshots ENABLE ROW LEVEL SECURITY;

-- Public can read published editorial pillars & snapshots (used on marketing/knowledge pages)
CREATE POLICY "editorial_pillars_public_read" ON editorial_pillars FOR SELECT USING (TRUE);
CREATE POLICY "seo_keyword_rankings_public_read" ON seo_keyword_rankings FOR SELECT USING (TRUE);
CREATE POLICY "organic_traffic_snapshots_public_read" ON organic_traffic_snapshots FOR SELECT USING (TRUE);

-- Staff can modify editorial tables
CREATE POLICY "editorial_pillars_staff_all" ON editorial_pillars FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM staff_profiles WHERE id = auth.uid()));

CREATE POLICY "seo_keyword_rankings_staff_all" ON seo_keyword_rankings FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM staff_profiles WHERE id = auth.uid()));

CREATE POLICY "organic_traffic_snapshots_staff_all" ON organic_traffic_snapshots FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM staff_profiles WHERE id = auth.uid()));
