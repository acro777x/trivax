import { ChatMessage, OpenRouterModelOption } from "../types";
import { buildStudioSystemPrompt, SERVICES_KNOWLEDGE, STUDIO_IDENTITY } from "../knowledge/studio-knowledge";

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
      console.warn(`OpenRouter returned status ${response.status}. Falling back to studio contextual engine.`);
      await simulateStudioResponse(messages, onChunk, onComplete);
      return;
    }

    if (!response.body) {
      await simulateStudioResponse(messages, onChunk, onComplete);
      return;
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
    console.warn("OpenRouter streaming error, falling back to studio contextual engine:", err);
    await simulateStudioResponse(messages, onChunk, onComplete);
  }
}

type TopicType = 
  | "rag"
  | "speed"
  | "shopify"
  | "whatsapp"
  | "email"
  | "payments"
  | "analytics"
  | "seo"
  | "pricing"
  | "timeline"
  | "team"
  | "general";

interface ConversationContext {
  activeTopic: TopicType;
  platform: string | null;
  industry: string | null;
  painPoint: string | null;
  storeUrl: string | null;
  lastAssistantOffer: "audit" | "rag" | "sprint" | "whatsapp" | "email" | null;
  repliedTopic: TopicType | null;
}

function detectTopic(text: string): TopicType | null {
  const lower = text.toLowerCase();
  if (/(rag|chatbot|chat bot|vector|embeddings?|hallucinat|shopping assistant|ai bot|ai concierge)\b/i.test(lower)) return "rag";
  if (/(speed|performance|load time|core web vitals|lcp|inp|slow|fast|lighthouse)\b/i.test(lower)) return "speed";
  if (/(whatsapp|meta cloud|cart recovery|abandoned cart|abandonment)\b/i.test(lower)) return "whatsapp";
  if (/(shopify|liquid|headless|next\.?js|storefront|redesign|store build|web dev|website)\b/i.test(lower)) return "shopify";
  if (/(email|klaviyo|retention|crm|lifecycle|newsletter|mailchimp)\b/i.test(lower)) return "email";
  if (/(payment|checkout|cod|cash on delivery|upi|razorpay|cashfree|rto)\b/i.test(lower)) return "payments";
  if (/(analytics|tracking|capi|ga4|google analytics|looker|telemetry)\b/i.test(lower)) return "analytics";
  if (/(seo|ranking|organic|keywords|schema|meta tags)\b/i.test(lower)) return "seo";
  if (/(price|pricing|cost|rates?|budget|quote|sprint model|engagement model|fees?)\b/i.test(lower)) return "pricing";
  if (/(timeline|duration|how long|weeks|delivery time|turnaround)\b/i.test(lower)) return "timeline";
  if (/(who are you|team|founders?|location|where are you|office|gbu|greater noida)\b/i.test(lower)) return "team";
  return null;
}

function analyzeConversationContext(messages: ChatMessage[]): ConversationContext {
  let activeTopic: TopicType = "general";
  let platform: string | null = null;
  let industry: string | null = null;
  let painPoint: string | null = null;
  let storeUrl: string | null = null;
  let lastAssistantOffer: "audit" | "rag" | "sprint" | "whatsapp" | "email" | null = null;
  let repliedTopic: TopicType | null = null;

  for (const m of messages) {
    if (!m.content || m.isStreaming) continue;
    const lower = m.content.toLowerCase();

    if (m.role === "user") {
      const urlMatch = m.content.match(/(?:https?:\/\/)?([a-zA-Z0-9-]+\.(?:com|in|store|space|co|shop|io|org|net|app)(?:\/[^\s]*)?)/i);
      if (urlMatch) storeUrl = urlMatch[1];

      if (/shopify/i.test(lower)) platform = "Shopify";
      else if (/woocommerce|wordpress/i.test(lower)) platform = "WooCommerce";
      else if (/magento/i.test(lower)) platform = "Magento";
      else if (/headless|next\.?js/i.test(lower)) platform = "Headless Next.js";

      if (/perfume|fragrance|scent|attar|cologne/i.test(lower)) industry = "perfume & fragrance";
      else if (/fashion|apparel|clothing|dress|wear|garment/i.test(lower)) industry = "fashion & apparel";
      else if (/skin|skincare|cosmetic|beauty|serum/i.test(lower)) industry = "skincare & cosmetics";
      else if (/jewel|jewelry|jewellery|luxury/i.test(lower)) industry = "jewelry & luxury";
      else if (/supplement|nutrition|health|wellness/i.test(lower)) industry = "health & wellness";

      if (/slow|speed|load|lcp|pagespeed/i.test(lower)) painPoint = "slow storefront speeds";
      else if (/abandon|dropoff|drop off|cart/i.test(lower)) painPoint = "cart abandonment";
      else if (/rto|return to origin|fake order|cod/i.test(lower)) painPoint = "COD return-to-origin rates";
      else if (/support|enquir|ticket|customer service/i.test(lower)) painPoint = "customer support volume";
      else if (/tracking|ad blocker|pixel|capi/i.test(lower)) painPoint = "signal loss & conversion tracking";

      const t = detectTopic(m.content);
      if (t) activeTopic = t;
    } else if (m.role === "assistant") {
      if (/audit|benchmark/i.test(lower)) lastAssistantOffer = "audit";
      else if (/rag|catalog/i.test(lower)) lastAssistantOffer = "rag";
      else if (/sprint|engagement/i.test(lower)) lastAssistantOffer = "sprint";
      else if (/whatsapp/i.test(lower)) lastAssistantOffer = "whatsapp";
      else if (/email|klaviyo/i.test(lower)) lastAssistantOffer = "email";

      const t = detectTopic(m.content);
      if (t && t !== "general") activeTopic = t;
    }
  }

  const userMessages = messages.filter(m => m.role === "user");
  const lastUserMsgObj = userMessages[userMessages.length - 1];
  if (lastUserMsgObj?.replyTo?.text) {
    repliedTopic = detectTopic(lastUserMsgObj.replyTo.text);
  }

  return {
    activeTopic,
    platform,
    industry,
    painPoint,
    storeUrl,
    lastAssistantOffer,
    repliedTopic
  };
}

