-- ==============================================================================
-- D-AMINGROW PLATFORM — MIGRATION 20261026000001 ROLLBACK SCRIPT
-- WARNING: DESTRUCTIVE ACTION. Drops all core tables, triggers, and custom types.
-- MUST OBTAIN EXPLICIT LEAD ARCHITECT APPROVAL BEFORE EXECUTING IN PRODUCTION.
-- ==============================================================================

-- Drop triggers and functions
DROP FUNCTION IF EXISTS trigger_set_updated_at() CASCADE;

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS application_settings CASCADE;
DROP TABLE IF EXISTS audit_events CASCADE;
DROP TABLE IF EXISTS consent_records CASCADE;
DROP TABLE IF EXISTS enquiry_notes CASCADE;
DROP TABLE IF EXISTS enquiry_status_history CASCADE;
DROP TABLE IF EXISTS enquiries CASCADE;
DROP TABLE IF EXISTS redirects CASCADE;
DROP TABLE IF EXISTS content_sections CASCADE;
DROP TABLE IF EXISTS landing_pages CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS product_media CASCADE;
DROP TABLE IF EXISTS product_variants CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS product_categories CASCADE;
DROP TABLE IF EXISTS suppliers CASCADE;
DROP TABLE IF EXISTS staff_profiles CASCADE;

-- Drop custom enum types
DROP TYPE IF EXISTS consent_type_enum CASCADE;
DROP TYPE IF EXISTS enquiry_status_enum CASCADE;
DROP TYPE IF EXISTS enquiry_type_enum CASCADE;
DROP TYPE IF EXISTS stock_status_enum CASCADE;
DROP TYPE IF EXISTS regulatory_status_enum CASCADE;
DROP TYPE IF EXISTS product_category_enum CASCADE;
DROP TYPE IF EXISTS user_role_enum CASCADE;
