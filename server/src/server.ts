import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import { chatRouter } from './routes/chat.js';
import { healthRouter } from './routes/health.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

const app = express();

// Security Headers Middleware
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
  next();
});

// CORS Middleware
app.use(cors({
  origin: config.corsOrigin,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
}));

// Body Parser Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// API Routes
app.use('/api', chatRouter);
app.use('/api', healthRouter);

// Determine client static directory (check dist/client first, otherwise projectRoot)
const clientDistDir = path.join(projectRoot, 'dist/client');
const staticDir = fs.existsSync(clientDistDir) ? clientDistDir : projectRoot;

// Serve static assets
app.use(express.static(staticDir));
if (staticDir !== projectRoot) {
  app.use(express.static(projectRoot));
  const assetsDir = path.join(projectRoot, 'assets');
  if (fs.existsSync(assetsDir)) {
    app.use('/assets', express.static(assetsDir));
  }
}

// Clean SPA Section Routes
const cleanRoutes = [
  '/',
  '/home',
  '/services',
  '/about',
  '/projects',
  '/portfolio',
  '/research',
  '/process',
  '/why-us',
  '/whyus',
  '/contact'
];

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  const normalizedPath = req.path.toLowerCase().replace(/\/$/, '') || '/';
  
  // If it matches clean SPA routes or non-file paths that are not /api
  if (cleanRoutes.includes(normalizedPath) || (!req.path.includes('.') && !req.path.startsWith('/api'))) {
    const indexPath = fs.existsSync(path.join(clientDistDir, 'index.html'))
      ? path.join(clientDistDir, 'index.html')
      : path.join(projectRoot, 'index.html');
    return res.sendFile(indexPath);
  }

  next();
});

// 404 Handler for undefined API routes
app.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(config.port, '0.0.0.0', () => {
  console.log(`[KAVIROX Server] Running at http://127.0.0.1:${config.port} (Node.js ${process.version})`);
  console.log(`[KAVIROX Server] Environment: ${config.nodeEnv}`);
});

export default app;
