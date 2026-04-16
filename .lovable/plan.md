

# Database & Client Status Check

## Database — OK ✅

All 18 tables exist with RLS enabled and proper policies (verified from schema). Recent Google Places columns (`google_place_id`, `google_rating`, `google_review_count`, `google_photos`, `google_last_synced_at`) are present on `restaurants`. Functions (`has_role`, `handle_new_user`, `update_updated_at`) and seed data (cities, neighborhoods, cuisines) are in place.

## Client File — BROKEN ❌

`src/integrations/supabase/client.ts` has two problems caused by an earlier manual edit:

1. **Wrong Supabase URL/key** — points to `usebdeoflkfzefwqutla.supabase.co` (the external "Horecahub2" project you tried to connect earlier). This project is on Lovable Cloud at `whxpzfafivwcmhqtfbvy.supabase.co`. So even though the DB schema is healthy, your frontend has been talking to the wrong backend.
2. **Build error** — line 12 references `SUPABASE_PUBLISHABLE_KEY` which is never declared (the constant on line 6 is named `SUPABASE_ANON_KEY`).

Per project rules, `client.ts` must never be hand-edited — it's auto-generated. The fix is to restore it to the auto-generated form pointing at the correct Lovable Cloud project, using the env vars from `.env`.

## Fix

Restore `src/integrations/supabase/client.ts` to the standard auto-generated version:

```ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://whxpzfafivwcmhqtfbvy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...GgE4";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { storage: localStorage, persistSession: true, autoRefreshToken: true },
});
```

This resolves the build error AND reconnects the frontend to the actual Lovable Cloud database where all the migrations were run.

## Files Changed
- `src/integrations/supabase/client.ts` — restore auto-generated content

