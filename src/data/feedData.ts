export type FeedItemType = "promotion" | "new_opening" | "event" | "news";

export interface FeedItem {
  id: string;
  type: FeedItemType;
  date: string; // ISO date for sorting
  image: string;
  // Promotion fields
  restaurantName?: string;
  promoHeadline?: string;
  originalPrice?: string;
  discountedPrice?: string;
  promoBadge?: string;
  category?: string;
  distance?: string;
  // New opening fields
  description?: string;
  cuisineTags?: string[];
  openingDate?: string;
  rating?: number;
  // Event fields
  eventName?: string;
  venueName?: string;
  eventDay?: string;
  eventMonth?: string;
  eventTime?: string;
  ticketPrice?: string;
  // News fields
  newsCategory?: string;
  headline?: string;
  byline?: string;
  readTime?: string;
}

export const feedItems = ([
  // Promotions
  {
    id: "promo-1",
    type: "promotion" as const,
    date: "2026-04-14T10:00:00Z",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=450&fit=crop",
    restaurantName: "Barbarestan",
    promoHeadline: "50% off tasting menu every Tuesday",
    originalPrice: "120 ₾",
    discountedPrice: "60 ₾",
    promoBadge: "% PROMO",
    category: "Fine Dining",
    distance: "1.2 km",
  },
  {
    id: "promo-2",
    type: "promotion",
    date: "2026-04-12T14:00:00Z",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=450&fit=crop",
    restaurantName: "Shavi Lomi",
    promoHeadline: "Free dessert with any main course",
    originalPrice: "45 ₾",
    discountedPrice: "35 ₾",
    promoBadge: "% PROMO",
    category: "Georgian",
    distance: "0.8 km",
  },
  {
    id: "promo-3",
    type: "promotion",
    date: "2026-04-10T09:00:00Z",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=450&fit=crop",
    restaurantName: "Café Littera",
    promoHeadline: "Lunch set menu — 2 courses for the price of 1",
    originalPrice: "80 ₾",
    discountedPrice: "40 ₾",
    promoBadge: "% PROMO",
    category: "European",
    distance: "2.1 km",
  },
  // New Openings
  {
    id: "new-1",
    type: "new_opening",
    date: "2026-04-13T08:00:00Z",
    image: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&h=450&fit=crop",
    restaurantName: "Vino Underground",
    description: "Natural wine bar with small plates in the heart of Old Tbilisi",
    cuisineTags: ["Wine Bar", "Tapas", "Natural Wine"],
    openingDate: "Opened Apr 10, 2026",
    rating: 0,
  },
  {
    id: "new-2",
    type: "new_opening",
    date: "2026-04-11T08:00:00Z",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=450&fit=crop",
    restaurantName: "Machakhela Riverside",
    description: "Traditional Adjarian cuisine with panoramic Mtkvari river views",
    cuisineTags: ["Adjarian", "Georgian", "Riverside"],
    openingDate: "Opened Apr 8, 2026",
    rating: 0,
  },
  {
    id: "new-3",
    type: "new_opening",
    date: "2026-04-09T08:00:00Z",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=450&fit=crop",
    restaurantName: "Sakhli N7",
    description: "Cozy family-run spot specializing in Kakhetian clay-pot dishes",
    cuisineTags: ["Kakhetian", "Clay Pot", "Family"],
    openingDate: "Opened Apr 5, 2026",
    rating: 0,
  },
  // Events
  {
    id: "event-1",
    type: "event",
    date: "2026-04-18T19:00:00Z",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=450&fit=crop",
    eventName: "Tbilisi Wine & Cheese Festival",
    venueName: "Expo Georgia",
    eventDay: "18",
    eventMonth: "APR",
    eventTime: "19:00 – 23:00",
    ticketPrice: "35 ₾",
  },
  {
    id: "event-2",
    type: "event",
    date: "2026-04-20T12:00:00Z",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=450&fit=crop",
    eventName: "Street Food Saturday at Fabrika",
    venueName: "Fabrika Tbilisi",
    eventDay: "20",
    eventMonth: "APR",
    eventTime: "12:00 – 20:00",
    ticketPrice: "Free",
  },
  {
    id: "event-3",
    type: "event",
    date: "2026-04-22T18:30:00Z",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=450&fit=crop",
    eventName: "Supra Masterclass with Chef Tekuna",
    venueName: "Café Littera",
    eventDay: "22",
    eventMonth: "APR",
    eventTime: "18:30 – 21:00",
    ticketPrice: "95 ₾",
  },
  // News
  {
    id: "news-1",
    type: "news",
    date: "2026-04-14T06:00:00Z",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop",
    newsCategory: "FOOD SCENE",
    headline: "Tbilisi Named #3 Emerging Food Destination by Condé Nast Traveler",
    byline: "By RestGo Editorial",
    readTime: "3 min read",
  },
  {
    id: "news-2",
    type: "news",
    date: "2026-04-12T06:00:00Z",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=450&fit=crop",
    newsCategory: "WINE",
    headline: "Georgia's Natural Wine Movement Is Reshaping How the World Drinks",
    byline: "By RestGo Editorial",
    readTime: "5 min read",
  },
  {
    id: "news-3",
    type: "news",
    date: "2026-04-10T06:00:00Z",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=450&fit=crop",
    newsCategory: "GUIDES",
    headline: "The Ultimate Khinkali Guide: 8 Spots Locals Swear By",
    byline: "By RestGo Editorial",
    readTime: "4 min read",
  },
] as FeedItem[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const feedFilterTabs = [
  { label: "All", value: "all" },
  { label: "Promotions", value: "promotion" },
  { label: "New Openings", value: "new_opening" },
  { label: "Events", value: "event" },
  { label: "News", value: "news" },
] as const;
