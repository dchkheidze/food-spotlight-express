import { Search, MapPin, User, Home, Compass, Heart, UserCircle } from "lucide-react";
import { cuisineFilters, newOpenings, weekendEvents, deals, newsItems } from "@/data/homeMockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-[430px] pb-20">

        {/* 1. Top Nav Bar */}
        <nav className="flex items-center justify-between px-4 h-14">
          <span className="text-[18px] font-medium" style={{ color: "#D85A30" }}>
            fork.ge
          </span>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[0.5px] border-black/10 text-[13px] font-medium" style={{ color: "#4A1B0C" }}>
              <MapPin size={14} style={{ color: "#D85A30" }} />
              Tbilisi
            </button>
            <button className="p-1.5">
              <UserCircle size={22} className="text-black/40" />
            </button>
          </div>
        </nav>

        {/* 2. Hero Section */}
        <section className="px-4 pt-6 pb-6" style={{ backgroundColor: "#FAECE7" }}>
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase mb-2" style={{ color: "#993C1D" }}>
            Discover Tbilisi
          </p>
          <h1 className="text-[22px] font-medium leading-tight mb-5" style={{ color: "#4A1B0C" }}>
            Where do you want<br />to eat tonight?
          </h1>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#D85A30" }} />
            <input
              type="text"
              placeholder="Restaurant, dish, neighbourhood…"
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white text-[14px] font-normal placeholder:text-black/35 outline-none"
              style={{ border: "0.5px solid #F09977" }}
            />
          </div>
        </section>

        {/* 3. Cuisine Quick-Filters */}
        <section className="px-4 py-5">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {cuisineFilters.map((c) => (
              <button key={c.label} className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-[44px] h-[44px] rounded-lg bg-black/[0.04] flex items-center justify-center text-[20px]">
                  {c.emoji}
                </div>
                <span className="text-[11px] font-normal text-black/60">{c.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 4. New Openings */}
        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-medium" style={{ color: "#4A1B0C" }}>New openings</h2>
            <button className="text-[13px] font-medium" style={{ color: "#D85A30" }}>See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {newOpenings.map((r) => (
              <div key={r.id} className="shrink-0 w-[150px] rounded-xl border-[0.5px] border-black/8 overflow-hidden">
                <div className="h-[90px] flex items-center justify-center text-[32px]" style={{ backgroundColor: "#FAECE7" }}>
                  {r.emoji}
                </div>
                <div className="p-2.5">
                  <p className="text-[13px] font-medium" style={{ color: "#4A1B0C" }}>{r.name}</p>
                  <p className="text-[11px] font-normal text-black/50 mt-0.5">{r.cuisine} · {r.neighbourhood}</p>
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

        {/* 5. This Weekend */}
        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-medium" style={{ color: "#4A1B0C" }}>This weekend</h2>
            <button className="text-[13px] font-medium" style={{ color: "#D85A30" }}>See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {weekendEvents.map((ev) => (
              <div key={ev.id} className="shrink-0 w-[210px] rounded-xl border-[0.5px] border-black/8 p-3">
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase mb-1" style={{ color: "#993C1D" }}>
                  {ev.day} · {ev.date}
                </p>
                <p className="text-[13px] font-medium mb-1" style={{ color: "#4A1B0C" }}>{ev.name}</p>
                <p className="text-[12px] font-normal text-black/50">{ev.venue} · {ev.time}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[12px] font-medium" style={{ color: "#4A1B0C" }}>{ev.price}</span>
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

        {/* 6. Deals & Promotions */}
        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-medium" style={{ color: "#4A1B0C" }}>Deals & promotions</h2>
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

        {/* 7. From the Scene */}
        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-medium" style={{ color: "#4A1B0C" }}>From the scene</h2>
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
                    <p className="text-[13px] font-medium leading-snug" style={{ color: "#4A1B0C" }}>{n.title}</p>
                    <p className="text-[11px] font-normal text-black/45 mt-0.5">{n.time} · {n.source}</p>
                  </div>
                </div>
                {i < newsItems.length - 1 && <div className="h-[0.5px] bg-black/8" />}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 8. Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-[0.5px] border-black/10 z-50">
        <div className="max-w-[430px] mx-auto flex items-center justify-around h-14">
          {[
            { icon: Home, label: "Home", active: true },
            { icon: Search, label: "Search", active: false },
            { icon: Compass, label: "Near me", active: false },
            { icon: Heart, label: "Saved", active: false },
            { icon: User, label: "Profile", active: false },
          ].map((tab) => (
            <button key={tab.label} className="flex flex-col items-center gap-0.5">
              <tab.icon size={20} style={{ color: tab.active ? "#D85A30" : "#9CA3AF" }} />
              <span
                className="text-[10px] font-medium"
                style={{ color: tab.active ? "#D85A30" : "#9CA3AF" }}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;
