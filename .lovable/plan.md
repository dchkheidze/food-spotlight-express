

# FoodLover — Restaurant Discovery Homepage

## Overview
A premium, warm, and elegant single-page homepage for a B2C restaurant discovery platform. Image-focused design with warm color palette (amber/orange accents, cream backgrounds), modern typography, and full mobile responsiveness.

## Design System
- **Colors**: Warm cream background, deep charcoal text, amber/orange primary accent, warm gold for ratings
- **Typography**: Clean modern fonts, large hero headings, readable body text
- **Cards**: Rounded corners, subtle shadows, image-heavy with overlays
- **Overall feel**: Premium food magazine aesthetic

## Sections (top to bottom)

### 1. Header
- FoodLover logo (left), nav links (Discover, Cuisines, Collections, Blog), search icon, language switcher dropdown, sticky on scroll

### 2. Hero Section
- Full-width background image with dark overlay
- Headline: "Discover Your Next Favorite Place"
- Subheadline about exploring the best restaurants
- Prominent search bar with location + cuisine inputs and search button

### 3. Category Shortcuts
- 6 icon cards in a horizontal scrollable row: Restaurants, Cafes, Bars, Bakeries, Fast Food, Fine Dining
- Each with an icon and label, hover effect

### 4. Featured Restaurants
- Grid of 4-6 restaurant cards with large images, name, cuisine type, location, star rating, and a short description
- "View All" link

### 5. Top Rated Restaurants
- Horizontal scrollable row of cards, similar style but compact
- Prominent rating badges

### 6. New Openings
- Grid/row of 3-4 cards with "New" badge, opening date info

### 7. Popular Cuisines
- Visual grid of cuisine types (Italian, Japanese, Mexican, etc.) as image tiles with text overlay

### 8. Curated Collections
- 3 collection cards (e.g., "Best Rooftop Dining", "Date Night Spots", "Hidden Gems") with cover images and descriptions

### 9. Latest Blog Articles
- 3 article cards with thumbnail, title, date, and excerpt

### 10. Newsletter Section
- Warm background, headline, email input + subscribe button

### 11. Footer
- Logo, nav links, social icons, copyright

## Data Structure
- Mock data arrays for restaurants, articles, cuisines, and collections — typed with TypeScript interfaces, ready for future Supabase table mapping
- All data in a dedicated `src/data/` folder

## File Structure
- `src/data/mockData.ts` — all mock data + types
- `src/components/Header.tsx`
- `src/components/HeroSection.tsx`
- `src/components/CategoryShortcuts.tsx`
- `src/components/RestaurantCard.tsx`
- `src/components/FeaturedRestaurants.tsx`
- `src/components/TopRatedRestaurants.tsx`
- `src/components/NewOpenings.tsx`
- `src/components/PopularCuisines.tsx`
- `src/components/CuratedCollections.tsx`
- `src/components/BlogArticles.tsx`
- `src/components/Newsletter.tsx`
- `src/components/Footer.tsx`
- Updated `src/pages/Index.tsx` composing all sections
- Updated `src/index.css` with warm color palette

