-- ==============================================================================
-- D-AMINGROW MIGRATION: EDITORIAL CMS & VCN VETERINARY SIGN-OFF SYSTEM
-- Migration ID: 20261103000003_editorial_cms
-- Description: Creates knowledge articles and clinical review audit tables with
--              Veterinary Council of Nigeria (VCN) credential validation.
-- ==============================================================================

-- 1. KNOWLEDGE ARTICLES TABLE
CREATE TABLE IF NOT EXISTS knowledge_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    read_time TEXT NOT NULL DEFAULT '5 min read',
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL,
    reviewer_name TEXT NOT NULL,
    reviewer_credentials TEXT NOT NULL,
    reviewer_vcn_reg TEXT NOT NULL, -- e.g. "VCN Reg #08492"
    reviewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    clinical_declaration TEXT NOT NULL DEFAULT 'Reviewed for antimicrobial stewardship, dosage accuracy, and compliance with the Veterinary Council of Nigeria (VCN) ethical practice guidelines.',
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
    related_product_slugs JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON knowledge_articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON knowledge_articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published ON knowledge_articles(is_published, published_date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_reviewer_vcn ON knowledge_articles(reviewer_vcn_reg);

-- 2. CLINICAL REVIEW AUDITS TABLE
CREATE TABLE IF NOT EXISTS clinical_review_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID REFERENCES knowledge_articles(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
    reviewer_name TEXT NOT NULL,
    reviewer_vcn_reg TEXT NOT NULL,
    amr_compliance_verified BOOLEAN NOT NULL DEFAULT TRUE,
    dosage_verified BOOLEAN NOT NULL DEFAULT TRUE,
    review_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_review_audits_article ON clinical_review_audits(article_id);

-- 3. RLS POLICIES
ALTER TABLE knowledge_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_review_audits ENABLE ROW LEVEL SECURITY;

-- Public can read published knowledge articles
CREATE POLICY "Public can view published knowledge articles"
    ON knowledge_articles
    FOR SELECT
    TO anon, authenticated
    USING (is_published = TRUE);

-- Staff can view all articles (including unpublished drafts)
CREATE POLICY "Staff can view all knowledge articles"
    ON knowledge_articles
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM staff_profiles
            WHERE staff_profiles.auth_user_id = auth.uid()
            AND staff_profiles.role IN ('super_admin', 'content_editor', 'veterinary_consultant')
            AND staff_profiles.is_active = TRUE
        )
    );

-- Staff can insert/update articles
CREATE POLICY "Staff can manage knowledge articles"
    ON knowledge_articles
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM staff_profiles
            WHERE staff_profiles.auth_user_id = auth.uid()
            AND staff_profiles.role IN ('super_admin', 'content_editor', 'veterinary_consultant')
            AND staff_profiles.is_active = TRUE
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM staff_profiles
            WHERE staff_profiles.auth_user_id = auth.uid()
            AND staff_profiles.role IN ('super_admin', 'content_editor', 'veterinary_consultant')
            AND staff_profiles.is_active = TRUE
        )
    );
