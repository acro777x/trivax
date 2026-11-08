export interface SolutionItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  architecturePoints: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  blueprint: {
    input: string;
    engine: string;
    output: string;
  };
}

export const solutions: SolutionItem[] = [
  {
    id: "d2c-storefront",
    tag: "Fast Online Stores",
    title: "Custom D2C Storefronts",
    subtitle: "Fast-Loading Stores Built to Turn Browsers into Regular Buyers",
    description: 
      "We build custom online stores using Shopify and modern web frameworks. Instead of slow templates, your visitors get fast mobile browsing, clear product storytelling, and smooth checkouts with COD and UPI.",
    architecturePoints: [
      "Custom sections that highlight your ingredients, quality, and craftsmanship",
      "Smart product bundles and combos that increase average order value",
      "Fast, trustworthy mobile checkout with instant UPI and COD verification",
      "Optimized page speeds so shoppers never bounce while waiting for pages to load"
    ],
    metrics: [
      { label: "Mobile Speed Score", value: "95+" },
      { label: "Checkout Drop-off", value: "-28%" },
      { label: "Average Order Value", value: "+34%" }
    ],
    stack: ["Shopify", "Liquid", "Next.js", "Tailwind CSS", "TypeScript", "Razorpay"],
    blueprint: {
      input: "Visitors from Ads & Social Media",
      engine: "Fast Custom Storefront + Smart Combo Suggestions",
      output: "Smooth Checkouts & Higher Order Values"
    }
  },
  {
    id: "whatsapp-commerce",
    tag: "WhatsApp Messaging",
    title: "WhatsApp Order Updates & Recovery",
    subtitle: "Reach Customers Directly on the App They Use Every Day",
    description: 
      "We connect your store directly to WhatsApp to automatically recover abandoned carts, send instant order and shipping updates, and answer customer questions before they leave.",
    architecturePoints: [
      "Automatic cart recovery messages with direct links to complete checkout",
      "Instant order confirmations and real-time shipping tracking alerts",
      "Simple interactive chat flows to help customers pick the right product",
      "Easy option for customers to chat with your support team"
    ],
    metrics: [
      { label: "Cart Recovery Rate", value: "42%" },
      { label: "Message Open Rate", value: "98%" },
      { label: "Response Speed", value: "< 2s" }
    ],
    stack: ["WhatsApp Business API", "Meta Cloud API", "n8n", "Shopify Webhooks", "Node.js"],
    blueprint: {
      input: "Customer Drops Off Before Completing Order",
      engine: "Automated WhatsApp Notification with Saved Cart Link",
      output: "Recovered Order & Instant Customer Confirmation"
    }
  },
  {
    id: "ai-discovery",
    tag: "AI & RAG Chatbots",
    title: "RAG Brand Chatbots & Product Finders",
    subtitle: "AI Shopping Assistants & Quizzes Trained on Your Exact Products",
    description: 
      "We build custom RAG (Retrieval-Augmented Generation) chatbots and interactive finders trained directly on your store's catalog, FAQs, and brand knowledge base. Customers get accurate, instant answers and personalized product matches 24/7.",
    architecturePoints: [
      "Brand-trained RAG chatbot answering ingredient, sizing, and shipping questions accurately",
      "Interactive guided quizzes that recommend the best product match in seconds",
      "Direct integration on your online storefront and official WhatsApp Business",
      "Instant 1-click checkout links generated directly inside the chat conversation"
    ],
    metrics: [
      { label: "Questions Answered", value: "85%" },
      { label: "Conversion Lift", value: "3.2x" },
      { label: "Support Time Saved", value: "60%" }
    ],
    stack: ["RAG Architecture", "Vector Search", "OpenAI / Claude", "Storefront API", "WhatsApp API"],
    blueprint: {
      input: "Customer Asks About Products or Answers a Quiz",
      engine: "Brand RAG Engine Pulling Verified Store Data & FAQs",
      output: "Instant Grounded Answer, Product Link & 1-Click Cart"
    }
  },
  {
    id: "data-telemetry",
    tag: "Clear Analytics",
    title: "Accurate Sales & Ad Tracking",
    subtitle: "Know Exactly Which Ads and Products Drive Your Revenue",
    description: 
      "We set up reliable server-side tracking and simple dashboards so you know exactly which marketing campaigns bring profitable customers and repeat purchases.",
    architecturePoints: [
      "Direct server tracking with Meta CAPI for accurate ad attribution",
      "Clean Google Analytics 4 tracking across every step of your funnel",
      "Simple, visual dashboards showing daily revenue, repeat buyers, and top products",
      "Safe, privacy-compliant handling of all customer information"
    ],
    metrics: [
      { label: "Attribution Accuracy", value: "99.4%" },
      { label: "Repeat Purchase Rate", value: "+38%" },
      { label: "Ad ROAS Visibility", value: "Real-Time" }
    ],
    stack: ["Meta CAPI", "Google Analytics 4", "GTM Server Container", "Looker Studio", "Klaviyo"],
    blueprint: {
      input: "Store Visits, Purchases & Ad Clicks",
      engine: "Server-Side Tracking & Unified Data Pipeline",
      output: "Clear, Accurate Revenue Dashboard in Looker Studio"
    }
  }
];
