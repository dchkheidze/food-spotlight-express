

# Replace Cuisine Filter Emojis with Real Images

## What
Replace the emoji icons in the cuisine quick-filter chips with real food/cuisine images (like the reference screenshot showing styled illustration-style icons for Georgian, Cafés, Wine bars, Pizza, Sushi, Vegan, Brunch).

## Changes

### 1. Source images
Use free food icon images from Unsplash/Pexels or similar — download 7 small square images (one per cuisine category) and place them in `src/assets/cuisines/`. Each image will be a real photo cropped to work at 44×44px in a rounded container.

Images needed:
- `georgian.jpg` — Georgian food (khinkali/khachapuri)
- `cafes.jpg` — Coffee cup
- `wine.jpg` — Wine glass/bottle
- `pizza.jpg` — Pizza slice
- `sushi.jpg` — Sushi rolls
- `vegan.jpg` — Fresh salad/vegetables
- `brunch.jpg` — Brunch plate/pancakes

### 2. Update `src/data/homeMockData.ts`
Replace the `emoji` field in `cuisineFilters` with an `image` field pointing to the imported asset path.

### 3. Update `src/pages/Index.tsx`
In the cuisine quick-filters section, replace the emoji `<div>` with an `<img>` tag using `object-cover` and `rounded-lg` to display the photo in the same 44×44px container.

## Files

| File | Action |
|------|--------|
| `src/assets/cuisines/*.jpg` | Create — 7 cuisine images |
| `src/data/homeMockData.ts` | Update — swap emoji for image imports |
| `src/pages/Index.tsx` | Update — render `<img>` instead of emoji text |

