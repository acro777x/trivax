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
    reply = `Hello! Welcome to **Kavirox**. I'm your studio assistant. 

We help direct-to-consumer (D2C) brands build sub-second e-commerce stores, deploy custom RAG chatbots, automate WhatsApp commerce, and scale repeat revenue.

How can I help you today? Feel free to ask about:
• **Our 11 core services** (Shopify, speed, WhatsApp, Klaviyo, SEO)
• **Custom RAG Chatbots** trained on your products
• **Our 3 engagement models & pricing**
• **Starting a project** with our engineering squad`;
  }
  // 2. Specific RAG & AI Chatbots (Only when user explicitly asks about bots/AI/RAG)
  else if (
    query.includes("rag") ||
    query.includes("chatbot") ||
    (query.includes("bot") && !query.includes("both")) ||
    query.includes("assistant") ||
    query.includes("vector") ||
    query.includes("hallucination")
  ) {
    reply = `At Kavirox, we engineer **Custom RAG (Retrieval-Augmented Generation) Chatbots** specifically tailored for consumer and D2C brands:

• **Zero Hallucinations**: Answers are strictly grounded in your verified product catalog, ingredients, FAQ, sizing, and shipping policies.
• **1-Click Cart Generation**: Conversational product finders recommend the right variant and generate direct checkout links.
• **Omnichannel Deployment**: Embedded directly on your Shopify/headless storefront or connected to the official WhatsApp Business Platform.
• **Autonomous Support**: Handles 70%+ of customer enquiries regarding order status, returns, ingredients, and delivery tracking.

Would you like to explore building a RAG bot for your brand? You can click the email button below to open our pre-written inquiry brief!`;
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
    reply = `We provide 3 transparent, flexible **engagement models** depending on your brand's growth stage:

1. **Project-Based Sprint**: Fixed scope and clear deliverables (typically 2 to 6 weeks). Ideal for new store builds, speed overhauls, or custom RAG chatbot rollouts.
2. **Dedicated Growth Team**: An ongoing monthly engineering squad embedded with your team for continuous store features, weekly sprints, and speed maintenance.
3. **Technical Advisory & Support**: On-demand system audits, uptime assurance, and senior technical guidance.

Every project includes direct engineer communication on Slack/email, transparent code commits, and zero agency markups. To get an exact estimate for your scope, click the button below to send us a quick project brief!`;
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
    reply = `Our delivery timelines are built around agile, rapid-iteration cycles:

• **Project Sprints**: Most store launches, redesigns, and custom RAG bot deployments are delivered within **2 to 6 weeks**.
• **Immediate Milestones**: Phase 1 (Discovery & Architecture) is finalized in Week 1, followed by weekly preview builds.
• **Transparent Progress**: You get direct visibility into staging environments and code commits throughout the build.

Do you have a specific target launch date in mind?`;
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
    reply = `Our **Website Development & Performance** engineering focuses on sub-second loads and conversion-driven UI:

• **Sub-Second Speeds**: We optimize critical rendering paths, minify assets, lazy-load scripts, and eliminate app bloat to hit Core Web Vitals targets (LCP < 1.2s).
• **Shopify & Liquid**: Custom Liquid sections, dynamic bundling, interactive ingredient calculators, and mobile-first checkout flows.
• **Headless Architectures**: High-performance Next.js storefronts paired with Shopify Storefront API for instant page transitions.
• **Structured Schema**: Clean semantic HTML and JSON-LD structured data for rich Google search previews.

Would you like a complimentary speed and performance audit for your current store?`;
  }
  // 6. WhatsApp Commerce & Cart Recovery
  else if (
    query.includes("whatsapp") ||
    query.includes("abandoned cart") ||
    query.includes("cart recovery") ||
    query.includes("meta cloud")
  ) {
    reply = `With **WhatsApp Conversational Commerce**, we turn WhatsApp into a high-converting sales and retention channel:

• **Meta Cloud API Integration**: Direct integration with the official WhatsApp Business Platform.
• **Automated Cart Recovery**: Multi-stage recovery sequences that remind shoppers about abandoned carts with 1-click buy links.
• **Order Tracking & Notifications**: Real-time dispatch, transit, and delivery updates sent straight to customers' WhatsApp chats.
• **Interactive Product Discovery**: Guided product finders directly inside WhatsApp for conversational buying.
• **Human Concierge Handoff**: Smooth escalation to your team for VIP queries.`;
  }
  // 7. Email & Retention Automation (Klaviyo)
  else if (
    query.includes("email") ||
    query.includes("klaviyo") ||
    query.includes("retention") ||
    query.includes("lifecycle") ||
    query.includes("crm")
  ) {
    reply = `Our **Email & Retention Automation** creates automated lifecycle communication that boosts Repeat Purchase Rate (RPR) and Lifetime Value (LTV):

• **Welcome Series**: High-converting storytelling and first-order incentives.
• **Checkout & Browse Abandonment**: Behavioral email triggers tailored to the exact products viewed.
• **Post-Purchase Care**: Usage tips, review collection (UGC), and complementary replenishment reminders.
• **VIP & Win-Back Flows**: Automated segmentation identifying churn risks and loyal brand advocates.`;
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
    reply = `Our **Payments & Checkout Flow** engineering ensures checkout is frictionless and secure:

• **Frictionless UPI & Cards**: 1-click UPI deep-links (GPay, PhonePe, Paytm) and Razorpay/Cashfree optimization.
• **COD Verification**: Automated OTP or WhatsApp verification on Cash on Delivery orders to significantly reduce RTO (Return to Origin) losses.
• **Payment Failure Recovery**: Automated recovery triggers when a customer faces bank or network payment drops.
• **Logistics API Sync**: Webhooks connecting Shiprocket, Delhivery, and fulfillment partners.`;
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
    reply = `Our **Customer Data, CRM & Telemetry** setup fixes signal loss and delivers clear BI insights:

• **Meta Conversions API (CAPI)**: Server-side tracking that bypasses browser ad-blockers and iOS privacy restrictions.
• **GA4 E-Commerce Events**: Granular tracking on product views, add-to-cart, checkout stages, and conversion paths.
• **Executive Looker Dashboards**: Live dashboards tracking AOV, CAC, repeat rate, conversion rate, and revenue per channel.`;
  }
  // 10. General Services Overview
  else if (
    query.includes("service") ||
    query.includes("what do you do") ||
    query.includes("what can you do") ||
    query.includes("capabilities") ||
    query.includes("offer")
  ) {
    reply = `Kavirox provides **11 core engineering & growth service lines** across 4 main pillars:

1. **Commerce & Storefront**: Store UX, sub-second Shopify/Next.js development, interactive guided finders.
2. **Conversational & Automation**: Official WhatsApp commerce, abandoned cart recovery, Klaviyo email lifecycle.
3. **Payments & Fulfillment**: UPI deep-linking, COD verification to cut RTO, logistics API sync.
4. **Data & AI Systems**: Custom RAG chatbots, server-side Meta CAPI, GA4, and automated n8n workflows.

Which area is your brand currently focusing on?`;
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
    reply = `**Kavirox** is a technology and e-commerce studio incubated at **GBU Incubation, Greater Noida, India**.

We are a hands-on squad of software engineers, e-commerce architects, and growth technologists. We work directly with consumer brands without account managers or agency bureaucracy—delivering clean code, direct Slack communication, and daily progress.

Would you like to discuss how we can support your brand?`;
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
    reply = `We'd love to partner with you! Getting started is quick and straightforward:

• **Direct Email**: info@kavirox.space
• **Location**: GBU Incubation, Greater Noida, India
• **Interactive Project Brief**: Click the button below to launch our formatted email brief in Gmail Web with your options pre-filled!

We typically respond within 24 hours with an initial scope review.`;
  }
  // 13. Natural Follow-Up / Acknowledgement ("yes", "sure", "tell me more", "sounds good", "continue", "okay")
  else if (
    /^(yes|yeah|yep|sure|tell me more|sounds good|continue|okay|ok|cool|go ahead|first one|second one|sprint)\b/i.test(lastUserMsg)
  ) {
    if (lastAssistantMsg.includes("engagement models") || lastAssistantMsg.includes("sprint")) {
      reply = `Our **Project-Based Sprint** is our most popular starting engagement:

• **Duration**: 2 to 6 weeks with clearly defined milestones.
• **Scope**: Custom storefront build, speed optimization, or RAG chatbot deployment.
• **Deliverables**: Tested production code, daily commits, staging previews, and 30 days of post-launch warranty.

Would you like to share a few details about your current store so we can prepare a sprint proposal?`;
    } else if (lastAssistantMsg.includes("rag") || lastAssistantMsg.includes("chatbot")) {
      reply = `To deploy a **Custom RAG Chatbot** for your store, here is our 3-step rollout:

1. **Catalog Ingestion**: We ingest your product catalog, ingredients, FAQ, and store policies into a dedicated vector database.
2. **Grounding & Guardrails**: We calibrate prompt boundaries so the model strictly cites your products with zero hallucinations.
3. **Integration**: We embed the chat widget into your storefront or connect it to your WhatsApp Cloud API.

Would you like to schedule an initial architecture session? Click the email brief button below!`;
    } else {
      reply = `Great! What specific aspect of your store or brand would you like to focus on first? 

We can dive into **Shopify speed optimization**, **custom RAG chatbots**, **WhatsApp cart recovery**, or **our project sprint pricing**.`;
    }
  }
  // 14. Default Intelligent Fallback
  else {
    reply = `I'd be glad to help with that! At **Kavirox**, we specialize in engineering high-performance online stores and AI automation for consumer brands.

Here are the most common things we help founders and teams with:
• **Building & Optimizing Storefronts**: Sub-second speeds on Shopify or Headless Next.js.
• **Custom RAG AI Chatbots**: 24/7 product advisors trained strictly on your brand's catalog.
• **WhatsApp Commerce**: Automated cart recovery and customer order updates.
• **Sprint Pricing & Timelines**: Clear 2 to 6 week fixed-scope deliverables.

Feel free to ask a specific question, or click the button below to email our engineering team directly!`;
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
