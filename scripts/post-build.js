// Post-build script to prepare the extension for distribution
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');
const publicDir = path.join(__dirname, '../public');
const srcDir = path.join(__dirname, '../src');

// Copy manifest.json to dist
const manifestSrc = path.join(publicDir, 'manifest.json');
const manifestDest = path.join(distDir, 'manifest.json');

if (fs.existsSync(manifestSrc)) {
  fs.copyFileSync(manifestSrc, manifestDest);
  console.log('✓ Copied manifest.json to dist/');
}

// Copy icon files if they exist
const iconSizes = ['icon16.png', 'icon48.png', 'icon128.png'];
iconSizes.forEach(icon => {
  const iconSrc = path.join(publicDir, icon);
  const iconDest = path.join(distDir, icon);
  
  if (fs.existsSync(iconSrc)) {
    fs.copyFileSync(iconSrc, iconDest);
    console.log(`✓ Copied ${icon} to dist/`);
  }
});

// Copy content.css to dist
const contentCssSrc = path.join(srcDir, 'content.css');
const contentCssDest = path.join(distDir, 'content.css');

if (fs.existsSync(contentCssSrc)) {
  fs.copyFileSync(contentCssSrc, contentCssDest);
  console.log('✓ Copied content.css to dist/');
}

// Remove unwanted files from dist
const unwantedFiles = ['generate-icons.sh'];
unwantedFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`✓ Removed ${file} from dist/`);
  }
});

console.log('\n✓ Extension build complete! Load the dist/ folder in Chrome:');
console.log('  1. Open chrome://extensions/');
console.log('  2. Enable "Developer mode"');
console.log('  3. Click "Load unpacked" and select the dist/ folder\n');
