import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import bricolageWoff2 from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url';
import geistMonoWoff2 from '@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2?url';

// Exactly two preloaded font files per docs/redesign/02-design-system.md
if (typeof document !== 'undefined') {
  const preloadFont = (href: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = href;
    document.head.appendChild(link);
  };
  preloadFont(bricolageWoff2);
  preloadFont(geistMonoWoff2);
}

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
