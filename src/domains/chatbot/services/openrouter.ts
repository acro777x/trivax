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
  const lastUserObj = [...messages].reverse().find(m => m.role === "user");
  const lastUserMsg = lastUserObj?.content.toLowerCase() || "";
  const repliedText = lastUserObj?.replyTo?.text.toLowerCase() || "";

  // Incorporate recent messages so the assistant maintains conversational context across turns
  const conversationContext = messages
    .slice(-6)
    .map(m => m.content.toLowerCase())
    .join(" ");

  const combinedContext = `${repliedText} ${conversationContext} ${lastUserMsg}`;

  let reply = "";

  if (combinedContext.includes("rag") || combinedContext.includes("chatbot") || combinedContext.includes("ai")) {
    reply = `At Kavirox, we build **Custom RAG (Retrieval-Augmented Generation) Chatbots** specifically engineered for consumer & D2C brands:

• **Zero Hallucinations**: Answers are strictly grounded in your actual product catalog, ingredients, FAQ, and shipping policies.
• **24/7 Sales & Support**: Guides undecided shoppers to the right product and creates 1-click cart links.
• **WhatsApp & Storefront**: Can be deployed directly on your website or integrated into official WhatsApp Cloud API flows.

Would you like to discuss building a RAG chatbot for your brand? You can click the email button below to open our pre-written project brief!`;
  } else if (combinedContext.includes("service") || combinedContext.includes("offer") || combinedContext.includes("what do you do")) {
    reply = `Kavirox provides **11 core engineering & growth service lines** for e-commerce brands:

1. **E-Commerce UX & Store Optimisation** (Shopify, bundle cross-sells, mobile speed)
2. **Website Development & Performance** (Custom Next.js/Liquid sections, sub-second loads)
3. **Customer Experience & Guided Discovery** (Interactive product match finders)
4. **WhatsApp Conversational Commerce** (Cart recovery, order tracking, in-chat buying)
5. **Email & Retention Automation** (Klaviyo lifecycle journeys & VIP retention)
6. **Payments & Checkout Flow** (UPI deep-links, COD verification, RTO reduction)
7. **Customer Data & CAPI Analytics** (Server-side tracking, Looker Studio dashboards)
8. **SEO & High-Intent Editorial** (Technical schema, organic rank optimization)
9. **RAG AI Chatbots & Product Assistants** (Brand-trained conversational sales assistants)
10. **Security & Technical Health** (OWASP audits, uptime & performance monitoring)
11. **Growth Automation** (n8n & webhook pipelines connecting store to CRM)

Which area are you looking to scale?`;
  } else if (combinedContext.includes("model") || combinedContext.includes("hire") || combinedContext.includes("engagement") || combinedContext.includes("pricing") || combinedContext.includes("cost")) {
    reply = `We offer 3 straightforward **engagement models** tailored to your brand's growth phase:

1. **Project-Based Sprint**: Fixed scope and rapid delivery (2-6 weeks) for new store launches, redesigns, or RAG chatbot builds.
2. **Dedicated Growth Team**: An ongoing monthly engineering squad embedded with your team for continuous store updates and speed tuning.
3. **Technical Advisory & Support**: On-demand system audits, uptime assurance, and senior technical guidance.

Every project includes direct communication, transparent code commits, and zero corporate overhead.`;
  } else if (combinedContext.includes("contact") || combinedContext.includes("start") || combinedContext.includes("email") || combinedContext.includes("project")) {
    reply = `Getting started is simple! We've prepared a **pre-written project inquiry template** that opens directly in your email client:

• **Direct Email**: info@kavirox.space
• **Location**: GBU Incubation, Greater Noida, India
• **Launch Brief**: Click the button below to open the formatted brief in Gmail Web with your options pre-filled!`;
  } else {
    reply = `Welcome to **Kavirox**! We're a technology and e-commerce studio helping D2C brands build faster online stores, automate customer messaging, and turn visitors into regular buyers.

I can help you explore:
• **Custom RAG AI Chatbots** trained on your product catalog
• **Shopify & Headless Store Builds** with sub-second speeds
• **WhatsApp Automated Commerce** (cart recovery & order alerts)
• **Our 3 Flexible Engagement Models**

What can I assist you with today?`;
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
