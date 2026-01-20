# Testing Guide for .promptrc Chrome Extension

This guide will help you test all features of the .promptrc Chrome extension.

## Prerequisites

1. Google Chrome (or any Chromium-based browser)
2. Extension built and installed (see README.md for installation instructions)

## Test Plan

### 1. Installation Test ✓

**Steps:**
1. Open `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select the `dist/` folder
5. Verify extension appears in the list

**Expected Results:**
- Extension icon appears in Chrome toolbar
- Extension shows as "Enabled"
- No error messages in extension card

---

### 2. Popup Interface Test ✓

**Steps:**
1. Click the extension icon in Chrome toolbar
2. Or press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)

**Expected Results:**
- Popup opens with width ~600px
- Search bar is visible
- Filter tabs (All, Ritual, Dev Pattern) are functional
- Pattern list displays with icons and descriptions
- Scroll works for long lists

**Test Cases:**
- Search for "rabbit" → Should show "Follow the white rabbit" pattern
- Click "Ritual" filter → Should show only ritual patterns
- Click "Dev Pattern" filter → Should show only dev patterns
- Scroll through pattern list → Should be smooth

---

### 3. Slash Command Test ✓

**Test Sites:**
- https://chat.openai.com (ChatGPT)
- https://claude.ai (Claude)
- https://gemini.google.com (Gemini)
- Any text area on any website

**Steps:**
1. Navigate to a test site
2. Click in the text input field
3. Type `/`
4. Observe the prompt menu appearing

**Expected Results:**
- Menu appears below cursor within ~100ms
- Menu shows up to 8 patterns
- Menu has white background, border, and shadow
- Each pattern shows icon, ID, and trigger text preview

**Test Cases:**

#### Basic Slash Command
```
Input: /
Result: Menu shows all patterns (limited to 8)
```

#### Filtered Slash Command
```
Input: /rabbit
Result: Menu filters to patterns containing "rabbit"

Input: /step
Result: Menu shows "step by step" and related patterns

Input: /xyz123
Result: Menu shows "No patterns found" or disappears
```

#### Navigation
```
1. Type /
2. Press ↓ (down arrow)
   → Next pattern highlights
3. Press ↑ (up arrow)
   → Previous pattern highlights
4. Press Enter
   → Selected pattern inserts into field
5. Type / again, then Escape
   → Menu closes
```

---

### 4. Pattern Insertion Test ✓

**From Popup:**
1. Open extension popup
2. Search for a pattern
3. Click "Insert" button

**Expected Result:**
- Pattern text inserts into the currently focused field
- Popup closes automatically

**From Slash Command:**
1. Type `/rabbit`
2. Press Enter

**Expected Result:**
- "Follow the white rabbit..." text replaces "/rabbit"
- Cursor moves to end of inserted text
- Slash command menu closes

---

### 5. Copy to Clipboard Test ✓

**Steps:**
1. Open extension popup
2. Click "Copy" button on any pattern
3. Paste into any text field

**Expected Result:**
- Button text changes to "Copied!" for 2 seconds
- Pattern trigger text is in clipboard
- Can paste into any application

---

### 6. Keyboard Shortcuts Test ✓

**Test Cases:**

#### Open Popup
```
Press: Ctrl+Shift+P (Mac: Cmd+Shift+P)
Result: Extension popup opens
```

#### Quick Insert
```
1. Focus on any text field
2. Press: Ctrl+Shift+I (Mac: Cmd+Shift+I)
Result: Prompt picker menu appears at cursor
```

---

### 7. Custom Pattern Management Test ✓

**Add Custom Pattern:**
1. Open extension popup
2. Click Settings icon (⚙️)
3. Click "Add Pattern" button
4. Fill in:
   - Icon: 🎯
   - Trigger: "Test custom prompt"
   - Purpose: "Testing custom patterns"
   - Type: Dev Pattern
   - Examples: "Example usage..."
5. Click "Save Pattern"

**Expected Results:**
- Success message appears
- Pattern appears in custom patterns list
- Pattern is searchable in popup
- Pattern appears in slash command menu

**Edit Custom Pattern:**
(Currently not implemented - patterns are add-only)

**Delete Custom Pattern:**
1. Open options page
2. Find the custom pattern
3. Click trash icon
4. Confirm deletion

**Expected Results:**
- Pattern removed from list
- Pattern no longer appears in searches
- Success message displays

---

### 8. Cross-Browser Field Test ✓

Test slash commands work in different input types:

**Test Fields:**
- `<textarea>` - Multi-line text areas
- `<input type="text">` - Single-line text inputs
- `<input type="search">` - Search inputs
- `<div contenteditable="true">` - Editable divs
- Rich text editors (may have limitations)

**Sites to Test:**
- Google Docs (limited - contenteditable)
- Gmail compose
- Twitter/X compose
- Reddit comment box
- GitHub issue/comment
- Any LLM chat interface

---

### 9. Pattern Categories Test ✓

**Rituals (6 patterns):**
- Follow the white rabbit
- Rest in the silent room
- Self-discovery
- Step by step
- Brutal honesty
- Definition of done

**Dev Patterns (50+ patterns):**
- Identity & Context patterns
- Control & Style patterns
- Logic & Reasoning patterns
- Verification patterns
- Operations patterns
- Constraints & Transformation patterns
- Foundational patterns

**Test:**
1. Filter by "Ritual" → Should show 6 patterns
2. Filter by "Dev Pattern" → Should show 50+ patterns
3. Search within filters → Should respect both search and filter

---

### 10. Storage Sync Test ✓

**Steps:**
1. Add a custom pattern on Computer A
2. Wait ~30 seconds
3. Open Chrome on Computer B (same Google account)
4. Install extension on Computer B
5. Check options page

**Expected Results:**
- Custom patterns sync across devices
- Built-in patterns always available
- No data loss during sync

---

### 11. Edge Cases Test ✓

**Test Cases:**

#### Empty States
- No search results → Shows "No patterns found"
- No custom patterns → Shows helpful message
- No focused field on "Insert" → Finds first editable field

#### Long Content
- Very long pattern text → Truncates with ellipsis
- Many custom patterns → Scrolls properly
- Many search results → Shows first 10, scrollable

#### Special Characters
- Pattern with emojis → Displays correctly
- Pattern with quotes → Escapes properly
- Pattern with HTML → Shows as text (not rendered)

#### Conflicts
- Same pattern ID → Should not create duplicates
- Rapid slash command typing → Menu updates smoothly
- Multiple tabs → Each tab has independent slash command state

---

### 12. Performance Test ✓

**Metrics to Observe:**

- Slash command response time: < 100ms
- Menu rendering: Smooth, no flicker
- Pattern search: Instant results
- Popup open time: < 200ms
- Memory usage: < 50MB
- CPU usage: Minimal when idle

**Test:**
1. Open 10 tabs with LLM interfaces
2. Use slash commands in multiple tabs
3. Check Chrome Task Manager (Shift+Esc)

**Expected Results:**
- No memory leaks
- No performance degradation
- Smooth operation across all tabs

---

### 13. Error Handling Test ✓

**Test Cases:**

#### Network Issues
- Offline mode → Extension still works (no external dependencies)
- CDN failure (Tailwind) → Basic styles still work

#### Storage Errors
- Storage quota exceeded → Shows error message
- Sync disabled → Uses local storage

#### Browser Compatibility
- Chrome 88+ → Full support
- Edge 88+ → Full support
- Brave → Full support
- Opera → Full support (Chromium-based)

---

## Bug Reporting Template

If you find a bug, please report it with:

```
**Bug Description:**
[Clear description of the issue]

