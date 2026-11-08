import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/domains': path.resolve(__dirname, './src/domains'),
      '@/shared': path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
