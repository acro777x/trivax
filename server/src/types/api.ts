export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequestPayload {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponsePayload {
  reply: string;
  fallback?: boolean;
  error?: string;
}

export interface HealthResponse {
  status: 'ok' | 'degraded' | 'error';
  service: string;
  version: string;
  uptime: number;
  timestamp: string;
}
