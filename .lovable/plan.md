

# Fix Missing Feed Images

## Problem
The feed cards (promotions, new openings, news) are missing their images. The `picsum.photos/seed/{slug}/800/450` URLs are failing to load — likely due to CORS issues, rate limiting, or the service being unreliable.

## Solution
Replace all `picsum.photos` URLs in `src/data/feedData.ts` with reliable Unsplash image URLs (using `images.unsplash.com/photo-{id}?w=800&h=450&fit=crop`) that match the Georgian food/restaurant context.

## Changes

### `src/data/feedData.ts`
Replace all 9 `picsum.photos` image URLs with Unsplash direct URLs:
- Promotions (3): Georgian restaurant/food images
- New openings (3): Restaurant interior/exterior images  
- News (3): Tbilisi food scene / wine / khinkali images

No structural changes — just swap the URL strings.

