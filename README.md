<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# .promptrc - Prompt Engineering Toolkit

A collection of LLM rituals and dev prompt patterns. Available as both a web app and a Chrome browser extension.

## 🚀 Features

### 📚 Comprehensive Pattern Library
- **60+ Built-in Patterns**: Curated collection of prompt engineering rituals and dev patterns
- **Rituals**: Cognitive priming patterns (Follow the white rabbit, Silent room, etc.)
- **Dev Patterns**: Structured prompting techniques for development workflows
- **Searchable & Filterable**: Quickly find the right pattern for your needs

### 🌐 Web Application
View and browse all patterns in a beautiful, responsive web interface.

### 🔌 Chrome Extension
Use prompt patterns directly in any LLM interface (ChatGPT, Claude, etc.)

**Key Extension Features:**
- **Slash Commands**: Type `/` in any text field to trigger prompt picker
- **Quick Insert**: Browse and insert patterns with keyboard shortcuts
- **Custom Patterns**: Create and manage your own prompt hooks
- **Works Everywhere**: Compatible with all LLM web interfaces

## 🌐 Web App Usage

### Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

## 🔌 Chrome Extension

### Installation

#### From Source
1. Clone this repository
2. Install dependencies: `npm install`
3. Build the extension: `npm run build:extension`
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" (toggle in top-right)
6. Click "Load unpacked"
7. Select the `dist/` folder

### Usage

#### Slash Commands
1. Open any LLM interface (ChatGPT, Claude, etc.)
2. Click in the text input field
3. Type `/` followed by a search term:
   - `/rabbit` → "Follow the white rabbit..."
   - `/step` → "Do it step by step..."
   - `/brutal` → "Be brutally honest..."
4. Use ↑↓ arrows to navigate, Enter to select

#### Extension Popup
- Click the extension icon or press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
- Search for patterns
- Click "Insert" to add to current field
- Click "Copy" to copy to clipboard

#### Custom Patterns
1. Click the extension icon → Settings (⚙️)
2. Click "Add Pattern"
3. Fill in pattern details (trigger, purpose, examples)
4. Save and use with slash commands

### Keyboard Shortcuts
- `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) - Open popup
- `Ctrl+Shift+I` (Mac: `Cmd+Shift+I`) - Insert prompt at cursor
- `↑`/`↓` - Navigate slash command results
- `Enter` - Select pattern
- `Esc` - Close slash command menu

## 📖 Pattern Types

### 🐇 Rituals
Cognitive priming patterns that shift the LLM's "mode":
- **Follow the white rabbit**: Deep dive into complexity
- **Silent room**: Pause before action, clear noise
- **Self-discovery**: Reflective closure
- **Step by step**: Transparent iteration
- **Brutal honesty**: Force critique over compliance

### 🆔 Dev Patterns
Structured prompting techniques organized by function:

#### Identity & Context
- Persona adoption
- Context priming
- Perspective taking
- Fact pinning

#### Control & Style
- Format enforcement
- Output constraining
- Silence mode (no disclaimers)

#### Logic & Reasoning
- Chain of thought
- Step-back prompting
- Self-consistency

#### Verification
- Confidence scoring
- Anti-hallucination guards
- Stress testing

#### Operations
- Checkpointing
- Context compression
- Hard reset

### 🔍 Key Files Detector

A powerful helper prompt to identify critical files in a codebase:

```
**Task:** List the key files for understanding this codebase.

**Context:** I need to quickly orient myself in a new codebase or project.

**Your Task:**
1. Analyze the project structure
2. Identify 5-10 most important files that reveal:
   - Core architecture and design patterns
   - Main entry points and control flow
   - Key business logic and algorithms
   - Configuration and dependencies
   - Testing strategy (if applicable)

**Output Format:**
For each file, provide:
- File path
- Purpose (1-2 sentences)
- Why it's critical to understand

**Prioritize:** Files that give maximum insight with minimal reading time.
```

**Use Case:** When starting work on a new project, use this prompt with your LLM to get a curated list of the most important files to review first.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run web app in development mode
npm run dev

# Build web app
npm run build

# Build Chrome extension
npm run build:extension

# Preview production build
npm run preview
```

## 📁 Project Structure

```
.promptrc/
├── components/         # React components
├── constants.ts        # Pattern definitions
├── types.ts           # TypeScript types
├── App.tsx            # Main web app
├── PopupApp.tsx       # Extension popup
├── src/
│   ├── background.ts  # Extension background script
│   ├── content.ts     # Extension content script
│   ├── content.css    # Content script styles
│   └── options.tsx    # Extension options page
├── public/
│   ├── manifest.json  # Extension manifest
│   └── icon*.png      # Extension icons
└── scripts/
    └── post-build.js  # Build post-processing
```

## 🔒 Privacy (Extension)

- **No Data Collection**: The extension does not collect or transmit any personal data
- **Local Storage Only**: Custom patterns are stored locally using Chrome's sync storage
- **No External Requests**: Works entirely offline (except for loading fonts/Tailwind from CDN)

## 🌟 Use Cases

- **Debugging**: Use "Think step-by-step" for complex debugging scenarios
- **Code Review**: Apply "Be brutally honest" for thorough code reviews
- **Architecture**: Use "Step Back" prompting for high-level decisions
- **Learning**: Combine "Follow the white rabbit" with specific topics for deep dives
- **Prompt Engineering**: Build complex prompts by combining multiple patterns

## 📝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Adding New Patterns

Edit `constants.ts` to add new patterns to the library:
```typescript
{
  id: 'your-pattern-id',
  trigger: 'Your pattern text...',
  purpose: 'What it does',
  implication: 'Why it works',
  type: PatternType.DEV_PATTERN,
  icon: '🎯',
  examples: ['Example usage...']
}
```

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Credits

Original patterns curated by the prompt engineering community. 
Extension conversion and implementation by [voku](https://github.com/voku).

---

Made with ❤️ for the AI engineering community

**Steal these hints. Fork it. Adapt it.** Treat it like `.dotfiles` for your LLM interactions.

