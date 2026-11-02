-- ==============================================================================
-- D-AMINGROW PLATFORM — MIGRATION 20261026000003: SEED CORE PRODUCT CATEGORIES
-- Author: Principal Supabase Database Architect
-- Date: 2026-10-26
-- Description: Seeds the core product categories (Accessories, Drugs, Vaccines, Day-Old Chicks, Point-of-Lay)
-- ==============================================================================

-- Ensure category columns accept text values safely without rigid enum restriction
ALTER TABLE IF EXISTS product_categories ALTER COLUMN core_category TYPE text USING core_category::text;
ALTER TABLE IF EXISTS products ALTER COLUMN category TYPE text USING category::text;

INSERT INTO product_categories (name, slug, core_category, description, display_order, is_active)
VALUES
    (
        'Day-Old Chicks',
        'chicks',
        'day_old_chicks',
        'Premium quality broiler, layer, and cockerel day-old chicks from certified hatcheries across Nigeria. Vaccinated and temperature-monitored dispatch.',
        1,
        TRUE
    ),
    (
        'Veterinary Drugs',
        'drugs',
        'drugs',
        'NAFDAC-compliant veterinary medications, therapeutic antibiotics, broad-spectrum antiparasitics, and restorative nutritional supplements.',
        2,
        TRUE
    ),
    (
        'Livestock Vaccines',
        'vaccines',
        'vaccines',
        'Essential poultry and livestock vaccines maintained under strict cold-chain protocols (2°C to 8°C) with cold-pack transit verification.',
        3,
        TRUE
    ),
    (
        'Farm Accessories & Equipment',
        'accessories',
        'accessories',
        'Durable poultry feeders, drinkers, egg transport crates, brooding infrastructure, and essential commercial farm rearing accessories.',
        4,
        TRUE
    ),
    (
        'Point-of-Lay Birds',
        'point-of-lay',
        'point_of_lay',
        'High-production 14 to 18-week point-of-lay pullets reared under strict veterinary supervision, uniform body weight, and complete vaccination history.',
        5,
        TRUE
    )
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();
