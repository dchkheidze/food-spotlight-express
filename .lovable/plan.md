

# Add Experiences Page — Local Culinary Experiences

## What
A new **Experiences** tab (`/experiences`) showcasing family-owned places across Georgia where visitors can enjoy authentic local cuisine experiences — cooking classes, traditional feasts, wine-making tours, etc.

## Changes

### 1. Create `src/data/experiencesData.ts`
Mock data with 9-10 experiences across Georgian regions. Each entry:
- id, name, slug, image (Unsplash), region (e.g. "Kakheti", "Imereti", "Adjara", "Tbilisi"), location
- hostFamily (e.g. "The Giorgadze Family"), description
- cuisineType (e.g. "Kakhetian", "Imeretian", "Adjarian", "Megrelian")
- duration (e.g. "3-4 hours"), groupSize (e.g. "2–8 guests")
- price (e.g. "₾80/person"), rating, reviewCount
- includes array (e.g. "Cooking class", "Wine tasting", "Farm tour", "Traditional supra")
- isFeatured flag

Region categories: `["All", "Kakheti", "Imereti", "Adjara", "Svaneti", "Mtskheta", "Tbilisi", "Racha"]`

### 2. Create `src/components/ExperienceCard.tsx`
Same card pattern as `VenueCard` — image with overlay badges (price, rating), family name, region, cuisine type, duration and group size info, includes tags.

### 3. Create `src/pages/Experiences.tsx`
Same layout as Venues page:
- Header + Footer + Breadcrumb (Home → Experiences)
- Title ("Authentic Georgian Culinary Experiences") + result count + search bar
- Filter row: region category pills + cuisine type select + group size select
- Responsive grid of ExperienceCard
- Load More pagination + empty state

### 4. Update `src/App.tsx`
Add route: `<Route path="/experiences" element={<Experiences />} />`

### 5. Update `src/components/Header.tsx`
Add "Experiences" to `navLinks` array

## Files

| File | Action |
|------|--------|
| `src/data/experiencesData.ts` | Create |
| `src/components/ExperienceCard.tsx` | Create |
| `src/pages/Experiences.tsx` | Create |
| `src/App.tsx` | Add route |
| `src/components/Header.tsx` | Add nav link |

