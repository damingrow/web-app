-- ==============================================================================
-- D-AMINGROW PLATFORM — MIGRATION 20261026000001: INITIAL NORMALIZED SCHEMA
-- Author: Principal Supabase Database Architect
-- Date: 2026-10-26
-- Description: Core schema covering staff, categories, products, compliance,
--              articles, enquiries, consent, audit logs, and settings.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. CUSTOM TYPES & ENUMS
-- ==============================================================================

DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM ('super_admin', 'sales_agent', 'content_editor', 'veterinary_consultant');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE product_category_enum AS ENUM ('accessories', 'drugs', 'vaccines', 'day_old_chicks');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE regulatory_status_enum AS ENUM ('nafdac_registered', 'pending_registration', 'exempt_accessory', 'not_applicable');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE stock_status_enum AS ENUM ('in_stock', 'low_stock', 'out_of_stock', 'pre_order_only', 'discontinued');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE enquiry_type_enum AS ENUM ('whatsapp_order', 'bulk_quote', 'veterinary_consultation', 'farm_setup_inquiry', 'general');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE enquiry_status_enum AS ENUM ('pending_contact', 'contacted', 'quoted', 'paid', 'fulfilled', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE consent_type_enum AS ENUM ('privacy_policy', 'whatsapp_order_processing', 'marketing_communications', 'analytics_cookies');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- ==============================================================================
-- 2. STAFF PROFILES & ROLES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS staff_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE, -- References auth.users(id) when Supabase Auth is bound
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role user_role_enum NOT NULL DEFAULT 'sales_agent',
    phone_number TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staff_profiles_role ON staff_profiles(role);
CREATE INDEX IF NOT EXISTS idx_staff_profiles_email ON staff_profiles(email);

-- ==============================================================================
-- 3. SUPPLIERS & HATCHERIES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    category product_category_enum NOT NULL,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT NOT NULL DEFAULT 'Nigeria',
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_suppliers_category ON suppliers(category);

-- ==============================================================================
-- 4. PRODUCT CATEGORIES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS product_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    core_category product_category_enum NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_categories_slug ON product_categories(slug);
CREATE INDEX IF NOT EXISTS idx_product_categories_display ON product_categories(display_order);

-- ==============================================================================
-- 5. PRODUCTS & COMPLIANCE METADATA
-- ==============================================================================

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku TEXT UNIQUE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category_id UUID NOT NULL REFERENCES product_categories(id) ON DELETE RESTRICT,
    supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL,
    
    -- Description & Technical specs
    short_description TEXT,
    description TEXT NOT NULL,
    specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Commercial Pricing & Stock
    price_ngn NUMERIC(12, 2), -- Nullable for variable day-old chicks
    is_price_variable BOOLEAN NOT NULL DEFAULT FALSE,
    min_order_quantity INTEGER NOT NULL DEFAULT 1,
    packaging_unit TEXT NOT NULL DEFAULT 'item', -- e.g. 'carton of 50', 'bottle', 'sachet 100g'
    stock_status stock_status_enum NOT NULL DEFAULT 'in_stock',
    stock_quantity INTEGER,
    low_stock_threshold INTEGER DEFAULT 5,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- NAFDAC, Veterinary & Cold-Chain Compliance (Workstream C)
    regulatory_status regulatory_status_enum NOT NULL DEFAULT 'not_applicable',
    nafdac_reg_number TEXT,
    is_prescription_required BOOLEAN NOT NULL DEFAULT FALSE,
    is_antimicrobial BOOLEAN NOT NULL DEFAULT FALSE,
    is_cold_chain_required BOOLEAN NOT NULL DEFAULT FALSE,
    storage_temp_min_celsius NUMERIC(4, 1),
    storage_temp_max_celsius NUMERIC(4, 1),
    meat_withdrawal_period_days INTEGER NOT NULL DEFAULT 0,
    egg_withdrawal_period_days INTEGER NOT NULL DEFAULT 0,
    active_ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
    administration_route TEXT, -- e.g. 'oral_water', 'injection_im', 'spray', 'wing_web'
    target_species TEXT[] NOT NULL DEFAULT ARRAY['poultry']::TEXT[],
    legal_disclaimer TEXT,
    
    -- SEO Metadata
    meta_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active_stock ON products(is_active, stock_status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_products_compliance ON products(regulatory_status, is_prescription_required, is_cold_chain_required);

-- ==============================================================================
-- 6. PRODUCT VARIANTS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku TEXT UNIQUE,
    name TEXT NOT NULL, -- e.g. "100g sachet", "1L bottle", "Tier 3 (96 birds)"
    variant_type TEXT NOT NULL DEFAULT 'size', -- 'size', 'capacity', 'dose'
    price_ngn NUMERIC(12, 2) NOT NULL,
    stock_quantity INTEGER,
    is_in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);

-- ==============================================================================
-- 7. PRODUCT MEDIA & ASSETS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS product_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL, -- Storage relative path
    public_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    width INTEGER NOT NULL DEFAULT 1200,
    height INTEGER NOT NULL DEFAULT 1200,
    file_size_bytes INTEGER,
    mime_type TEXT NOT NULL DEFAULT 'image/jpeg',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_media_product ON product_media(product_id, is_primary);

-- ==============================================================================
-- 8. AUTHORS & VETERINARY REVIEWERS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL, -- e.g. "Senior Veterinary Doctor"
    credentials TEXT NOT NULL, -- e.g. "DVM, MVSc, Member VCN"
    vcn_registration_number TEXT, -- Veterinary Council of Nigeria Licensure No
    bio TEXT,
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 9. KNOWLEDGE BASE ARTICLES & TAGS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    featured_image_url TEXT,
    author_id UUID NOT NULL REFERENCES authors(id) ON DELETE RESTRICT,
    reviewer_id UUID REFERENCES authors(id) ON DELETE SET NULL,
    category TEXT NOT NULL DEFAULT 'poultry_health', -- e.g. 'brooding', 'diseases', 'equipment'
    tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    reading_time_minutes INTEGER NOT NULL DEFAULT 5,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    meta_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);

