-- ==============================================================================
-- D-AMINGROW MIGRATION: DEDUPLICATED FARMER CRM & MULTI-TIER CUSTOMER SYSTEM
-- Migration ID: 20261103000002_crm_customers
-- Description: Creates deduplicated customers table indexed on normalized E.164
--              phone numbers, automated tier progression, and links to enquiries
--              and chick bookings.
-- ==============================================================================

-- 1. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_normalized TEXT UNIQUE NOT NULL, -- E.164 formatted, e.g. "+2348031234567"
    raw_phone TEXT NOT NULL,
    full_name TEXT NOT NULL,
    farm_name TEXT,
    primary_state TEXT,
    primary_city TEXT,
    total_orders_count INTEGER NOT NULL DEFAULT 0,
    total_bookings_count INTEGER NOT NULL DEFAULT 0,
    lifetime_value_ngn NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    customer_tier TEXT NOT NULL DEFAULT 'bronze' CHECK (customer_tier IN ('bronze', 'silver', 'gold', 'vip_commercial')),
    staff_notes TEXT,
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_customers_phone_normalized ON customers(phone_normalized);
CREATE INDEX IF NOT EXISTS idx_customers_tier ON customers(customer_tier);
CREATE INDEX IF NOT EXISTS idx_customers_state ON customers(primary_state);
CREATE INDEX IF NOT EXISTS idx_customers_last_activity ON customers(last_activity_at DESC);

-- 2. ADD CUSTOMER FOREIGN KEYS IF MISSING
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'enquiries' AND column_name = 'customer_id'
    ) THEN
        ALTER TABLE enquiries ADD COLUMN customer_id UUID REFERENCES customers(id) ON DELETE SET NULL;
        CREATE INDEX idx_enquiries_customer_id ON enquiries(customer_id);
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'chick_bookings') THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'chick_bookings' AND column_name = 'customer_id'
        ) THEN
            ALTER TABLE chick_bookings ADD COLUMN customer_id UUID REFERENCES customers(id) ON DELETE SET NULL;
            CREATE INDEX idx_chick_bookings_customer_id ON chick_bookings(customer_id);
        END IF;
    END IF;
END $$;

-- 3. STORED PROCEDURE: SYNC CUSTOMER FROM ACTIVITY
CREATE OR REPLACE FUNCTION sync_customer_from_activity(
    p_phone TEXT,
    p_name TEXT,
    p_farm TEXT DEFAULT NULL,
    p_state TEXT DEFAULT NULL,
    p_city TEXT DEFAULT NULL,
    p_order_value NUMERIC DEFAULT 0,
    p_is_booking BOOLEAN DEFAULT FALSE
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_clean_phone TEXT;
    v_normalized_phone TEXT;
    v_customer_id UUID;
    v_current_total_value NUMERIC;
    v_current_total_orders INTEGER;
    v_calculated_tier TEXT;
BEGIN
    -- Strip non-digit characters except leading '+'
    v_clean_phone := regexp_replace(trim(p_phone), '[^\+0-9]', '', 'g');

    -- Format to E.164 Nigerian format (+234...)
    IF v_clean_phone LIKE '0%' THEN
        v_normalized_phone := '+234' || substr(v_clean_phone, 2);
    ELSIF v_clean_phone LIKE '234%' THEN
        v_normalized_phone := '+' || v_clean_phone;
    ELSIF v_clean_phone LIKE '+234%' THEN
        v_normalized_phone := v_clean_phone;
    ELSE
        -- Fallback if already prefixed or international
        v_normalized_phone := v_clean_phone;
    END IF;

    -- Upsert Customer Record
    INSERT INTO customers (
        phone_normalized,
        raw_phone,
        full_name,
        farm_name,
        primary_state,
        primary_city,
        total_orders_count,
        total_bookings_count,
        lifetime_value_ngn,
        customer_tier,
        last_activity_at,
        created_at,
        updated_at
    )
    VALUES (
        v_normalized_phone,
        p_phone,
        p_name,
        p_farm,
        p_state,
        p_city,
        CASE WHEN NOT p_is_booking THEN 1 ELSE 0 END,
        CASE WHEN p_is_booking THEN 1 ELSE 0 END,
        COALESCE(p_order_value, 0),
        'bronze',
        NOW(),
        NOW(),
        NOW()
    )
    ON CONFLICT (phone_normalized) DO UPDATE SET
        full_name = COALESCE(EXCLUDED.full_name, customers.full_name),
        farm_name = COALESCE(EXCLUDED.farm_name, customers.farm_name),
        primary_state = COALESCE(EXCLUDED.primary_state, customers.primary_state),
        primary_city = COALESCE(EXCLUDED.primary_city, customers.primary_city),
        total_orders_count = customers.total_orders_count + CASE WHEN NOT p_is_booking THEN 1 ELSE 0 END,
        total_bookings_count = customers.total_bookings_count + CASE WHEN p_is_booking THEN 1 ELSE 0 END,
        lifetime_value_ngn = customers.lifetime_value_ngn + COALESCE(p_order_value, 0),
        last_activity_at = NOW(),
        updated_at = NOW()
    RETURNING id, lifetime_value_ngn, (total_orders_count + total_bookings_count)
    INTO v_customer_id, v_current_total_value, v_current_total_orders;

    -- Compute Tier Progression
    IF v_current_total_value >= 10000000 OR v_current_total_orders >= 20 THEN
        v_calculated_tier := 'vip_commercial';
    ELSIF v_current_total_value >= 2000000 OR v_current_total_orders >= 8 THEN
        v_calculated_tier := 'gold';
    ELSIF v_current_total_value >= 500000 OR v_current_total_orders >= 3 THEN
        v_calculated_tier := 'silver';
    ELSE
        v_calculated_tier := 'bronze';
    END IF;

    -- Update tier
    UPDATE customers
    SET customer_tier = v_calculated_tier
    WHERE id = v_customer_id;

    RETURN v_customer_id;
END;
$$;

-- 4. RLS POLICIES FOR CUSTOMERS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Allow verified staff (super_admin, sales_agent, veterinary_consultant) to read customer data
CREATE POLICY "Staff can view customer profiles"
    ON customers
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM staff_profiles
            WHERE staff_profiles.auth_user_id = auth.uid()
            AND staff_profiles.role IN ('super_admin', 'sales_agent', 'veterinary_consultant')
            AND staff_profiles.is_active = TRUE
        )
    );

-- Allow super_admin and sales_agent to update notes and customer details
CREATE POLICY "Staff can update customer notes"
    ON customers
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM staff_profiles
            WHERE staff_profiles.auth_user_id = auth.uid()
            AND staff_profiles.role IN ('super_admin', 'sales_agent')
            AND staff_profiles.is_active = TRUE
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM staff_profiles
            WHERE staff_profiles.auth_user_id = auth.uid()
            AND staff_profiles.role IN ('super_admin', 'sales_agent')
            AND staff_profiles.is_active = TRUE
        )
    );
