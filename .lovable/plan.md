

# Database Migration: Unified Schema for RestoGo + HoReCa Connect Pro

## Issues Found in the SQL

1. **`CREATE TYPE IF NOT EXISTS` is not valid Postgres syntax.** Must wrap each in a `DO $$ BEGIN ... EXCEPTION WHEN duplicate_object THEN null; END $$;` block.

2. **`CREATE POLICY IF NOT EXISTS` is not supported** in the Postgres version used by Lovable Cloud. Must use `DROP POLICY IF EXISTS` then `CREATE POLICY`.

3. **`profiles.role` column violates security best practice.** Storing roles on the profiles table enables privilege escalation. The `user_roles` table already handles this correctly — the `role` column should be removed from `profiles`.

4. **Trigger on `auth.users`** — The `on_auth_user_created` trigger pattern is standard for Supabase and is fine. However, attaching it requires `SECURITY DEFINER` which is already present.

5. **Migration is very large.** The migration tool works best with smaller batches. I'll split this into 3 migrations:
   - **Migration 1:** Enums + lookup tables (cities, neighborhoods, cuisines, job_categories, supplier_categories) + seed data
   - **Migration 2:** Core tables (profiles, user_roles, restaurants, dishes, promo_posts, addon_purchases, reviews, suppliers, supplier_offers, job_seekers, jobs, job_applications, posts)
   - **Migration 3:** RLS policies, functions, and triggers

## Corrections Applied

| Issue | Fix |
|-------|-----|
| `CREATE TYPE IF NOT EXISTS` | Wrapped in `DO $$ BEGIN ... EXCEPTION` blocks |
| `CREATE POLICY IF NOT EXISTS` | Changed to `DROP POLICY IF EXISTS` + `CREATE POLICY` |
| `profiles.role` column | Removed — roles stay in `user_roles` only |

## What This Creates

- **10 enum types** (app_role, visibility_status, offer_type, etc.)
- **18 tables** covering restaurants, suppliers, jobs, reviews, posts, and lookups
- **RLS on all tables** with appropriate public/owner/user policies
- **Auto-profile creation** trigger on signup
- **`updated_at` triggers** on all mutable tables
- **Seed data** for cities (Tbilisi, Batumi, Kutaisi), neighborhoods, and cuisines

## No Code Changes

As requested — only SQL, no frontend/component changes.

