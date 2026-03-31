

# Add Highlight Carousel to Homepage

## What
A full-width auto-sliding carousel below the hero section showcasing a mix of **new restaurant openings** and **upcoming events**. Each slide shows a large background image, title, short description, and a CTA link (to the restaurant detail or events page).

## How

### 1. New component: `src/components/HighlightCarousel.tsx`
- Uses the existing `Carousel` UI component with Embla's autoplay plugin (`embla-carousel-autoplay`)
- Pulls data from `newOpenings` (mockData) and `foodEvents` (eventsData), merges and interleaves them into slides
- Each slide: full-width image background with gradient overlay, badge ("New Opening" or "Upcoming Event"), title, one-line description, and a link button
- Navigation dots + prev/next arrows
- Auto-advances every 5 seconds, pauses on hover

### 2. Install dependency
- `embla-carousel-autoplay` for auto-slide behavior

### 3. Update `src/pages/Index.tsx`
- Import and place `<HighlightCarousel />` between `<HeroSection />` and `<CategoryShortcuts />`

