

# Apply Restaurants Page Design to Homepage

## What
Replace the current homepage content sections (emoji placeholders, small horizontal-scroll cards) with the same visual style used on `/restaurants` — real image cards using `RestaurantCard`, proper grid layout, and the same typography/spacing patterns.

## Changes

### 1. `src/pages/Index.tsx`
- Keep Header, Footer, and Hero section as-is
- Replace the "New openings" emoji cards with a grid of `RestaurantCard` components using data from `listingRestaurants` (filtered to `isNew` ones), displayed in a responsive grid (`grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6`) — same as `/restaurants`
- Keep "This weekend", "Deals & promotions", and "From the scene" sections but style them with the same card treatment (rounded-2xl, border, proper spacing) as the restaurant cards
- Wrap each restaurant card in a `<Link>` to `/restaurants/:slug` like the listing page does
- Use the same section header style (larger text, consistent with `/restaurants` title sizing)

### 2. `src/data/homeMockData.ts`
- No changes needed — the "New openings" section will pull from `listingRestaurants` (which already has `isNew` flags and real images) instead of the emoji-based `newOpenings` array

### 3. `src/components/RestaurantCard.tsx`
- No changes — reuse as-is

### What stays
- Hero section with search bar and coral design tokens
- Cuisine quick-filters row
- All other sections (weekend events, deals, news) — just refined styling
- Header/Footer (RestGo branding)

