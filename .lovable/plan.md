

# Add Google Places Columns to Restaurants Table

## What This Does
Adds 5 new columns to the `restaurants` table for Google Places integration (place ID, rating, review count, photos, last sync timestamp) and creates an index on `google_place_id`.

## Migration SQL
Single migration adding:
- `google_place_id` (text) — Google's unique place identifier
- `google_rating` (numeric 3,1) — Google Maps rating
- `google_review_count` (integer) — Google review count
- `google_photos` (jsonb) — Array of Google photo references
- `google_last_synced_at` (timestamptz) — Last sync timestamp
- Index on `google_place_id` for fast lookups

No code changes needed — schema only.

