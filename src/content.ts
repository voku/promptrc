// Content script that runs on all web pages
// Detects slash commands and provides prompt insertion functionality

import { ALL_PATTERNS } from '../constants';
import type { PromptPattern } from '../types';

// Configuration
const DEBOUNCE_DELAY = 300; // ms to wait before showing menu
const MIN_TRIGGER_LENGTH = 1; // minimum chars after / to show menu
const ENABLE_DOUBLE_SLASH = false; // Set to true to require // instead of /

// Track the currently focused element
let currentElement: HTMLElement | null = null;
let promptMenu: HTMLElement | null = null;
let slashCommandActive = false;
let searchQuery = '';
let selectedIndex = 0;
let debounceTimer: number | null = null;
let extensionEnabled = true;
let siteDisabled = false;

// Pattern cache for performance
let patternCache: Map<string, PromptPattern[]> = new Map();
const CACHE_SIZE_LIMIT = 50;

// Store all available patterns (built-in + custom)
let allAvailablePatterns: PromptPattern[] = [...ALL_PATTERNS];

// Load custom patterns and merge with built-in patterns
async function loadAllPatterns() {
  return new Promise<PromptPattern[]>((resolve) => {
    chrome.storage.sync.get(['customPatterns'], (result) => {
      const customPatterns = (result.customPatterns || []) as PromptPattern[];
      allAvailablePatterns = [...ALL_PATTERNS, ...customPatterns];
      // Clear cache when patterns change
      patternCache.clear();
      resolve(allAvailablePatterns);
    });
  });
}

// Listen for storage changes to reload patterns
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.customPatterns) {
    loadAllPatterns();
  }
});

// Initialize patterns on load
loadAllPatterns();

// MutationObserver to detect page changes and clean up
let pageObserver: MutationObserver | null = null;

// Initialize observer for SPA navigation detection
function initPageObserver() {
  if (pageObserver) return;
  
  pageObserver = new MutationObserver((mutations) => {
    // Check if significant DOM changes occurred
    const hasSignificantChanges = mutations.some(mutation => 
      mutation.type === 'childList' && 
      mutation.removedNodes.length > 0
    );
    
    if (hasSignificantChanges && promptMenu) {
      // Check if our menu's parent is still in the DOM
      if (!document.body.contains(promptMenu)) {
        // Clean up orphaned menu
        promptMenu = null;
        slashCommandActive = false;
      }
    }
  });
  
  // Observe document body for changes
  pageObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Initialize observer when script loads
initPageObserver();

// Check if extension is enabled for this site
chrome.storage.sync.get(['disabledSites', 'extensionEnabled'], (result) => {
  const disabledSites = result.disabledSites || [];
  const currentHostname = window.location.hostname;
  siteDisabled = disabledSites.includes(currentHostname);
  extensionEnabled = result.extensionEnabled !== false; // Default to true
});

// Detect if page has native slash commands (heuristic)
function detectNativeSlashCommands(): boolean {
  // Check for common slash command indicators
  const indicators = [
    '[data-slash-command]',
    '[data-autocomplete-type="slash-command"]',
    '.slash-command',
    '[role="menu"][aria-label*="command"]'
  ];
  
  return indicators.some(selector => document.querySelector(selector) !== null);
}

const hasNativeSlashCommands = detectNativeSlashCommands();

// Get cursor position in text field
function getCursorPosition(element: HTMLElement): number {
  if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
    return element.selectionStart || 0;
  }
  // For contenteditable, this is more complex
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return 0;
  
  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  return preCaretRange.toString().length;
}

// Check if slash is at or near cursor position
function isSlashAtCursor(text: string, cursorPos: number): boolean {
  if (cursorPos === 0) return false;
  
  // Look for slash within 50 chars before cursor
  const searchStart = Math.max(0, cursorPos - 50);
  const textBeforeCursor = text.substring(searchStart, cursorPos);
  const lastSlashIndex = textBeforeCursor.lastIndexOf('/');
  
  if (lastSlashIndex === -1) return false;
  
  // Check for double-slash if enabled
  if (ENABLE_DOUBLE_SLASH) {
    const previousChar = lastSlashIndex > 0 ? textBeforeCursor[lastSlashIndex - 1] : '';
    if (previousChar !== '/') return false;
  }
  
  // Check if there's text between slash and cursor without spaces/newlines
  const textAfterSlash = textBeforeCursor.substring(lastSlashIndex + 1);
  return !textAfterSlash.includes(' ') && !textAfterSlash.includes('\n');
}

// Track IME composition state
let isComposing = false;

