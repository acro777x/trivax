export type MessageRole = 'user' | 'assistant' | 'system';

export interface ActionItem {
  label: string;
  action: 'open_email' | 'query' | 'scroll';
  payload?: string;
}

export interface MessageReplyContext {
  id: string;
  role: MessageRole;
  text: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  suggestedActions?: ActionItem[];
  modelUsed?: string;
  replyTo?: MessageReplyContext;
}

export interface OpenRouterModelOption {
  id: string;
  name: string;
  description: string;
  isFree: boolean;
  tag?: string;
}

export interface ChatbotSettings {
  apiKey: string;
  model: string;
  temperature: number;
  autoScroll: boolean;
}
