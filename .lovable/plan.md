

# AI-Powered Hero Search

## Problem
The user wants the hero search bar on the homepage to be AI-powered — typing a query and pressing Enter/clicking search should call an AI model and display restaurant recommendations inline below the search bar.

## Issue with the Provided Code
The provided code calls `api.anthropic.com` directly from the browser. This **will not work** because:
1. Anthropic's API blocks browser requests (CORS)
2. No API key header is included in the fetch call
3. Exposing an API key in client-side code is a security risk

## Adapted Solution
Use the **existing `restogo-chat` Edge Function** (already deployed) which proxies to the Lovable AI Gateway. This is already set up and working for the chat drawer. I'll adapt the system prompt for the hero search use case to return structured JSON.

I'll also fix the data field references: the mock data uses `location` (not `area`) and `district`, and has no `tags` field.

## Changes — `src/pages/Index.tsx` only

1. Add `useState` import
2. Add state variables: `query`, `loading`, `aiAnswer`, `aiCards`
3. Build `RESTAURANTS_CONTEXT` from `listingRestaurants` using correct fields (`location`, `district`, `cuisine`, `rating`, `priceRange`)
4. Add `handleSearch` function that:
   - Calls the existing edge function with a system prompt requesting JSON output (`{"answer": "...", "restaurants": ["Name1", ...]}`)
   - Parses the streamed response, extracts the JSON
   - Matches restaurant names back to `listingRestaurants` for card data
5. Replace the static `<input>` in the hero section with:
   - Controlled input with Enter-to-search
   - Search button (coral circle with arrow)
   - Quick suggestion chips ("best khinkali open late", "romantic dinner with wine", etc.)
   - Loading indicator (3-dot pulse)
   - AI answer card ("RestoGo recommends")
   - Matched restaurant result cards (image, name, cuisine, location, rating — linked to detail page)
6. Everything else on the page stays untouched

No new files, no new dependencies, no changes to any other component or route.