/**
 * Intelligent contextual fallback engine.
 * Synthesizes active topics, user platform/industry, prior turns, and intent.
 */
async function simulateStudioResponse(
  messages: ChatMessage[],
  onChunk: (chunk: string, accumulated: string) => void,
  onComplete?: (fullText: string) => void
): Promise<void> {
  const userMessages = messages.filter(m => m.role === "user");
  const lastUserObj = userMessages[userMessages.length - 1];
  const lastUserMsg = (lastUserObj?.content || "").trim().toLowerCase();

  let reply = "";

  // 1. Initial Greeting
  if (/^(hi|hello|hey|greetings|hola|good\s+(morning|afternoon|evening)|yo|sup)\b/i.test(lastUserMsg)) {
    reply = `Hello! Welcome to **Kavirox**. We are a product-led technology company based at AIC-GBU, Greater Noida.

We build digital products (like **Rakshak Setu**, **GBU One**, and **GBU SDMS**) and deliver software, AI, automation, and cybersecurity solutions.

How can I help you today? You can ask about our products, our 4 ways of working, or our engineering services.`;
  }
  // 2. What products do you build / Products inquiry
  else if (/(what products|which products|products do you build|tell me about products|portfolio|show me products|what do you make|what do you build|list products|your products)/i.test(lastUserMsg)) {
    reply = `At **Kavirox**, our product portfolio includes:

• **Rakshak Setu** *(Prototype)*: On-device voice shield countering AI voice cloning and phone-scam impersonation during live calls.
• **GBU One & Admin** *(Built & Device-Tested)*: Offline-first student companion app with timetables, attendance battery, PYQs, and PIN-gated admin console.
• **GBU SDMS** *(Deployed & Active)*: Role-based platform for university student records, session attendance, and academic administration.
• **Study Hub AI** *(Campus Pilot)*: WhatsApp and Telegram study assistant answering directly from verified university syllabus and past papers.
• **FitFuel** *(In Development)*: Mobile-first calorie and workout tracker keeping core tools free.
• **Try-Out** *(In Development)*: Virtual fashion try-on experience for visual exploration.
• **LAPS One** *(In Development)*: Centralized event management platform for track and stage scheduling.

Which product would you like to know more about?`;
  }
  // 3. How can we work together / Ways to work
  else if (/(how can we work|ways to work|work together|how to work with you|engagement models?|ways to start|four ways)/i.test(lastUserMsg)) {
    reply = `We offer **Four Clear Ways to Start** working with us:

1. **Ready-Built Product**: Choose an existing Kavirox product that addresses your need. We provide transparent scope, setup, limits, and pricing.
2. **Product Implementation**: We configure the system, onboard users, connect data, set permissions, and train your team.
3. **Custom Development**: For needs no off-the-shelf product covers: custom web apps, mobile apps, SaaS platforms, and APIs.
4. **Product Plus Custom Extension**: Start from an existing product and commission custom integrations or dedicated modules.

Would you like to discuss a project under one of these models?`;
  }
  // 4. Specific product: Rakshak Setu
  else if (/rakshak\s*setu/i.test(lastUserMsg)) {
    reply = `**Rakshak Setu** is an on-device cybersecurity voice shield (SIH 2026 project by Team Forge Labs at Gautam Buddha University):

• **Threat Detection**: Listens locally for AI voice cloning and pressure scam scripts.
• **Privacy by Design**: Raw call audio is processed entirely in memory on-device and never stored or sent to the cloud.
• **Features**: Live threat HUD during calls, forensic evidence records, URL/QR scanners, and a 1930 NCRP reporting co-pilot.`;
  }
  // 5. Specific product: GBU SDMS
  else if (/(gbu[\s-]sdms|sdms|student data management)/i.test(lastUserMsg)) {
    reply = `**GBU SDMS** is a deployed, role-based platform for institutional student records and administration:

• **Five Access Roles**: Administrator, Chairperson, Coordinator, Faculty, and Student.
• **Key Capabilities**: Digital attendance logging with timestamp and session locking, bulk Excel roster imports, faculty load allocation, and comprehensive audit trails.
• **Tech Stack**: PostgreSQL, Role-Based Security, TypeScript, and REST APIs.`;
  }
  // 6. Specific product: GBU One
  else if (/gbu[\s-]one/i.test(lastUserMsg)) {
    reply = `**GBU One** is an offline-first student companion app for Gautam Buddha University:

• **Student Features**: Smart timetables with next-class countdowns, official notices with offline PDF caching, previous-year question papers (PYQs), and attendance battery monitoring.
• **Admin Console**: PIN-gated console for university coordinators to publish notices and push instant updates.
• **Tech Stack**: React Native / Expo, TypeScript, SQLite offline cache, and Supabase.`;
  }
  // 7. Specific product: Study Hub AI
  else if (/study\s*hub/i.test(lastUserMsg)) {
    reply = `**Study Hub AI** is a campus study assistant living where students already are:

• **Native Messaging**: Accessible directly via WhatsApp and Telegram bots with no extra apps required.
• **Grounded Answers**: Retrieves verified answers strictly from university syllabus files, exam patterns, and past papers.
• **Resilient Infrastructure**: Multi-provider AI routing with automated fallback for 99.9% uptime.`;
  }
  // 8. Services inquiry
  else if (/(what services|services do you deliver|services do you offer|what can you do|capabilities)/i.test(lastUserMsg)) {
    reply = `We deliver focused engineering services across:

• **AI & Automation**: Custom RAG assistants, internal automation workflows, and local on-device ML.
• **Mobile App Development**: High-performance offline-first iOS and Android applications.
• **Web & Cloud Engineering**: Fast, modern web applications, scalable backends, and API integrations.
• **Cybersecurity**: Role-based access governance, tamper-proof audit trails, and security audits.

Tell us what your business is aiming to build, and we'll outline a tailored roadmap!`;
  }
  // 9. Pricing & Timeline
  else if (/(price|pricing|cost|how much|rate|budget|quote|timeline|how long)/i.test(lastUserMsg)) {
    reply = `We provide clear, honest pricing with zero hidden retainers:

• **Ready-Built Products**: Transparent licensing or fixed setup fees based on required scope.
• **Project Sprints**: Fixed-scope development sprints (2–6 weeks) with weekly preview milestones.
• **Custom Solutions**: Structured milestone-based quotes with full architecture transparency.

Click the email button below or write to **info@kavirox.space** to receive a tailored estimate for your project!`;
  }
  // 10. General Company & Location
  else if (/(who are you|where are you|location|office|greater noida|aic|aic-gbu)/i.test(lastUserMsg)) {
    reply = `**Kavirox** is a product-led technology company with services, proudly incubated at **AIC-GBU (Atal Incubation Centre, Gautam Buddha University)**, Greater Noida, India.

Our team designs, engineers, and operates digital products that solve real problems. Reach us anytime at **info@kavirox.space**.`;
  }
  // 11. Default fallback
  else {
    reply = `I would be happy to help! At **Kavirox**, we build products like **Rakshak Setu**, **GBU One**, and **GBU SDMS**, and deliver software, AI, and cybersecurity services.

Feel free to ask about any specific product, our 4 ways of working, or click below to start a direct inquiry with our engineering team!`;
  }

  // Stream reply with human-like pace
  const chunks = reply.match(/.{1,14}/g) || [reply];
  let accumulated = "";

  for (let i = 0; i < chunks.length; i++) {
    await new Promise(r => setTimeout(r, 18));
    accumulated += chunks[i];
    onChunk(chunks[i], accumulated);
  }

  if (onComplete) {
    onComplete(accumulated);
  }
}


