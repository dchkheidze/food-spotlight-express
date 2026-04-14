import type { FeedItem } from "@/data/feedData";

const EventCard = ({ item }: { item: FeedItem }) => (
  <div className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid #EDE9E3" }}>
    <div className="relative">
      <img
        src={item.image}
        alt={item.eventName}
        className="w-full aspect-[16/9] object-cover"
        loading="lazy"
      />
      <div className="absolute top-3 left-3 w-14 h-14 rounded-xl flex flex-col items-center justify-center" style={{ backgroundColor: "#D85A30" }}>
        <span className="text-[20px] font-medium leading-none text-white">{item.eventDay}</span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/80 mt-0.5">{item.eventMonth}</span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-base font-medium truncate" style={{ color: "#0F0804" }}>{item.eventName}</h3>
      <p className="text-[13px] mt-0.5" style={{ color: "#8C7B6E" }}>{item.venueName}</p>
      <div className="flex items-center gap-3 mt-2 text-[13px]" style={{ color: "#5C5147" }}>
        <span>{item.eventTime}</span>
        <span>·</span>
        <span className="font-medium">{item.ticketPrice}</span>
      </div>
      <button className="text-[13px] font-medium mt-2" style={{ color: "#D85A30" }}>Get Tickets →</button>
    </div>
  </div>
);

export default EventCard;
