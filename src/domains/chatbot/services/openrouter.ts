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
  },
  {
    id: "liquid/lfm-2.5-2.6b:free",
    name: "Liquid LFM 2.5",
    description: "Compact, ultra-low latency conversational engine",
    isFree: true,
    tag: "Lightweight"
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
 * 1. Attempts Cloudflare Worker proxy at /api/chat (where Cloudflare Worker injects keys securely).
 * 2. If client has API key, requests https://openrouter.ai/api/v1/chat/completions directly.
 * 3. Falls back seamlessly to built-in studio knowledge if endpoints return non-200.
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
  // Strictly enforce OpenRouter free models
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
            } catch (e) {
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
  } catch (err) {
    // Worker proxy not available or running in standalone frontend mode; continue to Path 2
  }

  // Path 2: Direct OpenRouter API call if client API key is provided
  if (apiKey) {
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
          model: safeModel,
          messages: formattedMessages,
          stream: true,
          temperature: 0.7,
          max_tokens: 1000
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
              } catch (e) {
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

  // Path 3: Built-in Kavirox verified studio knowledge engine
  await simulateStudioResponse(messages, onChunk, onComplete);
}

/**
 * Knowledge-backed simulation engine with complete Kavirox product & service catalog.
 */
async function simulateStudioResponse(
  messages: ChatMessage[],
  onChunk: (chunk: string, accumulated: string) => void,
  onComplete?: (fullText: string) => void
): Promise<void> {
  const lastUserMsg = [...messages].reverse().find(m => m.role === "user");
  const query = (lastUserMsg?.content || "").toLowerCase();

  let responseText = "";

  if (query.includes("product") || query.includes("what do you build") || query.includes("portfolio")) {
    responseText = `Kavirox builds and operates 7 specialized digital products:

1. **Rakshak Setu** (Cybersecurity) — Real-time on-device scam defense, AI voice clone detection, and forensic evidence generation.
2. **GBU One** (University Companion) — Campus navigation, attendance alerts, live updates, and emergency contacts.
3. **GBU SDMS** (Institutional ERP) — Comprehensive student database and administrative management.
4. **Study Hub AI** (Education Bot) — WhatsApp AI bot for lecture summarization and instant doubt solving.
5. **FitFuel** (Health & Nutrition) — Macro calculator, food scanner, and habit streak tracker.
6. **Try-Out** (Virtual Fitting) — AR cloth fitting and realistic 3D avatar sizing.
7. **LAPS One** (Operations & Logistics) — Internal operations coordination and logistics telemetry.

You can explore live details and interactive screens for each product directly on our site!`;
  } else if (query.includes("work") || query.includes("hire") || query.includes("collaborat") || query.includes("start")) {
    responseText = `We offer 4 distinct ways to work together:

1. **Ready-built product** — Adopt an existing Kavirox product with standard setup, scope, and support.
2. **Product implementation** — We configure, integrate data, onboard users, and train your internal team.
3. **Custom development** — End-to-end bespoke engineering for websites, web applications, SaaS, and automation.
4. **Product + custom extension** — Start from one of our core products and commission bespoke modules or API integrations.

Would you like to discuss a project? You can reach us directly at **info@kavirox.space**.`;
  } else if (query.includes("service") || query.includes("capabilities") || query.includes("stack")) {
    responseText = `Kavirox provides 11 core technology service lines:

• **Engineering**: SaaS Development, Custom Web & Mobile Apps, Cloud Architecture & DevOps
• **AI & Automation**: RAG Knowledge Systems, Workflow Automation, Process Bots
• **Security**: Authorized VAPT Audits, Mobile App Hardening, Security Architecture
• **Commerce & Growth**: Headless E-Commerce, UX/UI Product Design, Digital Operations

We are incubated at **AIC-GBU (Gautam Buddha University)** in Greater Noida, India.`;
  } else if (query.includes("contact") || query.includes("email") || query.includes("phone")) {
    responseText = `You can get in touch with our engineering and partnership team at:

• **Email**: info@kavirox.space
• **Incubation**: AIC-GBU (Atal Incubation Centre, Gautam Buddha University), Greater Noida, UP, India
• **Socials**: [LinkedIn](https://www.linkedin.com/company/kavirox) | [Instagram](https://www.instagram.com/kavirox.space)

Feel free to click "Discuss a project" in the header to open a pre-formatted inquiry email!`;
  } else {
    responseText = `Welcome to Kavirox! We are a product-led technology company based at AIC-GBU, Greater Noida.

We build our own products—like **Rakshak Setu**, **GBU One**, and **GBU SDMS**—and deliver high-velocity technology services across custom software, AI automation, cybersecurity, and cloud engineering.

How can I help you today? Feel free to ask about our products, our 4 ways of working, or our technology stack!`;
  }

  // Stream text smoothly with realistic cadence
  const words = responseText.split(" ");
  let accumulated = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i] + (i < words.length - 1 ? " " : "");
    accumulated += word;
    onChunk(word, accumulated);
    await new Promise(r => setTimeout(r, 22));
  }

  if (onComplete) {
    onComplete(accumulated);
  }
}
