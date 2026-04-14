import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { streamChat, type ChatMessage } from "@/lib/aiChat";
import { searchRestaurants, extractKeywords, getActivePromotions, buildRestaurantContext } from "@/lib/restaurantSearch";
import TypingIndicator from "./TypingIndicator";
import SuggestionChips from "./SuggestionChips";
import ChatRestaurantCard from "./ChatRestaurantCard";

interface ParsedBotMessage {
  text: string;
  suggestions: string[];
  restaurants: Array<{ name: string; slug: string; neighborhood: string; cuisine: string; price: string; promo?: string }>;
}

const LANG_CONFIG: Record<string, { placeholder: string; chips: string[]; welcome: string }> = {
  en: {
    placeholder: "Ask me anything...",
    chips: ["Khinkali spots", "Best deals today", "Wine bars in Vera"],
    welcome: "Hi! I'm your RestoGo assistant. Ask me about restaurants, cuisines, or deals in Tbilisi 🍽️",
  },
  ka: {
    placeholder: "დამეხმარე...",
    chips: ["ხინკალი", "დღევანდელი ფასდაკლებები", "ღვინის ბარები"],
    welcome: "გამარჯობა! მე ვარ RestoGo ასისტენტი. მკითხე რესტორნებზე, სამზარეულოზე ან ფასდაკლებებზე თბილისში 🍽️",
  },
  ru: {
    placeholder: "Спросите меня...",
    chips: ["Хинкали", "Акции сегодня", "Винные бары"],
    welcome: "Привет! Я ассистент RestoGo. Спросите меня о ресторанах, кухнях или акциях в Тбилиси 🍽️",
  },
};

function detectLang(): string {
  const nav = navigator.language;
  if (nav.startsWith("ka")) return "ka";
  if (nav.startsWith("ru")) return "ru";
  return "en";
}

function getRateLimitKey(): string {
  return `restogo_chat_turns_${new Date().toISOString().slice(0, 10)}`;
}

function getTurnsUsed(): number {
  return parseInt(localStorage.getItem(getRateLimitKey()) || "0", 10);
}

function incrementTurns(): void {
  localStorage.setItem(getRateLimitKey(), String(getTurnsUsed() + 1));
}

function parseBotResponse(text: string, searchResults: ParsedBotMessage["restaurants"]): ParsedBotMessage {
  let mainText = text;
  let suggestions: string[] = [];

  const sugMatch = text.match(/\[SUGGESTIONS?:\s*(.+?)\]/i);
  if (sugMatch) {
    mainText = text.replace(sugMatch[0], "").trim();
    suggestions = sugMatch[1].split("|").map((s) => s.trim()).filter(Boolean);
  }

  return { text: mainText, suggestions, restaurants: searchResults };
}

interface AIChatDrawerProps {
  onClose: () => void;
}

const AIChatDrawer = ({ onClose }: AIChatDrawerProps) => {
  const isMobile = useIsMobile();
  const lang = useRef(detectLang()).current;
  const config = LANG_CONFIG[lang];
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Array<ChatMessage & { parsed?: ParsedBotMessage }>>([
    { role: "assistant", content: config.welcome, parsed: { text: config.welcome, suggestions: config.chips, restaurants: [] } },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    if (getTurnsUsed() >= 10) {
      const limitMsg: Record<string, string> = {
        en: "You've used your free searches for today. Sign up free to get more!",
        ka: "დღევანდელი უფასო ძიებები ამოიწურა. დარეგისტრირდი უფასოდ!",
        ru: "Вы использовали бесплатные поиски на сегодня. Зарегистрируйтесь бесплатно!",
      };
      setMessages((prev) => [...prev, { role: "user", content: text }, {
        role: "assistant", content: limitMsg[lang],
        parsed: { text: limitMsg[lang], suggestions: [], restaurants: [] },
      }]);
      return;
    }

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const filters = extractKeywords(text);
    const results = searchRestaurants(filters);
    const promotions = getActivePromotions();
    const context = buildRestaurantContext(results, promotions);

    const chatRestaurants = results.slice(0, 4).map((r) => ({
      name: r.name, slug: r.slug, neighborhood: r.district, cuisine: r.cuisine, price: r.priceRange,
    }));

    let assistantText = "";

    await streamChat({
      messages: [...messages.filter((m) => !m.parsed), userMsg].map(({ role, content }) => ({ role, content })),
      restaurantContext: context,
      lang,
      onDelta: (chunk) => {
        assistantText += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && !last.parsed) {
            return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantText } : m);
          }
          return [...prev, { role: "assistant", content: assistantText }];
        });
      },
      onDone: () => {
        incrementTurns();
        const parsed = parseBotResponse(assistantText, chatRestaurants);
        setMessages((prev) =>
          prev.map((m, i) => i === prev.length - 1 && m.role === "assistant" ? { ...m, content: parsed.text, parsed } : m)
        );
        setIsLoading(false);
      },
      onError: (err) => {
        setMessages((prev) => [...prev, { role: "assistant", content: err, parsed: { text: err, suggestions: [], restaurants: [] } }]);
        setIsLoading(false);
      },
    });
  }, [messages, isLoading, lang]);

  const panelClass = isMobile
    ? "fixed inset-x-0 bottom-0 z-50 rounded-t-3xl"
    : "fixed right-0 top-0 bottom-0 z-50 w-[400px] border-l";

  const panelHeight = isMobile ? "h-[75vh]" : "h-full";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
      <div
        className={`${panelClass} ${panelHeight} flex flex-col shadow-xl animate-in ${isMobile ? "slide-in-from-bottom" : "slide-in-from-right"} duration-300`}
        style={{ backgroundColor: "#FAF8F5", borderColor: "#E8E4DF" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "#E8E4DF" }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0"
            style={{ backgroundColor: "#D85A30", fontFamily: "'Playfair Display', serif" }}
          >
            R
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[16px] font-medium" style={{ color: "#0F0804", fontFamily: "'Playfair Display', serif" }}>
              RestoGo Assistant
            </p>
            <p className="text-[12px]" style={{ color: "#0F0804aa", fontFamily: "'DM Sans', sans-serif" }}>
              Find restaurants, deals & more
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5 transition-colors">
            <X size={18} style={{ color: "#0F0804" }} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i}>
              <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="px-4 py-2.5 text-[14px] leading-relaxed max-w-[80%]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    backgroundColor: msg.role === "user" ? "#D85A30" : "#FFFFFF",
                    color: msg.role === "user" ? "#FFFFFF" : "#0F0804",
                    border: msg.role === "assistant" ? "1px solid #E8E4DF" : "none",
                  }}
                >
                  {msg.parsed?.text || msg.content}
                </div>
              </div>
              {msg.parsed?.restaurants && msg.parsed.restaurants.length > 0 && (
                <div className="mt-2 space-y-2 max-w-[85%]">
                  {msg.parsed.restaurants.map((r) => (
                    <ChatRestaurantCard key={r.slug} {...r} />
                  ))}
                </div>
              )}
              {msg.parsed?.suggestions && msg.parsed.suggestions.length > 0 && (
                <div className="mt-2 max-w-[85%]">
                  <SuggestionChips chips={msg.parsed.suggestions} onSelect={sendMessage} />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t" style={{ borderColor: "#E8E4DF" }}>
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={config.placeholder}
              className="flex-1 h-11 px-4 rounded-3xl border bg-white text-[14px] outline-none"
              style={{ borderColor: "#E8E4DF", fontFamily: "'DM Sans', sans-serif" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-opacity disabled:opacity-40"
              style={{ backgroundColor: "#D85A30" }}
            >
              <Send size={16} color="white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatDrawer;
