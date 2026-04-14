import { Link } from "react-router-dom";

interface ChatRestaurantCardProps {
  name: string;
  slug: string;
  neighborhood: string;
  cuisine: string;
  price: string;
  promo?: string;
}

const ChatRestaurantCard = ({ name, slug, neighborhood, cuisine, price, promo }: ChatRestaurantCardProps) => (
  <Link
    to={`/restaurants/${slug}`}
    className="block p-3 rounded-xl border bg-white hover:bg-[#FAF8F5] transition-colors"
    style={{ borderColor: "#E8E4DF" }}
  >
    <p className="text-[14px] font-medium" style={{ color: "#0F0804", fontFamily: "'DM Sans', sans-serif" }}>{name}</p>
    <p className="text-[12px] mt-0.5" style={{ color: "#0F0804aa", fontFamily: "'DM Sans', sans-serif" }}>
      {neighborhood} · {cuisine} · {price}
    </p>
    {promo && (
      <span
        className="inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full"
        style={{ backgroundColor: "#FAECE7", color: "#712B13" }}
      >
        {promo}
      </span>
    )}
  </Link>
);

export default ChatRestaurantCard;
