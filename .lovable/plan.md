

# Fix Broken Event Card Image

## Problem
The "Natural Wine Tasting: Kakheti Special" event card (id: `e3`) has a broken image. The Unsplash URL `photo-1529543544282-ea97407e3587` is not loading.

## Fix
Replace the broken image URL in `src/data/eventsData.ts` (line 32) with a working wine-related Unsplash image URL, such as:
`https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop` (wine glasses photo).

### File: `src/data/eventsData.ts`
- Line 32: Replace the image URL for event `e3` with a valid Unsplash wine photo URL.

