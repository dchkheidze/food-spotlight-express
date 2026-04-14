interface SuggestionChipsProps {
  chips: string[];
  onSelect: (chip: string) => void;
}

const SuggestionChips = ({ chips, onSelect }: SuggestionChipsProps) => (
  <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
    {chips.map((chip) => (
      <button
        key={chip}
        onClick={() => onSelect(chip)}
        className="shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-normal bg-white border transition-colors hover:bg-[#FAF8F5]"
        style={{ borderColor: "#E8E4DF", fontFamily: "'DM Sans', sans-serif" }}
      >
        {chip}
      </button>
    ))}
  </div>
);

export default SuggestionChips;
