import { Router, Request, Response } from 'express';
import { HealthResponse } from '../types/api.js';

export const healthRouter = Router();

healthRouter.get('/health', (_req: Request, res: Response) => {
  const healthData: HealthResponse = {
    status: 'ok',
    service: 'KAVIROX API Engine',
    version: '1.0.0',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  };

  res.status(200).json(healthData);
});
