import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Removed define block that was embedding process.env.API_KEY into the bundle.
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, 
  },
});