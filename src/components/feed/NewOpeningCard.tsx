import type { FeedItem } from "@/data/feedData";

const NewOpeningCard = ({ item }: { item: FeedItem }) => (
  <div className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid #EDE9E3" }}>
    <div className="relative">
      <img src={item.image} alt={item.restaurantName} className="w-full aspect-video object-cover" loading="lazy" />
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-medium text-white" style={{ backgroundColor: "#0F0804" }}>
        NEW
      </span>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-medium" style={{ color: "#0F0804", fontFamily: "'Playfair Display', serif" }}>{item.restaurantName}</h3>
      <p className="text-sm mt-1" style={{ color: "#5C5147" }}>{item.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {item.cuisineTags?.map((tag) => (
          <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ backgroundColor: "#FAF8F5", color: "#8C7B6E" }}>
            {tag}
          </span>
        ))}
      </div>
      <p className="text-xs mt-3" style={{ color: "#8C7B6E" }}>{item.openingDate}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs" style={{ color: "#8C7B6E" }}>☆ No reviews yet</span>
        <button className="text-[12px] font-medium" style={{ color: "#D85A30" }}>Be first to review</button>
      </div>
    </div>
  </div>
);

export default NewOpeningCard;
