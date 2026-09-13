import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Settings, 
  RotateCcw, 
  ArrowUpRight, 
  Bot, 
  User, 
  Square,
  Compass,
  CheckCircle2,
  Mail
} from "lucide-react";
import { ChatMessage } from "../types";
import { 
  streamOpenRouterChat, 
  getStoredApiKey, 
  getStoredModel, 
  OPENROUTER_FREE_MODELS 
} from "../services/openrouter";
import { ChatbotSettingsModal } from "./chatbot-settings-modal";
import { openEmailInquiry } from "@/shared/lib/email-inquiry";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content: "Hi! I'm the **Kavirox AI Concierge**. I can answer questions about our **11 core engineering services**, **turnkey D2C solutions**, **custom RAG chatbots**, or help you kick off a project. What can I assist you with?",
    timestamp: Date.now()
  }
];

const STARTER_PROMPTS = [
  "What services does Kavirox offer?",
  "How do you build custom RAG chatbots?",
  "What are your engagement models & pricing?",
  "How do I start a project with Kavirox?"
];

export function KaviroxChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("kavirox_chat_history");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_MESSAGES;
  });
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState(getStoredModel());
  const [hasApiKey, setHasApiKey] = useState(Boolean(getStoredApiKey()));
  const [showTeaser, setShowTeaser] = useState(true);

  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Sync active model & key status
  const refreshSettingsState = () => {
    setCurrentModel(getStoredModel());
    setHasApiKey(Boolean(getStoredApiKey()));
  };

  // Persist conversation to session
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("kavirox_chat_history", JSON.stringify(messages));
      } catch {}
    }
  }, [messages]);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowTeaser(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const activeModelMeta = OPENROUTER_FREE_MODELS.find(m => m.id === currentModel) || OPENROUTER_FREE_MODELS[0];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isGenerating) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: Date.now()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsGenerating(true);

    const assistantId = `assistant-${Date.now()}`;
    const initialAssistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: Date.now(),
      isStreaming: true,
      modelUsed: activeModelMeta.name
    };

    setMessages([...newMessages, initialAssistantMsg]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await streamOpenRouterChat({
        messages: newMessages,
        model: currentModel,
        signal: controller.signal,
        onChunk: (_, accumulated) => {
          setMessages(prev => 
            prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m)
          );
        },
        onComplete: (fullText) => {
          setIsGenerating(false);
          setMessages(prev => 
            prev.map(m => m.id === assistantId ? { ...m, content: fullText, isStreaming: false } : m)
          );
        },
        onError: (err) => {
          setIsGenerating(false);
          const errorMsg = `⚠️ **Connection Notice**: ${err.message}\n\n*You can still browse our verified knowledge or switch models in Chat Settings.*`;
          setMessages(prev => 
            prev.map(m => m.id === assistantId ? { ...m, content: errorMsg, isStreaming: false } : m)
          );
        }
      });
    } catch (err: any) {
      setIsGenerating(false);
      setMessages(prev => 
        prev.map(m => m.id === assistantId ? { ...m, content: `Error: ${err.message}`, isStreaming: false } : m)
      );
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
    setMessages(prev => 
      prev.map(m => m.isStreaming ? { ...m, isStreaming: false } : m)
    );
  };

  const handleClear = () => {
    if (confirm("Reset chat conversation?")) {
      setMessages(INITIAL_MESSAGES);
      sessionStorage.removeItem("kavirox_chat_history");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to render basic markdown formatting (bold, bullets, linebreaks)
  const renderFormattedText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Bullet points
      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
      const cleanLine = isBullet ? line.trim().replace(/^[•-]\s*/, "") : line;

      // Parse bold segments **text**
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pIdx} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 ml-1">
            <span className="text-orange-400 text-xs mt-1">•</span>
            <span className="flex-1">{formattedParts}</span>
          </div>
        );
      }

      return <p key={idx} className="my-0.5 leading-relaxed">{formattedParts}</p>;
    });
  };

  return (
    <>
      {/* 1. Floating Launcher Badge (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
        {/* Teaser Tooltip Greeting on Initial Load */}
        {showTeaser && !isOpen && (
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#121218]/90 backdrop-blur-xl border border-white/15 text-xs text-zinc-300 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-mono">Ask Kavirox AI about our services & RAG bots</span>
            <button
              onClick={() => setShowTeaser(false)}
              className="text-zinc-500 hover:text-white ml-1 text-xs"
              title="Dismiss"
            >
              ×
            </button>
          </div>
        )}

        {/* Launcher Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-full transition-all duration-300 shadow-2xl cursor-pointer ${
            isOpen
              ? "bg-zinc-800 text-white border border-white/20 scale-95"
              : "bg-[#101014]/90 hover:bg-[#16161d] text-white border border-white/15 hover:border-orange-500/40 hover:shadow-orange-500/20 hover:scale-105"
          }`}
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: isOpen 
              ? "0 8px 30px rgba(0,0,0,0.6)" 
              : "0 10px 40px -8px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(255,255,255,0.15)"
          }}
          title={isOpen ? "Close AI Concierge" : "Open Kavirox AI Concierge"}
          aria-label="Open AI Concierge"
        >
          {/* Status Dot */}
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="absolute w-4 h-4 rounded-full bg-emerald-400/30 animate-pulse" />
          </div>

          {/* Minimal K Icon Mark */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-[#09090b] font-sans font-black text-[10px] leading-none shadow-[0_0_8px_rgba(16,185,129,0.35)]">
            K
          </div>

          <span className="hidden sm:inline text-xs font-semibold tracking-wide">
            {isOpen ? "Close Chat" : "Ask Kavirox AI"}
          </span>

          <Sparkles className="w-3.5 h-3.5 text-orange-400 transition-transform group-hover:rotate-12" />
        </button>
      </div>

      {/* 2. Interactive Concierge Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[430px] max-h-[640px] h-[80vh] flex flex-col rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{
            background: "rgba(12, 12, 16, 0.88)",
            backdropFilter: "blur(28px) saturate(190%)",
            WebkitBackdropFilter: "blur(28px) saturate(190%)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow: "0 24px 70px -12px rgba(0, 0, 0, 0.9), inset 0 1px 0 0 rgba(255, 255, 255, 0.22)"
          }}
        >
          {/* Specular Top Sheen */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Header Bar */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-black/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-[#09090b] font-black text-xs shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                K
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xs font-semibold text-white truncate">Kavirox AI Concierge</h2>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                </div>
                {/* Active Model Pill - Clickable to open settings */}
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(true)}
                  className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-orange-400 transition-colors cursor-pointer text-left truncate"
                  title="Click to configure OpenRouter models & key"
                >
                  <span className="truncate">{activeModelMeta.name}</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-white/5 border border-white/10 text-emerald-400">
                    Free
                  </span>
                </button>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="OpenRouter settings & key"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Minimize chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10 text-xs">
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              const isProjectInquiryRelated = 
                isAssistant && 
                (msg.content.toLowerCase().includes("email") || 
                 msg.content.toLowerCase().includes("project") || 
                 msg.content.toLowerCase().includes("info@kavirox.space"));

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAssistant ? "items-start" : "items-end justify-end"}`}
                >
                  {isAssistant && (
                    <div className="w-5 h-5 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-orange-400 mt-1 shrink-0">
                      <Bot className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                      isAssistant
                        ? "bg-white/[0.05] border border-white/10 text-zinc-200"
                        : "bg-orange-600 text-white rounded-br-none shadow-md shadow-orange-600/20"
                    }`}
                  >
                    {renderFormattedText(msg.content)}

                    {/* Streaming Cursor */}
                    {msg.isStreaming && (
                      <span className="inline-block w-1.5 h-3.5 ml-1 bg-orange-400 animate-pulse align-middle" />
                    )}

                    {/* Contextual Action Button to Open Email Inquiry */}
                    {isProjectInquiryRelated && !msg.isStreaming && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEmailInquiry({ source: "Chatbot Concierge" })}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-orange-600 hover:bg-orange-500 text-white shadow-sm transition-all cursor-pointer"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Launch Pre-Written Inquiry Brief</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 mb-1 shrink-0">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Starter Suggestion Chips (Shown on initial conversation) */}
          {messages.length <= 2 && !isGenerating && (
            <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex flex-wrap gap-1.5">
              {STARTER_PROMPTS.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all text-left cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Form Bar */}
          <div className="p-3 border-t border-white/10 bg-black/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative flex items-center gap-2"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our services, RAG chatbots, or team..."
                className="w-full px-3 py-2 pr-10 rounded-xl bg-white/[0.06] border border-white/15 text-xs text-white placeholder-zinc-500 font-sans focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 resize-none max-h-24 scrollbar-none"
              />

              {isGenerating ? (
                <button
                  type="button"
                  onClick={handleStop}
                  className="absolute right-2 p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 transition-colors cursor-pointer"
                  title="Stop generating"
                >
                  <Square className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className={`absolute right-2 p-1.5 rounded-lg transition-all cursor-pointer ${
                    input.trim()
                      ? "bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/30"
                      : "bg-white/5 text-zinc-500 cursor-not-allowed"
                  }`}
                  title="Send message (Enter)"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Micro Status Sub-bar */}
            <div className="pt-2 px-1 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>Shift+Enter for newline</span>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="hover:text-zinc-300 transition-colors flex items-center gap-1"
              >
                <span>{hasApiKey ? "● OpenRouter Live" : "○ Fallback Knowledge Mode"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Settings Drawer / Modal */}
      <ChatbotSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaved={refreshSettingsState}
      />
    </>
  );
}

export default KaviroxChatbot;
