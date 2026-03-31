export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  isFeatured?: boolean;
  content: { type: "paragraph" | "heading" | "image"; value: string }[];
}

export const blogCategories = ["All", "Guides", "New Openings", "Trends", "Reviews", "Culture"];

export const blogArticles: BlogArticle[] = [
  {
    id: "b1", slug: "rise-of-plant-based-dining-tbilisi",
    title: "The Rise of Plant-Based Fine Dining in Tbilisi",
    excerpt: "How top chefs are transforming vegetables into haute cuisine that rivals any traditional tasting menu in Georgia's capital.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop",
    date: "March 28, 2026", author: "Sarah Chen", category: "Trends", tags: ["Vegan", "Fine Dining", "Tbilisi"], readTime: "6 min read",
    isFeatured: true,
    content: [
      { type: "paragraph", value: "Tbilisi's culinary scene is experiencing a quiet revolution. While Georgia is famous for its meat-heavy feasts and cheese-laden khachapuri, a new wave of chefs is proving that plant-based cuisine can be every bit as indulgent and satisfying." },
      { type: "heading", value: "A New Generation of Chefs" },
      { type: "paragraph", value: "At restaurants like Shavi Lomi and Culinarium Khasheria, seasonal vegetables are given the spotlight treatment — smoked, fermented, and transformed into dishes that showcase the incredible biodiversity of Georgian produce." },
      { type: "image", value: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1000&h=500&fit=crop" },
      { type: "heading", value: "The Georgian Advantage" },
      { type: "paragraph", value: "Georgia's fertile valleys and diverse microclimates produce an extraordinary range of ingredients. From the wild herbs of the Caucasus mountains to the sun-ripened tomatoes of Kakheti, chefs have access to ingredients that most European kitchens can only dream of." },
      { type: "paragraph", value: "The traditional Georgian table already features remarkable vegetable dishes — pkhali, lobio, ajapsandali — that are naturally plant-based. Modern chefs are building on this foundation, applying contemporary techniques to ancestral recipes." },
    ],
  },
  {
    id: "b2", slug: "best-speakeasy-bars-tbilisi",
    title: "A Guide to Tbilisi's Best Speakeasy Bars",
    excerpt: "Behind unmarked doors and through secret passages, discover the city's most enchanting cocktail dens.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&h=600&fit=crop",
    date: "March 22, 2026", author: "James Moriarty", category: "Guides", tags: ["Bars", "Nightlife", "Cocktails"], readTime: "5 min read",
    content: [
      { type: "paragraph", value: "Tbilisi's nightlife scene has evolved far beyond the traditional wine bars. A new breed of speakeasy-style cocktail bars is emerging, each with its own character and carefully guarded entrance." },
      { type: "heading", value: "Where to Find Them" },
      { type: "paragraph", value: "The best speakeasies are clustered around the Old Town and Vera districts, hidden behind bookshops, laundromats, and nondescript apartment doors. Getting in often requires a phone call, a password, or simply knowing where to look." },
      { type: "image", value: "https://images.unsplash.com/photo-1529543544282-ea97407e3587?w=1000&h=500&fit=crop" },
      { type: "paragraph", value: "Inside, you'll find world-class mixology, intimate atmospheres, and a sense of discovery that makes each visit feel like an adventure." },
    ],
  },
  {
    id: "b3", slug: "farm-to-fork-georgian-farmers",
    title: "Farm to Fork: Meeting the Farmers Behind Your Meal",
    excerpt: "We visit the local farms supplying the city's best restaurants with seasonal ingredients.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop",
    date: "March 15, 2026", author: "Emily Hart", category: "Culture", tags: ["Farm to Table", "Sustainability", "Georgian Cuisine"], readTime: "8 min read",
    content: [
      { type: "paragraph", value: "An hour outside Tbilisi, the rolling hills of Kartli are dotted with small family farms that have been cultivating the land for generations. These farms are the backbone of Georgia's farm-to-table movement." },
      { type: "heading", value: "The Organic Revolution" },
      { type: "paragraph", value: "Many Georgian farmers practice organic agriculture not as a trend, but as a tradition. Without the industrialization that transformed Western agriculture, many families have maintained sustainable practices for centuries." },
      { type: "image", value: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1000&h=500&fit=crop" },
      { type: "paragraph", value: "Restaurants like Barbarestan and Café Littera work directly with these farmers, creating menus that change with the seasons and celebrate the incredible diversity of Georgian produce." },
    ],
  },
  {
    id: "b4", slug: "new-openings-march-2026",
    title: "5 Exciting New Restaurant Openings This March",
    excerpt: "From a rooftop sushi bar to a cozy Georgian wine cellar, here are the newest additions to Tbilisi's dining scene.",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=1200&h=600&fit=crop",
    date: "March 10, 2026", author: "Nino Goglidze", category: "New Openings", tags: ["New Restaurants", "Tbilisi", "2026"], readTime: "4 min read",
    content: [
      { type: "paragraph", value: "Spring is here, and Tbilisi's restaurant scene is blooming with exciting new openings. We've scouted the most promising newcomers so you know exactly where to book your next table." },
      { type: "heading", value: "The Highlights" },
      { type: "paragraph", value: "Leading the pack is Ronny's Pizza on Chavchavadze Avenue, bringing authentic New York-style slices to Vake. Meanwhile, Tabla in Saburtalo is offering a bold fusion of Indian spices and Georgian cooking techniques." },
      { type: "paragraph", value: "For something more upscale, keep an eye on the soon-to-open rooftop bar on Rustaveli Avenue — promising craft cocktails with panoramic views of the city." },
    ],
  },
  {
    id: "b5", slug: "ultimate-khinkali-guide",
    title: "The Ultimate Guide to Khinkali in Tbilisi",
    excerpt: "Where to find the best dumplings in the city — from hole-in-the-wall joints to upscale reinventions.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop",
    date: "March 5, 2026", author: "Dato Kvaratskhelia", category: "Guides", tags: ["Khinkali", "Georgian Cuisine", "Street Food"], readTime: "7 min read",
    content: [
      { type: "paragraph", value: "No visit to Tbilisi is complete without mastering the art of eating khinkali — Georgia's beloved soup dumplings. But where do you find the best ones? We spent two weeks eating our way through the city to find out." },
      { type: "heading", value: "The Classics" },
      { type: "paragraph", value: "Keto & Kote in Sololaki remains the gold standard for traditional khinkali. Their meat-filled dumplings are perfectly pleated, generously seasoned, and bursting with flavorful broth." },
      { type: "heading", value: "The Modern Takes" },
      { type: "paragraph", value: "For a contemporary spin, Shavi Lomi offers seasonal khinkali variations that change monthly — think truffle mushroom in winter and wild herb in spring." },
    ],
  },
  {
    id: "b6", slug: "tbilisi-brunch-spots",
    title: "10 Best Brunch Spots in Tbilisi for a Lazy Weekend",
    excerpt: "From French-style patisseries to Georgian-inspired morning feasts, these are the places to start your weekend right.",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1200&h=600&fit=crop",
    date: "February 28, 2026", author: "Sarah Chen", category: "Reviews", tags: ["Brunch", "Cafes", "Weekend"], readTime: "6 min read",
    content: [
      { type: "paragraph", value: "Tbilisi's brunch culture has exploded in recent years. No longer limited to hotel restaurants, the city now boasts dozens of charming spots perfect for a leisurely late morning meal." },
      { type: "heading", value: "Our Top Picks" },
      { type: "paragraph", value: "Lolita in Vera tops our list with its Mediterranean-inspired menu and sun-drenched terrace. Try the shakshuka with Georgian cheese — a fusion that shouldn't work but absolutely does." },
    ],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: BlogArticle): BlogArticle[] {
  return blogArticles
    .filter((a) => a.slug !== article.slug && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3);
}