// Listen for IME composition events
document.addEventListener('compositionstart', () => {
  isComposing = true;
  // Hide menu during composition
  if (slashCommandActive) {
    hidePromptMenu();
  }
});

document.addEventListener('compositionend', () => {
  isComposing = false;
});

// Listen for input in editable fields with optimization
document.addEventListener('input', (e) => {
  // Early exit if extension is disabled
  if (!extensionEnabled || siteDisabled) return;
  
  // Don't process during IME composition
  if (isComposing) return;
  
  const target = e.target as HTMLElement;
  
  // Check if the target is an editable element
  if (!isEditableElement(target)) return;
  
  currentElement = target;
  
  // Only proceed if input event contains "/" character
  if (e instanceof InputEvent && e.data !== '/') {
    // Still check if we need to hide menu
    const text = getElementText(target);
    const cursorPos = getCursorPosition(target);
    if (!isSlashAtCursor(text, cursorPos)) {
      hidePromptMenu();
    }
    return;
  }
  
  const text = getElementText(target);
  const cursorPos = getCursorPosition(target);
  
  // Check if slash is at cursor position
  if (!isSlashAtCursor(text, cursorPos)) {
    hidePromptMenu();
    return;
  }
  
  // Find the slash position near cursor
  const searchStart = Math.max(0, cursorPos - 50);
  const textBeforeCursor = text.substring(searchStart, cursorPos);
  const lastSlashIndex = textBeforeCursor.lastIndexOf('/');
  const textAfterSlash = textBeforeCursor.substring(lastSlashIndex + 1);
  
  // If there's a space or newline after the slash, don't show menu
  if (textAfterSlash.includes(' ') || textAfterSlash.includes('\n')) {
    hidePromptMenu();
    return;
  }
  
  // Debounce menu display to avoid conflicts with native commands
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  
  debounceTimer = window.setTimeout(() => {
    // Show prompt menu with filtered results
    searchQuery = textAfterSlash.toLowerCase();
    slashCommandActive = true;
    selectedIndex = 0;
    showPromptMenu(target, searchQuery);
  }, hasNativeSlashCommands ? DEBOUNCE_DELAY : 100); // Longer delay if native commands detected
}, true);

// Listen for keyboard navigation in prompt menu
document.addEventListener('keydown', (e) => {
  if (!slashCommandActive || !promptMenu) return;
  
  const items = promptMenu.querySelectorAll('.promptrc-menu-item');
  
  // Only handle keys if our menu is actually visible and has items
  if (items.length === 0) return;
  
  // Check if native autocomplete/dropdown is present
  const nativeDropdown = document.querySelector('[role="listbox"], [role="menu"], .autocomplete-dropdown');
  if (nativeDropdown && nativeDropdown !== promptMenu) {
    // Native UI is present, don't interfere
    return;
  }
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    e.stopPropagation();
    selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
    updateSelection(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    e.stopPropagation();
    selectedIndex = Math.max(selectedIndex - 1, 0);
    updateSelection(items);
  } else if (e.key === 'Enter' && slashCommandActive) {
    // Only prevent default if we're actually going to handle it
    const selectedItem = items[selectedIndex] as HTMLElement;
    if (selectedItem) {
      e.preventDefault();
      e.stopPropagation();
      selectedItem.click();
    }
  } else if (e.key === 'Escape') {
    e.stopPropagation(); // Don't prevent, just stop propagation
    hidePromptMenu();
  } else if (e.key === 'Tab') {
    // Tab cycles through menu items (focus trap)
    e.preventDefault();
    if (e.shiftKey) {
      // Shift+Tab goes backwards
      selectedIndex = selectedIndex === 0 ? items.length - 1 : selectedIndex - 1;
    } else {
      // Tab goes forwards
      selectedIndex = (selectedIndex + 1) % items.length;
    }
    updateSelection(items);
  }
}, true);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (promptMenu && !promptMenu.contains(e.target as Node)) {
    hidePromptMenu();
  }
});

function isEditableElement(element: HTMLElement): boolean {
  if (element.isContentEditable) return true;
  if (element.tagName === 'TEXTAREA') return true;
  if (element.tagName === 'INPUT') {
    const inputType = (element as HTMLInputElement).type;
    return ['text', 'search', 'email', 'url'].includes(inputType);
  }
  return false;
}

function getElementText(element: HTMLElement): string {
  if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
    return element.value;
  }
  return element.textContent || '';
}

