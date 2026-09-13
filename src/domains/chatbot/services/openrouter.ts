import { ChatMessage, OpenRouterModelOption } from "../types";
import { buildStudioSystemPrompt, SERVICES_KNOWLEDGE, SOLUTIONS_KNOWLEDGE, CAPABILITIES_KNOWLEDGE, STUDIO_IDENTITY } from "../knowledge/studio-knowledge";

export const OPENROUTER_FREE_MODELS: OpenRouterModelOption[] = [
  {
    id: "openrouter/free",
    name: "OpenRouter Free Router",
    description: "Automatically routes to the fastest currently available free model",
    isFree: true,
    tag: "Recommended"
  },
  {
    id: "nvidia/nemotron-3.5-lightning:free",
    name: "NVIDIA Nemotron 3.5 Lightning",
    description: "Ultra-fast response with high reasoning accuracy",
    isFree: true,
    tag: "Fastest"
  },
  {
    id: "liquid/lfm-2.5-2.6b:free",
    name: "Liquid LFM 2.5",
    description: "Compact, ultra-low latency conversational engine",
    isFree: true,
    tag: "Lightweight"
  },
  {
    id: "nex-agi/nex-n2.5-mini:free",
    name: "Nex-N2.5 Mini",
    description: "Efficient general intelligence free model",
    isFree: true
  },
  {
    id: "cohere/north-mini-code:free",
    name: "Cohere North Mini",
    description: "Precision code and logic assistant",
    isFree: true
  }
];

export const DEFAULT_FREE_MODEL = "openrouter/free";
const STORAGE_KEY_API_KEY = "kavirox_openrouter_api_key";
const STORAGE_KEY_MODEL = "kavirox_openrouter_model";

export function getStoredApiKey(): string {
  if (typeof window === "undefined") return "";
  const stored = localStorage.getItem(STORAGE_KEY_API_KEY);
  if (stored && stored.trim()) return stored.trim();
  const envKey = (import.meta as any).env?.VITE_OPENROUTER_API_KEY;
  if (envKey && typeof envKey === "string" && envKey.trim()) return envKey.trim();
  return "";
}

export function setStoredApiKey(key: string): void {
  if (typeof window === "undefined") return;
  if (!key || !key.trim()) {
    localStorage.removeItem(STORAGE_KEY_API_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
  }
}

export function getStoredModel(): string {
  if (typeof window === "undefined") return DEFAULT_FREE_MODEL;
  const stored = localStorage.getItem(STORAGE_KEY_MODEL);
  return stored || DEFAULT_FREE_MODEL;
}

export function setStoredModel(modelId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_MODEL, modelId);
}

export interface StreamChatOptions {
  messages: ChatMessage[];
  model?: string;
  apiKey?: string;
  onChunk: (chunk: string, accumulated: string) => void;
  onComplete?: (fullText: string) => void;
  onError?: (error: Error) => void;
  signal?: AbortSignal;
}

/**
 * Sends chat prompt to OpenRouter using streaming Server-Sent Events (SSE).
 * Falls back to built-in studio knowledge if no API key is set.
 */
export async function streamOpenRouterChat({
  messages,
  model = getStoredModel(),
  apiKey = getStoredApiKey(),
  onChunk,
  onComplete,
  onError,
  signal
}: StreamChatOptions): Promise<void> {
  // If no API key is provided, use the built-in knowledge response engine
  if (!apiKey) {
    await simulateStudioResponse(messages, onChunk, onComplete);
    return;
  }

  const systemPrompt = buildStudioSystemPrompt();

  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...messages
      .filter(m => m.content.trim() && !m.isStreaming)
      .map(m => {
        let content = m.content;
        if (m.replyTo) {
          content = `[Replying to: "${m.replyTo.text.slice(0, 160)}..."]\n${m.content}`;
        }
        return {
          role: m.role,
          content
        };
      })
  ];

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://kavirox.space",
        "X-Title": "Kavirox Studio AI Concierge"
      },
      body: JSON.stringify({
        model,
        messages: formattedMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1000
      }),
      signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorJson: any = null;
      try {
        errorJson = JSON.parse(errorText);
      } catch {}

      const errorMsg = errorJson?.error?.message || errorJson?.message || response.statusText;

      // Handle 401 Unauthorized
      if (response.status === 401) {
        throw new Error("Assistant service is temporarily updating. Please email us at info@kavirox.space or try again.");
      }

      // Handle 429 Rate Limit
      if (response.status === 429) {
        throw new Error("Assistant is receiving high traffic right now. Please try your question again in a moment.");
      }

      throw new Error("Assistant is temporarily unavailable. Please try again or email info@kavirox.space.");
    }

    if (!response.body) {
      throw new Error("No response stream received from OpenRouter.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let accumulated = "";
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(":")) continue;

        if (trimmed === "data: [DONE]") {
          if (onComplete) onComplete(accumulated);
          return;
        }

        if (trimmed.startsWith("data: ")) {
          try {
            const jsonStr = trimmed.slice(6);
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content || "";
            if (delta) {
              accumulated += delta;
              onChunk(delta, accumulated);
            }
          } catch {
            // Ignore non-JSON or partial chunks
          }
        }
      }
    }

    if (onComplete) onComplete(accumulated);
  } catch (err: any) {
    if (err.name === "AbortError") {
      return;
    }
    if (onError) onError(err);
    else throw err;
  }
}

