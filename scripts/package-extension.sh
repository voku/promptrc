#!/bin/bash
# Package the Chrome extension for distribution

set -e

echo "🚀 Building .promptrc Chrome Extension..."

# Build the extension
npm run build:extension

# Create a dist.zip for distribution
cd dist
zip -r ../promptrc-extension.zip . -x "*.DS_Store"
cd ..

echo ""
echo "✅ Extension packaged successfully!"
echo ""
echo "📦 Package: promptrc-extension.zip"
echo "📁 Unpacked: dist/"
echo ""
echo "To test the extension:"
echo "1. Open chrome://extensions/"
echo "2. Enable 'Developer mode'"
echo "3. Click 'Load unpacked' and select the dist/ folder"
echo ""
echo "To publish to Chrome Web Store:"
echo "1. Go to https://chrome.google.com/webstore/devconsole"
echo "2. Upload promptrc-extension.zip"
echo ""
