import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      // Use relative paths for extension builds, absolute paths for web app
      base: process.env.BUILD_TARGET === 'extension' ? './' : (process.env.BASE_PATH || (process.env.NODE_ENV === 'production' ? '/promptrc/' : './')),
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
            },
          }
        }
      }
});
