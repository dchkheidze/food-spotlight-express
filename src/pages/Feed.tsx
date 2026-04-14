import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedFilterBar from "@/components/feed/FeedFilterBar";
import FeedCard from "@/components/feed/FeedCard";
import { feedItems } from "@/data/feedData";

const ITEMS_PER_PAGE = 10;

const Feed = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = activeFilter === "all" ? feedItems : feedItems.filter((item) => item.type === activeFilter);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[680px] mx-auto px-4 py-8">
          <h1 className="text-[32px] font-medium mb-6" style={{ color: "#0F0804", fontFamily: "'Playfair Display', serif" }}>
            Discover Tbilisi
          </h1>

          <div className="sticky top-16 z-40 bg-background pb-2">
            <FeedFilterBar active={activeFilter} onChange={(v) => { setActiveFilter(v); setVisibleCount(ITEMS_PER_PAGE); }} />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            {visible.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                className="px-6 py-2.5 rounded-lg text-[14px] font-medium"
                style={{ color: "#D85A30", border: "1px solid #D85A30" }}
              >
                Load more
              </button>
            </div>
          )}

          {visible.length === 0 && (
            <p className="text-center py-12 text-sm" style={{ color: "#8C7B6E" }}>No items found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feed;