function setElementText(element: HTMLElement, text: string): void {
  if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
    element.value = text;
    // Trigger input event for frameworks that listen to it
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  } else if (element.isContentEditable) {
    element.textContent = text;
    element.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function showPromptMenu(target: HTMLElement, query: string) {
  // Filter patterns by query with caching
  const cacheKey = query.toLowerCase();
  let filteredPatterns: PromptPattern[];
  
  if (patternCache.has(cacheKey)) {
    filteredPatterns = patternCache.get(cacheKey)!;
  } else {
    // Use allAvailablePatterns which includes custom patterns
    filteredPatterns = allAvailablePatterns.filter(pattern => {
      if (!query) return true;
      return pattern.trigger.toLowerCase().includes(query) ||
             pattern.purpose.toLowerCase().includes(query) ||
             pattern.id.toLowerCase().includes(query);
    }).slice(0, 8); // Limit to 8 results
    
    // Cache the result (with size limit)
    if (patternCache.size >= CACHE_SIZE_LIMIT) {
      const firstKey = patternCache.keys().next().value;
      patternCache.delete(firstKey);
    }
    patternCache.set(cacheKey, filteredPatterns);
  }
  
  if (filteredPatterns.length === 0) {
    hidePromptMenu();
    return;
  }
  
  // Reuse or create menu element
  if (!promptMenu) {
    promptMenu = createMenuElement();
  }
  
  // Update menu content
  updateMenuContent(filteredPatterns);
  
  // Calculate z-index dynamically
  const highestZIndex = getHighestZIndex();
  const menuZIndex = Math.max(highestZIndex + 1, 999999);
  promptMenu.style.zIndex = String(menuZIndex);
  
  // Position menu with viewport bounds checking
  positionMenu(target, promptMenu);
  
  // Ensure menu is in DOM and visible
  if (!promptMenu.parentElement) {
    document.body.appendChild(promptMenu);
  }
  promptMenu.style.display = 'block';
  
  // Trigger animation
  requestAnimationFrame(() => {
    if (promptMenu) {
      promptMenu.style.opacity = '1';
      promptMenu.style.transform = 'translateY(0)';
    }
  });
  
  slashCommandActive = true;
  
  // Announce to screen readers
  announceToScreenReader(`${filteredPatterns.length} prompt patterns available`);
}

// Create reusable menu element
function createMenuElement(): HTMLElement {
  const menu = document.createElement('div');
  menu.className = 'promptrc-menu';
  menu.setAttribute('role', 'listbox');
  menu.setAttribute('aria-label', 'Prompt pattern suggestions');
  
  menu.style.cssText = `
    position: fixed;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 999999;
    max-height: 400px;
    overflow-y: auto;
    min-width: 400px;
    max-width: 500px;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 0.15s ease, transform 0.15s ease;
    will-change: opacity, transform;
  `;
  
  return menu;
}

// Update menu content without recreating
function updateMenuContent(patterns: PromptPattern[]) {
  if (!promptMenu) return;
  
  // Clear existing content
  promptMenu.innerHTML = '';
  selectedIndex = 0;
  
  // Add patterns to menu
  patterns.forEach((pattern, index) => {
    const item = document.createElement('div');
    item.className = 'promptrc-menu-item';
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    item.setAttribute('id', `promptrc-option-${index}`);
    
    item.style.cssText = `
      padding: 12px 16px;
      cursor: pointer;
      border-bottom: 1px solid #f3f4f6;
      transition: background-color 0.15s;
    `;
    
    item.innerHTML = `
      <div style="font-weight: 600; font-size: 13px; color: #111827; margin-bottom: 4px;">
        ${escapeHtml(pattern.icon || '📝')} ${escapeHtml(pattern.id.replace(/^(ritual|pat)-/, ''))}
      </div>
      <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
        ${escapeHtml(pattern.trigger.substring(0, 60))}${pattern.trigger.length > 60 ? '...' : ''}
      </div>
    `;
    
    item.addEventListener('mouseenter', () => {
      selectedIndex = index;
      updateSelection(promptMenu!.querySelectorAll('.promptrc-menu-item'));
    });
    
    item.addEventListener('click', () => {
      insertPrompt(pattern);
    });
    
    promptMenu!.appendChild(item);
  });
  
  // Set active descendant for accessibility
  promptMenu.setAttribute('aria-activedescendant', 'promptrc-option-0');
  
  // Highlight first item
  updateSelection(promptMenu.querySelectorAll('.promptrc-menu-item'));
}

// Get highest z-index on page
// Using a fixed high value for better performance
// Querying all DOM elements can be slow on complex pages
function getHighestZIndex(): number {
  // Use a fixed high value that's almost always sufficient
  // Most web apps use z-index values under 10000
  // This avoids expensive DOM traversal on every menu display
  return 999998; // Menu will use 999999
}

// Position menu with bounds checking
function positionMenu(target: HTMLElement, menu: HTMLElement) {
  const rect = target.getBoundingClientRect();
  const menuHeight = 400; // max-height
  const menuWidth = 400; // min-width
  const padding = 5;
  
  let top = rect.bottom + window.scrollY + padding;
  let left = rect.left + window.scrollX;
  
  // Check if menu would overflow viewport bottom
  if (rect.bottom + menuHeight + padding > window.innerHeight) {
    // Position above the field instead
    top = rect.top + window.scrollY - menuHeight - padding;
  }
  
  // Check if menu would overflow viewport right
  if (rect.left + menuWidth > window.innerWidth) {
    left = window.innerWidth - menuWidth - padding;
  }
  
  // Ensure not off-screen left
  left = Math.max(padding, left);
  
  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;
}

// Announce to screen readers
function announceToScreenReader(message: string) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    announcement.remove();
  }, 1000);
}

