

# Add Venues Page for Event Spaces

## What
A new **Venues** tab/page (`/venues`) listing spaces available for private events — weddings, birthday parties, corporate events, etc. Follows the same design patterns as `/restaurants` and `/events`.

## Changes

### 1. Create `src/data/venuesData.ts`
Mock data with 8–10 Tbilisi venues. Each venue has:
- id, name, slug, image (Unsplash), location, description
- capacity (e.g. "50–200 guests")
- eventTypes array (e.g. `["Wedding", "Birthday", "Corporate", "Anniversary"]`)
- priceRange (e.g. "₾₾₾")
- rating, phone, features (e.g. "Outdoor terrace", "Live music", "Catering included")
- isFeatured flag

Event type categories: `["All", "Wedding", "Birthday", "Corporate", "Anniversary", "Graduation", "Engagement"]`

### 2. Create `src/components/VenueCard.tsx`
Reuses the same card pattern as `RestaurantCard` — image with overlay badges (capacity, price range, rating), venue name, location, event types as small badges. Links to venue detail (future).

### 3. Create `src/pages/Venues.tsx`
Same layout as Events page:
- Header + Footer
- Breadcrumb (Home → Venues)
- Title + result count + search bar
- Filter row: event type category pills + capacity select + price select
- Responsive grid of VenueCard (`grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`)
- Load More pagination
- Empty state

### 4. Update `src/App.tsx`
Add route: `<Route path="/venues" element={<Venues />} />`

### 5. Update `src/components/Header.tsx`
Add "Venues" to `navLinks` array: `{ label: "Venues", path: "/venues" }`

## Files

| File | Action |
|------|--------|
| `src/data/venuesData.ts` | Create |
| `src/components/VenueCard.tsx` | Create |
| `src/pages/Venues.tsx` | Create |
| `src/App.tsx` | Add route |
| `src/components/Header.tsx` | Add nav link |

