-- ==============================================================================
-- D-AMINGROW PLATFORM — MIGRATION 20261026000002: ROW LEVEL SECURITY (RLS) POLICIES
-- Author: Principal Cybersecurity & Database Architect
-- Date: 2026-10-26
-- Description: Enforces Zero-Trust isolation. Public users can read public active
--              catalog/content and submit enquiries. Privileged data (leads, notes,
--              staff profiles, audit events, settings) is strictly restricted to
--              authenticated staff with verified JWT role claims.
-- ==============================================================================

-- ==============================================================================
-- 1. ENABLE ROW LEVEL SECURITY ACROSS ALL TABLES
-- ==============================================================================

ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_settings ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 2. HELPER FUNCTIONS FOR ROLE-BASED ACCESS
-- ==============================================================================

-- Extract the active staff role from Supabase auth JWT claims
CREATE OR REPLACE FUNCTION get_current_staff_role()
RETURNS TEXT AS $$
BEGIN
    RETURN COALESCE(
        current_setting('request.jwt.claim.role', true),
        (current_setting('request.jwt.claims', true)::jsonb -> 'app_metadata' ->> 'staff_role'),
        'anon'
    );
EXCEPTION
    WHEN OTHERS THEN RETURN 'anon';
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Check if current authenticated user has staff privileges
CREATE OR REPLACE FUNCTION is_staff_member()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN get_current_staff_role() IN ('super_admin', 'sales_agent', 'content_editor', 'veterinary_consultant');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Check if current user is Super Admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN get_current_staff_role() = 'super_admin';
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ==============================================================================
-- 3. POLICIES: STAFF PROFILES
-- ==============================================================================

-- Public: Zero access
-- Staff: Read access to active colleagues
CREATE POLICY "Staff can view active colleagues"
    ON staff_profiles FOR SELECT
    TO authenticated
    USING (is_staff_member() AND is_active = TRUE);

-- Super Admin: Full management
CREATE POLICY "Super admin manages staff profiles"
    ON staff_profiles FOR ALL
    TO authenticated
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- ==============================================================================
-- 4. POLICIES: PRODUCT CATEGORIES & SUPPLIERS
-- ==============================================================================

-- Public can view active categories
CREATE POLICY "Public can view active categories"
    ON product_categories FOR SELECT
    USING (is_active = TRUE);

-- Staff can view all categories
CREATE POLICY "Staff can view all categories"
    ON product_categories FOR SELECT
    TO authenticated
    USING (is_staff_member());

-- Content Editor & Super Admin can manage categories
CREATE POLICY "Editors manage categories"
    ON product_categories FOR ALL
    TO authenticated
    USING (get_current_staff_role() IN ('super_admin', 'content_editor'))
    WITH CHECK (get_current_staff_role() IN ('super_admin', 'content_editor'));

-- Suppliers: Only authenticated staff can view/manage
CREATE POLICY "Staff can view verified suppliers"
    ON suppliers FOR SELECT
    TO authenticated
    USING (is_staff_member());

CREATE POLICY "Super admin manages suppliers"
    ON suppliers FOR ALL
    TO authenticated
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- ==============================================================================
-- 5. POLICIES: PRODUCTS, VARIANTS & MEDIA
-- ==============================================================================

-- Public can view active, in-stock or pre-order products
CREATE POLICY "Public can view active products"
    ON products FOR SELECT
    USING (is_active = TRUE AND stock_status != 'discontinued');

-- Staff can view all products (including drafts and discontinued)
CREATE POLICY "Staff can view all products"
    ON products FOR SELECT
    TO authenticated
    USING (is_staff_member());

-- Content Editors & Super Admins manage products
CREATE POLICY "Editors manage products"
    ON products FOR ALL
    TO authenticated
    USING (get_current_staff_role() IN ('super_admin', 'content_editor'))
    WITH CHECK (get_current_staff_role() IN ('super_admin', 'content_editor'));

-- Public can view active product variants
CREATE POLICY "Public can view active variants"
    ON product_variants FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Editors manage variants"
    ON product_variants FOR ALL
    TO authenticated
    USING (get_current_staff_role() IN ('super_admin', 'content_editor'))
    WITH CHECK (get_current_staff_role() IN ('super_admin', 'content_editor'));

-- Public can view active product media
CREATE POLICY "Public can view active media"
    ON product_media FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Editors manage media"
    ON product_media FOR ALL
    TO authenticated
    USING (get_current_staff_role() IN ('super_admin', 'content_editor'))
    WITH CHECK (get_current_staff_role() IN ('super_admin', 'content_editor'));

-- ==============================================================================
-- 6. POLICIES: AUTHORS & ARTICLES (KNOWLEDGE CENTRE)
-- ==============================================================================

-- Public can view active authors
CREATE POLICY "Public can view active authors"
    ON authors FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Editors manage authors"
    ON authors FOR ALL
    TO authenticated
    USING (get_current_staff_role() IN ('super_admin', 'content_editor'))
    WITH CHECK (get_current_staff_role() IN ('super_admin', 'content_editor'));

