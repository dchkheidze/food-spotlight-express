

# Rebuild Homepage as Mobile-First B2C Screen (fork.ge)

This is a **complete replacement** of the current `Index.tsx` page content. The existing page renders Header, HeroSection, HighlightCarousel, CategoryShortcuts, and many other components. The new design is a mobile-app-style homepage (max-width 430px, centered) with a completely different layout and design system.

## Approach

**Replace `src/pages/Index.tsx`** with a single self-contained component that renders all 8 sections inline. No existing components will be modified or deleted — they just won't be imported on this page anymore.

**Create `src/data/homeMockData.ts`** with hardcoded Georgian mock data (restaurants, events, deals, news) using Tbilisi names, GEL prices, and Georgian neighbourhoods.

## Design tokens (inline Tailwind + arbitrary values)

- Primary coral: `#D85A30`, dark coral: `#993C1D`, deep brown: `#4A1B0C`, mid brown: `#712B13`
- Hero bg: `#FAECE7`, border accent: `#F09977`, promo border: `#F5C4B3`
- Event category pill: bg `#E6F1FB`, text `#185FA5`
- Font weight: `font-normal` (400) for body, `font-medium` (500) for headings — never `font-semibold` or above
- Border radius: `rounded-lg` (8px) for elements, `rounded-xl` (12px) for cards
- Borders: `border-[0.5px]` with low opacity
- No gradients, no shadows, no decorative effects

## Sections to build (all inside one component)

### 1. Top nav bar
- "fork.ge" logo in `#D85A30`, 18px, weight 500
- Right side: city pill "Tbilisi" (static, tappable look) + User circle icon

### 2. Hero section (bg `#FAECE7`)
- Uppercase label "Discover Tbilisi" in `#993C1D`
- Headline 22px/500: "Where do you want to eat tonight?" in `#4A1B0C`
- Search input: white bg, `#F09977` border, rounded-xl, search icon in `#D85A30`, placeholder text

### 3. Cuisine quick-filters (horizontal scroll, hidden scrollbar)
- 7 chips: Georgian 🇬🇪, Cafés ☕, Wine bars 🍷, Pizza 🍕, Sushi 🍣, Vegan 🥗, Brunch 🥞
- 44×44px icon container (muted bg) + 11px label below

### 4. "New openings" section
- Header: "New openings" left, "See all" right in coral
- Horizontal scroll, 150px-wide cards
- Card: 90px image area with emoji placeholder on `#FAECE7`, name (13px/500), cuisine+neighbourhood (11px muted), coral badge "X days ago"

### 5. "This weekend" section
- Same header pattern
- 210px-wide event cards
- Day+date in `#993C1D` uppercase, event name, venue+time, price + category pill (`#E6F1FB`/`#185FA5`)

### 6. "Deals & promotions" section
- 190px cards, bg `#FAECE7`, border `#F5C4B3`
- Large deal text in coral (22px/500), restaurant name, description, expiry note

### 7. "From the scene" news section
- Vertical list, not cards
- 40×40px icon box + title/timestamp rows, separator lines

### 8. Bottom tab navigation
- 5 tabs: Home (active coral), Search, Near me, Saved, Profile
- Active in `#D85A30`, inactive muted gray, top border only, no background
- Fixed to bottom

## Files

| File | Action |
|------|--------|
| `src/data/homeMockData.ts` | Create — all Georgian mock data |
| `src/pages/Index.tsx` | Replace — new self-contained homepage |

No other files touched. No routes, auth, or Supabase changes.

