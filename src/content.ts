// Content script that runs on all web pages
// Detects slash commands and provides prompt insertion functionality

import { ALL_PATTERNS } from '../constants';
import type { PromptPattern } from '../types';

// Track the currently focused element
let currentElement: HTMLElement | null = null;
let promptMenu: HTMLElement | null = null;
let slashCommandActive = false;
let searchQuery = '';
let selectedIndex = 0;

// Listen for input in editable fields
document.addEventListener('input', (e) => {
  const target = e.target as HTMLElement;
  
  // Check if the target is an editable element
  if (isEditableElement(target)) {
    currentElement = target;
    const text = getElementText(target);
    
    // Check for slash command
    const lastSlashIndex = text.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      const textAfterSlash = text.substring(lastSlashIndex + 1);
      
      // If there's a space after the slash, don't show menu
      if (textAfterSlash.includes(' ') || textAfterSlash.includes('\n')) {
        hidePromptMenu();
        return;
      }
      
      // Show prompt menu with filtered results
      searchQuery = textAfterSlash.toLowerCase();
      slashCommandActive = true;
      selectedIndex = 0;
      showPromptMenu(target, searchQuery);
    } else {
      hidePromptMenu();
    }
  }
}, true);

// Listen for keyboard navigation in prompt menu
document.addEventListener('keydown', (e) => {
  if (!slashCommandActive || !promptMenu) return;
  
  const items = promptMenu.querySelectorAll('.promptrc-menu-item');
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
    updateSelection(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIndex = Math.max(selectedIndex - 1, 0);
    updateSelection(items);
  } else if (e.key === 'Enter' && slashCommandActive) {
    e.preventDefault();
    const selectedItem = items[selectedIndex] as HTMLElement;
    if (selectedItem) {
      selectedItem.click();
    }
  } else if (e.key === 'Escape') {
    hidePromptMenu();
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
  // Remove existing menu
  hidePromptMenu();
  
  // Filter patterns by query
  const filteredPatterns = ALL_PATTERNS.filter(pattern => {
    if (!query) return true;
    return pattern.trigger.toLowerCase().includes(query) ||
           pattern.purpose.toLowerCase().includes(query) ||
           pattern.id.toLowerCase().includes(query);
  }).slice(0, 8); // Limit to 8 results
  
  if (filteredPatterns.length === 0) return;
  
  // Create menu element
  promptMenu = document.createElement('div');
  promptMenu.className = 'promptrc-menu';
  promptMenu.style.cssText = `
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
  `;
  
  // Add patterns to menu
  filteredPatterns.forEach((pattern, index) => {
    const item = document.createElement('div');
    item.className = 'promptrc-menu-item';
    item.style.cssText = `
      padding: 12px 16px;
      cursor: pointer;
      border-bottom: 1px solid #f3f4f6;
      transition: background-color 0.15s;
    `;
    
    item.innerHTML = `
      <div style="font-weight: 600; font-size: 13px; color: #111827; margin-bottom: 4px;">
        ${pattern.icon || '📝'} ${escapeHtml(pattern.id.replace(/^(ritual|pat)-/, ''))}
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
  
  // Position menu near the cursor
  const rect = target.getBoundingClientRect();
  const menuTop = rect.bottom + window.scrollY + 5;
  const menuLeft = rect.left + window.scrollX;
  
  promptMenu.style.top = `${menuTop}px`;
  promptMenu.style.left = `${menuLeft}px`;
  
  document.body.appendChild(promptMenu);
  
  // Highlight first item
  updateSelection(promptMenu.querySelectorAll('.promptrc-menu-item'));
}

function hidePromptMenu() {
  if (promptMenu) {
    promptMenu.remove();
    promptMenu = null;
  }
  slashCommandActive = false;
  searchQuery = '';
  selectedIndex = 0;
}

function updateSelection(items: NodeListOf<Element>) {
  items.forEach((item, index) => {
    const el = item as HTMLElement;
    if (index === selectedIndex) {
      el.style.backgroundColor = '#f0fdf4';
      el.style.borderLeftColor = '#10b981';
      el.style.borderLeftWidth = '3px';
      el.style.borderLeftStyle = 'solid';
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
  } catch (error) {
    console.error('Error handling message:', error);
    sendResponse({ success: false, error: String(error) });
  }
  return true;
});

// Export for TypeScript
export {};
