# .promptrc Chrome Extension

A Chrome browser extension that brings prompt engineering patterns directly into your browser. Use slash commands to quickly insert LLM prompt hooks into any text field.

## Features

### 🎯 Slash Commands
Type `/` in any text field (ChatGPT, Claude, etc.) to trigger the prompt picker:
- Start typing to filter patterns (e.g., `/rabbit`)
- Use ↑↓ arrow keys to navigate
- Press Enter to insert the selected prompt

### ⚡ Quick Access
- **Popup**: Click the extension icon or press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) to browse all patterns
- **Insert Shortcut**: Press `Ctrl+Shift+I` (Mac: `Cmd+Shift+I`) to open the prompt picker in the current field

### ✨ Pattern Library
- **60+ Built-in Patterns**: Curated collection of prompt engineering rituals and dev patterns
- **Custom Patterns**: Create and manage your own prompt hooks
- **Categories**: Filter by Rituals, Dev Patterns, or view all

### 💾 Pattern Management
- Access the Options page to create custom patterns
- Add your own triggers, purposes, and examples
- Export/import pattern collections (coming soon)

## Installation

### From Chrome Web Store (Coming Soon)
1. Visit the Chrome Web Store
2. Click "Add to Chrome"
3. Start using slash commands!

### From Source (Development)
1. Clone this repository
2. Install dependencies: `npm install`
3. Build the extension: `npm run build:extension`
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" (toggle in top-right)
6. Click "Load unpacked"
7. Select the `dist/` folder

## Usage Examples

### Using Slash Commands
1. Open ChatGPT, Claude, or any LLM interface
2. Click in the chat input field
3. Type `/` followed by a search term:
   - `/rabbit` → "Follow the white rabbit..."
   - `/step` → "Do it step by step..."
   - `/brutal` → "Be brutally honest..."
4. Select the prompt and press Enter

### Using the Popup
1. Click the extension icon or press `Ctrl+Shift+P`
2. Search for a pattern
3. Click "Insert" to add it to the current field
4. Or click "Copy" to copy to clipboard

### Creating Custom Patterns
1. Click the extension icon
2. Click the settings icon (⚙️)
3. Click "Add Pattern"
4. Fill in the pattern details:
   - **Icon**: Choose an emoji
   - **Trigger**: The text to insert
   - **Purpose**: What the pattern does
   - **Examples**: Usage examples
5. Click "Save Pattern"

## Pattern Types

### 🐇 Rituals
Cognitive priming patterns that shift the LLM's "mode":
- Follow the white rabbit (deep complexity)
- Silent room (pause before action)
- Self-discovery (reflective closure)
- Step by step (transparent iteration)

### 🆔 Dev Patterns
Structured prompting techniques:
- **Identity & Context**: Persona adoption, context priming
- **Control & Style**: Format enforcement, output constraining
- **Logic & Reasoning**: Chain of thought, step-back prompting
- **Verification**: Confidence scoring, anti-hallucination
- **Operations**: Checkpointing, compression, context management

## Keyboard Shortcuts

- `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) - Open popup
- `Ctrl+Shift+I` (Mac: `Cmd+Shift+I`) - Insert prompt at cursor
- `↑`/`↓` - Navigate through slash command results
- `Enter` - Select highlighted pattern
- `Esc` - Close slash command menu

## Privacy

- **No Data Collection**: This extension does not collect or transmit any personal data
- **Local Storage Only**: Your custom patterns are stored locally using Chrome's sync storage
- **No External Requests**: The extension works entirely offline (except for loading fonts/Tailwind from CDN)

## Development

```bash
# Install dependencies
npm install

# Run in development mode (web app)
npm run dev

# Build extension
npm run build:extension

# The extension will be built to the dist/ folder
```

## Compatibility

- Chrome 88+
- Edge 88+
- Brave
- Any Chromium-based browser with Manifest V3 support

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - See LICENSE file for details

## Credits

Original patterns curated by the prompt engineering community. Extension by [voku](https://github.com/voku).

---

Made with ❤️ for the AI engineering community
