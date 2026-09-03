import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config();

export interface ServerConfig {
  port: number;
  nodeEnv: string;
  openRouterApiKey: string | undefined;
  openRouterModel: string;
  openRouterSiteUrl: string;
  openRouterSiteName: string;
  corsOrigin: string;
}

export const config: ServerConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterModel: process.env.OPENROUTER_MODEL || 'poolside/laguna-s-2.1:free',
  openRouterSiteUrl: process.env.OPENROUTER_SITE_URL || 'https://kavirox.space',
  openRouterSiteName: process.env.OPENROUTER_SITE_NAME || 'KAVIROX AI Assistant',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};
