# D-AMINGROW — CHICK BOOKING ENGINE SPECIFICATION
## Phase 00B: Transactional Reservation, Quota Allocation & Deposit Reconciliation Architecture
**Verification Date:** November 3, 2026  
**Auditor:** Principal Software Architect & Database Systems Engineer  
**Target Repository:** `/Users/mac/Projects/Damingrow`  

---

## 1. Architectural Overview & Business Motivation

Day-Old Chicks (DOC) and Point-of-Lay (POL) birds represent D-AminGrow's highest commercial volume and core revenue driver. However, live chick distribution in Nigeria operates under unique logistical and biological realities:
1. **Perishable Inventory:** Chicks must be distributed within 24–48 hours of hatch. Unclaimed chicks suffer high mortality.
2. **Fixed Dispatch Schedules:** National parent-stock hatcheries dispatch on specific weekdays (traditionally **Tuesday and Thursday** mornings).
3. **Weekly Price & Supply Fluctuations:** Hatchery prices fluctuate weekly based on breeder egg availability, diesel prices, and feed costs.
4. **Finite Carton Quotas:** A partner hatchery (e.g., Chi, Zartech, Amo, Sayed) allocates a fixed number of cartons per dispatch run to D-AminGrow. Overbooking results in catastrophic customer default.

```
       [Customer Intake] ---> [Interactive Booking Form / Storefront]
                                      │
                                      ▼
                       [Transactional Concurrency Guard]
                     (SELECT FOR UPDATE on Hatchery Quota)
                                      │
              ┌───────────────────────┴───────────────────────┐
              ▼                                               ▼
       [Quota Available]                             [Quota Exhausted]
              │                                               │
   [Hold Quota for 2 Hours]                           [Suggest Alternate Hatchery /
   [Issue Unique Booking Ref]                          Waitlist Next Dispatch Run]
              │
              ▼
   [Deposit Evidence Upload]
              │
              ▼
   [Manual Staff Bank Verification]
  (NEVER auto-verified by screenshot)
              │
              ▼
   [Confirmed Reservation]
              │
              ▼
   [Tuesday/Thursday Dispatch Manifest]
```

---

## 2. PostgreSQL Relational Schema Design

To be implemented via migration `20261103000001_chick_booking_engine.sql`:

