import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Explicitly handle the API_KEY from the build environment.
    // If it's missing during build, it will be null in the bundle.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || null),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, // Disabling sourcemaps can help prevent scanners from finding keys in mapping files
  },
});