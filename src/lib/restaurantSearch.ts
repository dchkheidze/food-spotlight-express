import { listingRestaurants, type ListingRestaurant } from "@/data/listingData";
import { feedItems } from "@/data/feedData";

export interface SearchFilters {
  cuisine?: string;
  neighborhood?: string;
  priceRange?: string;
  query?: string;
}

export function searchRestaurants(filters: SearchFilters): ListingRestaurant[] {
  const q = filters.query?.toLowerCase() ?? "";
  
  return listingRestaurants.filter((r) => {
    if (filters.cuisine && !r.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())) return false;
    if (filters.neighborhood) {
      const nb = filters.neighborhood.toLowerCase();
      if (!r.district.toLowerCase().includes(nb) && !r.location.toLowerCase().includes(nb)) return false;
    }
    if (filters.priceRange && r.priceRange !== filters.priceRange) return false;
    if (q) {
      const haystack = `${r.name} ${r.cuisine} ${r.district} ${r.location} ${r.description} ${r.type}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function getActivePromotions(): Array<{ restaurant: string; promoText: string; validUntil: string }> {
  return feedItems
    .filter((item) => item.type === "promotion")
    .map((item) => ({
      restaurant: item.title,
      promoText: item.description,
      validUntil: item.date,
    }));
}

export function extractKeywords(message: string): SearchFilters {
  const lower = message.toLowerCase();
  const filters: SearchFilters = {};

  const cuisines = ["georgian", "italian", "japanese", "french", "mexican", "indian", "mediterranean", "korean", "american", "seafood"];
  const neighborhoods = ["vake", "saburtalo", "old town", "vera", "mtatsminda", "sololaki"];
  const priceMap: Record<string, string> = { cheap: "$", affordable: "$", budget: "$", mid: "$$", moderate: "$$", expensive: "$$$", luxury: "$$$$", fine: "$$$$" };

  for (const c of cuisines) if (lower.includes(c)) { filters.cuisine = c; break; }
  for (const n of neighborhoods) if (lower.includes(n)) { filters.neighborhood = n; break; }
  for (const [kw, pr] of Object.entries(priceMap)) if (lower.includes(kw)) { filters.priceRange = pr; break; }

  // Georgian food keywords
  const geoKeywords = ["khinkali", "khachapuri", "wine", "ღვინო", "ხინკალი", "ხაჭაპური"];
  for (const kw of geoKeywords) {
    if (lower.includes(kw)) {
      filters.query = kw;
      if (!filters.cuisine) filters.cuisine = "georgian";
      break;
    }
  }

  if (!filters.cuisine && !filters.neighborhood && !filters.priceRange && !filters.query) {
    filters.query = message.trim().split(/\s+/).slice(0, 3).join(" ");
  }

  return filters;
}

export function buildRestaurantContext(restaurants: ListingRestaurant[], promotions: Array<{ restaurant: string; promoText: string }>): string {
  const data = restaurants.slice(0, 6).map((r) => ({
    name: r.name,
    slug: r.slug,
    cuisine: r.cuisine,
    neighborhood: r.district,
    price: r.priceRange,
    rating: r.rating,
    reviews: r.reviewCount,
    type: r.type,
    description: r.description,
    isNew: r.isNew || false,
  }));

  return JSON.stringify({ restaurants: data, promotions: promotions.slice(0, 3) });
}
