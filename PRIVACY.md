# Privacy & Permissions

## Extension Permissions Explained

This document explains why .promptrc requires certain permissions and how your data is handled.

### Required Permissions

#### 1. `storage` Permission
**Why needed:** To save your custom prompt patterns locally.

**What it does:**
- Stores custom patterns you create
- Syncs patterns across your devices (via Chrome sync)
- Persists your preferences

**What it DOES NOT do:**
- Does not access any other data
- Does not transmit data to external servers
- Does not track your usage

---

#### 2. `activeTab` Permission
**Why needed:** To insert prompts into the currently active tab.

**What it does:**
- Allows the extension to interact with the page you're currently viewing
- Enables the "Insert" button to work in the popup
- Only when you explicitly click the extension icon or use a keyboard shortcut

**What it DOES NOT do:**
- Does not access tabs you're not actively using
- Does not run unless you invoke the extension
- Does not collect browsing data

---

#### 3. `<all_urls>` Host Permission
**Why needed:** To enable slash commands in text fields on any website.

**What it does:**
- Allows content scripts to run on all websites
- Enables the `/` slash command functionality in any text field
- Required to detect when you type `/` and show the prompt menu

**Why so broad?**
- LLM interfaces (ChatGPT, Claude, Gemini) are on different domains
- Users want slash commands to work everywhere (Gmail, docs, any site)
- Chrome doesn't support "text field only" permissions
- Alternative would be listing every possible LLM site (impractical)

**What it DOES NOT do:**
- Does not read page content unless you use a slash command
- Does not transmit any data from web pages
- Only activates when you type `/` in an editable field

---

## Data Privacy

### What We Store
- **Custom patterns** you create (stored locally)
- **Extension settings** (stored locally)

### What We DO NOT Store
- Browsing history
- Typed text or conversations
- Personal information
- Cookies or tracking data
- Any data from web pages

### Where Data Goes
- **Local only**: All data stays on your device
- **Chrome sync only**: If you use Chrome sync, custom patterns sync across your signed-in devices
- **No external servers**: We don't have any servers to send data to

### Third-Party Services
The extension loads:
- **Tailwind CSS** from CDN (for styling) - Standard CSS library
- **Google Fonts** - For typography
- No analytics, tracking, or advertising services

---

## Open Source

The entire extension is open source. You can:
- Review all code on GitHub
- Build it yourself from source
- Verify there's no hidden data collection
- Contribute improvements

Repository: https://github.com/voku/promptrc

---

## Security Best Practices

### What We Do
✅ Minimal permissions requested
✅ No external API calls
✅ No user tracking
✅ Open source code
✅ Content Security Policy enforced
✅ Manifest V3 (latest security standards)

### What We Don't Do
❌ No telemetry or analytics
❌ No ads or monetization
❌ No data collection
❌ No third-party SDKs
❌ No background data transmission

---

## Alternatives Considered

### Why not use optional permissions?
Chrome's optional permissions don't work well for content scripts. We need the content script to run on all sites for slash commands to work anywhere.

### Why not list specific sites?
- There are hundreds of LLM interfaces
- New ones launch regularly
- Users want slash commands in emails, docs, notes, etc.
- Maintaining a list would be impractical

### Why not use a popup-only approach?
This would mean:
- No slash commands (main feature)
- Always clicking the extension icon
- Copy-paste workflow only
- Defeating the purpose of seamless integration

---

## Trust & Transparency

### How to Verify
1. **Read the code**: All source code is on GitHub
2. **Build yourself**: Follow README instructions to build from source
3. **Check network**: Open DevTools → Network tab, verify no requests
4. **Inspect storage**: Open DevTools → Application → Storage, see what's stored

### Reporting Issues
If you find any privacy or security concerns:
1. Open an issue on GitHub
2. Email: [maintainer email]
3. We take security seriously and will respond promptly

---

## Chrome Web Store Compliance

This extension complies with:
- Chrome Web Store Developer Program Policies
- Limited Use disclosure requirements
- User Data Privacy policies
- Manifest V3 requirements

---

## Updates & Changes

We will:
- Notify users of any permission changes
- Explain new permissions in update notes
- Never add tracking without explicit consent
- Keep this document updated

Last updated: January 2025

---

## Questions?

If you have privacy concerns or questions:
- Open an issue on GitHub
- Check the FAQ in README.md
- Review the source code yourself

**Remember:** You're in control. You can:
- Review the code before installing
- Uninstall anytime
- Disable on specific sites (chrome://extensions/)
- Inspect what data is stored (DevTools)

---

Made with transparency and respect for your privacy. 🔒