```sql
-- ==============================================================================
-- PARTNER HATCHERIES & BRANDS
-- ==============================================================================
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

-- ==============================================================================
-- WEEKLY DISPATCH BATCHES & HATCHERY QUOTAS
-- ==============================================================================
CREATE TYPE dispatch_day_enum AS ENUM ('Tuesday', 'Thursday', 'Special_Run');
CREATE TYPE quota_status_enum AS ENUM ('open', 'limited', 'closed', 'dispatched');

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
    version_lock INTEGER NOT NULL DEFAULT 1, -- Optimistic concurrency tracking
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT check_quota_limits CHECK ((reserved_cartons + confirmed_cartons) <= total_cartons_quota),
    CONSTRAINT unique_hatchery_breed_dispatch UNIQUE (hatchery_id, breed_type, dispatch_date)
);

CREATE INDEX idx_hatchery_quotas_lookup ON hatchery_quotas(dispatch_date, breed_type, status);

-- ==============================================================================
-- CHICK BOOKING TRANSACTIONS
-- ==============================================================================
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

CREATE TYPE deposit_status_enum AS ENUM (
    'unpaid',
    'evidence_submitted',
    'verified',
    'refund_due',
    'refunded'
);

CREATE TABLE IF NOT EXISTS chick_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_ref TEXT NOT NULL UNIQUE, -- e.g. "DOC-20261103-CHI-049"
    customer_phone TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    farm_name TEXT,
    delivery_state TEXT NOT NULL,
    destination_hub TEXT NOT NULL,    -- e.g. "Kano Luxury Bus Depot", "Bodija Motor Park"
    
    hatchery_id UUID NOT NULL REFERENCES partner_hatcheries(id) ON DELETE RESTRICT,
    quota_id UUID NOT NULL REFERENCES hatchery_quotas(id) ON DELETE RESTRICT,
    breed_type TEXT NOT NULL,
    
    cartons_count INTEGER NOT NULL CHECK (cartons_count >= 1),
    birds_per_carton INTEGER NOT NULL DEFAULT 51, -- 50 + 1 mortality buffer
    total_birds_count INTEGER NOT NULL,
    
    estimated_rate_per_carton NUMERIC(10, 2) NOT NULL,
    estimated_total_ngn NUMERIC(12, 2) NOT NULL,
    required_deposit_ngn NUMERIC(12, 2) NOT NULL,
    verified_deposit_ngn NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    
    booking_status booking_status_enum NOT NULL DEFAULT 'initiated',
    deposit_status deposit_status_enum NOT NULL DEFAULT 'unpaid',
    
    held_until TIMESTAMPTZ, -- Temporary reservation TTL (e.g. 2 hours)
    assigned_waybill_ref TEXT,
    assigned_vehicle_info TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chick_bookings_status ON chick_bookings(booking_status);
CREATE INDEX idx_chick_bookings_phone ON chick_bookings(customer_phone);
CREATE INDEX idx_chick_bookings_quota ON chick_bookings(quota_id);

-- ==============================================================================
-- DEPOSIT VERIFICATION & BANK RECONCILIATION
-- ==============================================================================
CREATE TABLE IF NOT EXISTS deposit_reconciliations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES chick_bookings(id) ON DELETE CASCADE,
    bank_name TEXT NOT NULL,              -- e.g. 'Zenith Bank', 'First Bank', 'GTBank'
    payment_reference TEXT NOT NULL,      -- NIP Session ID or Teller Number
    depositor_name TEXT NOT NULL,
    amount_paid_ngn NUMERIC(12, 2) NOT NULL CHECK (amount_paid_ngn > 0),
    payment_date DATE NOT NULL,
    receipt_image_path TEXT,              -- Supabase Private Storage URL
    verified_by_staff_id UUID REFERENCES staff_profiles(id) ON DELETE RESTRICT,
    verified_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected')),
    rejection_reason TEXT,
    staff_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_deposit_reconciliations_booking ON deposit_reconciliations(booking_id);
```

---

## 3. Concurrency Protection & Transactional Isolation

### 3.1 The Race Condition Problem
If Hatchery A has 50 cartons remaining on a Tuesday dispatch, and three commercial farmers simultaneously attempt to book 30 cartons each:
- A naive `SELECT` followed by `UPDATE` will read 50 remaining for all three callers.
- All three bookings will succeed, allocating 90 cartons against a 50-carton quota.
- D-AminGrow is forced into default on 40 cartons (₦1.9M+ customer capital at risk).

### 3.2 The PostgreSQL Transactional Solution
All booking reservations MUST be executed via a PostgreSQL stored procedure or atomic transaction utilizing `SELECT ... FOR UPDATE`:

