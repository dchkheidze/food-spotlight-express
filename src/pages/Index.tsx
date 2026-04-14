import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import FeedCard from "@/components/feed/FeedCard";
import { cuisineFilters, weekendEvents, deals, newsItems } from "@/data/homeMockData";
import { listingRestaurants } from "@/data/listingData";
import { feedItems } from "@/data/feedData";

const newOpeningRestaurants = listingRestaurants.filter((r) => r.isNew);
const featuredRestaurants = listingRestaurants.filter((r) => r.isFeatured || r.rating >= 4.7).slice(0, 6);

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/restogo-chat`;

const RESTAURANTS_CONTEXT = listingRestaurants.slice(0, 20).map(r => ({
  name: r.name,
  cuisine: r.cuisine,
  location: r.location,
  district: r.district,
  rating: r.rating,
  priceRange: r.priceRange,
}));

const Index = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiCards, setAiCards] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAiAnswer("");
    setAiCards([]);
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          restaurantContext: JSON.stringify(RESTAURANTS_CONTEXT),
          lang: "en",
          messages: [{
            role: "user",
            content: `Reply ONLY with valid JSON, no markdown, no extra text. Format: {"answer": "2-3 sentence warm recommendation mentioning restaurant names", "restaurants": ["Name1", "Name2", "Name3"]}. Only include restaurants from the provided context. User query: ${query}`,
          }],
        }),
      });

      if (!resp.ok || !resp.body) {
        setAiAnswer("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") break;
          try {
            const parsed = JSON.parse(payload);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) fullText += content;
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Parse the accumulated JSON response
      try {
        const cleaned = fullText.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        if (parsed.answer) setAiAnswer(parsed.answer);
        if (parsed.restaurants?.length) {
          const matched = parsed.restaurants
            .map((name: string) => listingRestaurants.find(r => r.name === name))
            .filter(Boolean);
          setAiCards(matched);
        }
      } catch {
        // If not valid JSON, just show the raw text as answer
        if (fullText.trim()) setAiAnswer(fullText.trim());
      }
    } catch {
      setAiAnswer("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleChipClick = (s: string) => {
    setQuery(s);
    // Need to trigger search after state update
    setTimeout(() => {
      document.getElementById("hero-search-btn")?.click();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 pt-10 pb-10" style={{ backgroundColor: "#FAECE7" }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase mb-2" style={{ color: "#993C1D" }}>
              Discover Tbilisi
            </p>
            <h1 className="text-[22px] sm:text-3xl font-medium leading-tight mb-5" style={{ color: "#4A1B0C", fontFamily: "'Playfair Display', serif" }}>
              Where do you want<br className="sm:hidden" /> to eat <em>tonight?</em>
            </h1>

            <div className="relative max-w-xl">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#D85A30" }} />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                placeholder="Romantic dinner, best khinkali, wine bar in old town…"
                className="w-full h-11 pl-10 pr-12 rounded-xl bg-white text-[14px] font-normal placeholder:text-black/35 outline-none"
                style={{ border: "0.5px solid #F09977" }}
              />
              <button
                id="hero-search-btn"
                onClick={handleSearch}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: loading ? "#F0997B" : "#D85A30" }}
              >
                <Search size={14} color="white" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3 max-w-xl">
              {["best khinkali open late", "romantic dinner with wine", "vegetarian in Vake", "cozy wine bar old town"].map(s => (
                <button
                  key={s}
                  onClick={() => handleChipClick(s)}
                  className="text-[11px] px-3 py-1 rounded-full border transition-colors"
                  style={{ color: "#993C1D", backgroundColor: "rgba(216,90,48,0.08)", borderColor: "#F0997B" }}
                >
                  {s}
                </button>
              ))}
            </div>

            {loading && (
              <div className="mt-4 max-w-xl flex items-center gap-2 bg-white rounded-xl px-4 py-3" style={{ border: "0.5px solid #F5C4B3" }}>
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#D85A30", animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
                <span className="text-[13px]" style={{ color: "#993C1D" }}>Asking our local expert…</span>
              </div>
            )}

            {aiAnswer && !loading && (
              <div className="mt-4 max-w-xl bg-white rounded-xl px-4 py-3" style={{ border: "0.5px solid #F5C4B3" }}>
                <p className="text-[10px] font-medium tracking-[0.12em] uppercase mb-1" style={{ color: "#D85A30" }}>RestoGo recommends</p>
                <p className="text-[14px] leading-relaxed" style={{ color: "#4A1B0C" }}>{aiAnswer}</p>
              </div>
            )}

            {aiCards.length > 0 && !loading && (
              <div className="mt-3 max-w-xl flex flex-col gap-2">
                {aiCards.map((r: any) => (
                  <Link key={r.id} to={`/restaurants/${r.slug}`} className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 transition-colors" style={{ border: "0.5px solid rgba(15,8,4,0.1)" }}>
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#FAECE7]">
                      {r.image ? <img src={r.image} alt={r.name} className="w-full h-full object-cover" /> : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium truncate" style={{ color: "#4A1B0C" }}>{r.name}</p>
                      <p className="text-[12px]" style={{ color: "#993C1D" }}>{r.cuisine} · {r.location}</p>
                    </div>
                    <p className="text-[13px] font-medium shrink-0" style={{ color: "#4A1B0C" }}>⭐ {r.rating}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Discovery Feed */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-[26px] font-medium mb-5" style={{ color: "#0F0804", fontFamily: "'Playfair Display', serif" }}>
              What's Happening in Tbilisi
            </h2>
            <div className="max-w-[680px] flex flex-col gap-3">
              {feedItems.slice(0, 6).map((item) => (
                <FeedCard key={item.id} item={item} />
              ))}
            </div>
            <div className="max-w-[680px] mt-4">
              <Link to="/feed" className="text-[14px] font-medium" style={{ color: "#D85A30" }}>
                See all in feed →
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Cuisine Quick-Filters */}
          <section className="py-6">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {cuisineFilters.map((c) => (
                <button key={c.label} className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className="w-[44px] h-[44px] rounded-lg overflow-hidden">
                    <img src={c.image} alt={c.label} className="w-full h-full object-cover" loading="lazy" width={44} height={44} />
                  </div>
                  <span className="text-[11px] font-normal text-muted-foreground">{c.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Featured Restaurants */}
          <section className="pb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl sm:text-2xl font-medium text-foreground">Featured restaurants</h2>
              <Link to="/restaurants" className="text-[13px] font-medium" style={{ color: "#D85A30" }}>See all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {featuredRestaurants.map((r) => (
                <Link key={r.id} to={`/restaurants/${r.slug}`} className="block">
                  <RestaurantCard restaurant={r} />
                </Link>
              ))}
            </div>
          </section>

          {/* New Openings */}
          {newOpeningRestaurants.length > 0 && (
            <section className="pb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl sm:text-2xl font-medium text-foreground">New openings</h2>
                <Link to="/restaurants" className="text-[13px] font-medium" style={{ color: "#D85A30" }}>See all</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {newOpeningRestaurants.map((r) => (
                  <Link key={r.id} to={`/restaurants/${r.slug}`} className="block">
                    <RestaurantCard restaurant={r} />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* This Weekend */}
          <section className="pb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl sm:text-2xl font-medium text-foreground">This weekend</h2>
              <Link to="/events" className="text-[13px] font-medium" style={{ color: "#D85A30" }}>See all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {weekendEvents.map((ev) => (
                <div key={ev.id} className="rounded-2xl border border-border overflow-hidden bg-card">
                  <div className="p-5">
                    <p className="text-[10px] font-medium tracking-[0.1em] uppercase mb-2" style={{ color: "#993C1D" }}>
                      {ev.day} · {ev.date}
                    </p>
                    <p className="text-base font-medium text-foreground mb-1">{ev.name}</p>
                    <p className="text-sm text-muted-foreground">{ev.venue} · {ev.time}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium text-foreground">{ev.price}</span>
                      <span
                        className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "#E6F1FB", color: "#185FA5" }}
                      >
                        {ev.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Deals & Promotions */}
          <section className="pb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl sm:text-2xl font-medium text-foreground">Deals & promotions</h2>
              <button className="text-[13px] font-medium" style={{ color: "#D85A30" }}>See all</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {deals.map((d) => (
                <div
                  key={d.id}
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: "#FAECE7", border: "0.5px solid #F5C4B3" }}
                >
                  <p className="text-2xl font-medium mb-2" style={{ color: "#D85A30" }}>{d.dealText}</p>
                  <p className="text-base font-medium mb-1" style={{ color: "#4A1B0C" }}>{d.restaurant}</p>
                  <p className="text-sm text-muted-foreground mb-3">{d.description}</p>
                  <p className="text-xs font-medium" style={{ color: "#993C1D" }}>{d.expiry}</p>
                </div>
              ))}
            </div>
          </section>

          {/* From the Scene */}
          <section className="pb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl sm:text-2xl font-medium text-foreground">From the scene</h2>
              <Link to="/blog" className="text-[13px] font-medium" style={{ color: "#D85A30" }}>See all</Link>
            </div>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              {newsItems.map((n, i) => (
                <div key={n.id}>
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-[44px] h-[44px] shrink-0 rounded-lg bg-black/[0.04] flex items-center justify-center text-[20px]">
                      {n.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug text-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.time} · {n.source}</p>
                    </div>
                  </div>
                  {i < newsItems.length - 1 && <div className="h-[0.5px] bg-border mx-4" />}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
