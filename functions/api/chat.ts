/**
 * Cloudflare Pages Function: /api/chat
 * High-Performance, OWASP Top 10 for LLM Applications (2025/2026) Hardened Proxy.
 */

interface Env {
  OPENROUTER_API_KEY?: string;
  OPEN_ROUTER_API_KEY?: string;
  OPENROUTER_KEY?: string;
  API_KEY?: string;
  OPENROUTER_MODEL?: string;
  OPENROUTER_SITE_NAME?: string;
  OPENROUTER_SITE_URL?: string;
}

// In-memory sliding rate limiter per IP (max 25 requests per minute)
const rateLimitMap = new Map<string, { start: number; count: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 25;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    if (rateLimitMap.size > 1200) {
      for (const [k, v] of rateLimitMap.entries()) {
        if (now - v.start > RATE_LIMIT_WINDOW) rateLimitMap.delete(k);
      }
    }
    return false;
  }
  if (record.count >= MAX_REQUESTS) {
    return true;
  }
  record.count += 1;
  return false;
}

// OWASP LLM01: Prompt Injection Guard
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|directives|rules)/i,
  /disregard\s+(all\s+)?(previous|prior|system)/i,
  /you\s+are\s+now\s+(in\s+)?dan\s+mode/i,
  /bypass\s+(all\s+)?(safety|security|filters)/i,
  /system\s+override\s*:/i,
  /<<SYS>>/i,
  /\[SYSTEM\]/i
];

function sanitizeInputText(text: any): string {
  if (typeof text !== "string") return "";
  let clean = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  if (clean.length > 1500) {
    clean = clean.slice(0, 1500);
  }
  for (const pattern of INJECTION_PATTERNS) {
    clean = clean.replace(pattern, "[sanitized-instruction]");
  }
  return clean;
}

// OWASP LLM02: Sensitive Data Redaction
function redactSensitiveOutput(text: string): string {
  if (typeof text !== "string") return text;
  return text
    .replace(/sk-or-v1-[a-zA-Z0-9]{32,}/g, "[REDACTED_API_KEY]")
    .replace(/sk-[a-zA-Z0-9]{32,}/g, "[REDACTED_KEY]")
    .replace(/Bearer\s+[a-zA-Z0-9._-]{20,}/g, "Bearer [REDACTED]");
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const clientIp = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "anonymous";

  // Rate limit check (OWASP LLM10)
  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please wait a moment before sending another message."
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Retry-After": "60"
        }
      }
    );
  }

  const apiKey = env.OPENROUTER_API_KEY || env.OPEN_ROUTER_API_KEY || env.OPENROUTER_KEY || env.API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "OPENROUTER_API_KEY is not configured in Cloudflare environment variables.",
        hint: "Please set OPENROUTER_API_KEY in Cloudflare Pages -> Settings -> Environment Variables."
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }

  // Check request size (OWASP LLM10)
  const contentLength = parseInt(request.headers.get("Content-Length") || "0", 10);
  if (contentLength > 32768) {
    return new Response(
      JSON.stringify({ error: "Payload too large. Max request size is 32KB." }),
      {
        status: 413,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      }
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      }
    );
  }

  const { messages = [], model, stream = true } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "Messages array is required." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      }
    );
  }

  const recentMessages = messages.slice(-10);
  const sanitizedMessages = recentMessages.map((msg: any) => {
    const role = msg.role === "system" || msg.role === "assistant" ? msg.role : "user";
    return {
      role,
      content: sanitizeInputText(msg.content)
    };
  });

  const requestedModel =
    env.OPENROUTER_MODEL ||
    model ||
    "nvidia/nemotron-3.5-super-vl:free";

  const candidateModels = Array.from(
    new Set([
      requestedModel,
      "nvidia/nemotron-3.5-super-vl:free",
      "openrouter/free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "google/gemini-2.0-flash-exp:free"
    ])
  ).filter(
    (m) => typeof m === "string" && (m.endsWith(":free") || m === "openrouter/free")
  );

  const siteName = env.OPENROUTER_SITE_NAME || "Kavirox Space";
  const siteUrl = env.OPENROUTER_SITE_URL || "https://kavirox.space";

  let openRouterResponse: Response | null = null;
  let lastErrorStatus = 502;
  let lastErrorText = "";

  for (const targetModel of candidateModels) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey.trim()}`,
          "Content-Type": "application/json",
          "HTTP-Referer": siteUrl,
          "X-Title": siteName
        },
        body: JSON.stringify({
          model: targetModel,
          messages: sanitizedMessages,
          stream,
          temperature: 0.5,
          max_tokens: 800
        })
      });

      if (res.ok) {
        openRouterResponse = res;
        break;
      } else {
        lastErrorStatus = res.status;
        lastErrorText = await res.text();
        console.warn(`Model ${targetModel} returned status ${res.status}, trying fallback...`);
      }
    } catch (fetchErr: any) {
      lastErrorText = fetchErr?.message || "Network error";
      console.warn(`Model ${targetModel} network error, trying fallback...`);
    }
  }

  if (!openRouterResponse || !openRouterResponse.body) {
    return new Response(
      JSON.stringify({
        error: "All OpenRouter model candidates failed.",
        status: lastErrorStatus,
        details: redactSensitiveOutput(lastErrorText)
      }),
      {
        status: lastErrorStatus >= 400 && lastErrorStatus < 600 ? lastErrorStatus : 502,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }

  const transformStream = new TransformStream({
    transform(chunk, controller) {
      try {
        const decoded = new TextDecoder().decode(chunk);
        const sanitized = redactSensitiveOutput(decoded);
        controller.enqueue(new TextEncoder().encode(sanitized));
      } catch {
        controller.enqueue(chunk);
      }
    }
  });

  return new Response(openRouterResponse.body.pipeThrough(transformStream), {
    status: 200,
    headers: {
      "Content-Type": stream ? "text/event-stream" : "application/json",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400"
    }
  });
};
