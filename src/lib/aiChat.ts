const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/restogo-chat`;

export type ChatMessage = { role: "user" | "assistant"; content: string };

export async function streamChat({
  messages,
  restaurantContext,
  lang,
  onDelta,
  onDone,
  onError,
}: {
  messages: ChatMessage[];
  restaurantContext: string;
  lang: string;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: messages.slice(-6),
        restaurantContext,
        lang,
      }),
    });

    if (resp.status === 429) { onError("Rate limited — please try again later."); return; }
    if (resp.status === 402) { onError("AI credits exhausted. Please add funds in workspace settings."); return; }
    if (!resp.ok || !resp.body) { onError("Failed to connect to assistant."); return; }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (payload === "[DONE]") { onDone(); return; }
        try {
          const parsed = JSON.parse(payload);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }
    onDone();
  } catch {
    onError("Network error — please check your connection.");
  }
}
