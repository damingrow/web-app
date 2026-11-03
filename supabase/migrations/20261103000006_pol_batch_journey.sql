-- =============================================================================
-- Migration: 20261103000006_pol_batch_journey.sql
-- Description: Point-of-Lay batch journey tracking table with RLS policies
-- Phase 5: D-AminGrow POL Batch Journey & Enhanced Farm Tools Directory
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Create PolBatchStage enum
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pol_batch_stage') THEN
    CREATE TYPE pol_batch_stage AS ENUM (
      'reservation_placed',
      'deposit_confirmed',
      'farm_confirmed',
      'in_transit',
      'delivered'
    );
  END IF;
END$$;

-- ---------------------------------------------------------------------------
-- 2. Create pol_batches table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pol_batches (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_ref               TEXT NOT NULL UNIQUE,
  farmer_name             TEXT NOT NULL,
  farmer_phone            TEXT NOT NULL,
  farm_name               TEXT,
  bird_count              INTEGER NOT NULL CHECK (bird_count >= 10),
  crate_count             INTEGER NOT NULL GENERATED ALWAYS AS (CEIL(bird_count::NUMERIC / 10)) STORED,
  deposit_amount_ngn      NUMERIC(12, 2) NOT NULL DEFAULT 0,
  deposit_confirmed       BOOLEAN NOT NULL DEFAULT FALSE,
  deposit_date            DATE,
  depositor_name          TEXT,
  payment_reference       TEXT,
  dispatch_date           DATE NOT NULL,
  hatchery_source         TEXT NOT NULL DEFAULT 'CHI',
  current_stage           pol_batch_stage NOT NULL DEFAULT 'reservation_placed',
  delivery_state          TEXT NOT NULL,
  delivery_city           TEXT NOT NULL,
  estimated_delivery_date DATE,
  special_notes           TEXT,
  breed_type              TEXT NOT NULL DEFAULT 'ISA Brown',
  age_at_dispatch_weeks   INTEGER NOT NULL DEFAULT 17 CHECK (age_at_dispatch_weeks BETWEEN 14 AND 22),
  staff_notes             TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- 3. Stage history audit table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pol_batch_stage_history (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id     UUID NOT NULL REFERENCES pol_batches(id) ON DELETE CASCADE,
  from_stage   pol_batch_stage,
  to_stage     pol_batch_stage NOT NULL,
  changed_by   UUID REFERENCES auth.users(id),
  note         TEXT,
  changed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- 4. Indexes
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_pol_batches_batch_ref    ON pol_batches(batch_ref);
CREATE INDEX IF NOT EXISTS idx_pol_batches_farmer_phone ON pol_batches(farmer_phone);
CREATE INDEX IF NOT EXISTS idx_pol_batches_current_stage ON pol_batches(current_stage);
CREATE INDEX IF NOT EXISTS idx_pol_batches_dispatch_date ON pol_batches(dispatch_date);
CREATE INDEX IF NOT EXISTS idx_pol_stage_history_batch  ON pol_batch_stage_history(batch_id);

-- ---------------------------------------------------------------------------
-- 5. Auto-updated updated_at trigger
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_pol_batches_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_pol_batches_updated_at ON pol_batches;
CREATE TRIGGER trg_pol_batches_updated_at
  BEFORE UPDATE ON pol_batches
  FOR EACH ROW EXECUTE FUNCTION update_pol_batches_updated_at();

-- ---------------------------------------------------------------------------
-- 6. Stage-change audit trigger
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION record_pol_stage_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.current_stage IS DISTINCT FROM NEW.current_stage THEN
    INSERT INTO pol_batch_stage_history (batch_id, from_stage, to_stage, changed_by)
    VALUES (NEW.id, OLD.current_stage, NEW.current_stage, auth.uid());
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_pol_stage_change ON pol_batches;
CREATE TRIGGER trg_pol_stage_change
  AFTER UPDATE ON pol_batches
  FOR EACH ROW EXECUTE FUNCTION record_pol_stage_change();

-- ---------------------------------------------------------------------------
-- 7. Auto-generate batch_ref if not supplied
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION generate_pol_batch_ref()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.batch_ref IS NULL OR NEW.batch_ref = '' THEN
    NEW.batch_ref := 'POL-' || UPPER(SUBSTRING(MD5(gen_random_uuid()::TEXT) FROM 1 FOR 6));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_pol_batch_ref ON pol_batches;
CREATE TRIGGER trg_pol_batch_ref
  BEFORE INSERT ON pol_batches
  FOR EACH ROW EXECUTE FUNCTION generate_pol_batch_ref();

-- ---------------------------------------------------------------------------
-- 8. Row Level Security
-- ---------------------------------------------------------------------------
ALTER TABLE pol_batches            ENABLE ROW LEVEL SECURITY;
ALTER TABLE pol_batch_stage_history ENABLE ROW LEVEL SECURITY;

-- Public: read own batch by batch_ref + phone (no auth needed — tracking link)
CREATE POLICY "pol_batches_public_read_own"
  ON pol_batches FOR SELECT
  USING (TRUE);  -- filtered at API layer by batch_ref + farmer_phone match

-- Staff: full access
CREATE POLICY "pol_batches_staff_all"
  ON pol_batches FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_members sm
      WHERE sm.user_id = auth.uid()
        AND sm.is_active = TRUE
    )
  );

