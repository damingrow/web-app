-- ==============================================================================
-- D-AMINGROW AGRO-ALLIED PLATFORM
-- Migration: 20261103000001_chick_booking_engine.sql
-- Description: Transactional Day-Old Chick booking engine, partner hatcheries,
--              concurrency quota control, and bank deposit reconciliation.
-- ==============================================================================

-- 1. Custom Types & Enumerations
DO $$ BEGIN
    CREATE TYPE dispatch_day_enum AS ENUM ('Tuesday', 'Thursday', 'Special_Run');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE quota_status_enum AS ENUM ('open', 'limited', 'closed', 'dispatched');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status_enum AS ENUM (
        'initiated',
        'quota_held',
        'deposit_pending',
        'deposit_verified',
        'confirmed',
        'batch_allocated',
        'dispatched',
        'collected',
        'expired',
        'cancelled',
        'refunded'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE deposit_status_enum AS ENUM (
        'unpaid',
        'evidence_submitted',
        'verified',
        'refund_due',
        'refunded'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Partner Hatcheries & Brands
CREATE TABLE IF NOT EXISTS partner_hatcheries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE, -- e.g. 'CHI', 'ZAR', 'AMO', 'SAY', 'VAL'
    name TEXT NOT NULL,         -- 'Chi Hatchery', 'Zartech Farms', etc.
    slug TEXT NOT NULL UNIQUE,
    headquarters_location TEXT NOT NULL DEFAULT 'Ibadan, Oyo State',
    default_dispatch_days TEXT[] NOT NULL DEFAULT ARRAY['Tuesday', 'Thursday'],
    default_packaging_rule TEXT NOT NULL DEFAULT '50+1', -- '50+1', '25_per_box', '50_flat'
    contact_phone TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed premier Nigerian hatcheries
INSERT INTO partner_hatcheries (code, name, slug, headquarters_location, default_packaging_rule, contact_phone)
VALUES 
    ('CHI', 'Chi Hatchery Ltd', 'chi-hatchery', 'Ibadan, Oyo State', '50+1', '+2348002444282'),
    ('ZAR', 'Zartech Farms & Hatcheries', 'zartech-farms', 'Ibadan, Oyo State', '50+1', '+2348039780000'),
    ('AMO', 'Amo Hatchery (Farm Support)', 'amo-hatchery', 'Awe, Oyo State', '50+1', '+2348055551234'),
    ('SAY', 'Sayed Farms Hatchery', 'sayed-farms', 'Ibadan, Oyo State', '50+1', '+2348023004567'),
    ('VAL', 'Valentine Chicks Hatchery', 'valentine-chicks', 'Ogun State', '50+1', '+2348077778901')
ON CONFLICT (code) DO NOTHING;

-- 3. Hatchery Quotas & Dispatch Batches
CREATE TABLE IF NOT EXISTS hatchery_quotas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hatchery_id UUID NOT NULL REFERENCES partner_hatcheries(id) ON DELETE RESTRICT,
    breed_type TEXT NOT NULL, -- 'broiler', 'pullet', 'turkey', 'duckling', 'pol'
    dispatch_date DATE NOT NULL,
    dispatch_day dispatch_day_enum NOT NULL DEFAULT 'Tuesday',
    total_cartons_quota INTEGER NOT NULL CHECK (total_cartons_quota >= 0),
    reserved_cartons INTEGER NOT NULL DEFAULT 0 CHECK (reserved_cartons >= 0),
    confirmed_cartons INTEGER NOT NULL DEFAULT 0 CHECK (confirmed_cartons >= 0),
    estimated_price_per_carton NUMERIC(10, 2) NOT NULL,
    status quota_status_enum NOT NULL DEFAULT 'open',
    version_lock INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT check_quota_limits CHECK ((reserved_cartons + confirmed_cartons) <= total_cartons_quota),
    CONSTRAINT unique_hatchery_breed_dispatch UNIQUE (hatchery_id, breed_type, dispatch_date)
);

CREATE INDEX IF NOT EXISTS idx_hatchery_quotas_lookup ON hatchery_quotas(dispatch_date, breed_type, status);

-- 4. Chick Bookings Table
CREATE TABLE IF NOT EXISTS chick_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_ref TEXT NOT NULL UNIQUE, -- e.g. "DOC-20261103-CHI-A482"
    customer_phone TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    farm_name TEXT,
    delivery_state TEXT NOT NULL,
    destination_hub TEXT NOT NULL,    -- e.g. "Kano Luxury Bus Depot", "Bodija Motor Park"
    
    hatchery_id UUID NOT NULL REFERENCES partner_hatcheries(id) ON DELETE RESTRICT,
    quota_id UUID NOT NULL REFERENCES hatchery_quotas(id) ON DELETE RESTRICT,
    breed_type TEXT NOT NULL,
    
    cartons_count INTEGER NOT NULL CHECK (cartons_count >= 1),
    birds_per_carton INTEGER NOT NULL DEFAULT 51,
    total_birds_count INTEGER NOT NULL,
    
    estimated_rate_per_carton NUMERIC(10, 2) NOT NULL,
    estimated_total_ngn NUMERIC(12, 2) NOT NULL,
    required_deposit_ngn NUMERIC(12, 2) NOT NULL,
    verified_deposit_ngn NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    
    booking_status booking_status_enum NOT NULL DEFAULT 'initiated',
    deposit_status deposit_status_enum NOT NULL DEFAULT 'unpaid',
    
    held_until TIMESTAMPTZ, -- Temporary hold TTL (default 120 mins)
    assigned_waybill_ref TEXT,
    assigned_vehicle_info TEXT,
    staff_notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chick_bookings_status ON chick_bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_chick_bookings_phone ON chick_bookings(customer_phone);
CREATE INDEX IF NOT EXISTS idx_chick_bookings_quota ON chick_bookings(quota_id);

-- 5. Deposit Reconciliation & Audit
CREATE TABLE IF NOT EXISTS deposit_reconciliations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES chick_bookings(id) ON DELETE CASCADE,
    bank_name TEXT NOT NULL,              -- e.g. 'Zenith Bank', 'First Bank'
    payment_reference TEXT NOT NULL,      -- NIP Session ID or Teller Number
    depositor_name TEXT NOT NULL,
    amount_paid_ngn NUMERIC(12, 2) NOT NULL CHECK (amount_paid_ngn > 0),
    payment_date DATE NOT NULL,
    receipt_image_path TEXT,
    verified_by_staff_id UUID REFERENCES staff_profiles(id) ON DELETE RESTRICT,
    verified_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected')),
    rejection_reason TEXT,
    staff_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deposit_reconciliations_booking ON deposit_reconciliations(booking_id);

-- 6. Stored Procedure: Transactional Quota Reservation with SELECT FOR UPDATE
CREATE OR REPLACE FUNCTION reserve_chick_quota(
    p_quota_id UUID,
    p_cartons_count INTEGER,
    p_customer_phone TEXT,
    p_customer_name TEXT,
    p_farm_name TEXT,
    p_delivery_state TEXT,
    p_destination_hub TEXT,
    p_hold_duration_minutes INTEGER DEFAULT 120
)
RETURNS TABLE (
    success BOOLEAN,
    booking_id UUID,
    booking_ref TEXT,
    held_until TIMESTAMPTZ,
    required_deposit_ngn NUMERIC(12, 2),
    estimated_total_ngn NUMERIC(12, 2),
    total_birds_count INTEGER,
    error_message TEXT
) LANGUAGE plpgsql AS $$
DECLARE
    v_quota RECORD;
    v_hatchery RECORD;
    v_available_cartons INTEGER;
    v_booking_ref TEXT;
    v_new_booking_id UUID;
    v_held_until TIMESTAMPTZ;
    v_total_birds INTEGER;
    v_birds_per_carton INTEGER;
    v_est_total NUMERIC(12, 2);
    v_req_deposit NUMERIC(12, 2);
BEGIN
    -- Acquire exclusive row lock on the quota row to eliminate race conditions
    SELECT * INTO v_quota
    FROM hatchery_quotas
    WHERE id = p_quota_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, NULL::TIMESTAMPTZ, 0.00::NUMERIC(12, 2), 0.00::NUMERIC(12, 2), 0, 'Hatchery quota record not found'::TEXT;
        RETURN;
    END IF;

    IF v_quota.status = 'closed' OR v_quota.status = 'dispatched' THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, NULL::TIMESTAMPTZ, 0.00::NUMERIC(12, 2), 0.00::NUMERIC(12, 2), 0, 'This dispatch run is closed for new reservations'::TEXT;
        RETURN;
    END IF;

    v_available_cartons := v_quota.total_cartons_quota - (v_quota.reserved_cartons + v_quota.confirmed_cartons);

    IF v_available_cartons < p_cartons_count THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, NULL::TIMESTAMPTZ, 0.00::NUMERIC(12, 2), 0.00::NUMERIC(12, 2), 0,
            format('Insufficient quota: only %s cartons available, requested %s', v_available_cartons, p_cartons_count)::TEXT;
        RETURN;
    END IF;

    SELECT * INTO v_hatchery FROM partner_hatcheries WHERE id = v_quota.hatchery_id;
    
    IF v_hatchery.default_packaging_rule = '25_per_box' THEN
        v_birds_per_carton := 25;
    ELSE
        v_birds_per_carton := 51; -- 50 + 1 standard
    END IF;

    v_total_birds := p_cartons_count * v_birds_per_carton;
    v_est_total := p_cartons_count * v_quota.estimated_price_per_carton;
    v_req_deposit := v_est_total * 0.50; -- 50% commitment deposit standard
    v_held_until := NOW() + (p_hold_duration_minutes || ' minutes')::INTERVAL;
    
    v_booking_ref := format('DOC-%s-%s-%s', 
        to_char(v_quota.dispatch_date, 'YYYYMMDD'), 
        v_hatchery.code, 
        upper(substr(md5(random()::text), 1, 4))
    );

    -- Atomically update reserved count on the locked quota
    UPDATE hatchery_quotas
    SET reserved_cartons = reserved_cartons + p_cartons_count,
        version_lock = version_lock + 1,
        updated_at = NOW()
    WHERE id = p_quota_id;

    -- Insert reservation record
    INSERT INTO chick_bookings (
        booking_ref,
        customer_phone,
        customer_name,
        farm_name,
        delivery_state,
        destination_hub,
        hatchery_id,
        quota_id,
        breed_type,
        cartons_count,
        birds_per_carton,
        total_birds_count,
        estimated_rate_per_carton,
        estimated_total_ngn,
        required_deposit_ngn,
        booking_status,
        deposit_status,
        held_until
    ) VALUES (
        v_booking_ref,
        p_customer_phone,
        p_customer_name,
        p_farm_name,
        p_delivery_state,
        p_destination_hub,
        v_quota.hatchery_id,
        p_quota_id,
        v_quota.breed_type,
        p_cartons_count,
        v_birds_per_carton,
        v_total_birds,
        v_quota.estimated_price_per_carton,
        v_est_total,
        v_req_deposit,
        'quota_held',
        'unpaid',
        v_held_until
    ) RETURNING id INTO v_new_booking_id;

    RETURN QUERY SELECT TRUE, v_new_booking_id, v_booking_ref, v_held_until, v_req_deposit, v_est_total, v_total_birds, NULL::TEXT;
END;
$$;

-- 7. Stored Procedure: Auto-Release Expired Quota Holds
CREATE OR REPLACE FUNCTION release_expired_chick_holds()
RETURNS INTEGER LANGUAGE plpgsql AS $$
DECLARE
    v_expired RECORD;
    v_count INTEGER := 0;
BEGIN
    FOR v_expired IN 
        SELECT id, quota_id, cartons_count 
        FROM chick_bookings
        WHERE booking_status = 'quota_held'
          AND deposit_status = 'unpaid'
          AND held_until < NOW()
    LOOP
        UPDATE hatchery_quotas
        SET reserved_cartons = GREATEST(0, reserved_cartons - v_expired.cartons_count),
            updated_at = NOW()
        WHERE id = v_expired.quota_id;

        UPDATE chick_bookings
        SET booking_status = 'expired',
            updated_at = NOW()
        WHERE id = v_expired.id;

        v_count := v_count + 1;
    END LOOP;

    RETURN v_count;
END;
$$;
