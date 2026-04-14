import { feedFilterTabs } from "@/data/feedData";

interface FeedFilterBarProps {
  active: string;
  onChange: (value: string) => void;
}

const FeedFilterBar = ({ active, onChange }: FeedFilterBarProps) => (
  <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
    {feedFilterTabs.map((tab) => (
      <button
        key={tab.value}
        onClick={() => onChange(tab.value)}
        className="shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-colors"
        style={
          active === tab.value
            ? { backgroundColor: "#D85A30", color: "#fff" }
            : { backgroundColor: "transparent", color: "#0F0804", border: "1px solid #E0DBD5" }
        }
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default FeedFilterBar;
