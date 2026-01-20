# Browser Extension Testing Guide

## Building the Extension

To build the browser extension with the correct configuration:

```bash
npm run build:extension
```

This command sets the `BUILD_TARGET=extension` environment variable, which configures Vite to use relative paths (`./`) instead of absolute paths (`/promptrc/`).

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top right
3. Click "Load unpacked"
4. Select the `dist/` folder from this repository
5. The extension should now be loaded and active

## Verifying the Fix

The fix addresses two main issues:

### 1. Empty Popup Issue
- **Before**: The popup appeared small and empty
- **After**: The popup should display the full prompt library interface (600px wide, with proper content)
- **Test**: Click the extension icon in the Chrome toolbar to open the popup

### 2. Module Import Error
- **Before**: Console showed "Uncaught SyntaxError: Cannot use import statement outside a module"
- **After**: No console errors, all modules load correctly
- **Test**: 
  1. Open the browser console (F12)
  2. Click the extension icon to open the popup
  3. Verify no errors appear in the console

## Testing the Extension Features

### Popup Interface
- Click the extension icon to open the popup
- Verify the prompt library is displayed with all patterns
- Search for patterns using the search box
- Click on a pattern to view its details

### Content Script (Slash Commands)
1. Open any webpage with a text input field (e.g., ChatGPT, Claude, or a simple textarea)
2. Type `/` in the text field
3. A dropdown menu should appear with available patterns
4. Use arrow keys to navigate, Enter to select
5. The selected pattern should be inserted into the text field

### Options Page
1. Right-click the extension icon
2. Select "Options"
3. Verify the options page loads correctly
4. Test adding/editing custom patterns

### Keyboard Shortcuts
- `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac): Open prompt library popup
- `Ctrl+Shift+I` (or `Cmd+Shift+I` on Mac): Insert prompt at cursor
- `Alt+Shift+P`: Toggle extension on/off globally

## Build Configuration

The extension build uses environment variables to differentiate between web app and extension builds:

- **Extension Build**: `BUILD_TARGET=extension npm run build:extension`
  - Uses relative base path: `./`
  - All asset paths are relative: `./assets/popup-*.js`
  
- **Web App Build**: `npm run build`
  - Uses absolute base path: `/promptrc/`
  - All asset paths are absolute: `/promptrc/assets/popup-*.js`

## Troubleshooting

### Extension doesn't load
- Ensure all required files are present in the `dist/` folder:
  - `manifest.json`
  - `index.html`, `options.html`
  - `background.js`, `content.js`, `content.css`
  - `icon16.png`, `icon48.png`, `icon128.png`
  - `assets/` folder with bundled JavaScript files

### Console errors about missing modules
- Verify that `BUILD_TARGET=extension` was set during build
- Check that paths in `dist/index.html` and `dist/options.html` are relative (`./assets/...`)
- Rebuild the extension with `npm run build:extension`

### Popup appears empty
- This was the original issue, caused by absolute paths
- Ensure the build used `BUILD_TARGET=extension`
- Check browser console for any loading errors
- Verify that JavaScript files can be loaded from `./assets/` directory
