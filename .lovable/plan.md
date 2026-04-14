

# Add Images to Feed Event Cards

## Problem
Event cards in the feed have `image: ""` in `feedData.ts` and the `EventCard` component doesn't render any image — it only shows a coral date badge with day/month.

## Solution
1. Add Unsplash image URLs to the 3 event items in `feedData.ts`
2. Redesign `EventCard.tsx` to show an image at the top (like other feed cards), with the date badge overlaid on the image

## Changes

### `src/data/feedData.ts`
Add image URLs to the 3 event entries:
- event-1 (Wine & Cheese Festival): wine/cheese themed image
- event-2 (Street Food Saturday): street food image
- event-3 (Supra Masterclass): Georgian cooking image

### `src/components/feed/EventCard.tsx`
Redesign to include:
- Top image section (aspect ratio ~16:9) with the event image
- Date badge (coral square with day/month) overlaid on the top-left of the image
- Event details below the image (name, venue, time, price, ticket CTA)

