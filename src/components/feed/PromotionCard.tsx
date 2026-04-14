import type { FeedItem } from "@/data/feedData";

const PromotionCard = ({ item }: { item: FeedItem }) => (
  <div className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid #EDE9E3" }}>
    <div className="relative">
      <img src={item.image} alt={item.restaurantName} className="w-full aspect-video object-cover" loading="lazy" />
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-medium text-white" style={{ backgroundColor: "#D85A30" }}>
        {item.promoBadge}
      </span>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-medium" style={{ color: "#0F0804", fontFamily: "'Playfair Display', serif" }}>{item.restaurantName}</h3>
      <p className="text-sm mt-1" style={{ color: "#5C5147" }}>{item.promoHeadline}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm line-through" style={{ color: "#8C7B6E" }}>{item.originalPrice}</span>
        <span className="text-sm font-medium" style={{ color: "#D85A30" }}>{item.discountedPrice}</span>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button className="px-4 py-2 rounded-lg text-[13px] font-medium" style={{ color: "#D85A30", border: "1px solid #D85A30" }}>
          View Offer
        </button>
        <div className="flex items-center gap-2 text-xs" style={{ color: "#8C7B6E" }}>
          <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FAF8F5" }}>{item.category}</span>
          <span>{item.distance}</span>
        </div>
      </div>
    </div>
  </div>
);

export default PromotionCard;
