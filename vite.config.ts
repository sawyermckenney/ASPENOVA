import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      exclude: process.env.NODE_ENV === 'development' ? /.*/ : undefined,
      jpg: { quality: 85 },
      png: { quality: 85 },
      webp: { lossless: false, quality: 85 },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'sonner@2.0.3': 'sonner',
      'class-variance-authority@0.7.1': 'class-variance-authority',
      '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});