-- Public can view published articles
CREATE POLICY "Public can view published articles"
    ON articles FOR SELECT
    USING (is_published = TRUE AND published_at <= NOW());

-- Staff can view all articles (drafts, pending reviews)
CREATE POLICY "Staff can view all articles"
    ON articles FOR SELECT
    TO authenticated
    USING (is_staff_member());

CREATE POLICY "Editors manage articles"
    ON articles FOR ALL
    TO authenticated
    USING (get_current_staff_role() IN ('super_admin', 'content_editor', 'veterinary_consultant'))
    WITH CHECK (get_current_staff_role() IN ('super_admin', 'content_editor', 'veterinary_consultant'));

-- ==============================================================================
-- 7. POLICIES: LANDING PAGES, CONTENT SECTIONS & REDIRECTS
-- ==============================================================================

CREATE POLICY "Public can view published landing pages"
    ON landing_pages FOR SELECT
    USING (is_published = TRUE);

CREATE POLICY "Public can view active content sections"
    ON content_sections FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Public can read active redirects"
    ON redirects FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Editors manage content pages"
    ON landing_pages FOR ALL
    TO authenticated
    USING (get_current_staff_role() IN ('super_admin', 'content_editor'))
    WITH CHECK (get_current_staff_role() IN ('super_admin', 'content_editor'));

CREATE POLICY "Editors manage content sections"
    ON content_sections FOR ALL
    TO authenticated
    USING (get_current_staff_role() IN ('super_admin', 'content_editor'))
    WITH CHECK (get_current_staff_role() IN ('super_admin', 'content_editor'));

CREATE POLICY "Editors manage redirects"
    ON redirects FOR ALL
    TO authenticated
    USING (get_current_staff_role() IN ('super_admin', 'content_editor'))
    WITH CHECK (get_current_staff_role() IN ('super_admin', 'content_editor'));

-- ==============================================================================
-- 8. POLICIES: ENQUIRIES, ORDERS & STATUS HISTORY (PRIVILEGED DATA)
-- ==============================================================================

-- Public can insert new enquiries (WhatsApp order, quote, consultation)
-- STRICT WRITE-ONLY: Public users CANNOT read enquiries (prevents lead scraping)
CREATE POLICY "Public can submit enquiries"
    ON enquiries FOR INSERT
    WITH CHECK (TRUE);

-- Authenticated Sales Agents & Super Admins can view and manage enquiries
CREATE POLICY "Sales staff can view enquiries"
    ON enquiries FOR SELECT
    TO authenticated
    USING (get_current_staff_role() IN ('super_admin', 'sales_agent', 'veterinary_consultant'));

CREATE POLICY "Sales staff can update enquiries"
    ON enquiries FOR UPDATE
    TO authenticated
    USING (get_current_staff_role() IN ('super_admin', 'sales_agent'))
    WITH CHECK (get_current_staff_role() IN ('super_admin', 'sales_agent'));

-- Super Admin only can delete enquiries
CREATE POLICY "Super admin can delete enquiries"
    ON enquiries FOR DELETE
    TO authenticated
    USING (is_super_admin());

-- Enquiry status history: Staff only
CREATE POLICY "Staff can view status history"
    ON enquiry_status_history FOR SELECT
    TO authenticated
    USING (is_staff_member());

CREATE POLICY "Staff can insert status history"
    ON enquiry_status_history FOR INSERT
    TO authenticated
    WITH CHECK (is_staff_member());

-- Enquiry private notes: Staff only
CREATE POLICY "Staff can view notes"
    ON enquiry_notes FOR SELECT
    TO authenticated
    USING (is_staff_member());

CREATE POLICY "Staff can insert notes"
    ON enquiry_notes FOR INSERT
    TO authenticated
    WITH CHECK (is_staff_member());

-- ==============================================================================
-- 9. POLICIES: CONSENT RECORDS (NDPA 2023)
-- ==============================================================================

-- Public can record consent
CREATE POLICY "Public can submit consent"
    ON consent_records FOR INSERT
    WITH CHECK (TRUE);

-- Staff can audit consent records
CREATE POLICY "Staff can view consent records"
    ON consent_records FOR SELECT
    TO authenticated
    USING (is_staff_member());

-- ==============================================================================
-- 10. POLICIES: AUDIT LOGS & SETTINGS
-- ==============================================================================

-- Audit logs: Read-only for Super Admin (immutable audit trail)
CREATE POLICY "Super admin can view audit logs"
    ON audit_events FOR SELECT
    TO authenticated
    USING (is_super_admin());

-- System and staff can insert audit events
CREATE POLICY "Staff and system can log audit events"
    ON audit_events FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

-- Application Settings: Public read for general brand metadata
CREATE POLICY "Public can read brand settings"
    ON application_settings FOR SELECT
    USING (key IN ('business_profile', 'operational_schedule'));

-- Super Admin can manage application settings
CREATE POLICY "Super admin manages settings"
    ON application_settings FOR ALL
    TO authenticated
    USING (is_super_admin())
    WITH CHECK (is_super_admin());
