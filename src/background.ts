// Background service worker for the Chrome extension
// Handles extension lifecycle, storage initialization, and command shortcuts

import type { PromptPattern } from '../types';

// Initialize default patterns in storage on installation
chrome.runtime.onInstalled.addListener(async () => {
  console.log('.promptrc extension installed');
  
  // Check if patterns are already stored
  const result = await chrome.storage.sync.get(['patterns', 'customPatterns']);
  
  if (!result.patterns) {
    // Initialize with empty array - patterns will be loaded from constants
    await chrome.storage.sync.set({ 
      patterns: [],
      customPatterns: []
    });
  }
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'insert_prompt') {
    // Send message to content script to show prompt picker
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'showPromptPicker' 
        });
      }
    });
  }
  
  if (command === 'toggle_extension') {
    // Toggle extension globally
    chrome.storage.sync.get(['extensionEnabled'], (result) => {
      const currentState = result.extensionEnabled !== false; // Default to true
      const newState = !currentState;
      
      chrome.storage.sync.set({ extensionEnabled: newState }, () => {
        // Notify all tabs
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach(tab => {
            if (tab.id) {
              chrome.tabs.sendMessage(tab.id, {
                action: 'toggleExtension',
                enabled: newState
              });
            }
          });
        });
        
        // Show badge to indicate state
        chrome.action.setBadgeText({ 
          text: newState ? '' : 'OFF' 
        });
        chrome.action.setBadgeBackgroundColor({ 
          color: '#ef4444' 
        });
      });
    });
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPatterns') {
    // Fetch patterns from storage
    chrome.storage.sync.get(['patterns', 'customPatterns'], (result) => {
      sendResponse({ 
        patterns: result.patterns || [],
        customPatterns: result.customPatterns || []
      });
    });
    return true; // Keep the message channel open for async response
  }
  
  if (request.action === 'saveCustomPattern') {
    // Save a custom pattern
    chrome.storage.sync.get(['customPatterns'], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Storage error:', chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
        return;
      }
      const customPatterns = (result.customPatterns || []) as PromptPattern[];
      customPatterns.push(request.pattern);
      chrome.storage.sync.set({ customPatterns }, () => {
        if (chrome.runtime.lastError) {
          console.error('Storage error:', chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ success: true });
        }
      });
    });
    return true;
  }
  
  if (request.action === 'deleteCustomPattern') {
    // Delete a custom pattern
    chrome.storage.sync.get(['customPatterns'], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Storage error:', chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
        return;
      }
      const customPatterns = (result.customPatterns || []) as PromptPattern[];
      const filtered = customPatterns.filter((p: PromptPattern) => p.id !== request.patternId);
      chrome.storage.sync.set({ customPatterns: filtered }, () => {
        if (chrome.runtime.lastError) {
          console.error('Storage error:', chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ success: true });
        }
      });
    });
    return true;
  }
});

export {};