```sql
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
    -- 1. Acquire exclusive row lock on the quota record
    SELECT * INTO v_quota
    FROM hatchery_quotas
    WHERE id = p_quota_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, NULL::TIMESTAMPTZ, 'Hatchery quota record not found'::TEXT;
        RETURN;
    END IF;

    -- 2. Verify quota status and capacity
    IF v_quota.status = 'closed' OR v_quota.status = 'dispatched' THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, NULL::TIMESTAMPTZ, 'This dispatch run is closed for new bookings'::TEXT;
        RETURN;
    END IF;

    v_available_cartons := v_quota.total_cartons_quota - (v_quota.reserved_cartons + v_quota.confirmed_cartons);

    IF v_available_cartons < p_cartons_count THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, NULL::TIMESTAMPTZ, 
            format('Insufficient quota: only %s cartons available, requested %s', v_available_cartons, p_cartons_count);
        RETURN;
    END IF;

    -- 3. Retrieve hatchery packaging rules
    SELECT * INTO v_hatchery FROM partner_hatcheries WHERE id = v_quota.hatchery_id;
    
    IF v_hatchery.default_packaging_rule = '25_per_box' THEN
        v_birds_per_carton := 25;
    ELSE
        v_birds_per_carton := 51; -- 50 + 1 standard
    END IF;

    v_total_birds := p_cartons_count * v_birds_per_carton;
    v_est_total := p_cartons_count * v_quota.estimated_price_per_carton;
    v_req_deposit := v_est_total * 0.50; -- 50% commitment deposit
    v_held_until := NOW() + (p_hold_duration_minutes || ' minutes')::INTERVAL;
    
    v_booking_ref := format('DOC-%s-%s-%s', 
        to_char(v_quota.dispatch_date, 'YYYYMMDD'), 
        v_hatchery.code, 
        upper(substr(md5(random()::text), 1, 4))
    );

    -- 4. Atomically increment reserved count on quota
    UPDATE hatchery_quotas
    SET reserved_cartons = reserved_cartons + p_cartons_count,
        updated_at = NOW()
    WHERE id = p_quota_id;

    -- 5. Insert reservation record
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

    RETURN QUERY SELECT TRUE, v_new_booking_id, v_booking_ref, v_held_until, NULL::TEXT;
END;
$$;
```

---

## 4. Quota Expiration & TTL Worker

When a customer holds a quota, they receive 120 minutes (2 hours) to submit bank deposit evidence. If no evidence is submitted within the TTL, a scheduled database function releases the held cartons back to the public pool:

```sql
CREATE OR REPLACE FUNCTION release_expired_chick_holds()
RETURNS INTEGER LANGUAGE plpgsql AS $$
DECLARE
    v_expired_record RECORD;
    v_released_count INTEGER := 0;
BEGIN
    FOR v_expired_record IN 
        SELECT id, quota_id, cartons_count 
        FROM chick_bookings
        WHERE booking_status = 'quota_held'
          AND deposit_status = 'unpaid'
          AND held_until < NOW()
    LOOP
        -- Release cartons from quota
        UPDATE hatchery_quotas
        SET reserved_cartons = GREATEST(0, reserved_cartons - v_expired_record.cartons_count),
            updated_at = NOW()
        WHERE id = v_expired_record.quota_id;

        -- Transition booking status to expired
        UPDATE chick_bookings
        SET booking_status = 'expired',
            updated_at = NOW()
        WHERE id = v_expired_record.id;

        v_released_count := v_released_count + 1;
    END LOOP;

    RETURN v_released_count;
END;
$$;
```

---

## 5. Deposit Verification & Reconciliation Policy

To protect D-AminGrow against fake bank transfer screenshots and fraudulent receipts:
1. **Zero Automated Trust:** An uploaded screenshot NEVER alters `deposit_status` to `'verified'`. Uploading evidence transitions status only to `'evidence_submitted'`.
2. **Mandatory Banking Cross-Reference:** Staff must open the bank mobile application or web portal and confirm the credit alert with matching NIP Session ID, account name, and exact amount.
3. **Audit Trail Attribution:** When a staff member clicks "Confirm Deposit", the system records `verified_by_staff_id`, `verified_at`, and the bank reference in `deposit_reconciliations`.
4. **Transition to Confirmed:** Only after manual staff verification does the reservation status change to `'confirmed'` and the quota moves from `reserved_cartons` to `confirmed_cartons`.

---

## 6. Dispatch Manifest Generator

Every Monday and Wednesday afternoon (prior to Tuesday and Thursday dispatches), the Admin portal aggregates all `'confirmed'` bookings into an **Interstate Dispatch Manifest**:
- Grouped by Interstate Transit Route (e.g. Lagos–Ibadan–Oshogbo, Ibadan–Ilorin–Kaduna–Kano, Ibadan–Benin–Onitsha–Enugu).
- Summarizes total cartons per hatchery brand.
- Generates waybill printouts with destination driver phone numbers and customer collection phone numbers.
