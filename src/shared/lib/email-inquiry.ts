/**
 * Kavirox Email Inquiry Generator
 * Formats structured, pre-written inquiry emails for brands and founders,
 * redirecting them directly to email web apps (Gmail Web compose) with
 * fallback support for default mailto clients and clipboard copying.
 */

export interface EmailInquiryOptions {
  modelTitle?: string;
  serviceTitle?: string;
  source?: string;
}

export const KAVIROX_PRIMARY_EMAIL = "info@kavirox.space";

export function generateEmailInquiry(options?: EmailInquiryOptions) {
  const modelSuffix = options?.modelTitle
    ? ` // ${options.modelTitle}`
    : "";

  const subject = `Project Inquiry: [Your Brand Name]${modelSuffix} — Kavirox Collaboration`;

  const isModelSelected = (name: string): boolean =>
    Boolean(options?.modelTitle && options.modelTitle.toLowerCase().includes(name.toLowerCase()));

  const isServiceSelected = (name: string): boolean =>
    Boolean(options?.serviceTitle && options.serviceTitle.toLowerCase().includes(name.toLowerCase()));

  const body = `Hi Kavirox Team,

I would like to explore partnering with Kavirox on a project.

Here are a few quick details about our brand & requirements:

1. Brand / Company Name:
   [Your Brand or Company Name]

2. Website / Online Store:
   [e.g. yourbrand.com or "In Development"]

3. Contact Person:
   [Your Name, Role & Phone / WhatsApp]

4. Services of Interest (mark any that apply):
   ${isServiceSelected("Shopify") || isServiceSelected("Store") ? "[x]" : "[ ]"} Custom E-Commerce Store Build / Redesign (Shopify / Headless)
   ${isServiceSelected("RAG") || isServiceSelected("Chatbot") || isServiceSelected("AI") ? "[x]" : "[ ]"} Custom RAG AI Chatbot / Smart Product Advisor
   ${isServiceSelected("WhatsApp") ? "[x]" : "[ ]"} WhatsApp Commerce & Automated Customer Messaging
   ${isServiceSelected("Performance") || isServiceSelected("CRO") ? "[x]" : "[ ]"} Speed, Performance & Conversion Rate Optimization (CRO)
   ${isServiceSelected("Integration") || isServiceSelected("API") ? "[x]" : "[ ]"} Custom APIs, Integrations & Systems Engineering
   ${isServiceSelected("Retainer") || isServiceSelected("Dedicated") ? "[x]" : "[ ]"} Dedicated Monthly Engineering Retainer
   [ ] Other: [Brief description]

5. Preferred Engagement Model:
   ${isModelSelected("Sprint") || isModelSelected("Project-Based") ? "[x]" : "[ ]"} Project-Based Sprint (Fixed Scope, Rapid Delivery)
   ${isModelSelected("Dedicated") || isModelSelected("Growth Team") ? "[x]" : "[ ]"} Dedicated Growth Team (Monthly Retainer)
   ${isModelSelected("Advisory") || isModelSelected("Support") ? "[x]" : "[ ]"} Technical Advisory & On-Demand Support
   ${!options?.modelTitle ? "[x]" : "[ ]"} Open to Recommendation / Let's Discuss

6. Estimated Launch Timeline:
   [ ] Urgent / Immediate (2-4 weeks)
   [ ] 1-2 months
   [ ] Flexible

7. Estimated Budget:
   [ ] Under $5,000 / ₹4,00,000
   [ ] $5,000 - $15,000 / ₹4,00,000 - ₹12,00,000
   [ ] $15,000+ / ₹12,00,000+
   [ ] Open to Discussion

8. Project Goals / Key Challenges:
   [Briefly describe your goals, current bottlenecks, or what you'd like to achieve]

Looking forward to connecting with your team.

Best regards,
[Your Name]`;

  // Direct Gmail Web compose URL with pre-filled To, Subject, and structured Body
  const webmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    KAVIROX_PRIMARY_EMAIL
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Standard mailto URL fallback for desktop/mobile mail clients
  const mailtoUrl = `mailto:${KAVIROX_PRIMARY_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return {
    to: KAVIROX_PRIMARY_EMAIL,
    subject,
    body,
    webmailUrl,
    mailtoUrl,
  };
}

export function getInquiryWebmailUrl(options?: EmailInquiryOptions): string {
  return generateEmailInquiry(options).webmailUrl;
}

export function getInquiryMailtoUrl(options?: EmailInquiryOptions): string {
  return generateEmailInquiry(options).mailtoUrl;
}

export function openEmailInquiry(options?: EmailInquiryOptions): void {
  const { webmailUrl } = generateEmailInquiry(options);
  if (typeof window !== "undefined") {
    window.open(webmailUrl, "_blank", "noopener,noreferrer");
  }
}

export async function copyInquiryTemplate(options?: EmailInquiryOptions): Promise<boolean> {
  const { body } = generateEmailInquiry(options);
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(body);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}