-- ==============================================================================
-- 10. LANDING PAGES & REUSABLE CONTENT SECTIONS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS landing_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    hero_headline TEXT NOT NULL,
    hero_subheadline TEXT,
    cta_primary_text TEXT,
    cta_primary_url TEXT,
    cta_secondary_text TEXT,
    cta_secondary_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES landing_pages(id) ON DELETE CASCADE,
    section_key TEXT NOT NULL, -- e.g. 'features_grid', 'trust_badges', 'brooder_calculator'
    title TEXT,
    content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(page_id, section_key)
);

CREATE INDEX IF NOT EXISTS idx_content_sections_page ON content_sections(page_id, display_order);

-- ==============================================================================
-- 11. REDIRECTS & SEO URL INTEGRITY
-- ==============================================================================

CREATE TABLE IF NOT EXISTS redirects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_path TEXT NOT NULL UNIQUE,
    destination_path TEXT NOT NULL,
    status_code INTEGER NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    hit_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_redirects_source ON redirects(source_path) WHERE is_active = TRUE;

-- ==============================================================================
-- 12. ENQUIRIES, ORDERS & QUOTE REQUESTS (WHATSAPP CONVERSION ENGINE)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_ref TEXT NOT NULL UNIQUE, -- e.g. "DAG-20261026-ABCD"
    enquiry_type enquiry_type_enum NOT NULL DEFAULT 'whatsapp_order',
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    farm_name TEXT,
    delivery_city TEXT NOT NULL,
    delivery_state TEXT NOT NULL,
    delivery_country TEXT NOT NULL DEFAULT 'Nigeria',
    preferred_delivery_date DATE,
    items JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of {product_id, name, quantity, unit_price}
    estimated_subtotal_ngn NUMERIC(12, 2),
    user_notes TEXT,
    status enquiry_status_enum NOT NULL DEFAULT 'pending_contact',
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    assigned_to_staff_id UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
    
    -- Attribution & Compliance Tracking
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_assigned ON enquiries(assigned_to_staff_id);

-- Status history tracking
CREATE TABLE IF NOT EXISTS enquiry_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
    old_status enquiry_status_enum,
    new_status enquiry_status_enum NOT NULL,
    changed_by_staff_id UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_status_history_enquiry ON enquiry_status_history(enquiry_id);

-- Staff private notes on enquiries
CREATE TABLE IF NOT EXISTS enquiry_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE RESTRICT,
    note TEXT NOT NULL,
    is_private BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiry_notes_enquiry ON enquiry_notes(enquiry_id);

-- ==============================================================================
-- 13. DATA PROTECTION & CONSENT RECORDS (NDPA 2023)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS consent_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_identifier TEXT NOT NULL, -- Anonymized hash or phone/email identifier
    consent_type consent_type_enum NOT NULL,
    consented BOOLEAN NOT NULL DEFAULT TRUE,
    ip_address INET,
    user_agent TEXT,
    valid_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consent_records_user ON consent_records(user_identifier, consent_type);

-- ==============================================================================
-- 14. AUDIT LOGGING & APPLICATION SETTINGS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID, -- staff_profile id or null if system
    actor_role TEXT,
    action TEXT NOT NULL, -- e.g. 'PRODUCT_UPDATE', 'PRICE_CHANGE', 'ENQUIRY_DELETE'
    resource_type TEXT NOT NULL, -- 'products', 'enquiries', 'staff_profiles'
    resource_id UUID,
    changes_json JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_events_created ON audit_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_events_resource ON audit_events(resource_type, resource_id);

CREATE TABLE IF NOT EXISTS application_settings (
    key TEXT PRIMARY KEY,
    value_json JSONB NOT NULL,
    description TEXT,
    updated_by_staff_id UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed initial critical application settings
INSERT INTO application_settings (key, value_json, description)
VALUES 
    ('business_profile', '{"brand": "D-AminGrow", "whatsapp": "+2348139169402", "email": "info@damingrow.com", "tagline": "Your Satisfaction Is Our Priority"}'::jsonb, 'Core brand identity and contact points'),
    ('operational_schedule', '{"chick_dispatch_days": ["Monday", "Thursday"], "vaccine_dispatch_days": ["Monday", "Tuesday", "Wednesday"], "support_hours": "08:00 - 18:00 WAT"}'::jsonb, 'Operational dispatch calendar constraints')
ON CONFLICT (key) DO NOTHING;

-- ==============================================================================
-- 15. AUTOMATIC TIMESTAMP TRIGGER FUNCTION
-- ==============================================================================

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger across all editable tables
DO $$ 
DECLARE 
    t TEXT;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.columns 
        WHERE column_name = 'updated_at' 
          AND table_schema = 'public' 
          AND table_name NOT IN ('application_settings')
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS trg_set_updated_at_%I ON %I;', t, t);
        EXECUTE format('CREATE TRIGGER trg_set_updated_at_%I BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();', t, t);
    END LOOP;
END $$;
