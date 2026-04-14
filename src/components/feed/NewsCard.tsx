import type { FeedItem } from "@/data/feedData";

const NewsCard = ({ item }: { item: FeedItem }) => (
  <div className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid #EDE9E3" }}>
    <img src={item.image} alt={item.headline} className="w-full aspect-video object-cover" loading="lazy" />
    <div className="p-4">
      <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#D85A30" }}>{item.newsCategory}</span>
      <h3 className="text-xl font-medium mt-1 line-clamp-2" style={{ color: "#0F0804", fontFamily: "'Playfair Display', serif" }}>
        {item.headline}
      </h3>
      <p className="text-xs mt-2" style={{ color: "#8C7B6E" }}>
        {item.byline} · {item.readTime}
      </p>
    </div>
  </div>
);

export default NewsCard;
