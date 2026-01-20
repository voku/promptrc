# Quick Start Guide

Get started with .promptrc Chrome Extension in 2 minutes! 🚀

## Installation

### Option 1: From Source (Development)

```bash
# 1. Clone the repository
git clone https://github.com/voku/promptrc.git
cd promptrc

# 2. Install dependencies
npm install

# 3. Build the extension
npm run build:extension

# 4. Load in Chrome
# - Open chrome://extensions/
# - Enable "Developer mode"
# - Click "Load unpacked"
# - Select the "dist" folder
```

### Option 2: From Chrome Web Store (Coming Soon)

Visit the Chrome Web Store and click "Add to Chrome".

---

## First Use

### 1. Open a LLM Interface

Navigate to any of these:
- https://chat.openai.com (ChatGPT)
- https://claude.ai (Claude)
- https://gemini.google.com (Gemini)
- Any other LLM chat interface

### 2. Try a Slash Command

1. Click in the text input field
2. Type `/rabbit`
3. Press Enter when you see "Follow the white rabbit..."
4. The prompt is inserted! 🎉

### 3. Browse All Patterns

Click the extension icon (or press `Ctrl+Shift+P`) to see all 60+ patterns.

---

## Common Use Cases

### 🐛 Debugging Complex Issues

```
Type: /step
Inserts: "Do it step by step and ask for confirmation after each..."
```

Use when you need the LLM to work through a problem incrementally.

### 🔍 Code Review

```
Type: /brutal
Inserts: "Be brutally honest / Blind Spot Analysis for..."
```

Use when you want critical, honest feedback on your code.

### 🏗️ Architecture Decisions

```
Type: /step back
Inserts: "Step Back: What are key decision factors for..."
```

Use when making high-level technical decisions.

### 🧠 Deep Technical Dive

```
Type: /rabbit
Inserts: "Follow the white rabbit..."
```

Use when you need deep, contextual exploration of a complex topic.

### ✅ Ensuring Completeness

```
Type: /dod
Inserts: "Continue until you reached the definition of done..."
```

Use when you need comprehensive, complete responses.

---

## Creating Custom Patterns

1. Click extension icon → Settings (⚙️)
2. Click "Add Pattern"
3. Fill in:
   - **Icon**: Choose an emoji (e.g., 🎯)
   - **Trigger**: The text to insert (e.g., "Explain this like I'm five")
   - **Purpose**: What it does (e.g., "Simplifies complex concepts")
   - **Examples**: Usage examples
4. Save!

Now use your custom pattern with `/your-trigger`

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) | Open popup |
| `Ctrl+Shift+I` (Mac: `Cmd+Shift+I`) | Quick insert |
| `↑` / `↓` | Navigate menu |
| `Enter` | Select pattern |
| `Esc` | Close menu |

---

## Tips & Tricks

### 💡 Combine Patterns

You can use multiple patterns in one prompt:

```
/rabbit
[Let the LLM respond]

Then add:
/step
[Continue the conversation]
```

### 💡 Fast Filtering

Type more specific terms to filter faster:
- `/rabbit` - Finds "Follow the white rabbit"
- `/chain` - Finds "Chain of thought" pattern
- `/anchor` - Finds "Anchor: These facts are immutable"

### 💡 Works Everywhere

Slash commands work in:
- LLM chat interfaces (ChatGPT, Claude, etc.)
- Text areas on any website
- Gmail compose
- Google Docs (limited support)
- Any `<textarea>` or `<input type="text">`

### 💡 Pattern Library

Browse the full pattern library in the popup:
- **Rituals** (6): Cognitive priming patterns
- **Dev Patterns** (50+): Structured prompting techniques
- **Custom**: Your own patterns

---

## Troubleshooting

### Slash command menu not appearing?

1. Make sure you're in an editable field
2. Try clicking in the field before typing `/`
3. Check if the extension is enabled at chrome://extensions/

### Pattern not inserting?

1. Make sure the field is focused (cursor blinking)
2. Try using the popup "Insert" button instead
3. Check browser console for errors (F12)

### Extension not loading?

1. Check Chrome version (requires 88+)
2. Ensure "Developer mode" is enabled
3. Try removing and re-adding the extension

### Need help?

- Check [TESTING.md](./TESTING.md) for detailed testing guide
- Check [EXTENSION_README.md](./EXTENSION_README.md) for full documentation
- Open an issue on GitHub

---

## Next Steps

1. ⭐ **Star the repository** if you find it useful
2. 🎯 **Create your first custom pattern** for your workflow
3. 🤝 **Share with your team** - Everyone can benefit from prompt patterns
4. 💬 **Give feedback** - Help us improve!

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│  .promptrc - Quick Reference                    │
├─────────────────────────────────────────────────┤
│                                                 │
│  Slash Commands:                                │
│  • Type / in any field                          │
│  • Start typing to filter                       │
│  • ↑↓ to navigate, Enter to select             │
│  • Esc to close                                 │
│                                                 │
│  Keyboard Shortcuts:                            │
│  • Ctrl+Shift+P - Open popup                    │
│  • Ctrl+Shift+I - Quick insert                  │
│                                                 │
│  Popular Patterns:                              │
│  • /rabbit - Deep complexity dive               │
│  • /step - Step-by-step iteration               │
│  • /brutal - Critical feedback                  │
│  • /chain - Chain of thought                    │
│  • /anchor - Pin immutable facts                │
│                                                 │
│  Custom Patterns:                               │
│  • Click extension icon → Settings              │
│  • Add your own triggers and prompts            │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

**Happy Prompting! 🎯**

Made with ❤️ for the AI engineering community
