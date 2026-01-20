import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildExtension() {
  try {
    // Build popup and options pages normally
    console.log('Building popup and options pages...');
    await build({
      configFile: false,
      root: path.resolve(__dirname, '..'),
      base: './',
      plugins: [react()],
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
          input: {
            popup: path.resolve(__dirname, '../index.html'),
            options: path.resolve(__dirname, '../options.html'),
          },
          output: {
            entryFileNames: 'assets/[name]-[hash].js',
            chunkFileNames: 'assets/[name]-[hash].js',
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'content.css') {
                return '[name][extname]';
              }
              return 'assets/[name]-[hash][extname]';
            },
          },
        },
      },
    });

    // Build content script as a standalone bundle
    console.log('Building content script...');
    await build({
      configFile: false,
      root: path.resolve(__dirname, '..'),
      build: {
        outDir: 'dist',
        emptyOutDir: false,
        lib: {
          entry: path.resolve(__dirname, '../src/content.ts'),
          name: 'ContentScript',
          fileName: () => 'content.js',
          formats: ['iife'],
        },
      },
    });

    // Build background script as a standalone bundle
    console.log('Building background script...');
    await build({
      configFile: false,
      root: path.resolve(__dirname, '..'),
      build: {
        outDir: 'dist',
        emptyOutDir: false,
        lib: {
          entry: path.resolve(__dirname, '../src/background.ts'),
          name: 'BackgroundScript',
          fileName: () => 'background.js',
          formats: ['iife'],
        },
      },
    });

    console.log('\nBuild complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildExtension();