function hidePromptMenu() {
  if (promptMenu && promptMenu.parentElement) {
    // Animate out
    promptMenu.style.opacity = '0';
    promptMenu.style.transform = 'translateY(-8px)';
    
    // Keep menu in DOM but hidden (for reuse)
    setTimeout(() => {
      if (promptMenu && promptMenu.parentElement) {
        promptMenu.style.display = 'none';
      }
    }, 150);
  }
  slashCommandActive = false;
  searchQuery = '';
  selectedIndex = 0;
  
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
}

function updateSelection(items: NodeListOf<Element>) {
  items.forEach((item, index) => {
    const el = item as HTMLElement;
    el.setAttribute('aria-selected', index === selectedIndex ? 'true' : 'false');
    
    if (index === selectedIndex) {
      el.style.backgroundColor = '#f0fdf4';
      el.style.borderLeftColor = '#10b981';
      el.style.borderLeftWidth = '3px';
      el.style.borderLeftStyle = 'solid';
      
      // Update active descendant for screen readers
      if (promptMenu) {
        promptMenu.setAttribute('aria-activedescendant', el.id);
      }
    } else {
      el.style.backgroundColor = 'white';
      el.style.borderLeft = 'none';
    }
  });
}

function insertPrompt(pattern: PromptPattern) {
  if (!currentElement) return;
  
  const text = getElementText(currentElement);
  const lastSlashIndex = text.lastIndexOf('/');
  
  if (lastSlashIndex !== -1) {
    // Replace the slash command with the prompt
    const newText = text.substring(0, lastSlashIndex) + pattern.trigger;
    setElementText(currentElement, newText);
    
    // Set cursor position at the end
    if (currentElement instanceof HTMLTextAreaElement || 
        currentElement instanceof HTMLInputElement) {
      currentElement.focus();
      currentElement.setSelectionRange(newText.length, newText.length);
    } else if (currentElement.isContentEditable) {
      currentElement.focus();
      // Move cursor to end of content
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(currentElement);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }
  
  hidePromptMenu();
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === 'showPromptPicker') {
      // Show prompt menu at current element
      if (currentElement) {
        showPromptMenu(currentElement, '');
      }
      sendResponse({ success: true });
      return true;
    }
    
    if (request.action === 'insertPrompt') {
      // Insert pattern from popup
      const pattern = request.pattern;
      
      // Find the currently focused editable element
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && isEditableElement(activeElement)) {
        currentElement = activeElement;
        const currentText = getElementText(currentElement);
        const newText = currentText + (currentText ? '\n' : '') + pattern.trigger;
        setElementText(currentElement, newText);
        currentElement.focus();
      } else {
        // If no element is focused, try to find any editable element
        const editableElements = document.querySelectorAll('textarea, input[type="text"], [contenteditable="true"]');
        if (editableElements.length > 0) {
          currentElement = editableElements[0] as HTMLElement;
          const currentText = getElementText(currentElement);
          const newText = currentText + (currentText ? '\n' : '') + pattern.trigger;
          setElementText(currentElement, newText);
          currentElement.focus();
        }
      }
      sendResponse({ success: true });
      return true;
    }
    
    if (request.action === 'toggleSite') {
      // Toggle extension for this site
      siteDisabled = request.disabled;
      if (siteDisabled) {
        hidePromptMenu();
      }
      sendResponse({ success: true });
      return true;
    }
    
    if (request.action === 'toggleExtension') {
      // Toggle extension globally
      extensionEnabled = request.enabled;
      if (!extensionEnabled) {
        hidePromptMenu();
      }
      sendResponse({ success: true });
      return true;
    }
  } catch (error) {
    console.error('Error handling message:', error);
    sendResponse({ success: false, error: String(error) });
  }
  return true;
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  hidePromptMenu();
});

// Export for TypeScript
export {};
