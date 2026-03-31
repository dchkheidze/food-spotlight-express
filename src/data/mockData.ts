export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  image: string;
  description: string;
  isNew?: boolean;
  openedDate?: string;
  isFeatured?: boolean;
}

export interface Cuisine {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  restaurantCount: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export const featuredRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "La Maison Dorée",
    cuisine: "French",
    location: "Downtown, Manhattan",
    rating: 4.8,
    reviewCount: 324,
    priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    description: "An exquisite French dining experience with seasonal tasting menus and an award-winning wine cellar.",
    isFeatured: true,
  },
  {
    id: "2",
    name: "Sakura Garden",
    cuisine: "Japanese",
    location: "Midtown East",
    rating: 4.7,
    reviewCount: 218,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&h=400&fit=crop",
    description: "Authentic omakase experience with fish flown in daily from Tokyo's Tsukiji market.",
    isFeatured: true,
  },
  {
    id: "3",
    name: "Trattoria Bella",
    cuisine: "Italian",
    location: "West Village",
    rating: 4.6,
    reviewCount: 456,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    description: "Rustic Italian charm with handmade pasta, wood-fired pizzas, and a garden terrace.",
    isFeatured: true,
  },
  {
    id: "4",
    name: "The Golden Spice",
    cuisine: "Indian",
    location: "East Village",
    rating: 4.5,
    reviewCount: 189,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
    description: "Modern Indian cuisine blending traditional spices with contemporary techniques.",
    isFeatured: true,
  },
  {
    id: "5",
    name: "Ember & Oak",
    cuisine: "American",
    location: "Williamsburg",
    rating: 4.9,
    reviewCount: 512,
    priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    description: "Farm-to-table American fare featuring live-fire cooking and craft cocktails.",
    isFeatured: true,
  },
  {
    id: "6",
    name: "Mar Azul",
    cuisine: "Seafood",
    location: "Chelsea",
    rating: 4.7,
    reviewCount: 278,
    priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
    description: "Coastal Mediterranean seafood with panoramic views and a raw bar.",
    isFeatured: true,
  },
];

export const topRatedRestaurants: Restaurant[] = [
  {
    id: "7",
    name: "Nobu",
    cuisine: "Japanese Fusion",
    location: "Tribeca",
    rating: 4.9,
    reviewCount: 890,
    priceRange: "$$$$",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600&h=400&fit=crop",
    description: "World-renowned Japanese-Peruvian fusion in an iconic setting.",
  },
  {
    id: "8",
    name: "Le Bernardin",
    cuisine: "French Seafood",
    location: "Midtown West",
    rating: 4.9,
    reviewCount: 1024,
    priceRange: "$$$$",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=600&h=400&fit=crop",
    description: "Three Michelin-starred temple of seafood perfection.",
  },
  {
    id: "9",
    name: "Café Lune",
    cuisine: "French Bistro",
    location: "SoHo",
    rating: 4.8,
    reviewCount: 654,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop",
    description: "Charming Parisian-style bistro with a legendary brunch menu.",
  },
  {
    id: "10",
    name: "Pacifica",
    cuisine: "Pan-Asian",
    location: "Lower East Side",
    rating: 4.8,
    reviewCount: 445,
    priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&h=400&fit=crop",
    description: "Bold pan-Asian flavors in a sleek, modern atmosphere.",
  },
  {
    id: "11",
    name: "The Butcher's Table",
    cuisine: "Steakhouse",
    location: "Meatpacking District",
    rating: 4.7,
    reviewCount: 732,
    priceRange: "$$$$",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop",
    description: "Dry-aged prime cuts in a sophisticated, clubby atmosphere.",
  },
];

export const newOpenings: Restaurant[] = [
  {
    id: "12",
    name: "Nuvola",
    cuisine: "Modern Italian",
    location: "Flatiron District",
    rating: 4.5,
    reviewCount: 42,
    priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&h=400&fit=crop",
    description: "Cloud-light pasta and bold flavors in a stunning minimalist space.",
    isNew: true,
    openedDate: "March 2026",
  },
  {
    id: "13",
    name: "Fuego",
    cuisine: "Mexican",
    location: "Bushwick",
    rating: 4.4,
    reviewCount: 28,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    description: "Elevated Mexican street food with mezcal cocktails and a vibrant patio.",
    isNew: true,
    openedDate: "February 2026",
  },
  {
    id: "14",
    name: "Roots & Bloom",
    cuisine: "Plant-Based",
    location: "Park Slope",
    rating: 4.6,
    reviewCount: 56,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
    description: "Innovative plant-based fine dining that surprises and delights.",
    isNew: true,
    openedDate: "January 2026",
  },
  {
    id: "15",
    name: "Seoul Station",
    cuisine: "Korean",
    location: "Koreatown",
    rating: 4.3,
    reviewCount: 35,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&h=400&fit=crop",
    description: "Contemporary Korean BBQ with premium wagyu and house-made banchan.",
    isNew: true,
    openedDate: "March 2026",
  },
];

export const cuisines: Cuisine[] = [
  { id: "1", name: "Italian", image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&h=300&fit=crop", count: 128 },
  { id: "2", name: "Japanese", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop", count: 94 },
  { id: "3", name: "Mexican", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop", count: 76 },
  { id: "4", name: "Indian", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", count: 85 },
  { id: "5", name: "Thai", image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=300&fit=crop", count: 62 },
  { id: "6", name: "French", image: "https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=400&h=300&fit=crop", count: 54 },
  { id: "7", name: "Mediterranean", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", count: 71 },
  { id: "8", name: "Korean", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop", count: 48 },
];

export const collections: Collection[] = [
  {
    id: "1",
    title: "Best Rooftop Dining",
    description: "Dine with breathtaking skyline views at these stunning rooftop restaurants.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop",
    restaurantCount: 18,
  },
  {
    id: "2",
    title: "Date Night Spots",
    description: "Romantic restaurants perfect for an unforgettable evening together.",
    image: "https://images.unsplash.com/photo-1529543544282-ea97407e3587?w=600&h=400&fit=crop",
    restaurantCount: 24,
  },
  {
    id: "3",
    title: "Hidden Gems",
    description: "Under-the-radar spots loved by locals and waiting to be discovered.",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop",
    restaurantCount: 15,
  },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "The Rise of Plant-Based Fine Dining",
    excerpt: "How top chefs are transforming vegetables into haute cuisine that rivals any traditional tasting menu.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    date: "March 28, 2026",
    author: "Sarah Chen",
    category: "Trends",
  },
  {
    id: "2",
    title: "A Guide to NYC's Best Speakeasy Bars",
    excerpt: "Behind unmarked doors and through secret passages, discover the city's most enchanting cocktail dens.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop",
    date: "March 22, 2026",
    author: "James Moriarty",
    category: "Nightlife",
  },
  {
    id: "3",
    title: "Farm to Fork: Meeting the Farmers Behind Your Meal",
    excerpt: "We visit the local farms supplying the city's best restaurants with seasonal ingredients.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop",
    date: "March 15, 2026",
    author: "Emily Hart",
    category: "Features",
  },
];
