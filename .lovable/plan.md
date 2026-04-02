

# Keep RestGo Branding & Consistent Design on Homepage

## Problem
The homepage currently uses "fork.ge" branding and a completely custom nav/layout that doesn't match the rest of the app (e.g., `/restaurants`, `/blog`, `/events`) which all use the shared `Header` and `Footer` components with "RestGo" branding.

## Changes

### `src/pages/Index.tsx`
1. **Replace custom top nav** with the shared `<Header />` component (RestGo branding, consistent nav links)
2. **Replace custom bottom tab nav** with the shared `<Footer />` component
3. **Wrap content** in the same layout pattern as other pages (`min-h-screen bg-background`, with `Header` at top, `Footer` at bottom)
4. **Keep all 6 content sections** (hero, cuisine filters, new openings, this weekend, deals, from the scene) but render them inside the standard page layout instead of the 430px mobile shell
5. Adjust the content container to use `max-w-7xl mx-auto px-4 sm:px-6` like other pages, with the mobile-first card sections remaining responsive

### What stays the same
- All content sections and their data from `homeMockData.ts`
- The coral design tokens (`#D85A30`, `#FAECE7`, etc.)
- Card styling, horizontal scroll rows, section headers
- No changes to Header, Footer, or any other files

