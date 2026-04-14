

# RestoGo AI Chat Assistant — MVP

## Overview
Add a floating AI chat assistant to the RestoGo app. Since there is **no Supabase connection** in this project (it's all client-side mock data), the AI backend will use **Lovable AI Gateway** via a Supabase Edge Function — which requires enabling Lovable Cloud first.

The chat searches the existing mock restaurant data client-side and sends context to the AI for natural language responses.

## Architecture

```text
User message
  → Extract keywords (client-side string matching)
  → Search listingData.ts + feedData.ts (client-side)
  → Send message history + restaurant context to Edge Function
  → Edge Function calls Lovable AI Gateway
  → Stream response back to chat UI
```

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/chat/FloatingChatButton.tsx` | Fixed coral FAB, bottom-right, pulsing badge on first visit |
| `src/components/chat/AIChatDrawer.tsx` | Chat panel — bottom sheet on mobile, right panel on desktop |
| `src/components/chat/ChatRestaurantCard.tsx` | Inline restaurant result card inside chat |
| `src/components/chat/SuggestionChips.tsx` | Horizontal scrollable pill buttons |
| `src/components/chat/TypingIndicator.tsx` | 3-dot animated loading indicator |
| `src/lib/restaurantSearch.ts` | Client-side search over mock data (cuisine, neighborhood, price) |
| `src/lib/aiChat.ts` | Streaming chat client calling the Edge Function |
| `supabase/functions/restogo-chat/index.ts` | Edge Function proxying to Lovable AI Gateway |

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Add `<FloatingChatButton />` |
| `src/pages/Restaurants.tsx` | Add `<FloatingChatButton />` |

## Key Design Decisions

1. **Lovable AI Gateway** (not Anthropic) — the project has no API keys configured; Lovable AI is pre-provisioned and requires no user setup. Uses `google/gemini-3-flash-preview` model.

2. **Client-side restaurant search** — since all data is mock/local in `listingData.ts` and `feedData.ts`, we search client-side and pass matching results as context to the AI. No database queries needed.

3. **Rate limiting** — localStorage counter (`restogo_chat_turns_YYYY-MM-DD`), 10 turns/day for guests, with multilingual limit message + sign-up CTA.

4. **Language detection** — `navigator.language` on mount sets initial chips and placeholder (en/ka/ru).

5. **Streaming** — SSE streaming from the edge function for token-by-token rendering.

## Component Details

**FloatingChatButton**: 56px coral circle, `MessageCircle` icon, `fixed bottom-6 right-6 z-50`. Pulsing dot badge until first open (localStorage `restogo_chat_seen`).

**AIChatDrawer**: Uses a Sheet (bottom) on mobile, right-side panel on desktop. 75vh mobile / full height desktop. Header with "R" avatar + title. Scrollable messages area. Fixed input bar at bottom with cycling placeholder. Bot messages include optional `restaurants[]` and `suggestions[]` parsed from AI response.

**Edge Function**: Receives `{ messages, restaurantContext, lang }`, prepends system prompt with restaurant context, calls `https://ai.gateway.lovable.dev/v1/chat/completions` with `LOVABLE_API_KEY`, streams response back.

**System prompt**: Instructs the AI to be a Tbilisi restaurant helper, respond in the user's language, keep answers to 1-3 sentences, and only reference provided restaurant data. Asks it to return follow-up suggestions as `[SUGGESTIONS: chip1 | chip2 | chip3]` at the end of responses for easy parsing.

## Setup Requirements
- Enable Lovable Cloud (for edge functions + `LOVABLE_API_KEY`)
- No additional API keys or secrets needed from the user

