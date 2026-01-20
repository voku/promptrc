import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
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
    };
});
