

# Add FloatingChatButton to All Pages

## Problem
The AI chat button only appears on the Homepage and Restaurants page. It's missing from Blog, BlogArticle, Events, Venues, Experiences, Feed, Rankings, and CollectionDetail pages.

## Solution
Instead of adding the button to each page individually, move `<FloatingChatButton />` into `App.tsx` so it renders globally on every route. Then remove it from `Index.tsx` and `Restaurants.tsx`.

## Changes

| File | Change |
|------|--------|
| `src/App.tsx` | Import and render `<FloatingChatButton />` after `<Routes>`, inside `<BrowserRouter>` |
| `src/pages/Index.tsx` | Remove `FloatingChatButton` import and usage |
| `src/pages/Restaurants.tsx` | Remove `FloatingChatButton` import and usage |

This ensures the chat button is available on every current and future page without needing per-page imports.

