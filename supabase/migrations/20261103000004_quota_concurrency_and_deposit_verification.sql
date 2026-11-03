-- ==============================================================================
-- D-AMINGROW AGRO-ALLIED PLATFORM
-- Migration: 20261103000004_quota_concurrency_and_deposit_verification.sql
-- Description: Partner hatcheries expansion (Supreme & AGRITED),
--              upcoming quota provisioning, atomic deposit verification,
--              and cancellation/quota release state machine.
-- ==============================================================================

-- 1. Ensure all 5 primary partner hatcheries exist
INSERT INTO partner_hatcheries (code, name, slug, headquarters_location, default_packaging_rule, contact_phone, is_active)
VALUES 
    ('CHI', 'CHI Farms Limited', 'chi-farms', 'Ajanla, Ibadan, Oyo State', '50+1', '+2348002444282', true),
    ('AMO', 'Amo Farm Sieberer Hatchery Ltd', 'amo-farms', 'Awe / Oyo, Oyo State', '50+1', '+2348055551234', true),
    ('ZAR', 'Zartech Farms Limited', 'zartech-farms', 'Oluyole Industrial Estate, Ibadan', '50+1', '+2348039780000', true),
    ('SUP', 'Supreme Poultry Farms Limited', 'supreme-farms', 'Oyo / Ogun Commercial Corridor', '50+1', '+2348021112233', true),
    ('AGR', 'AGRITED Limited', 'agrited-farms', 'Oyo State & Western Operations', '50+1', '+2348033334455', true)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    headquarters_location = EXCLUDED.headquarters_location,
    is_active = true,
    updated_at = NOW();

-- 2. Stored Procedure: Atomic Deposit Verification
-- Transitions booking from 'quota_held'/'deposit_pending' to 'confirmed'
-- and moves cartons from reserved_cartons to confirmed_cartons in hatchery_quotas.
CREATE OR REPLACE FUNCTION verify_chick_deposit(
    p_booking_ref TEXT,
    p_bank_name TEXT,
    p_payment_reference TEXT,
    p_depositor_name TEXT,
    p_amount_paid_ngn NUMERIC(12, 2),
    p_payment_date DATE DEFAULT CURRENT_DATE,
    p_verified_by_staff_id UUID DEFAULT NULL,
    p_staff_notes TEXT DEFAULT NULL
)
RETURNS TABLE (
    success BOOLEAN,
    booking_id UUID,
    booking_ref TEXT,
    new_booking_status TEXT,
    new_deposit_status TEXT,
    confirmed_cartons INTEGER,
    error_message TEXT
) LANGUAGE plpgsql AS $$
DECLARE
    v_booking RECORD;
    v_quota RECORD;
BEGIN
    -- Acquire exclusive row lock on the booking record
    SELECT * INTO v_booking
    FROM chick_bookings
    WHERE booking_ref = p_booking_ref
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, p_booking_ref, NULL::TEXT, NULL::TEXT, 0, 'Booking reference not found'::TEXT;
        RETURN;
    END IF;

    IF v_booking.booking_status IN ('cancelled', 'expired', 'refunded') THEN
        RETURN QUERY SELECT FALSE, v_booking.id, p_booking_ref, v_booking.booking_status::TEXT, v_booking.deposit_status::TEXT, 0,
            format('Cannot verify deposit for booking in %s state', v_booking.booking_status)::TEXT;
        RETURN;
    END IF;

    -- Lock the corresponding quota
    SELECT * INTO v_quota
    FROM hatchery_quotas
    WHERE id = v_booking.quota_id
    FOR UPDATE;

    IF FOUND THEN
        -- Shift cartons from reserved to confirmed
        UPDATE hatchery_quotas
        SET reserved_cartons = GREATEST(0, reserved_cartons - v_booking.cartons_count),
            confirmed_cartons = confirmed_cartons + v_booking.cartons_count,
            version_lock = version_lock + 1,
            updated_at = NOW()
        WHERE id = v_booking.quota_id;
    END IF;

    -- Update booking status to confirmed
    UPDATE chick_bookings
    SET booking_status = 'confirmed',
        deposit_status = 'verified',
        verified_deposit_ngn = COALESCE(verified_deposit_ngn, 0) + p_amount_paid_ngn,
        held_until = NULL, -- Clear hold TTL
        staff_notes = COALESCE(staff_notes || E'\n', '') || format('[DEPOSIT VERIFIED] ₦%s on %s via %s (Ref: %s)', p_amount_paid_ngn, p_payment_date, p_bank_name, p_payment_reference),
        updated_at = NOW()
    WHERE id = v_booking.id;

    -- Record in deposit_reconciliations audit table
    INSERT INTO deposit_reconciliations (
        booking_id,
        bank_name,
        payment_reference,
        depositor_name,
        amount_paid_ngn,
        payment_date,
        verified_by_staff_id,
        verified_at,
        status,
        staff_notes
    ) VALUES (
        v_booking.id,
        p_bank_name,
        p_payment_reference,
        p_depositor_name,
        p_amount_paid_ngn,
        p_payment_date,
        p_verified_by_staff_id,
        NOW(),
        'approved',
        p_staff_notes
    );

    -- Also update matching enquiry in central enquiry desk if it exists
    UPDATE enquiries
    SET status = 'paid',
        updated_at = NOW()
    WHERE enquiry_ref = p_booking_ref;

    RETURN QUERY SELECT TRUE, v_booking.id, p_booking_ref, 'confirmed'::TEXT, 'verified'::TEXT, v_booking.cartons_count, NULL::TEXT;
END;
$$;

-- 3. Stored Procedure: Cancel Booking & Release Quota
CREATE OR REPLACE FUNCTION cancel_chick_booking(
    p_booking_ref TEXT,
    p_cancellation_reason TEXT,
    p_cancelled_by_staff_id UUID DEFAULT NULL
)
RETURNS TABLE (
    success BOOLEAN,
    released_cartons INTEGER,
    error_message TEXT
) LANGUAGE plpgsql AS $$
DECLARE
    v_booking RECORD;
BEGIN
    SELECT * INTO v_booking
    FROM chick_bookings
    WHERE booking_ref = p_booking_ref
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, 0, 'Booking reference not found'::TEXT;
        RETURN;
    END IF;

    IF v_booking.booking_status IN ('cancelled', 'refunded') THEN
        RETURN QUERY SELECT FALSE, 0, 'Booking is already cancelled or refunded'::TEXT;
        RETURN;
    END IF;

    -- Release cartons from quota
    IF v_booking.booking_status = 'confirmed' THEN
        UPDATE hatchery_quotas
        SET confirmed_cartons = GREATEST(0, confirmed_cartons - v_booking.cartons_count),
            version_lock = version_lock + 1,
            updated_at = NOW()
        WHERE id = v_booking.quota_id;
    ELSE
        -- Was in quota_held or deposit_pending
        UPDATE hatchery_quotas
        SET reserved_cartons = GREATEST(0, reserved_cartons - v_booking.cartons_count),
            version_lock = version_lock + 1,
            updated_at = NOW()
        WHERE id = v_booking.quota_id;
    END IF;

    -- Update booking status
    UPDATE chick_bookings
    SET booking_status = 'cancelled',
        staff_notes = COALESCE(staff_notes || E'\n', '') || format('[CANCELLED] %s', p_cancellation_reason),
        updated_at = NOW()
    WHERE id = v_booking.id;

    RETURN QUERY SELECT TRUE, v_booking.cartons_count, NULL::TEXT;
END;
$$;
