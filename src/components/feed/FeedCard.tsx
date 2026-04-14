import type { FeedItem } from "@/data/feedData";
import PromotionCard from "./PromotionCard";
import NewOpeningCard from "./NewOpeningCard";
import EventCard from "./EventCard";
import NewsCard from "./NewsCard";

const FeedCard = ({ item }: { item: FeedItem }) => {
  switch (item.type) {
    case "promotion": return <PromotionCard item={item} />;
    case "new_opening": return <NewOpeningCard item={item} />;
    case "event": return <EventCard item={item} />;
    case "news": return <NewsCard item={item} />;
    default: return null;
  }
};

export default FeedCard;