-- Stage history: staff read
CREATE POLICY "pol_stage_history_staff_read"
  ON pol_batch_stage_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_members sm
      WHERE sm.user_id = auth.uid()
        AND sm.is_active = TRUE
    )
  );

-- Stage history: system insert (via trigger)
CREATE POLICY "pol_stage_history_insert"
  ON pol_batch_stage_history FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

-- ---------------------------------------------------------------------------
-- 9. Stored procedure: advance batch stage (staff only)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION advance_pol_batch_stage(
  p_batch_ref TEXT,
  p_new_stage pol_batch_stage,
  p_note      TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_batch pol_batches%ROWTYPE;
  v_is_staff BOOLEAN;
BEGIN
  -- Verify caller is staff
  SELECT EXISTS (
    SELECT 1 FROM staff_members sm
    WHERE sm.user_id = auth.uid() AND sm.is_active = TRUE
  ) INTO v_is_staff;

  IF NOT v_is_staff THEN
    RETURN jsonb_build_object('ok', FALSE, 'error', 'Unauthorized: staff access required');
  END IF;

  -- Fetch batch
  SELECT * INTO v_batch FROM pol_batches WHERE batch_ref = p_batch_ref;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', FALSE, 'error', 'Batch not found: ' || p_batch_ref);
  END IF;

  -- Update stage
  UPDATE pol_batches
  SET
    current_stage    = p_new_stage,
    deposit_confirmed = CASE WHEN p_new_stage = 'deposit_confirmed' THEN TRUE ELSE deposit_confirmed END,
    deposit_date      = CASE WHEN p_new_stage = 'deposit_confirmed' AND deposit_date IS NULL THEN CURRENT_DATE ELSE deposit_date END
  WHERE id = v_batch.id;

  -- Insert history note if provided
  IF p_note IS NOT NULL THEN
    INSERT INTO pol_batch_stage_history (batch_id, from_stage, to_stage, changed_by, note)
    VALUES (v_batch.id, v_batch.current_stage, p_new_stage, auth.uid(), p_note);
  END IF;

  RETURN jsonb_build_object(
    'ok', TRUE,
    'batch_ref', p_batch_ref,
    'previous_stage', v_batch.current_stage,
    'new_stage', p_new_stage
  );
END;
$$;

-- ---------------------------------------------------------------------------
-- 10. Seed demo batches for local development
-- ---------------------------------------------------------------------------
INSERT INTO pol_batches (
  batch_ref, farmer_name, farmer_phone, farm_name,
  bird_count, deposit_amount_ngn, deposit_confirmed,
  dispatch_date, hatchery_source, current_stage,
  delivery_state, delivery_city, estimated_delivery_date,
  breed_type, age_at_dispatch_weeks
) VALUES
  (
    'POL-DEMO01', 'Babatunde Afolabi', '08031234567', 'Afolabi Layers Farm',
    200, 480000, TRUE,
    CURRENT_DATE + INTERVAL '3 days', 'CHI', 'deposit_confirmed',
    'Oyo', 'Ibadan', CURRENT_DATE + INTERVAL '3 days',
    'ISA Brown', 17
  ),
  (
    'POL-DEMO02', 'Ngozi Okonkwo', '08057891234', 'Sunshine Poultry Farm',
    100, 240000, FALSE,
    CURRENT_DATE + INTERVAL '7 days', 'AMO', 'reservation_placed',
    'Lagos', 'Ikeja', CURRENT_DATE + INTERVAL '7 days',
    'Lohmann Brown', 18
  ),
  (
    'POL-DEMO03', 'Emeka Eze', '07061234567', 'Eastern Egg Farm',
    500, 1200000, TRUE,
    CURRENT_DATE - INTERVAL '1 day', 'ZAR', 'in_transit',
    'Anambra', 'Onitsha', CURRENT_DATE,
    'ISA Brown', 17
  )
ON CONFLICT (batch_ref) DO NOTHING;
