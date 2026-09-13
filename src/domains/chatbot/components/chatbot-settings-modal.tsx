import React, { useState } from "react";
import { X, Key, Cpu, ShieldCheck, ExternalLink, Trash2, Check } from "lucide-react";
import { OPENROUTER_FREE_MODELS, getStoredApiKey, setStoredApiKey, getStoredModel, setStoredModel } from "../services/openrouter";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function ChatbotSettingsModal({ isOpen, onClose, onSaved }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [selectedModel, setSelectedModel] = useState(getStoredModel());
  const [showKey, setShowKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredApiKey(apiKey.trim());
    setStoredModel(selectedModel);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onSaved();
      onClose();
    }, 600);
  };

  const handleClearKey = () => {
    setApiKey("");
    setStoredApiKey("");
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-[#0e0e12]/95 border border-white/15 p-6 shadow-2xl text-zinc-200 font-sans backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Chatbot Engine Settings</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Configure OpenRouter Free Models & API</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 pt-4">
          {/* API Key Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                <span>OpenRouter API Key</span>
                <span className="text-[10px] text-zinc-500 font-mono">(Stored locally)</span>
              </label>
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-orange-400 hover:text-orange-300 flex items-center gap-1 hover:underline"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative flex items-center">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-v1-..."
                className="w-full px-3 py-2 pr-20 rounded-lg bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30"
              />
              <div className="absolute right-2 flex items-center gap-1">
                {apiKey && (
                  <button
                    type="button"
                    onClick={handleClearKey}
                    title="Clear key"
                    className="p-1 text-zinc-400 hover:text-red-400 text-xs transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 hover:text-zinc-200 bg-white/5"
                >
                  {showKey ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">
              Never exposed to a server. Stored safely in your browser's LocalStorage.
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-orange-400" />
              <span>Active Free Model</span>
            </label>
            <div className="space-y-2">
              {OPENROUTER_FREE_MODELS.map((model) => (
                <label
                  key={model.id}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all text-left ${
                    selectedModel === model.id
                      ? "bg-orange-500/10 border-orange-500/40 text-white"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-zinc-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="model"
                    value={model.id}
                    checked={selectedModel === model.id}
                    onChange={() => setSelectedModel(model.id)}
                    className="mt-1 accent-orange-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">{model.name}</span>
                      {model.tag && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {model.tag}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-zinc-500">100% Free</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{model.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Kavirox knowledge is injected into the system prompt at runtime.</span>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Settings</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
