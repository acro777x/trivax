import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ArrowUpRight, 
  Bot, 
  User, 
  Square,
  Mail,
  Reply
} from "lucide-react";
import { ChatMessage } from "../types";
import { streamOpenRouterChat } from "../services/openrouter";
import { openEmailInquiry } from "@/shared/lib/email-inquiry";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content: "Hi! I'm the **Kavirox Assistant**. Ask me anything about our services, store builds, custom RAG chatbots, or pricing.",
    timestamp: Date.now()
  }
];

const STARTER_PROMPTS = [
  "What services do you offer?",
  "How do your RAG chatbots work?",
  "Pricing & engagement models"
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
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isGenerating) return;

    const currentReply = replyingTo;
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: Date.now(),
      ...(currentReply
        ? {
            replyTo: {
              id: currentReply.id,
              role: currentReply.role,
              text: currentReply.content.slice(0, 160)
            }
          }
        : {})
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setReplyingTo(null);
    setIsGenerating(true);

    const assistantId = `assistant-${Date.now()}`;
    const initialAssistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: Date.now(),
      isStreaming: true
    };

    setMessages([...newMessages, initialAssistantMsg]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await streamOpenRouterChat({
        messages: newMessages,
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
        onError: () => {
          setIsGenerating(false);
          const errorMsg = "I'm experiencing a temporary delay right now. You can email us directly at info@kavirox.space or try asking again.";
          setMessages(prev => 
            prev.map(m => m.id === assistantId ? { ...m, content: errorMsg, isStreaming: false } : m)
          );
        }
      });
    } catch {
      setIsGenerating(false);
      setMessages(prev => 
        prev.map(m => m.id === assistantId ? { 
          ...m, 
          content: "I'm experiencing a temporary delay right now. You can email us directly at info@kavirox.space or try asking again.", 
          isStreaming: false 
        } : m)
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

  // Helper to render formatted text (bold, bullets, linebreaks)
  const renderFormattedText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
      const cleanLine = isBullet ? line.trim().replace(/^[•-]\s*/, "") : line;

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
        {/* Launcher Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full transition-all duration-300 shadow-2xl cursor-pointer ${
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
          title={isOpen ? "Close Assistant" : "Ask Kavirox AI"}
          aria-label="Open Kavirox Assistant"
        >
          {/* Status Dot */}
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="absolute w-3.5 h-3.5 rounded-full bg-emerald-400/30 animate-pulse" />
          </div>

          {/* Minimal K Icon Mark */}
          <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-[#09090b] font-sans font-black text-[9px] leading-none shadow-[0_0_8px_rgba(16,185,129,0.35)]">
            K
          </div>

          <span className="hidden sm:inline text-xs font-semibold tracking-wide">
            {isOpen ? "Close" : "Ask AI"}
          </span>

          <Sparkles className="w-3 h-3 text-orange-400 transition-transform group-hover:rotate-12" />
        </button>
      </div>

      {/* 2. Sleek, Minimal Concierge Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-18 right-3 sm:right-5 z-50 w-[calc(100vw-1.5rem)] sm:w-[360px] max-h-[500px] h-[66vh] flex flex-col rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
          style={{
            background: "rgba(12, 12, 16, 0.92)",
            backdropFilter: "blur(28px) saturate(190%)",
            WebkitBackdropFilter: "blur(28px) saturate(190%)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow: "0 24px 70px -12px rgba(0, 0, 0, 0.9), inset 0 1px 0 0 rgba(255, 255, 255, 0.22)"
          }}
        >
          {/* Specular Top Rim Sheen */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Minimal Header Bar */}
          <div className="px-3.5 py-2.5 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-[#09090b] font-black text-[10px] shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                K
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xs font-semibold text-white truncate">Kavirox AI</h2>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin scrollbar-thumb-white/10 text-xs">
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              const isProjectInquiryRelated = 
                isAssistant && 
                msg.id !== "welcome-1" &&
                (msg.content.includes("info@kavirox.space") || 
                 msg.content.toLowerCase().includes("inquiry brief") || 
                 msg.content.toLowerCase().includes("project inquiry") ||
                 msg.content.toLowerCase().includes("pre-written"));

              return (
                <div
                  key={msg.id}
                  className={`group/msg flex gap-2.5 ${isAssistant ? "items-start" : "items-end justify-end"}`}
                >
                  {isAssistant && (
                    <div className="w-5 h-5 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-orange-400 mt-1 shrink-0">
                      <Bot className="w-3 h-3" />
                    </div>
                  )}

                  <div className="flex flex-col max-w-[85%]">
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs ${
                        isAssistant
                          ? "bg-white/[0.05] border border-white/10 text-zinc-200"
                          : "bg-orange-600 text-white rounded-br-none shadow-md shadow-orange-600/20"
                      }`}
                    >
                      {/* Replied Context Bubble Quote */}
                      {msg.replyTo && (
                        <div
                          className={`mb-2 px-2.5 py-1.5 rounded-lg text-[11px] font-mono border-l-2 ${
                            isAssistant
                              ? "bg-white/[0.05] border-orange-400 text-zinc-300"
                              : "bg-black/25 border-white/70 text-orange-100"
                          }`}
                        >
                          <div className="flex items-center gap-1 opacity-75 text-[9px] font-semibold">
                            <Reply className="w-2.5 h-2.5" />
                            <span>Replying to {msg.replyTo.role === "assistant" ? "Kavirox AI" : "You"}:</span>
                          </div>
                          <span className="truncate block italic text-[10px] mt-0.5 opacity-90">
                            "{msg.replyTo.text.replace(/\*\*/g, "")}"
                          </span>
                        </div>
                      )}

                      {renderFormattedText(msg.content)}

                      {/* Streaming Cursor */}
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-3.5 ml-1 bg-orange-400 animate-pulse align-middle" />
                      )}

                      {/* Contextual Action Button - Only when actively discussing starting a project */}
                      {isProjectInquiryRelated && !msg.isStreaming && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEmailInquiry({ source: "Chatbot Assistant" })}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-orange-600 hover:bg-orange-500 text-white shadow-sm transition-all cursor-pointer"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Launch Pre-Written Inquiry Brief</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Quick Reply Action Trigger */}
                    {!msg.isStreaming && (
                      <div className={`flex items-center gap-1.5 mt-1 px-1 text-[10px] ${isAssistant ? "justify-start" : "justify-end"}`}>
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingTo(msg);
                            setTimeout(() => inputRef.current?.focus(), 50);
                          }}
                          className="inline-flex items-center gap-1 text-zinc-500 hover:text-orange-400 transition-colors opacity-70 sm:opacity-0 sm:group-hover/msg:opacity-100 cursor-pointer px-1.5 py-0.5 rounded hover:bg-white/5"
                          title="Reply to this message"
                        >
                          <Reply className="w-2.5 h-2.5" />
                          <span className="font-mono text-[9px]">Reply</span>
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

          {/* Starter Suggestion Chips */}
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
            {/* Active Reply Preview Banner */}
            {replyingTo && (
              <div className="mb-2 px-3 py-1.5 rounded-xl bg-white/[0.06] border border-orange-500/40 flex items-center justify-between text-xs animate-in fade-in slide-in-from-bottom-1 duration-150">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-5 h-5 rounded-md bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                    <Reply className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[10px] font-mono text-orange-400 block font-medium">
                      Replying to {replyingTo.role === "assistant" ? "Kavirox AI" : "You"}:
                    </span>
                    <p className="text-[11px] text-zinc-300 truncate max-w-[240px] sm:max-w-[290px]">
                      {replyingTo.content.replace(/\*\*/g, "")}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  title="Cancel reply"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

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
                placeholder={replyingTo ? "Type your reply..." : "Ask about our services, RAG chatbots, or team..."}
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
          </div>
        </div>
      )}
    </>
  );
}

export default KaviroxChatbot;
