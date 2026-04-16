
-- ENABLE RLS ON ALL CORE TABLES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE addon_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_seekers ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- HAS_ROLE FUNCTION
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- PROFILES POLICIES
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- USER_ROLES POLICIES
DROP POLICY IF EXISTS "Users can view own roles" ON user_roles;
CREATE POLICY "Users can view own roles" ON user_roles FOR SELECT USING (auth.uid() = user_id);

-- RESTAURANTS POLICIES
DROP POLICY IF EXISTS "Public read published restaurants" ON restaurants;
CREATE POLICY "Public read published restaurants" ON restaurants FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Owners can manage own restaurant" ON restaurants;
CREATE POLICY "Owners can manage own restaurant" ON restaurants FOR ALL USING (auth.uid() = owner_user_id);

-- DISHES POLICIES
DROP POLICY IF EXISTS "Public read dishes" ON dishes;
CREATE POLICY "Public read dishes" ON dishes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Restaurant owner manages dishes" ON dishes;
CREATE POLICY "Restaurant owner manages dishes" ON dishes FOR ALL USING (
  EXISTS (SELECT 1 FROM restaurants r WHERE r.id = dishes.restaurant_id AND r.owner_user_id = auth.uid())
);

-- PROMO_POSTS POLICIES
DROP POLICY IF EXISTS "Public read published promo posts" ON promo_posts;
CREATE POLICY "Public read published promo posts" ON promo_posts FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Restaurant owner manages promo posts" ON promo_posts;
CREATE POLICY "Restaurant owner manages promo posts" ON promo_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM restaurants r WHERE r.id = promo_posts.restaurant_id AND r.owner_user_id = auth.uid())
);

-- ADDON_PURCHASES POLICIES
DROP POLICY IF EXISTS "Restaurant owner manages addon purchases" ON addon_purchases;
CREATE POLICY "Restaurant owner manages addon purchases" ON addon_purchases FOR ALL USING (
  EXISTS (SELECT 1 FROM restaurants r WHERE r.id = addon_purchases.restaurant_id AND r.owner_user_id = auth.uid())
);

-- REVIEWS POLICIES
DROP POLICY IF EXISTS "Public read reviews" ON reviews;
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Users can write own reviews" ON reviews;
CREATE POLICY "Users can write own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);

-- SUPPLIERS POLICIES
DROP POLICY IF EXISTS "Public read published suppliers" ON suppliers;
CREATE POLICY "Public read published suppliers" ON suppliers FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Owners can manage own supplier" ON suppliers;
CREATE POLICY "Owners can manage own supplier" ON suppliers FOR ALL USING (auth.uid() = owner_user_id);

-- SUPPLIER_OFFERS POLICIES
DROP POLICY IF EXISTS "Public read active offers" ON supplier_offers;
CREATE POLICY "Public read active offers" ON supplier_offers FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Supplier owner manages offers" ON supplier_offers;
CREATE POLICY "Supplier owner manages offers" ON supplier_offers FOR ALL USING (
  EXISTS (SELECT 1 FROM suppliers s WHERE s.id = supplier_offers.supplier_id AND s.owner_user_id = auth.uid())
);

-- JOB_SEEKERS POLICIES
DROP POLICY IF EXISTS "Public read public job seekers" ON job_seekers;
CREATE POLICY "Public read public job seekers" ON job_seekers FOR SELECT USING (visibility_status = 'PUBLIC');

DROP POLICY IF EXISTS "Users manage own job seeker profile" ON job_seekers;
CREATE POLICY "Users manage own job seeker profile" ON job_seekers FOR ALL USING (auth.uid() = user_id);

-- JOBS POLICIES
DROP POLICY IF EXISTS "Public read published jobs" ON jobs;
CREATE POLICY "Public read published jobs" ON jobs FOR SELECT USING (status = 'PUBLISHED');

DROP POLICY IF EXISTS "Restaurant owner manages jobs" ON jobs;
CREATE POLICY "Restaurant owner manages jobs" ON jobs FOR ALL USING (
  EXISTS (SELECT 1 FROM restaurants r WHERE r.id = jobs.restaurant_id AND r.owner_user_id = auth.uid())
);

-- JOB_APPLICATIONS POLICIES
DROP POLICY IF EXISTS "Users view own applications" ON job_applications;
CREATE POLICY "Users view own applications" ON job_applications FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can apply to jobs" ON job_applications;
CREATE POLICY "Users can apply to jobs" ON job_applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- POSTS POLICIES
DROP POLICY IF EXISTS "Public read published posts" ON posts;
CREATE POLICY "Public read published posts" ON posts FOR SELECT USING (status = 'published');

-- AUTO PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- UPDATED_AT FUNCTION
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

-- UPDATED_AT TRIGGERS
DROP TRIGGER IF EXISTS update_restaurants_updated_at ON restaurants;
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_dishes_updated_at ON dishes;
CREATE TRIGGER update_dishes_updated_at BEFORE UPDATE ON dishes FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_promo_posts_updated_at ON promo_posts;
CREATE TRIGGER update_promo_posts_updated_at BEFORE UPDATE ON promo_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_suppliers_updated_at ON suppliers;
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_supplier_offers_updated_at ON supplier_offers;
CREATE TRIGGER update_supplier_offers_updated_at BEFORE UPDATE ON supplier_offers FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_job_seekers_updated_at ON job_seekers;
CREATE TRIGGER update_job_seekers_updated_at BEFORE UPDATE ON job_seekers FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_jobs_updated_at ON jobs;
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at();
