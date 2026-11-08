/**
 * Cloudflare Pages / Worker Function: /api/chat
 * Acts as a secure server-side streaming proxy to OpenRouter.
 * Securely uses the OPENROUTER_API_KEY environment variable configured in Cloudflare.
 * Strictly forces free models (e.g. openrouter/free, :free) to protect against unexpected costs.
 */

interface Env {
  OPENROUTER_API_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const apiKey = context.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "OPENROUTER_API_KEY is not configured in Cloudflare Worker environment variables."
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
    const body = (await context.request.json()) as any;
    const { messages, model = "openrouter/free", stream = true } = body;

    // Enforce free model verification
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
  } catch (err: any) {
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
