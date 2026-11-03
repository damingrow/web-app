-- ==============================================================================
-- D-AminGrow Migration: NAFDAC Veterinary Regulatory Compliance Controls (Phase 3)
-- File: 20261103000005_nafdac_veterinary_regulatory_controls.sql
-- Description:
-- 1. Adds regulatory verification state & classification columns to products table.
-- 2. Restricts public Row-Level Security (RLS) to ONLY verified-for-sale inventory.
-- 3. Stored procedures for regulatory clearance and publication restriction with audit trail.
-- ==============================================================================

-- 1. Add Regulatory Verification Fields to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS verification_state TEXT NOT NULL DEFAULT 'verified_for_sale',
ADD COLUMN IF NOT EXISTS regulated_category TEXT NOT NULL DEFAULT 'exempt_livestock_equipment',
ADD COLUMN IF NOT EXISTS nafdac_expiry_date DATE,
ADD COLUMN IF NOT EXISTS banned_substances_screened BOOLEAN NOT NULL DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS restriction_reason TEXT,
ADD COLUMN IF NOT EXISTS requires_vcn_prescription BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS certificate_verified_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS certificate_verified_by TEXT;

-- Index verification state for ultra-fast filtering
CREATE INDEX IF NOT EXISTS idx_products_verification_state ON products(verification_state);
CREATE INDEX IF NOT EXISTS idx_products_regulated_category ON products(regulated_category);

-- 2. Update Row Level Security on products table
-- Public consumers can ONLY select products that are active AND verified_for_sale
DROP POLICY IF EXISTS "Public can view active products" ON products;

CREATE POLICY "Public can view active verified products"
    ON products FOR SELECT
    USING (
        is_active = TRUE 
        AND stock_status != 'discontinued' 
        AND verification_state = 'verified_for_sale'
    );

-- 3. Transactional Stored Procedure: Regulatory Clearance Verification
CREATE OR REPLACE FUNCTION verify_product_regulatory_clearance(
    p_product_id UUID,
    p_staff_actor TEXT,
    p_nafdac_number TEXT DEFAULT NULL,
    p_nafdac_expiry DATE DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_product RECORD;
    v_updated JSONB;
BEGIN
    SELECT * INTO v_product FROM products WHERE id = p_product_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Product not found.');
    END IF;

    -- Strict NAFDAC requirement check for drugs/vaccines
    IF v_product.category_id IN (
        SELECT id FROM product_categories WHERE slug IN ('drugs', 'vaccines')
    ) AND (p_nafdac_number IS NULL OR trim(p_nafdac_number) = '') AND (v_product.nafdac_reg_number IS NULL OR trim(v_product.nafdac_reg_number) = '') THEN
        RETURN jsonb_build_object('success', false, 'error', 'NAFDAC Registration Number is mandatory for veterinary drugs and vaccines.');
    END IF;

    -- Update product verification status
    UPDATE products
    SET 
        verification_state = 'verified_for_sale',
        nafdac_reg_number = COALESCE(p_nafdac_number, nafdac_reg_number),
        nafdac_expiry_date = COALESCE(p_nafdac_expiry, nafdac_expiry_date),
        banned_substances_screened = TRUE,
        restriction_reason = NULL,
        certificate_verified_at = NOW(),
        certificate_verified_by = p_staff_actor,
        updated_at = NOW()
    WHERE id = p_product_id;

    -- Record in audit logs
    INSERT INTO audit_logs (
        actor_id,
        actor_role,
        action,
        resource_type,
        resource_id,
        changes_json
    ) VALUES (
        p_staff_actor,
        'regulatory_officer',
        'VERIFY_REGULATORY_CLEARANCE',
        'product',
        p_product_id::text,
        jsonb_build_object(
            'nafdac_reg_number', COALESCE(p_nafdac_number, v_product.nafdac_reg_number),
            'verified_at', NOW(),
            'verification_state', 'verified_for_sale'
        )
    );

    RETURN jsonb_build_object(
        'success', true,
        'product_id', p_product_id,
        'verification_state', 'verified_for_sale',
        'message', 'Product successfully verified for sale under NAFDAC compliance regulations.'
    );
END;
$$;

-- 4. Transactional Stored Procedure: Restrict Product From Publication
CREATE OR REPLACE FUNCTION restrict_product_from_publication(
    p_product_id UUID,
    p_staff_actor TEXT,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE products
    SET 
        verification_state = 'restricted_from_publication',
        is_active = FALSE,
        restriction_reason = p_reason,
        updated_at = NOW()
    WHERE id = p_product_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Product not found.');
    END IF;

    -- Record in audit logs
    INSERT INTO audit_logs (
        actor_id,
        actor_role,
        action,
        resource_type,
        resource_id,
        changes_json
    ) VALUES (
        p_staff_actor,
        'regulatory_officer',
        'RESTRICT_FROM_PUBLICATION',
        'product',
        p_product_id::text,
        jsonb_build_object(
            'reason', p_reason,
            'restricted_at', NOW(),
            'verification_state', 'restricted_from_publication'
        )
    );

    RETURN jsonb_build_object(
        'success', true,
        'product_id', p_product_id,
        'verification_state', 'restricted_from_publication',
        'message', 'Product successfully restricted from public storefront.'
    );
END;
$$;
