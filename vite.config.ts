import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
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
      '@aliimam/icons': path.resolve(__dirname, './node_modules/@aliimam/icons/dist/index.mjs'),
      '@aliimam/logos': path.resolve(__dirname, './node_modules/@aliimam/logos/dist/index.mjs'),
      '@designcodeio/threeui/style.css': path.resolve(__dirname, './src/shaders/threeui.css'),
      '@designcodeio/threeui': path.resolve(__dirname, './src/shaders/threeui-entry.tsx'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
