import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Standard approach to expose the injected Netlify API_KEY to the client-side code.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || null),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});