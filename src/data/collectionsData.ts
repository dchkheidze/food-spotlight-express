import type { ListingRestaurant } from "./listingData";
import { listingRestaurants } from "./listingData";

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  restaurantSlugs: string[];
}

export const collections: Collection[] = [
  {
    id: "c1", slug: "best-restaurants-tbilisi",
    title: "Best Restaurants in Tbilisi",
    description: "Our curated selection of the finest dining experiences the capital has to offer — from historic Georgian kitchens to modern fine dining.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop",
    restaurantSlugs: ["barbarestan", "cafe-littera", "shavi-lomi", "entree"],
  },
  {
    id: "c2", slug: "best-cafes-for-breakfast",
    title: "Best Cafes for Breakfast",
    description: "Start your morning right at these beloved cafes, serving everything from artisan coffee and pastries to full Georgian breakfasts.",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&h=600&fit=crop",
    restaurantSlugs: ["lolita", "bread-house", "keto-and-kote"],
  },
  {
    id: "c3", slug: "top-new-openings-2026",
    title: "Top New Openings 2026",
    description: "The freshest additions to Tbilisi's dining scene — the restaurants everyone is talking about right now.",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=1200&h=600&fit=crop",
    restaurantSlugs: ["ronnys-pizza", "tabla"],
  },
  {
    id: "c4", slug: "romantic-dinner-spots",
    title: "Romantic Dinner Spots",
    description: "Intimate settings, candlelit tables, and exceptional cuisine — the perfect restaurants for a special evening.",
    image: "https://images.unsplash.com/photo-1529543544282-ea97407e3587?w=1200&h=600&fit=crop",
    restaurantSlugs: ["cafe-littera", "entree", "sakura-tbilisi", "wine-underground"],
  },
  {
    id: "c5", slug: "budget-friendly-places",
    title: "Budget-Friendly Places",
    description: "Delicious food doesn't have to break the bank. These spots offer incredible value without compromising on quality.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop",
    restaurantSlugs: ["keto-and-kote", "bread-house", "ronnys-pizza"],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionRestaurants(collection: Collection): ListingRestaurant[] {
  return collection.restaurantSlugs
    .map((s) => listingRestaurants.find((r) => r.slug === s))
    .filter(Boolean) as ListingRestaurant[];
}
