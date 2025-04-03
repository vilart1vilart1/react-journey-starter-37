
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'fb7aa607-06fc-4d18-a84c-f14d4e1e6fc5.lovableproject.com',
      'respizenmedical.com'
    ],
  },
});
