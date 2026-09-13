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
  const context = analyzeConversationContext(messages);
  const userMessages = messages.filter(m => m.role === "user");
  const lastUserObj = userMessages[userMessages.length - 1];
  const lastUserMsg = (lastUserObj?.content || "").trim().toLowerCase();

  // Determine target topic
  const explicitTopicInCurrentQuery = detectTopic(lastUserMsg);
  const targetTopic: TopicType = 
    explicitTopicInCurrentQuery || 
    context.repliedTopic || 
    context.activeTopic || 
    "general";

  let reply = "";

  // 1. Initial Greeting vs Mid-Chat Greeting
  if (/^(hi|hello|hey|greetings|hola|good\s+(morning|afternoon|evening)|yo|sup)\b/i.test(lastUserMsg)) {
    if (userMessages.length <= 1) {
      reply = `Hello! Welcome to **Kavirox**. We engineer sub-second e-commerce stores, custom RAG chatbots, and WhatsApp automation for consumer brands.

How can I help you today?`;
    } else {
      reply = `Hey there! How can I assist with your store or project today? Feel free to ask about our services, RAG chatbots, or sprint pricing.`;
    }
  }
  // 2. Affirmative Responses & Confirmations ("yes", "sure", "tell me more", "sounds good", "continue")
  else if (/^(yes|yeah|yep|sure|tell me more|sounds good|continue|okay|ok|cool|go ahead|definitely|why not|lets do it|let's do it|please do|first one|second one)\b/i.test(lastUserMsg)) {
    if (context.lastAssistantOffer === "audit") {
      reply = `Awesome! What is your store website link or brand name? We'll run a complimentary speed and UX benchmark to pinpoint your biggest drop-offs.`;
    } else if (context.lastAssistantOffer === "rag" || targetTopic === "rag") {
      reply = `Great! To give you a tailored scoping overview:
• Are you currently on Shopify or another platform?
• Roughly how many products or SKUs are in your catalog?

Feel free to reply here, or click the email button below to open our pre-written brief!`;
    } else if (context.lastAssistantOffer === "whatsapp" || targetTopic === "whatsapp") {
      reply = `To launch WhatsApp commerce, we set up official Meta Cloud API webhooks for cart recovery and order tracking. Would you like a sprint proposal for your store?`;
    } else if (context.lastAssistantOffer === "sprint" || targetTopic === "pricing") {
      reply = `Our **Project Sprints** run for 2–6 weeks with fixed deliverables and weekly preview builds. Click the button below to launch our formatted email brief with your scope pre-filled!`;
    } else if (targetTopic === "speed") {
      reply = `For speed tuning, we benchmark your current LCP, minify heavy assets, and optimize theme liquid code. Want to share your store link?`;
    } else {
      reply = `Glad to hear! What specific detail would you like to explore next—timelines, pricing, or technical rollout?`;
    }
  }
  // 3. User Shared a Store URL
  else if (context.storeUrl && lastUserMsg.includes(context.storeUrl.toLowerCase())) {
    reply = `Thanks for sharing **${context.storeUrl}**! Our engineering squad can review your storefront speed, UX bottlenecks, and RAG bot readiness.

Click the email button below to send us a quick inquiry, and we'll reply with a detailed review within 24 hours!`;
  }
  // 4. Pricing & Rates Intent
  else if (/(price|pricing|cost|how much|rate|rates|budget|quote|fees?|expensive|charge)\b/i.test(lastUserMsg)) {
    if (targetTopic === "rag") {
      reply = `For a **Custom RAG Chatbot**, we deploy under a fixed **Project Sprint** (typically 2 to 3 weeks):

• **Includes**: Vector catalog ingestion, zero-hallucination guardrails, storefront chat widget, and optional WhatsApp sync.
• **Pricing**: Flat sprint fee with no recurring agency retainers or hidden markups.

Click below to get an exact estimate based on your catalog size!`;
    } else if (targetTopic === "speed") {
      reply = `For **Store Speed & Core Web Vitals Optimization**, we execute a focused **2-week Sprint**:

• **Includes**: Eliminating app bloat, deferring scripts, optimizing critical rendering paths, and hitting LCP < 1.2s.
• **Pricing**: Fixed-scope flat fee with guaranteed performance targets.

Click below to request a complimentary initial audit and quote!`;
    } else if (targetTopic === "whatsapp") {
      reply = `For **WhatsApp Conversational Commerce**:

• **Sprint Setup** (1–2 weeks): Meta Cloud API onboarding, cart recovery workflows, and shipping webhook triggers.
• **Pricing**: Flat setup fee. WhatsApp message costs are billed directly by Meta at base wholesale rates with zero markup.

Click below to get a quote based on your monthly order volume!`;
    } else if (targetTopic === "email") {
      reply = `For **Klaviyo Email & Retention Automation**:

• **Sprint Scope** (2–3 weeks): 5 core lifecycle flows (Welcome, browse abandonment, checkout abandonment, replenishment, win-back).
• **Pricing**: Fixed project sprint with custom responsive email templates.

Click below to get started!`;
    } else {
      reply = `We provide 3 flexible **engagement models**:

1. **Project Sprint** (2–6 wks): Fixed scope for new builds, speed overhauls, or RAG bots.
2. **Dedicated Squad**: Ongoing monthly engineering embedded with your team.
3. **Technical Advisory**: On-demand audits, performance tuning, and architecture reviews.

Click below to send us a quick project brief for an exact quote!`;
    }
  }
  // 5. Timeline & Delivery Duration Intent
  else if (/(how long|timeline|duration|how fast|timeframe|turnaround|how many (weeks|days)|when can|deadline)\b/i.test(lastUserMsg)) {
    if (targetTopic === "rag") {
      reply = `A **Custom RAG Chatbot** rollout takes **2 to 3 weeks**:

• **Week 1**: Ingest catalog, FAQs, and policies into vector database + set guardrails.
• **Week 2**: Front-end widget integration and simulated test queries.
• **Week 3**: Live deployment, staff verification, and optional WhatsApp connection.`;
    } else if (targetTopic === "speed") {
      reply = `A **Store Speed Overhaul** is delivered in **1 to 2 weeks**:

• **Days 1–3**: Comprehensive theme code audit and render-blocking script diagnosis.
• **Days 4–8**: Asset compression, script deferral, and staging testing.
• **Days 9–10**: Production rollout and live Core Web Vitals validation (LCP < 1.2s).`;
    } else if (targetTopic === "whatsapp") {
      reply = `A complete **WhatsApp Commerce & Cart Recovery** setup takes **1 to 2 weeks**, including Meta Cloud API onboarding and live webhook triggers.`;
    } else {
      reply = `Our delivery timelines are fast and agile:

• **Project Sprints**: Store builds and RAG bots launch within **2 to 6 weeks**.
• **Weekly Milestones**: Architecture in Week 1, followed by weekly preview builds and staging access.`;
    }
  }
  // 6. How It Works / Process Intent
  else if (/(how (does it|do you|would that) work|process|steps|rollout|how do you (do|build|deploy|train)|workflow)\b/i.test(lastUserMsg)) {
    if (targetTopic === "rag") {
      reply = `Here is how your **RAG Chatbot** operates:

1. **Vector Ingestion**: We ingest your verified products, ingredients, shipping terms, and FAQs into a dedicated vector store.
2. **Semantic Retrieval**: When a shopper asks a question, the model retrieves verified passages—strictly preventing hallucinations.
3. **1-Click Cart**: The bot recommends exact matching products and generates 1-click checkout links.
4. **Multi-Channel**: Runs directly on your storefront or official WhatsApp.`;
    } else if (targetTopic === "speed") {
      reply = `Our speed optimization process is surgical:

1. **Telemetry Audit**: Profile real-user metrics (LCP, INP, CLS) and pinpoint script bottlenecks.
2. **Code Pruning**: Strip residual code from uninstalled apps and optimize liquid loops.
3. **Asset Optimization**: Responsive WebP/AVIF images and zero-render-blocking fonts.
4. **Verification**: Live benchmarks across mobile and desktop.`;
    } else if (targetTopic === "whatsapp") {
      reply = `Here is how WhatsApp Cart Recovery works:

1. **Webhook Trigger**: When a checkout is abandoned, Shopify instantly signals our automation pipeline.
2. **Smart Timing**: A personalized WhatsApp message is sent with the customer's exact items and a 1-click buy link.
3. **Order Updates**: Automatically sends tracking alerts upon dispatch.`;
    } else {
      reply = `We work in structured 6-phase engineering lifecycles:

• **01 Discovery** → **02 UX & Architecture** → **03 Rapid Sprint** → **04 QA Testing** → **05 Production Launch** → **06 Continuous Growth**.

Every project includes direct Slack access to your lead engineer.`;
    }
  }
  // 7. Tech Stack & Tools Intent
  else if (/(tech stack|technologies|what tools|framework|what language|database|infrastructure|libraries)\b/i.test(lastUserMsg)) {
    if (targetTopic === "rag") {
      reply = `Our **RAG Chatbot** tech stack:

• **Vector DB**: Pinecone / Qdrant with high-dimensional embeddings.
• **LLM Core**: Fast, reliable models tuned with strict temperature boundaries.
• **Widget**: Lightweight React / TypeScript component (<28KB) with zero storefront lag.
• **Messaging**: Meta Cloud API for official WhatsApp integration.`;
    } else if (targetTopic === "speed" || targetTopic === "shopify") {
      reply = `Our **Engineering Stack** includes:

• **Storefronts**: Custom Shopify Liquid, Headless Next.js, React, TypeScript, Tailwind CSS.
• **Performance**: Lighthouse CI, WebPageTest, Shopify Storefront API, GraphQL.
• **Automation**: n8n, Cloudflare Workers, Node.js microservices.`;
    } else {
      reply = `Our core technology stack spans:

• **Commerce**: Shopify, Liquid, Next.js, React, Tailwind CSS.
• **AI & RAG**: Vector embeddings, Pinecone/Qdrant, LLM APIs.
• **Automation**: Meta Cloud API (WhatsApp), Klaviyo, n8n, Webhooks.
• **Data**: Meta CAPI, GA4, Looker Studio.`;
    }
  }
  // 8. Integrations & Compatibility Intent
  else if (/(integrate|integration|compatible|work with|connect to|connect with|support|supports|api|hook up|sync with)\b/i.test(lastUserMsg)) {
    if (/whatsapp/i.test(lastUserMsg)) {
      reply = `Yes! We integrate directly with the **official WhatsApp Business API (Meta Cloud API)**. Your RAG chatbot or cart recovery automations run natively inside WhatsApp with verified green-tick support.`;
    } else if (/shopify/i.test(lastUserMsg)) {
      reply = `Yes! Shopify is our primary specialty. We build custom Liquid sections, headless Next.js frontends, and integrate with the Shopify Storefront & Admin APIs.`;
    } else if (/woocommerce|wordpress/i.test(lastUserMsg)) {
      reply = `Yes, we support WooCommerce stores via REST APIs and webhooks for speed optimization, RAG bot deployment, and WhatsApp messaging.`;
    } else if (/payment|razorpay|upi|cod/i.test(lastUserMsg)) {
      reply = `Yes! We deeply integrate with Razorpay, Cashfree, and UPI deep-links, plus automated COD OTP verification to drastically reduce RTO.`;
    } else if (/klaviyo/i.test(lastUserMsg)) {
      reply = `Yes! We build automated Klaviyo flows, RFM behavioral segmentations, and dynamic catalog feeds synced with your storefront.`;
    } else {
      reply = `Yes! We connect your storefront with all major e-commerce platforms and APIs, including Shopify, WhatsApp Cloud API, Klaviyo, Razorpay, and Shiprocket.`;
    }
  }
  // 9. Accuracy & Hallucination Intent
  else if (/(hallucinat|accurate|accuracy|mistake|wrong|error|reliable|safe|security|privacy|data safety)\b/i.test(lastUserMsg)) {
    reply = `Our RAG chatbots are engineered with **strict zero-hallucination guardrails**:

• The AI is strictly bounded to your verified product catalog, ingredients, and store policies.
• If information isn't in your knowledge base, it politely offers to connect the shopper with human support instead of guessing.
• Your private brand data is never used for public model training.`;
  }
  // 10. Recommendations & Where to Start Intent
  else if (/(which (one|should|is better)|recommend|difference between|compare|where should (i|we) start|what do you suggest)\b/i.test(lastUserMsg)) {
    if (context.painPoint?.includes("speed")) {
      reply = `Given your speed bottlenecks, we recommend starting with a **2-Week Speed Overhaul Sprint**—sub-second speeds immediately lift your conversion rate before scaling ad spend.`;
    } else if (context.painPoint?.includes("cart")) {
      reply = `Given your cart abandonment, we recommend deploying our **WhatsApp Cart Recovery & 1-Click Checkout Sprint** to immediately recover 15–25% of dropped shoppers.`;
    } else {
      reply = `For most growing brands, a **2 to 3-week Project Sprint** is the best starting point. It provides a fixed scope and guaranteed deliverables with zero ongoing retainers. Which area is your primary focus?`;
    }
  }
  // 11. Explicit Topic Triggers (User specifically inquiring about a domain)
  else if (explicitTopicInCurrentQuery === "rag") {
    reply = `We engineer **Custom RAG Chatbots** tailored to your store:

• **Zero Hallucinations**: Grounded strictly in your products, ingredients, and FAQs.
• **Instant Cart Links**: Recommends products and generates checkout links.
• **Multi-Channel**: Embedded on your storefront or official WhatsApp.

Click the email button below to explore a custom bot for your brand!`;
  } else if (explicitTopicInCurrentQuery === "speed") {
    reply = `Our **Website Development & Performance** engineering delivers sub-second loads:

• **Speed Tuning**: Core Web Vitals optimization (LCP < 1.2s), script cleanup, and zero bloat.
• **Custom Shopify & Headless**: Custom Liquid sections or high-performance Next.js stores.

Would you like a complimentary store audit?`;
  } else if (explicitTopicInCurrentQuery === "whatsapp") {
    reply = `Our **WhatsApp Commerce** turns WhatsApp into a reliable sales channel:

• **Cart Recovery**: Automated sequences with 1-click checkout links.
• **Order Tracking**: Real-time dispatch and delivery status updates.
• **Guided Shopping**: Conversational product finders inside WhatsApp.`;
  } else if (explicitTopicInCurrentQuery === "email") {
    reply = `Our **Email & Retention Automation** boosts repeat orders:

• **Automated Flows**: Welcome series, browse abandonment, and cart recovery.
• **Post-Purchase**: Replenishment reminders and UGC review collection.`;
  } else if (explicitTopicInCurrentQuery === "payments") {
    reply = `Our **Payments & Checkout Flow** engineering cuts drop-offs and RTO:

• **1-Click UPI & Cards**: Optimized Razorpay, Cashfree, and UPI deep-links.
• **COD Verification**: Automated OTP/WhatsApp verification to prevent bogus orders.`;
  } else if (explicitTopicInCurrentQuery === "analytics") {
    reply = `Our **Data & Analytics** setup fixes signal loss:

• **Meta CAPI**: Server-side conversion tracking bypassing ad blockers.
• **GA4 & BI Dashboards**: Granular e-commerce funnel tracking and Looker dashboards.`;
  } else if (explicitTopicInCurrentQuery === "seo") {
    reply = `Our **SEO & Content Engineering** builds long-term organic authority:

• **Technical Audits**: Fix crawl errors, canonical tags, and mobile usability.
• **Rich Schema**: JSON-LD structured data for rich Google product cards.`;
  } else if (explicitTopicInCurrentQuery === "team") {
    reply = `**Kavirox** is a digital engineering studio incubated at **GBU Incubation, Greater Noida, India**.

We are a hands-on squad of software engineers working directly with brands with daily Slack updates and zero agency overhead.`;
  }
  // 12. General Services Overview Intent
  else if (/(service|what do you do|what can you do|capabilities|offer)\b/i.test(lastUserMsg)) {
    reply = `Kavirox provides **11 core engineering services** across:

• **Commerce & Storefront**: Sub-second Shopify / Next.js builds.
• **Data & AI Systems**: Custom RAG chatbots and analytics.
• **Automation**: WhatsApp commerce, cart recovery, and n8n workflows.
• **Checkout & Security**: UPI deep-links, COD verification, and audit standards.`;
  }
  // 13. Contact & Hiring Intent
  else if (/(contact|start|hire|work with|call|reach out|touch|proposal)\b/i.test(lastUserMsg)) {
    reply = `Ready to build? Getting started is straightforward:

• **Email**: info@kavirox.space
• **Location**: GBU Incubation, Greater Noida, India
• **Interactive Brief**: Click the button below to launch our pre-written project brief in Gmail!`;
  }
  // 14. Intelligent Context-Aware Fallback
  else {
    if (targetTopic === "rag") {
      reply = `Regarding your **RAG Chatbot**, we calibrate the system to your verified catalog, policies, and FAQs.

Would you like to explore **pricing**, **rollout timelines**, or see how it connects to **WhatsApp**?`;
    } else if (targetTopic === "speed") {
      reply = `Regarding **Store Speed & Performance**, our goal is hitting sub-1.2s LCP on mobile without breaking existing apps.

Would you like a complimentary speed audit for your store URL?`;
    } else if (targetTopic === "whatsapp") {
      reply = `Regarding **WhatsApp Commerce**, we automate cart recovery and customer order updates via Meta Cloud API.

Would you like to see how the recovery sequence operates?`;
    } else if (targetTopic === "shopify" || context.platform === "Shopify") {
      reply = `For your **Shopify storefront**, we can optimize speed, build custom Liquid sections, or deploy a RAG shopping assistant.

What specific challenge is your brand facing right now?`;
    } else if (targetTopic === "pricing") {
      reply = `For our **Engagement Models**, you can choose between a fixed **Project Sprint** or a **Dedicated Squad**.

Would you like a breakdown of what's included in a sprint?`;
    } else {
      reply = `At **Kavirox**, we help consumer brands engineer faster online stores, custom RAG chatbots, and automated customer messaging.

Feel free to ask a specific question, or click below to email our engineering squad!`;
    }
  }

  // Simulate streaming typing effect
  let accumulated = "";
  const words = reply.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i] + (i < words.length - 1 ? " " : "");
    accumulated += word;
    onChunk(word, accumulated);
    await new Promise(r => setTimeout(r, 20));
  }

  if (onComplete) onComplete(accumulated);
}
