const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm bg-white border max-w-[80%]" style={{ borderColor: "#E8E4DF" }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-2 h-2 rounded-full animate-bounce"
        style={{ backgroundColor: "#D85A30", animationDelay: `${i * 150}ms`, animationDuration: "600ms" }}
      />
    ))}
  </div>
);

export default TypingIndicator;
