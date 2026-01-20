import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      base: './',
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        rollupOptions: {
          input: {
            popup: path.resolve(__dirname, 'index.html'),
            options: path.resolve(__dirname, 'options.html'),
            background: path.resolve(__dirname, 'src/background.ts'),
            content: path.resolve(__dirname, 'src/content.ts'),
          },
          output: {
            entryFileNames: (chunkInfo) => {
              // Keep background and content scripts at root level
              if (chunkInfo.name === 'background' || chunkInfo.name === 'content') {
                return '[name].js';
              }
              return 'assets/[name]-[hash].js';
            },
            chunkFileNames: 'assets/[name]-[hash].js',
            assetFileNames: (assetInfo) => {
              // Keep CSS files for content script at root
              if (assetInfo.name === 'content.css') {
                return '[name][extname]';
              }
              return 'assets/[name]-[hash][extname]';
            }
          }
        }
      }
});
