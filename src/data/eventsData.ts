export interface FoodEvent {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  venueSlug?: string;
  description: string;
  category: string;
  isFree: boolean;
}

export const eventCategories = ["All", "Live Music", "Wine Tasting", "Brunch", "Cooking Class", "Food Festival", "Special Menu"];

export const eventVenues = ["All Venues", "Barbarestan", "Café Littera", "Shavi Lomi", "Wine Underground", "Lolita", "Sakura Tbilisi"];

export const foodEvents: FoodEvent[] = [
  {
    id: "e1", title: "Jazz & Wine Evening", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop",
    date: "2026-04-05", time: "20:00", venue: "Wine Underground", venueSlug: "wine-underground",
    description: "Live jazz trio with a curated selection of Georgian natural wines and Mediterranean tapas.",
    category: "Live Music", isFree: false,
  },
  {
    id: "e2", title: "Georgian Brunch: Supra Edition", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    date: "2026-04-06", time: "11:00", venue: "Barbarestan", venueSlug: "barbarestan",
    description: "A festive Georgian brunch feast with traditional supra dishes, toasts, and live folk music.",
    category: "Brunch", isFree: false,
  },
  {
    id: "e3", title: "Natural Wine Tasting: Kakheti Special", image: "https://images.unsplash.com/photo-1529543544282-ea97407e3587?w=600&h=400&fit=crop",
    date: "2026-04-10", time: "18:00", venue: "Wine Underground", venueSlug: "wine-underground",
    description: "Taste 8 rare qvevri wines from Kakheti's finest small producers, guided by a sommelier.",
    category: "Wine Tasting", isFree: false,
  },
  {
    id: "e4", title: "Free Latte Art Workshop", image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop",
    date: "2026-04-12", time: "15:00", venue: "Lolita", venueSlug: "lolita",
    description: "Learn the art of latte art from our head barista. Coffee and pastries included.",
    category: "Cooking Class", isFree: true,
  },
  {
    id: "e5", title: "Omakase Night: Spring Menu Launch", image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&h=400&fit=crop",
    date: "2026-04-14", time: "19:30", venue: "Sakura Tbilisi", venueSlug: "sakura-tbilisi",
    description: "Exclusive 12-course spring omakase featuring seasonal fish flown in from Tsukiji market.",
    category: "Special Menu", isFree: false,
  },
  {
    id: "e6", title: "Street Food Festival: Tbilisi Eats", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    date: "2026-04-19", time: "12:00", venue: "Shavi Lomi", venueSlug: "shavi-lomi",
    description: "An outdoor food festival with 15 pop-up stalls, DJs, and craft beer. Entry is free!",
    category: "Food Festival", isFree: true,
  },
  {
    id: "e7", title: "Candlelit French Dinner", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    date: "2026-04-20", time: "19:00", venue: "Café Littera", venueSlug: "cafe-littera",
    description: "An intimate 5-course French dinner in the Writers' House garden, paired with Burgundy wines.",
    category: "Special Menu", isFree: false,
  },
  {
    id: "e8", title: "Khinkali Making Masterclass", image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&h=400&fit=crop",
    date: "2026-04-25", time: "14:00", venue: "Barbarestan", venueSlug: "barbarestan",
    description: "Master the art of Georgian dumpling-making with our head chef. Take home your creations!",
    category: "Cooking Class", isFree: false,
  },
  {
    id: "e9", title: "Acoustic Night & Tapas", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=600&h=400&fit=crop",
    date: "2026-04-27", time: "20:30", venue: "Wine Underground", venueSlug: "wine-underground",
    description: "Unplugged acoustic performances with a sharing tapas menu and local craft cocktails.",
    category: "Live Music", isFree: false,
  },
  {
    id: "e10", title: "Sunday Farmers' Brunch", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop",
    date: "2026-04-27", time: "10:00", venue: "Shavi Lomi", venueSlug: "shavi-lomi",
    description: "Farm-fresh seasonal brunch with produce from local Kartli farmers. Family-friendly.",
    category: "Brunch", isFree: false,
  },
];
