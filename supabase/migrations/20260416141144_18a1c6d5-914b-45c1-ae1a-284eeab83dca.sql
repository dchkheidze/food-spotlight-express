
-- ENUMS
DO $$ BEGIN CREATE TYPE app_role AS ENUM ('restaurant', 'supplier', 'jobseeker', 'admin'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE visibility_status AS ENUM ('PRIVATE', 'PUBLIC'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE offer_type AS ENUM ('PRODUCT', 'SERVICE'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE job_status AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE application_status AS ENUM ('APPLIED', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'REJECTED', 'HIRED'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE subscription_tier AS ENUM ('freemium', 'standard', 'premium'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE promo_post_status AS ENUM ('draft', 'scheduled', 'published', 'expired'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE addon_type AS ENUM ('homepage_spotlight', 'category_pin', 'extra_promo_post', 'job_board_post', 'push_notification_blast', 'new_opening_feature'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE price_level AS ENUM ('budget', 'moderate', 'upscale', 'fine_dining'); EXCEPTION WHEN duplicate_object THEN null; END $$;

-- LOOKUP TABLES
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  country text DEFAULT 'Georgia',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS neighborhoods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cuisines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  emoji text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS supplier_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS on lookup tables
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE cuisines ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read cities" ON cities;
CREATE POLICY "Public read cities" ON cities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read neighborhoods" ON neighborhoods;
CREATE POLICY "Public read neighborhoods" ON neighborhoods FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read cuisines" ON cuisines;
CREATE POLICY "Public read cuisines" ON cuisines FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read job_categories" ON job_categories;
CREATE POLICY "Public read job_categories" ON job_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read supplier_categories" ON supplier_categories;
CREATE POLICY "Public read supplier_categories" ON supplier_categories FOR SELECT USING (true);

-- SEED DATA
INSERT INTO cities (name, slug, country) VALUES
  ('Tbilisi', 'tbilisi', 'Georgia'),
  ('Batumi', 'batumi', 'Georgia'),
  ('Kutaisi', 'kutaisi', 'Georgia')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO neighborhoods (city_id, name, slug)
SELECT c.id, n.name, n.slug FROM cities c
CROSS JOIN (VALUES
  ('Old Town', 'old-town'), ('Vake', 'vake'), ('Saburtalo', 'saburtalo'),
  ('Vera', 'vera'), ('Marjanishvili', 'marjanishvili'), ('Rustaveli', 'rustaveli'),
  ('Sololaki', 'sololaki'), ('Didube', 'didube'), ('Gldani', 'gldani'), ('Isani', 'isani')
) AS n(name, slug)
WHERE c.slug = 'tbilisi'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO cuisines (name, slug, emoji) VALUES
  ('Georgian', 'georgian', '🇬🇪'), ('Italian', 'italian', '🍕'),
  ('Japanese', 'japanese', '🍣'), ('Chinese', 'chinese', '🥟'),
  ('Indian', 'indian', '🍛'), ('Mexican', 'mexican', '🌮'),
  ('American', 'american', '🍔'), ('Mediterranean', 'mediterranean', '🫒'),
  ('Turkish', 'turkish', '🥙'), ('French', 'french', '🥐'),
  ('Middle Eastern', 'middle-eastern', '🧆'), ('Fusion', 'fusion', '🍽️')
ON CONFLICT (slug) DO NOTHING;
