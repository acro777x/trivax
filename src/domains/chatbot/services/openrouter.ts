import { ChatMessage, OpenRouterModelOption } from "../types";
import { buildStudioSystemPrompt } from "../knowledge/studio-knowledge";

export const OPENROUTER_FREE_MODELS: OpenRouterModelOption[] = [
  {
    id: "nvidia/nemotron-3.5-super-vl:free",
    name: "NVIDIA Nemotron 3.5 Super VL",
    description: "High-accuracy multimodal & reasoning model (Verified Free)",
    isFree: true,
    tag: "Recommended"
  },
  {
    id: "openrouter/free",
    name: "OpenRouter Free Router",
    description: "Automatically routes to the fastest currently available free model",
    isFree: true,
    tag: "Auto Fallback"
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct:free",
    name: "Meta Llama 3.3 70B",
    description: "High-intelligence reasoning & conversation (Free Tier)",
    isFree: true,
    tag: "High Quality"
  },
  {
    id: "google/gemini-2.0-flash-exp:free",
    name: "Gemini 2.0 Flash",
    description: "Next-gen ultra-fast multimodal & reasoning (Free Tier)",
    isFree: true,
    tag: "Fast"
  },
  {
    id: "nvidia/nemotron-3.5-lightning:free",
    name: "NVIDIA Nemotron 3.5 Lightning",
    description: "Ultra-fast response with high reasoning accuracy",
    isFree: true,
    tag: "Fastest"
  },
  {
    id: "mistralai/mistral-7b-instruct:free",
    name: "Mistral 7B Instruct",
    description: "Balanced efficiency & code logic (Free Tier)",
    isFree: true
  }
];

export const DEFAULT_FREE_MODEL = "nvidia/nemotron-3.5-super-vl:free";
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
 * 1. Calls Cloudflare Worker proxy at /api/chat.
 * 2. If client has API key in localStorage, requests https://openrouter.ai/api/v1/chat/completions directly.
 * 3. Falls back seamlessly to built-in verified studio knowledge if network/backend is unreachable.
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
  const safeModel =
    typeof model === "string" && (model.endsWith(":free") || model === "openrouter/free")
      ? model
      : DEFAULT_FREE_MODEL;

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

  // Path 1: Check Cloudflare Worker proxy endpoint at /api/chat
  try {
    const workerResponse = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: safeModel,
        messages: formattedMessages,
        stream: true,
      }),
      signal,
    });

    if (workerResponse.ok && workerResponse.body) {
      const reader = workerResponse.body.getReader();
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
              // Ignore partial JSON
            }
          }
        }
      }

      if (accumulated && onComplete) {
        onComplete(accumulated);
        return;
      }
    } else {
      console.warn("Cloudflare /api/chat returned status:", workerResponse.status);
    }
  } catch (err) {
    console.warn("Cloudflare /api/chat fetch error:", err);
  }

  // Path 2: Direct OpenRouter API call if client API key is provided
  if (apiKey) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey.trim()}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://kavirox.space",
          "X-Title": "Kavirox Studio AI Concierge"
        },
        body: JSON.stringify({
          model: safeModel,
          messages: formattedMessages,
          stream: true,
          temperature: 0.5,
          max_tokens: 800
        }),
        signal
      });

      if (response.ok && response.body) {
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
                // Ignore partial JSON
              }
            }
          }
        }

        if (accumulated && onComplete) {
          onComplete(accumulated);
          return;
        }
      }
    } catch (e) {
      console.warn("Direct OpenRouter call failed, falling back to studio knowledge engine:", e);
    }
  }

  // Path 3: Built-in Kavirox verified studio knowledge engine with Interactive Buttons
  await simulateStudioResponse(messages, onChunk, onComplete);
}

/**
 * Knowledge-backed simulation engine with complete Kavirox product & service catalog.
 * Outputs interactive button tags [button:Label|action] for instant user action.
 */
