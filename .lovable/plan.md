

# Add Events to Header Navigation

## Problem
The `navLinks` array in `Header.tsx` (line 5) only contains `["Discover", "Cuisines", "Collections", "Blog"]` — no "Events" entry.

Additionally, the nav links currently use anchor-style `href="#..."` instead of proper React Router `<Link>` navigation.

## Changes

### `src/components/Header.tsx`
1. Add "Events" to the `navLinks` array and convert links to use React Router's `Link` component with proper paths:
   - Discover → `/restaurants`
   - Cuisines → `/#cuisines` (homepage section)
   - Collections → `/rankings`
   - Blog → `/blog`
   - Events → `/events`

2. Update both desktop and mobile nav to use `<Link>` instead of `<a>` tags.

