import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cuisineFilters, newOpenings, weekendEvents, deals, newsItems } from "@/data/homeMockData";

const Index = () => {
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
            <h1 className="text-[22px] sm:text-3xl font-medium leading-tight mb-5" style={{ color: "#4A1B0C" }}>
              Where do you want<br className="sm:hidden" /> to eat tonight?
            </h1>
            <div className="relative max-w-xl">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#D85A30" }} />
              <input
                type="text"
                placeholder="Restaurant, dish, neighbourhood…"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white text-[14px] font-normal placeholder:text-black/35 outline-none"
                style={{ border: "0.5px solid #F09977" }}
              />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Cuisine Quick-Filters */}
          <section className="py-6">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {cuisineFilters.map((c) => (
                <button key={c.label} className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className="w-[44px] h-[44px] rounded-lg bg-black/[0.04] flex items-center justify-center text-[20px]">
                    {c.emoji}
                  </div>
                  <span className="text-[11px] font-normal text-muted-foreground">{c.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* New Openings */}
          <section className="pb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] font-medium text-foreground">New openings</h2>
              <button className="text-[13px] font-medium" style={{ color: "#D85A30" }}>See all</button>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {newOpenings.map((r) => (
                <div key={r.id} className="shrink-0 w-[150px] rounded-xl border-[0.5px] border-border overflow-hidden">
                  <div className="h-[90px] flex items-center justify-center text-[32px]" style={{ backgroundColor: "#FAECE7" }}>
                    {r.emoji}
                  </div>
                  <div className="p-2.5">
                    <p className="text-[13px] font-medium text-foreground">{r.name}</p>
                    <p className="text-[11px] font-normal text-muted-foreground mt-0.5">{r.cuisine} · {r.neighbourhood}</p>
                    <span
                      className="inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#FAECE7", color: "#D85A30" }}
                    >
                      {r.daysAgo}d ago
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* This Weekend */}
          <section className="pb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] font-medium text-foreground">This weekend</h2>
              <button className="text-[13px] font-medium" style={{ color: "#D85A30" }}>See all</button>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {weekendEvents.map((ev) => (
                <div key={ev.id} className="shrink-0 w-[210px] rounded-xl border-[0.5px] border-border p-3">
                  <p className="text-[10px] font-medium tracking-[0.1em] uppercase mb-1" style={{ color: "#993C1D" }}>
                    {ev.day} · {ev.date}
                  </p>
                  <p className="text-[13px] font-medium text-foreground mb-1">{ev.name}</p>
                  <p className="text-[12px] font-normal text-muted-foreground">{ev.venue} · {ev.time}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[12px] font-medium text-foreground">{ev.price}</span>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#E6F1FB", color: "#185FA5" }}
                    >
                      {ev.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Deals & Promotions */}
          <section className="pb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] font-medium text-foreground">Deals & promotions</h2>
              <button className="text-[13px] font-medium" style={{ color: "#D85A30" }}>See all</button>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {deals.map((d) => (
                <div
                  key={d.id}
                  className="shrink-0 w-[190px] rounded-xl p-3"
                  style={{ backgroundColor: "#FAECE7", border: "0.5px solid #F5C4B3" }}
                >
                  <p className="text-[22px] font-medium mb-1" style={{ color: "#D85A30" }}>{d.dealText}</p>
                  <p className="text-[13px] font-medium mb-0.5" style={{ color: "#4A1B0C" }}>{d.restaurant}</p>
                  <p className="text-[12px] font-normal mb-2" style={{ color: "#712B13" }}>{d.description}</p>
                  <p className="text-[11px] font-medium" style={{ color: "#993C1D" }}>{d.expiry}</p>
                </div>
              ))}
            </div>
          </section>

          {/* From the Scene */}
          <section className="pb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] font-medium text-foreground">From the scene</h2>
              <button className="text-[13px] font-medium" style={{ color: "#D85A30" }}>See all</button>
            </div>
            <div>
              {newsItems.map((n, i) => (
                <div key={n.id}>
                  <div className="flex items-center gap-3 py-3">
                    <div className="w-[40px] h-[40px] shrink-0 rounded-lg bg-black/[0.04] flex items-center justify-center text-[18px]">
                      {n.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium leading-snug text-foreground">{n.title}</p>
                      <p className="text-[11px] font-normal text-muted-foreground mt-0.5">{n.time} · {n.source}</p>
                    </div>
                  </div>
                  {i < newsItems.length - 1 && <div className="h-[0.5px] bg-border" />}
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