/**
 * High-fidelity fallback knowledge simulation when an API key is not yet configured.
 * Answers with genuine studio facts and guides the user to start a project or enter a key.
 */
async function simulateStudioResponse(
  messages: ChatMessage[],
  onChunk: (chunk: string, accumulated: string) => void,
  onComplete?: (fullText: string) => void
): Promise<void> {
  // Extract user messages ONLY (never check assistant's own messages for trigger keywords)
  const userMessages = messages.filter(m => m.role === "user");
  const lastUserObj = userMessages[userMessages.length - 1];
  const lastUserMsg = (lastUserObj?.content || "").trim().toLowerCase();
  const repliedText = (lastUserObj?.replyTo?.text || "").trim().toLowerCase();

  const assistantMessages = messages.filter(m => m.role === "assistant" && !m.isStreaming);
  const lastAssistantObj = assistantMessages[assistantMessages.length - 1];
  const lastAssistantMsg = (lastAssistantObj?.content || "").toLowerCase();

  // Combine query with explicitly quoted reply text (if any)
  const query = `${repliedText} ${lastUserMsg}`.trim();

  let reply = "";

  // 1. Warm Greeting & Studio Introduction
  if (
    /^(hi|hello|hey|greetings|hola|good\s+(morning|afternoon|evening)|yo|sup)\b/i.test(lastUserMsg) ||
    lastUserMsg === "hi" ||
    lastUserMsg === "hello" ||
    lastUserMsg === "hey"
  ) {
    reply = `Hello! Welcome to **Kavirox**. We engineer sub-second e-commerce stores, custom RAG chatbots, and WhatsApp automation for consumer brands.

How can I help you today?`;
  }
  // 2. Specific RAG & AI Chatbots
  else if (
    query.includes("rag") ||
    query.includes("chatbot") ||
    (query.includes("bot") && !query.includes("both")) ||
    query.includes("assistant") ||
    query.includes("vector") ||
    query.includes("hallucination")
  ) {
    reply = `We engineer **Custom RAG Chatbots** tailored to your store:

• **Zero Hallucinations**: Grounded strictly in your products, ingredients, and FAQs.
• **Instant Cart Links**: Recommends products and generates checkout links.
• **Multi-Channel**: Embedded on your storefront or official WhatsApp.

Click the email button below to explore a custom bot for your brand!`;
  }
  // 3. Pricing, Rates, Cost, Budget
  else if (
    query.includes("price") ||
    query.includes("pricing") ||
    query.includes("cost") ||
    query.includes("rate") ||
    query.includes("budget") ||
    query.includes("how much") ||
    query.includes("fee") ||
    query.includes("quote")
  ) {
    reply = `We provide 3 flexible **engagement models**:

1. **Project Sprint** (2–6 wks): Fixed scope for new builds, speed overhauls, or RAG bots.
2. **Dedicated Squad**: Ongoing monthly engineering embedded with your team.
3. **Technical Advisory**: On-demand audits, performance tuning, and architecture reviews.

Click below to send us a quick project brief for an exact estimate!`;
  }
  // 4. Timeline, Delivery Speed & Duration
  else if (
    query.includes("timeline") ||
    query.includes("how long") ||
    query.includes("how fast") ||
    query.includes("duration") ||
    query.includes("delivery") ||
    query.includes("turnaround") ||
    query.includes("weeks")
  ) {
    reply = `Our delivery timelines are fast and agile:

• **Project Sprints**: Store builds and RAG bots launch within **2 to 6 weeks**.
• **Weekly Milestones**: Architecture in Week 1, followed by weekly preview builds and staging access.`;
  }
  // 5. Shopify, Web Development, Headless & Speed
  else if (
    query.includes("shopify") ||
    query.includes("liquid") ||
    query.includes("speed") ||
    query.includes("performance") ||
    query.includes("web dev") ||
    query.includes("website") ||
    query.includes("next.js") ||
    query.includes("headless") ||
    query.includes("core web vitals")
  ) {
    reply = `Our **Website Development & Performance** engineering delivers sub-second loads:

• **Speed Tuning**: Core Web Vitals optimization (LCP < 1.2s), script cleanup, and zero bloat.
• **Custom Shopify & Headless**: Custom Liquid sections or high-performance Next.js stores.

Would you like a complimentary store audit?`;
  }
  // 6. WhatsApp Commerce & Cart Recovery
  else if (
    query.includes("whatsapp") ||
    query.includes("abandoned cart") ||
    query.includes("cart recovery") ||
    query.includes("meta cloud")
  ) {
    reply = `Our **WhatsApp Commerce** turns WhatsApp into a reliable sales channel:

• **Cart Recovery**: Automated sequences with 1-click checkout links.
• **Order Tracking**: Real-time dispatch and delivery status updates.
• **Guided Shopping**: Conversational product finders inside WhatsApp.`;
  }
  // 7. Email & Retention Automation (Klaviyo)
  else if (
    query.includes("email") ||
    query.includes("klaviyo") ||
    query.includes("retention") ||
    query.includes("lifecycle") ||
    query.includes("crm")
  ) {
    reply = `Our **Email & Retention Automation** boosts repeat orders:

• **Automated Flows**: Welcome series, browse abandonment, and cart recovery.
• **Post-Purchase**: Replenishment reminders and UGC review collection.`;
  }
  // 8. Payments, Checkout & COD Verification
  else if (
    query.includes("payment") ||
    query.includes("checkout") ||
    query.includes("cod") ||
    query.includes("razorpay") ||
    query.includes("upi") ||
    query.includes("rto")
  ) {
    reply = `Our **Payments & Checkout Flow** engineering cuts drop-offs and RTO:

• **1-Click UPI & Cards**: Optimized Razorpay, Cashfree, and UPI deep-links.
• **COD Verification**: Automated OTP/WhatsApp verification to prevent bogus orders.`;
  }
  // 9. Analytics, Telemetry & Server-Side Tracking
  else if (
    query.includes("analytics") ||
    query.includes("tracking") ||
    query.includes("capi") ||
    query.includes("ga4") ||
    query.includes("looker") ||
    query.includes("pixel")
  ) {
    reply = `Our **Data & Analytics** setup fixes signal loss:

• **Meta CAPI**: Server-side conversion tracking bypassing ad blockers.
• **GA4 & BI Dashboards**: Granular e-commerce funnel tracking and Looker dashboards.`;
  }
  // 10. General Services Overview
  else if (
    query.includes("service") ||
    query.includes("what do you do") ||
    query.includes("what can you do") ||
    query.includes("capabilities") ||
    query.includes("offer")
  ) {
    reply = `Kavirox provides **11 core engineering services** across:

• **Commerce & Storefront**: Sub-second Shopify / Next.js builds.
• **Data & AI Systems**: Custom RAG chatbots and analytics.
• **Automation**: WhatsApp commerce, cart recovery, and n8n workflows.
• **Checkout & Security**: UPI deep-links, COD verification, and audit standards.`;
  }
  // 11. Location, Team & Studio Background
  else if (
    query.includes("where") ||
    query.includes("location") ||
    query.includes("office") ||
    query.includes("team") ||
    query.includes("who are you") ||
    query.includes("about") ||
    query.includes("founders") ||
    query.includes("based")
  ) {
    reply = `**Kavirox** is a digital engineering studio incubated at **GBU Incubation, Greater Noida, India**.

We are a hands-on squad of software engineers working directly with brands with daily Slack updates and zero agency overhead.`;
  }
  // 12. Contact, Hire, Start a Project
  else if (
    query.includes("contact") ||
    query.includes("start") ||
    query.includes("hire") ||
    query.includes("work with") ||
    query.includes("call") ||
    query.includes("reach out") ||
    query.includes("touch")
  ) {
    reply = `Ready to build? Getting started is straightforward:

• **Email**: info@kavirox.space
• **Location**: GBU Incubation, Greater Noida, India
• **Interactive Brief**: Click the button below to launch our pre-written project brief in Gmail!`;
  }
  // 13. Natural Follow-Up / Acknowledgement
  else if (
    /^(yes|yeah|yep|sure|tell me more|sounds good|continue|okay|ok|cool|go ahead|first one|second one|sprint)\b/i.test(lastUserMsg)
  ) {
    if (lastAssistantMsg.includes("engagement") || lastAssistantMsg.includes("sprint")) {
      reply = `Our **Project Sprint** runs **2 to 6 weeks** with fixed scope, weekly preview builds, and 30-day post-launch support. Click below to start!`;
    } else if (lastAssistantMsg.includes("rag") || lastAssistantMsg.includes("chatbot")) {
      reply = `To deploy your **RAG Chatbot**, we ingest your catalog, calibrate guardrails, and embed the bot in 2–3 weeks. Click below to begin!`;
    } else {
      reply = `Great! What would you like to focus on: **Shopify speed**, **custom RAG chatbots**, or **project sprint pricing**?`;
    }
  }
  // 14. Default Intelligent Fallback
  else {
    reply = `At **Kavirox**, we engineer high-performance stores and AI automation for consumer brands.

We specialize in:
• **Fast Storefronts**: Shopify & Headless Next.js
• **Custom RAG Chatbots**: Trained on your verified catalog
• **WhatsApp Commerce**: Cart recovery & order updates

Feel free to ask a question or click below to email our engineering squad!`;
  }

  // Simulate streaming typing effect
  let accumulated = "";
  const words = reply.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i] + (i < words.length - 1 ? " " : "");
    accumulated += word;
    onChunk(word, accumulated);
    await new Promise(r => setTimeout(r, 22));
  }

  if (onComplete) onComplete(accumulated);
}
