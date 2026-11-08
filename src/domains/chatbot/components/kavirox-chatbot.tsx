import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Send, 
  RotateCcw, 
  ArrowUpRight, 
  User, 
  Square,
  Mail,
  Reply
} from "lucide-react";
import { ChatMessage } from "../types";
import { streamOpenRouterChat } from "../services/openrouter";
import { openEmailInquiry } from "@/shared/lib/email-inquiry";
import LatticeLoader from "@/components/ui/LatticeLoader";
import { LogoMark } from "@/shared/components/logo";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content: "Hi, I'm Kavirox's assistant. Ask me about our products or services.",
    timestamp: Date.now()
  }
];

const STARTER_PROMPTS = [
  "What products do you build?",
  "How can we work together?",
  "What services do you deliver?"
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
  const [hideLauncher, setHideLauncher] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const touchStartY = useRef<number | null>(null);

  // Hide launcher when contact form field is focused per doc 17 S0
  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) {
        setHideLauncher(true);
      }
    };

    const handleFocusOut = () => {
      setHideLauncher(false);
    };

    contactSection.addEventListener("focusin", handleFocusIn);
    contactSection.addEventListener("focusout", handleFocusOut);
    return () => {
      contactSection.removeEventListener("focusin", handleFocusIn);
      contactSection.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

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

  // Focus input when chat opens & Escape key listener
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
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
          const errorMsg = "I'm experiencing a temporary delay. You can email us directly at info@kavirox.space or try asking again.";
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
          content: "I'm experiencing a temporary delay. You can email us directly at info@kavirox.space or try asking again.", 
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
            <span className="text-primary text-xs mt-1">•</span>
            <span className="flex-1">{formattedParts}</span>
          </div>
        );
      }

      return <p key={idx} className="my-0.5 leading-relaxed">{formattedParts}</p>;
    });
  };

  return (
    <>
      {/* 1. Floating Launcher (48px round icon on mobile, compact pill on desktop) */}
      <div
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 transition-all duration-300 ${
          hideLauncher ? 'opacity-0 pointer-events-none translate-y-6' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Mobile: 48px round icon button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`sm:hidden w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-2xl cursor-pointer ${
            isOpen
              ? "bg-surface-2 text-text border border-line"
              : "bg-surface text-text border border-line hover:border-primary/50"
          }`}
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 10px 40px -8px rgba(0,0,0,0.7)",
          }}
          aria-label={isOpen ? "Close Assistant" : "Ask Kavirox"}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-text" />
          ) : (
            <LogoMark size={22} glow={false} />
          )}
        </button>

        {/* Desktop: compact pill with 'Ask Kavirox' */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full transition-all duration-200 shadow-2xl cursor-pointer ${
            isOpen
              ? "bg-surface-2 text-text border border-line scale-95"
              : "bg-surface/90 text-text border border-line hover:border-primary/50 hover:shadow-[0_0_20px_rgba(168,230,46,0.25)] hover:scale-105"
          }`}
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: isOpen 
              ? "0 8px 30px rgba(0,0,0,0.6)" 
              : "0 10px 40px -8px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(255,255,255,0.15)"
          }}
          aria-label={isOpen ? "Close Assistant" : "Ask Kavirox"}
        >
          {/* Status Dot */}
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="absolute w-3.5 h-3.5 rounded-full bg-primary/30 animate-pulse" />
          </div>

          <LogoMark size={18} glow={false} />

          <span className="text-xs font-sans font-semibold tracking-wide">
            {isOpen ? "Close" : "Ask Kavirox"}
          </span>
        </button>
      </div>

      {/* 2. Concierge Chat Window (85dvh bottom sheet on mobile, floating box on desktop) */}
      {isOpen && (
        <div
          onTouchStart={(e) => {
            touchStartY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (touchStartY.current !== null) {
              const deltaY = e.changedTouches[0].clientY - touchStartY.current;
              if (deltaY > 80) {
                setIsOpen(false);
              }
              touchStartY.current = null;
            }
          }}
          className="fixed inset-x-0 bottom-0 z-50 h-[85dvh] max-h-[85dvh] w-full rounded-t-[24px] rounded-b-none flex flex-col overflow-hidden sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[380px] sm:h-[540px] sm:max-h-[600px] sm:rounded-2xl animate-in fade-in slide-in-from-bottom-3 duration-200"
          style={{
            background: "rgba(11, 18, 12, 0.96)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 24px 70px -12px rgba(0, 0, 0, 0.9)"
          }}
        >
          {/* Mobile top drag handle */}
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto my-2 sm:hidden cursor-grab shrink-0" />

          {/* Top Rim Specular Sheen */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Header Bar */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <LogoMark size={20} glow={false} />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xs font-semibold text-text truncate">Kavirox Assistant</h2>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 animate-pulse" />
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
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-text-muted font-sans scrollbar-none">
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              const isProjectInquiryRelated =
                isAssistant &&
                (msg.content.toLowerCase().includes("discuss a project") ||
                  msg.content.toLowerCase().includes("pre-written project brief") ||
                  msg.content.toLowerCase().includes("email us") ||
                  msg.content.toLowerCase().includes("info@kavirox.space"));

              return (
                <div
                  key={msg.id}
                  className={`group/msg flex items-end gap-2 ${
                    isAssistant ? "justify-start" : "justify-end"
                  }`}
                >
                  {isAssistant && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 mb-1">
                      <LogoMark size={14} glow={false} />
                    </div>
                  )}

                  <div className={`max-w-[85%] ${isAssistant ? "items-start" : "items-end"}`}>
                    {/* Render Quoted Reply Banner */}
                    {msg.replyTo && (
                      <div className="mb-1 px-2.5 py-1 rounded-lg bg-surface-2/80 border-l-2 border-primary/60 text-[10px] text-text-muted/80 truncate">
                        <span className="font-mono text-primary font-medium mr-1">
                          {msg.replyTo.role === "assistant" ? "Kavirox:" : "You:"}
                        </span>
                        {msg.replyTo.text}
                      </div>
                    )}

                    <div
                      className={`p-3 rounded-2xl text-xs ${
                        isAssistant
                          ? "bg-surface-2 text-text border border-line rounded-bl-sm"
                          : "bg-primary text-primary-ink font-medium rounded-br-sm shadow-[0_0_15px_rgba(168,230,46,0.2)]"
                      }`}
                    >
                      {/* Thinking State with Lattice Loader */}
                      {isAssistant && msg.content === "" && msg.isStreaming ? (
                        <div className="py-1">
                          <LatticeLoader
                            status="working"
                            cellSize={4}
                            gap={2}
                            grid={3}
                            color="#38bdf8"
                            showTimer={false}
                            label="Thinking..."
                          />
                        </div>
                      ) : (
                        <>
                          {renderFormattedText(msg.content)}
                          {msg.isStreaming && (
                            <span className="inline-block w-1.5 h-3.5 ml-1 bg-primary animate-pulse align-middle" />
                          )}
                        </>
                      )}

                      {/* Contextual Action Button */}
                      {isProjectInquiryRelated && !msg.isStreaming && (
                        <div className="mt-3 pt-2.5 border-t border-line flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEmailInquiry({ source: "Chatbot Assistant" })}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-primary text-primary-ink shadow-sm transition-all cursor-pointer hover:brightness-110"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Discuss a project</span>
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
                          className="inline-flex items-center gap-1 text-text-muted hover:text-primary transition-colors opacity-70 sm:opacity-0 sm:group-hover/msg:opacity-100 cursor-pointer px-1.5 py-0.5 rounded hover:bg-white/5"
                          title="Reply to this message"
                        >
                          <Reply className="w-2.5 h-2.5" />
                          <span className="font-mono text-[9px]">Reply</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-1 shrink-0">
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
            <div className="px-4 py-2 border-t border-line bg-surface flex flex-wrap gap-1.5 shrink-0">
              {STARTER_PROMPTS.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-surface-2 hover:bg-surface-2/80 border border-line text-text-muted hover:text-text transition-all text-left cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Form Bar */}
          <div className="p-3 border-t border-line bg-surface shrink-0">
            {/* Active Reply Preview Banner */}
            {replyingTo && (
              <div className="mb-2 px-3 py-1.5 rounded-xl bg-surface-2 border border-primary/40 flex items-center justify-between text-xs animate-in fade-in slide-in-from-bottom-1 duration-150">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-5 h-5 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <Reply className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[10px] font-mono text-primary block font-medium">
                      Replying to {replyingTo.role === "assistant" ? "Kavirox Assistant" : "You"}:
                    </span>
                    <p className="text-[11px] text-text-muted truncate max-w-[240px] sm:max-w-[290px]">
                      {replyingTo.content.replace(/\*\*/g, "")}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="p-1 rounded-lg text-text-muted hover:text-text hover:bg-white/10 transition-colors cursor-pointer shrink-0"
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
                placeholder={replyingTo ? "Type your reply..." : "Ask about our products or services..."}
                className="w-full px-3 py-2 pr-10 rounded-xl bg-surface-2 border border-line text-xs text-text placeholder:text-text-muted/50 font-sans focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 resize-none max-h-24 scrollbar-none"
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
                      ? "bg-primary hover:brightness-110 text-primary-ink font-bold shadow-[0_0_12px_rgba(168,230,46,0.3)]"
                      : "bg-surface text-text-muted/40 cursor-not-allowed"
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
