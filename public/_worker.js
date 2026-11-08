/**
 * Cloudflare Pages Worker (_worker.js)
 * Manages hosting, SPA routing fallback, and /api/chat OpenRouter streaming proxy.
 * Cloudflare Pages automatically binds static assets to env.ASSETS.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    // 2. Health check
    if (url.pathname === "/api/health") {
      return new Response(
        JSON.stringify({
          status: "healthy",
          timestamp: Date.now(),
          worker: "kavirox-cloudflare-pages"
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    // 3. Secure OpenRouter streaming proxy (/api/chat)
    if (url.pathname === "/api/chat" && request.method === "POST") {
      const apiKey = env.OPENROUTER_API_KEY;

      if (!apiKey) {
        return new Response(
          JSON.stringify({
            error: "OPENROUTER_API_KEY is not configured in Cloudflare environment variables."
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

      try {
        const body = await request.json();
        const { messages, model = "openrouter/free", stream = true } = body;

        // Strictly enforce free models
        const safeModel =
          typeof model === "string" && (model.endsWith(":free") || model === "openrouter/free")
            ? model
            : "openrouter/free";

        const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://kavirox.space",
            "X-Title": "Kavirox Studio AI Concierge"
          },
          body: JSON.stringify({
            model: safeModel,
            messages,
            stream,
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        return new Response(openRouterResponse.body, {
          status: openRouterResponse.status,
          headers: {
            "Content-Type": stream ? "text/event-stream" : "application/json",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      } catch (err) {
        return new Response(
          JSON.stringify({
            error: err?.message || "Failed to communicate with OpenRouter"
          }),
          {
            status: 502,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
      }
    }

    // 4. Cloudflare Pages static assets & SPA client routing fallback
    if (env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status === 404 && !url.pathname.includes(".")) {
        return env.ASSETS.fetch(new URL("/", request.url));
      }
      return assetResponse;
    }

    return new Response("Not found", { status: 404 });
  }
};