**Steps to Reproduce:**
1. [First step]
2. [Second step]
3. [...]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Environment:**
- Browser: [Chrome/Edge/Brave] Version [XX]
- Extension Version: [1.0.0]
- Operating System: [Windows/Mac/Linux]

**Screenshots:**
[If applicable]

**Console Errors:**
[Open DevTools → Console, copy any errors]
```

---

## Automated Testing (Future)

Consider adding:
- Unit tests for pattern parsing
- Integration tests for storage
- E2E tests for slash commands using Playwright/Puppeteer
- Visual regression tests for UI components

---

## Testing Checklist

Use this checklist for complete testing:

- [ ] Extension installs without errors
- [ ] Popup opens and displays patterns
- [ ] Search filters patterns correctly
- [ ] Category filters work (All/Ritual/Dev Pattern)
- [ ] Slash command triggers on `/` input
- [ ] Slash command menu appears and positions correctly
- [ ] Arrow keys navigate slash command menu
- [ ] Enter key inserts selected pattern
- [ ] Escape key closes slash command menu
- [ ] Copy button copies to clipboard
- [ ] Insert button inserts into focused field
- [ ] Keyboard shortcuts work (Ctrl+Shift+P, Ctrl+Shift+I)
- [ ] Custom pattern creation works
- [ ] Custom pattern deletion works
- [ ] Custom patterns appear in slash commands
- [ ] Extension works in multiple input types
- [ ] Extension works on popular LLM sites
- [ ] Settings icon opens options page
- [ ] No console errors in normal usage
- [ ] Performance is acceptable
- [ ] Storage sync works (if multi-device)

---

## Success Criteria

The extension is ready for release when:

1. ✓ All core features work as expected
2. ✓ No critical bugs in primary use cases
3. ✓ Performance is smooth and responsive
4. ✓ Works on all target LLM interfaces
5. ✓ Documentation is complete and accurate
6. ✓ Icons and branding are polished
7. ✓ No TypeScript or build errors
8. User feedback is positive (post-launch)

---

## Notes for Testers

- Focus on **real-world usage** scenarios
- Test on **different screen sizes** and resolutions
- Try **various typing speeds** for slash commands
- Use extension in **actual workflow** for at least a day
- Report **any friction or confusion** in the UX
- Suggest **improvements** for patterns or features

---

Happy Testing! 🧪🚀
