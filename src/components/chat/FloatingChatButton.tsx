import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import AIChatDrawer from "./AIChatDrawer";

const FloatingChatButton = () => {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(() => localStorage.getItem("restogo_chat_seen") === "true");

  useEffect(() => {
    if (open && !seen) {
      localStorage.setItem("restogo_chat_seen", "true");
      setSeen(true);
    }
  }, [open, seen]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: "#D85A30" }}
        aria-label="Open chat assistant"
      >
        <MessageCircle size={24} color="white" />
        {!seen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-pulse" />
        )}
      </button>
      {open && <AIChatDrawer onClose={() => setOpen(false)} />}
    </>
  );
};

export default FloatingChatButton;