async function simulateStudioResponse(
  messages: ChatMessage[],
  onChunk: (chunk: string, accumulated: string) => void,
  onComplete?: (fullText: string) => void
): Promise<void> {
  const lastUserMsg = [...messages].reverse().find(m => m.role === "user");
  const query = (lastUserMsg?.content || "").toLowerCase();

  let responseText = "";

  if (query.includes("work") || query.includes("hire") || query.includes("collaborat") || query.includes("start") || query.includes("together")) {
    responseText = `We offer **Four Clear Ways to Start** working with us:

1. **Ready-Built Product**: Choose an existing Kavirox product that addresses your need. We provide transparent scope, setup, limits, and pricing.

2. **Product Implementation**: We configure the system, onboard users, connect data, set permissions, and train your team.

3. **Custom Development**: For needs no off-the-shelf product covers: custom web apps, mobile apps, SaaS platforms, and APIs.

4. **Product Plus Custom Extension**: Start from an existing product and commission custom integrations or dedicated modules.

Would you like to discuss a project under one of these models? You can reach our team at **info@kavirox.space**.

[button:Discuss a Project|inquiry] [button:View Services|#services]`;
  } else if (query.includes("rakshak") || query.includes("scam") || query.includes("voice") || query.includes("security")) {
    responseText = `**Rakshak Setu** is our flagship cybersecurity product:

• **What it is**: An on-device voice shield that warns you during suspicious calls.
• **Problem it solves**: Counters AI voice cloning and phone-scam impersonation.
• **Key capabilities**: Listens for scam indicators locally on the phone, displays a live threat HUD during active calls, and generates cryptographic forensic evidence for reporting.
• **Status**: Prototype with working modules.

[button:Rakshak Setu Details|/products/rakshak-setu] [button:Discuss a Project|inquiry]`;
  } else if (query.includes("gbu one") || query.includes("student") || query.includes("campus")) {
    responseText = `**GBU One** is our offline-first student companion for Gautam Buddha University:

• **Key features**: Consolidated timetables, notices with offline PDF caching, previous-year question papers, exam datesheets, and attendance tracking.
• **Admin console**: Features a PIN-gated console for verified university updates.
• **Status**: Built, device-tested, and currently serving 900+ daily campus students.

[button:GBU One Companion|/products/gbu-one] [button:Explore Products|#products]`;
  } else if (query.includes("product") || query.includes("what do you build") || query.includes("portfolio")) {
    responseText = `Kavirox builds and operates 7 specialized digital products:

1. **Rakshak Setu** (Cybersecurity) — Real-time on-device scam defense & AI voice clone detection.
2. **GBU One** (University Companion) — Offline-first student portal & attendance tracker.
3. **GBU SDMS** (Institutional ERP) — Central academic records & role-based digital attendance.
4. **Study Hub AI** (Education Bot) — WhatsApp AI bot for syllabus answers & instant doubt solving.
5. **FitFuel** (Health & Fitness) — Macro targets, food log, and habit streak tracker.
6. **Try-Out** (Virtual Fashion) — AR outfit preview & visual exploration.
7. **LAPS One** (Operations) — Event coordination platform in active development.

[button:Explore Products|#products] [button:Discuss a Project|inquiry]`;
  } else if (query.includes("service") || query.includes("capabilities") || query.includes("stack") || query.includes("tech")) {
    responseText = `Kavirox delivers engineering across 11 technology service lines:

• **Engineering**: Custom Web & Mobile Apps, SaaS Platforms, Cloud Architecture & DevOps
• **AI & Automation**: RAG Knowledge Systems, Workflow Automation, Process Bots
• **Security**: Scoped VAPT Security Audits, Mobile App Hardening, Privacy Engineering
• **Commerce & Growth**: Headless E-Commerce, UX/UI Product Design, Digital Operations

We are incubated at **AIC-GBU (Gautam Buddha University)** in Greater Noida, India.

[button:View Services|#services] [button:Discuss a Project|inquiry]`;
  } else if (query.includes("price") || query.includes("pricing") || query.includes("cost") || query.includes("budget") || query.includes("fee")) {
    responseText = `Our pricing is transparent and tied to scope:

• **Ready-Built Products**: Transparent licensing or fixed setup fees depending on product tier.
• **Project-Based Sprints**: Scoped fixed-bid delivery for clearly defined MVPs, websites, or features.
• **Dedicated Engineering Retainer**: Monthly engineering capacity for ongoing feature development, maintenance, and growth.

For an accurate proposal tailored to your roadmap, contact us directly.

[button:Discuss a Project|inquiry] [button:View Services|#services]`;
  } else if (query.includes("contact") || query.includes("email") || query.includes("reach") || query.includes("touch")) {
    responseText = `You can connect directly with our engineering and partnership team:

• **Primary Email**: info@kavirox.space
• **Incubation**: AIC-GBU (Atal Incubation Centre, Gautam Buddha University), Greater Noida, UP 201312, India
• **Socials**: LinkedIn (@kavirox) & Instagram (@kavirox.space)

[button:Discuss a Project|inquiry] [button:Contact Team|#contact]`;
  } else {
    responseText = `Welcome to **Kavirox**! We are a product-led technology company based at AIC-GBU, Greater Noida.

We build our own products—like **Rakshak Setu**, **GBU One**, and **GBU SDMS**—and deliver high-velocity technology services across custom software, AI automation, cybersecurity, and cloud engineering.

How can I help you today? Ask about our products, our 4 ways of working, or our technology stack!

[button:Explore Products|#products] [button:Discuss a Project|inquiry]`;
  }

  // Stream text smoothly with realistic cadence
  const words = responseText.split(" ");
  let accumulated = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i] + (i < words.length - 1 ? " " : "");
    accumulated += word;
    onChunk(word, accumulated);
    await new Promise(r => setTimeout(r, 16));
  }

  if (onComplete) {
    onComplete(accumulated);
  }
}
