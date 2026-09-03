import { ChatHistoryMessage, ChatApiResponse } from '../types/client.js';

export function initChatbot(): void {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotBox = document.getElementById('chatbot-box');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotInput = document.getElementById('chatbot-input') as HTMLInputElement | null;
  const chatbotSendBtn = document.getElementById('chatbot-send-btn');
  const chatbotMessages = document.getElementById('chatbot-messages');

  const chatHistory: ChatHistoryMessage[] = [];
  let isAiGenerating = false;

  const domainFallbackKnowledge: Record<string, string> = {
    services:
      "KAVIROX delivers enterprise digital solutions across 6 core pillars:\n• AI/ML Engineering & Multi-Agent Systems (RAG, LLMs, Computer Vision)\n• Cybersecurity & Offensive VAPT (AcroStrike, AcroMap, Smart Contract Audits)\n• Creative Media & Commercial Video Production (VFX, 3D Cinematography)\n• Full-Stack Cloud & Mobile Architecture (React, Python, Node, K8s)\n• Technical SEO & Automated Growth Engineering\n• 24/7 Dedicated Operations & Retainers",
    pricing:
      "Our engagements are milestone-based or structured as dedicated monthly engineering retainers. Contact our lead architects at info@kavirox.space or +91 95484 25711 for a tailored scope of work.",
    security:
      "Security is built into our core foundation: Zero-Trust architecture, automated penetration testing (AcroMap & AcroStrike), DFIR investigation workflows, and hardened API security.",
    contact:
      "You can transmit your inquiry directly to our team via:\n• Email: info@kavirox.space\n• Direct / WhatsApp: +91 95484 25711\n• Transmission Form: https://kavirox.space/#contact",
    ai: "We develop state-of-the-art neural architectures, multimodal RAG retrieval systems, autonomous agent workflows, and specialized language models with academic research published at ACM MM and ACL.",
    projects:
      "Our notable open-source and proprietary deployments include AcroMap, AcroStrike, AI DFIR Copilot, GhostChat (E2EE ephemeral messaging), Rakshak Setu, StudyHub, and AI Resume Architect.",
    team: "KAVIROX is driven by Ashish Kumar (Lead Architect & Cybersecurity Specialist), our Creative Media Producer, and our specialized full-stack & cloud engineering team.",
    default:
      "I am the KAVIROX AI Assistant. I can guide you through our AI/ML engineering capabilities, cybersecurity audits, creative media production, flagship portfolio projects, or help you connect with our team at info@kavirox.space!"
  };

  function getDomainFallbackReply(userText: string): string {
    const text = userText.toLowerCase();
    if (
      text.includes('service') ||
      text.includes('what do you do') ||
      text.includes('web') ||
      text.includes('app') ||
      text.includes('media') ||
      text.includes('video')
    )
      return domainFallbackKnowledge.services;
    if (
      text.includes('price') ||
      text.includes('cost') ||
      text.includes('rate') ||
      text.includes('quote') ||
      text.includes('hire')
    )
      return domainFallbackKnowledge.pricing;
    if (
      text.includes('security') ||
      text.includes('pen test') ||
      text.includes('vapt') ||
      text.includes('hack') ||
      text.includes('audit') ||
      text.includes('dfir')
    )
      return domainFallbackKnowledge.security;
    if (
      text.includes('contact') ||
      text.includes('email') ||
      text.includes('phone') ||
      text.includes('call') ||
      text.includes('reach') ||
      text.includes('talk')
    )
      return domainFallbackKnowledge.contact;
    if (
      text.includes('ai') ||
      text.includes('ml') ||
      text.includes('model') ||
      text.includes('rag') ||
      text.includes('llm') ||
      text.includes('agent')
    )
      return domainFallbackKnowledge.ai;
    if (
      text.includes('project') ||
      text.includes('acromap') ||
      text.includes('acrostrike') ||
      text.includes('ghostchat') ||
      text.includes('rakshak') ||
      text.includes('studyhub')
    )
      return domainFallbackKnowledge.projects;
    if (
      text.includes('team') ||
      text.includes('ashish') ||
      text.includes('founder') ||
      text.includes('who are you') ||
      text.includes('about')
    )
      return domainFallbackKnowledge.team;
    return domainFallbackKnowledge.default;
  }

  function appendChatMessage(text: string, sender: 'user' | 'bot'): HTMLElement | null {
    if (!chatbotMessages) return null;
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    // OWASP LLM02: Safe textContent insertion prevents XSS / HTML injection
    msg.textContent = text;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return msg;
  }

  function showTypingIndicator(): HTMLElement | null {
    if (!chatbotMessages) return null;
    const indicator = document.createElement('div');
    indicator.className = 'chat-message bot chat-typing-indicator';
    indicator.id = 'chat-typing-indicator';
    indicator.innerHTML =
      '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    chatbotMessages.appendChild(indicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return indicator;
  }

  function removeTypingIndicator(): void {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();
  }

  async function handleUserSend(): Promise<void> {
    if (isAiGenerating) return;
    const rawText = chatbotInput?.value || '';
    const text = rawText.trim();
    if (!text) return;

    // OWASP LLM04: Input validation & length restriction (Max 500 chars)
    if (text.length > 500) {
      appendChatMessage('Message exceeds 500 characters. Please condense your question.', 'bot');
      return;
    }

    appendChatMessage(text, 'user');
    if (chatbotInput) chatbotInput.value = '';
    isAiGenerating = true;

    showTypingIndicator();

    try {
      // OWASP LLM06: Security Proxy - Requests go to Node.js backend /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: chatHistory.slice(-4)
        })
      });

      removeTypingIndicator();

      if (response.ok) {
        const data: ChatApiResponse = await response.json();
        const reply = data.reply || getDomainFallbackReply(text);
        appendChatMessage(reply, 'bot');
        chatHistory.push({ role: 'user', content: text });
        chatHistory.push({ role: 'assistant', content: reply });
      } else {
        const fallbackReply = getDomainFallbackReply(text);
        appendChatMessage(fallbackReply, 'bot');
      }
    } catch (err) {
      removeTypingIndicator();
      const fallbackReply = getDomainFallbackReply(text);
      appendChatMessage(fallbackReply, 'bot');
    } finally {
      isAiGenerating = false;
    }
  }

  if (chatbotToggle && chatbotBox) {
    chatbotToggle.addEventListener('click', () => {
      chatbotBox.classList.toggle('open');
      if (chatbotBox.classList.contains('open')) {
        setTimeout(() => chatbotInput?.focus(), 150);
      }
    });

    chatbotClose?.addEventListener('click', () => {
      chatbotBox.classList.remove('open');
    });

    chatbotSendBtn?.addEventListener('click', () => {
      void handleUserSend();
    });

    chatbotInput?.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        void handleUserSend();
      }
    });
  }
}
