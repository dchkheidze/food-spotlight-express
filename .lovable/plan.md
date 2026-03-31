

# Remove Cuisines Tab & Ensure Cuisine Filtering on Restaurants Page

## Changes

### 1. `src/components/Header.tsx`
- Remove the "Cuisines" entry from the `navLinks` array (line `{ label: "Cuisines", path: "/#cuisines" }`).

### 2. Verify existing coverage
The Restaurants/Discover page already has cuisine filtering via `FilterSidebar.tsx` using `cuisineTypes` from `listingData.ts`. No additional filter work needed — cuisines are already accessible there.

