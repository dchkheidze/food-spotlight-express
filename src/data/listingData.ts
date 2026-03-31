import type { Restaurant } from "./mockData";

export interface ListingRestaurant extends Restaurant {
  slug: string;
  city: string;
  district: string;
  type: string;
  features: string[];
}

export const cities = ["Tbilisi", "Batumi", "Kutaisi"];
export const districts: Record<string, string[]> = {
  Tbilisi: ["Vake", "Saburtalo", "Old Town", "Vera", "Mtatsminda", "Sololaki"],
  Batumi: ["Boulevard", "Old Batumi", "New Boulevard"],
  Kutaisi: ["Center", "Bagrati"],
};
export const cuisineTypes = ["Georgian", "Italian", "Japanese", "French", "Mexican", "Indian", "Mediterranean", "Korean", "American", "Seafood"];
export const priceRanges = ["$", "$$", "$$$", "$$$$"];
export const establishmentTypes = ["Restaurant", "Cafe", "Bar", "Bakery", "Fast Food", "Fine Dining"];
export const featureOptions = ["Outdoor Seating", "Delivery", "Live Music", "Pet Friendly", "Private Dining", "Rooftop", "Vegan Options", "Free Wi-Fi"];
export const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "alphabetical", label: "Alphabetical" },
];

export const listingRestaurants: ListingRestaurant[] = [
  {
    id: "l1", name: "Barbarestan", slug: "barbarestan", cuisine: "Georgian", location: "Old Town", city: "Tbilisi", district: "Old Town",
    rating: 4.9, reviewCount: 892, priceRange: "$$$", type: "Restaurant", features: ["Private Dining", "Vegan Options"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    description: "Historic recipes from a 19th-century Georgian cookbook, beautifully reimagined.", isFeatured: true,
  },
  {
    id: "l2", name: "Café Littera", slug: "cafe-littera", cuisine: "French", location: "Vera", city: "Tbilisi", district: "Vera",
    rating: 4.8, reviewCount: 654, priceRange: "$$$", type: "Fine Dining", features: ["Outdoor Seating", "Private Dining"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    description: "Award-winning fine dining in the stunning Writers' House of Georgia.",
  },
  {
    id: "l3", name: "Shavi Lomi", slug: "shavi-lomi", cuisine: "Georgian", location: "Vera", city: "Tbilisi", district: "Vera",
    rating: 4.7, reviewCount: 1203, priceRange: "$$", type: "Restaurant", features: ["Outdoor Seating", "Vegan Options", "Pet Friendly"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    description: "Modern twist on traditional Georgian cuisine in a cozy, artistic atmosphere.",
  },
  {
    id: "l4", name: "Culinarium Khasheria", slug: "culinarium-khasheria", cuisine: "Georgian", location: "Old Town", city: "Tbilisi", district: "Old Town",
    rating: 4.6, reviewCount: 435, priceRange: "$$", type: "Restaurant", features: ["Delivery", "Vegan Options"],
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
    description: "Farm-to-table Georgian dishes with ingredients from their own garden.",
  },
  {
    id: "l5", name: "Keto & Kote", slug: "keto-and-kote", cuisine: "Georgian", location: "Sololaki", city: "Tbilisi", district: "Sololaki",
    rating: 4.5, reviewCount: 876, priceRange: "$", type: "Restaurant", features: ["Delivery", "Free Wi-Fi"],
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&h=400&fit=crop",
    description: "Beloved neighborhood spot for authentic khinkali and khachapuri.",
  },
  {
    id: "l6", name: "Sakura Tbilisi", slug: "sakura-tbilisi", cuisine: "Japanese", location: "Vake", city: "Tbilisi", district: "Vake",
    rating: 4.7, reviewCount: 312, priceRange: "$$$", type: "Restaurant", features: ["Private Dining"],
    image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&h=400&fit=crop",
    description: "Premium omakase experience with fish flown in from Tokyo's markets.",
  },
  {
    id: "l7", name: "Wine Underground", slug: "wine-underground", cuisine: "Mediterranean", location: "Old Town", city: "Tbilisi", district: "Old Town",
    rating: 4.4, reviewCount: 543, priceRange: "$$", type: "Bar", features: ["Live Music", "Outdoor Seating"],
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop",
    description: "Natural wines paired with Mediterranean small plates in a cellar setting.",
  },
  {
    id: "l8", name: "Bread House", slug: "bread-house", cuisine: "Georgian", location: "Saburtalo", city: "Tbilisi", district: "Saburtalo",
    rating: 4.3, reviewCount: 678, priceRange: "$", type: "Bakery", features: ["Delivery", "Free Wi-Fi"],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    description: "Freshly baked Georgian breads and pastries since 1998.",
  },
  {
    id: "l9", name: "Entrée", slug: "entree", cuisine: "French", location: "Mtatsminda", city: "Tbilisi", district: "Mtatsminda",
    rating: 4.8, reviewCount: 234, priceRange: "$$$$", type: "Fine Dining", features: ["Private Dining", "Rooftop"],
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=600&h=400&fit=crop",
    description: "Elegant French cuisine with panoramic city views from Mtatsminda.",
  },
  {
    id: "l10", name: "Ronny's Pizza", slug: "ronnys-pizza", cuisine: "Italian", location: "Vake", city: "Tbilisi", district: "Vake",
    rating: 4.2, reviewCount: 1456, priceRange: "$", type: "Fast Food", features: ["Delivery", "Free Wi-Fi", "Pet Friendly"],
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600&h=400&fit=crop",
    description: "New York-style pizza loved by locals and visitors alike.", isNew: true, openedDate: "March 2026",
  },
  {
    id: "l11", name: "Lolita", slug: "lolita", cuisine: "Mediterranean", location: "Vera", city: "Tbilisi", district: "Vera",
    rating: 4.6, reviewCount: 389, priceRange: "$$", type: "Cafe", features: ["Outdoor Seating", "Vegan Options", "Free Wi-Fi"],
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop",
    description: "Charming café with Mediterranean brunch and artisan coffee.",
  },
  {
    id: "l12", name: "Tabla", slug: "tabla", cuisine: "Indian", location: "Saburtalo", city: "Tbilisi", district: "Saburtalo",
    rating: 4.5, reviewCount: 201, priceRange: "$$", type: "Restaurant", features: ["Delivery", "Vegan Options"],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    description: "Authentic Indian flavors with a modern Georgian twist.", isNew: true, openedDate: "February 2026",
  },
];
