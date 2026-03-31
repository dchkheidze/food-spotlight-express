export interface DetailRestaurant {
  id: string;
  name: string;
  slug: string;
  cuisine: string;
  cuisineTags: string[];
  city: string;
  district: string;
  address: string;
  phone: string;
  website?: string;
  hours: { day: string; time: string }[];
  rating: number;
  ratingCount: number;
  priceRange: string;
  description: string;
  editorialNote?: string;
  image: string;
  gallery: string[];
  features: string[];
  type: string;
  menuHighlights: { name: string; description: string; price: string }[];
  location: string;
  reviewCount: number;
}

const defaultHours = [
  { day: "Monday", time: "12:00 – 23:00" },
  { day: "Tuesday", time: "12:00 – 23:00" },
  { day: "Wednesday", time: "12:00 – 23:00" },
  { day: "Thursday", time: "12:00 – 23:00" },
  { day: "Friday", time: "12:00 – 00:00" },
  { day: "Saturday", time: "11:00 – 00:00" },
  { day: "Sunday", time: "11:00 – 22:00" },
];

export const detailRestaurants: DetailRestaurant[] = [
  {
    id: "l1", name: "Barbarestan", slug: "barbarestan", cuisine: "Georgian", cuisineTags: ["Georgian", "Traditional", "Fine Dining"],
    city: "Tbilisi", district: "Old Town", address: "132 D. Aghmashenebeli Ave, Tbilisi 0102", phone: "+995 322 94 37 79",
    website: "https://barbarestan.ge", hours: defaultHours, rating: 4.9, ratingCount: 892, priceRange: "$$$",
    description: "Barbarestan is a culinary tribute to a 19th-century Georgian cookbook written by Barbare Jorjadze — Georgia's first female author. Each dish is a faithful reimagining of heritage recipes, prepared with seasonal local ingredients and served in a beautifully restored historic building. The atmosphere blends old-world charm with contemporary elegance, making every meal an immersive journey through Georgia's gastronomic history.",
    editorialNote: "A must-visit for anyone seeking to understand Georgian cuisine at its most refined. The tasting menu is an extraordinary journey through time.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&h=600&fit=crop",
    ],
    features: ["Private Dining", "Vegan Options", "Free Wi-Fi", "Outdoor Seating"],
    type: "Restaurant", location: "Old Town",
    reviewCount: 892,
    menuHighlights: [
      { name: "Pkhali Trio", description: "Spinach, beetroot & walnut spreads with Georgian spices", price: "₾18" },
      { name: "Chakapuli", description: "Lamb stew with tarragon, tkemali and white wine", price: "₾32" },
      { name: "Chicken Tabaka", description: "Crispy pressed chicken with walnut-garlic sauce", price: "₾28" },
      { name: "Churchkhela Ice Cream", description: "Grape & walnut dessert reimagined", price: "₾14" },
    ],
  },
  {
    id: "l2", name: "Café Littera", slug: "cafe-littera", cuisine: "French", cuisineTags: ["French", "European", "Fine Dining"],
    city: "Tbilisi", district: "Vera", address: "13 Ivane Machabeli St, Tbilisi 0105", phone: "+995 322 49 24 90",
    website: "https://cafelittera.ge", hours: defaultHours, rating: 4.8, ratingCount: 654, priceRange: "$$$",
    description: "Nestled within the historic Writers' House of Georgia, Café Littera is a sanctuary of culinary artistry. The menu seamlessly blends French technique with Georgian soul, set against interiors of literary grandeur — vaulted ceilings, lush gardens, and an atmosphere steeped in cultural significance.",
    editorialNote: "The garden terrace in summer is one of Tbilisi's finest dining experiences. Reservation essential.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop",
    ],
    features: ["Outdoor Seating", "Private Dining", "Free Wi-Fi"],
    type: "Fine Dining", location: "Vera", reviewCount: 654,
    menuHighlights: [
      { name: "Duck Confit", description: "Slow-cooked with cherry sauce and roasted vegetables", price: "₾38" },
      { name: "Beef Tartare", description: "Hand-cut with capers, shallots, and quail egg", price: "₾28" },
      { name: "Crème Brûlée", description: "Classic vanilla with Georgian honey", price: "₾16" },
    ],
  },
  {
    id: "l3", name: "Shavi Lomi", slug: "shavi-lomi", cuisine: "Georgian", cuisineTags: ["Georgian", "Modern", "Casual"],
    city: "Tbilisi", district: "Vera", address: "28 Zurab Kvlividze St, Tbilisi 0108", phone: "+995 322 93 33 06",
    hours: defaultHours, rating: 4.7, ratingCount: 1203, priceRange: "$$",
    description: "Shavi Lomi (Black Lion) is where traditional Georgian recipes meet creative experimentation. The eclectic, art-filled interior and laid-back vibe make it a favorite among locals and adventurous travelers. Known for its ever-changing seasonal menu and inventive cocktails.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop",
    ],
    features: ["Outdoor Seating", "Vegan Options", "Pet Friendly", "Live Music"],
    type: "Restaurant", location: "Vera", reviewCount: 1203,
    menuHighlights: [
      { name: "Smoked Eggplant", description: "With pomegranate and walnut crumble", price: "₾14" },
      { name: "Lamb Shoulder", description: "Slow-roasted 12 hours with adjika glaze", price: "₾35" },
      { name: "Georgian Burger", description: "With tkemali mayo and suluguni cheese", price: "₾22" },
    ],
  },
  {
    id: "l6", name: "Sakura Tbilisi", slug: "sakura-tbilisi", cuisine: "Japanese", cuisineTags: ["Japanese", "Sushi", "Omakase"],
    city: "Tbilisi", district: "Vake", address: "45 Chavchavadze Ave, Tbilisi 0179", phone: "+995 322 25 55 80",
    website: "https://sakura.ge", hours: defaultHours, rating: 4.7, ratingCount: 312, priceRange: "$$$",
    description: "Sakura brings Tokyo's finest culinary traditions to the heart of Tbilisi. With fish flown in twice weekly from Japan and a master sushi chef at the helm, the omakase experience is unparalleled in the Caucasus region.",
    image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=1200&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=600&fit=crop",
    ],
    features: ["Private Dining", "Free Wi-Fi"],
    type: "Restaurant", location: "Vake", reviewCount: 312,
    menuHighlights: [
      { name: "Omakase 12-Course", description: "Chef's selection of seasonal nigiri and sashimi", price: "₾120" },
      { name: "Black Cod Miso", description: "48-hour marinated Alaskan black cod", price: "₾45" },
      { name: "Wagyu Tataki", description: "Seared A5 wagyu with ponzu and microgreens", price: "₾55" },
    ],
  },
];

export function getRestaurantBySlug(slug: string): DetailRestaurant | undefined {
  return detailRestaurants.find((r) => r.slug === slug);
}

export function getSimilarRestaurants(restaurant: DetailRestaurant): DetailRestaurant[] {
  return detailRestaurants
    .filter((r) => r.slug !== restaurant.slug && (r.cuisine === restaurant.cuisine || r.district === restaurant.district))
    .slice(0, 4);
}
