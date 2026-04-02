export interface HomeRestaurant {
  id: string;
  name: string;
  cuisine: string;
  neighbourhood: string;
  emoji: string;
  daysAgo: number;
}

export interface HomeEvent {
  id: string;
  day: string;
  date: string;
  name: string;
  venue: string;
  time: string;
  price: string;
  category: string;
}

export interface HomeDeal {
  id: string;
  dealText: string;
  restaurant: string;
  description: string;
  expiry: string;
}

export interface HomeNews {
  id: string;
  icon: string;
  title: string;
  source: string;
  time: string;
}

export const cuisineFilters = [
  { label: "Georgian", emoji: "🇬🇪" },
  { label: "Cafés", emoji: "☕" },
  { label: "Wine bars", emoji: "🍷" },
  { label: "Pizza", emoji: "🍕" },
  { label: "Sushi", emoji: "🍣" },
  { label: "Vegan", emoji: "🥗" },
  { label: "Brunch", emoji: "🥞" },
];

export const newOpenings: HomeRestaurant[] = [
  { id: "h1", name: "Tsiskvili", cuisine: "Georgian", neighbourhood: "Vera", emoji: "🏠", daysAgo: 3 },
  { id: "h2", name: "Noir Coffee", cuisine: "Café", neighbourhood: "Vake", emoji: "☕", daysAgo: 7 },
  { id: "h3", name: "Kazbegi Grill", cuisine: "BBQ", neighbourhood: "Saburtalo", emoji: "🔥", daysAgo: 12 },
  { id: "h4", name: "Umami Tbilisi", cuisine: "Japanese", neighbourhood: "Old Town", emoji: "🍣", daysAgo: 5 },
  { id: "h5", name: "Verde", cuisine: "Vegan", neighbourhood: "Mtatsminda", emoji: "🌿", daysAgo: 9 },
  { id: "h6", name: "Puri House", cuisine: "Bakery", neighbourhood: "Sololaki", emoji: "🍞", daysAgo: 2 },
];

export const weekendEvents: HomeEvent[] = [
  { id: "ev1", day: "SAT", date: "Apr 5", name: "ღვინის საღამო", venue: "Wine Underground", time: "19:00", price: "45 ₾", category: "Wine" },
  { id: "ev2", day: "SAT", date: "Apr 5", name: "Jazz & Khinkali Night", venue: "Café Littera", time: "20:30", price: "Free", category: "Music" },
  { id: "ev3", day: "SUN", date: "Apr 6", name: "საბრუნჩე Supra", venue: "Barbarestan", time: "11:00", price: "60 ₾", category: "Brunch" },
  { id: "ev4", day: "SUN", date: "Apr 6", name: "Latte Art Workshop", venue: "Lolita", time: "15:00", price: "25 ₾", category: "Class" },
  { id: "ev5", day: "SAT", date: "Apr 5", name: "Street Food Fest", venue: "Fabrika", time: "12:00", price: "Free", category: "Festival" },
];

export const deals: HomeDeal[] = [
  { id: "d1", dealText: "−30%", restaurant: "Shavi Lomi", description: "All mains on weekdays", expiry: "Ends Apr 10" },
  { id: "d2", dealText: "2 for 1", restaurant: "Café Leila", description: "Coffee & cake combo", expiry: "Ends Apr 8" },
  { id: "d3", dealText: "−20%", restaurant: "Sakura Tbilisi", description: "Lunch omakase set", expiry: "Ends Apr 15" },
  { id: "d4", dealText: "Free 🍷", restaurant: "Wine Underground", description: "Free glass with any cheese board", expiry: "Ends Apr 12" },
];

export const newsItems: HomeNews[] = [
  { id: "n1", icon: "📰", title: "Tbilisi named top food destination for 2026", source: "Forbes Georgia", time: "2h ago" },
  { id: "n2", icon: "🍽️", title: "Barbarestan chef wins Best of Caucasus award", source: "Dining Weekly", time: "5h ago" },
  { id: "n3", icon: "🏗️", title: "New food hall opening in Fabrika this summer", source: "City Pulse", time: "1d ago" },
  { id: "n4", icon: "🍷", title: "Kakheti wine festival dates announced", source: "Wine Georgia", time: "1d ago" },
];
