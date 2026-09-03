export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  accountOwner: string;
}

export interface ProjectDetail {
  title: string;
  tag: string;
  image: string;
  desc: string;
  tech: string[];
  url: string;
}

export type SupportedLanguage = 'en' | 'es' | 'hi';

export type TranslationMap = Record<string, string>;

export type TranslationData = Record<SupportedLanguage, TranslationMap>;

export interface ChatHistoryMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatApiResponse {
  reply?: string;
  fallback?: boolean;
  error?: string;
}
