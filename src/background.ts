// Background service worker for the Chrome extension
// Handles extension lifecycle, storage initialization, and command shortcuts

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
      const customPatterns = (result.customPatterns || []) as any[];
      customPatterns.push(request.pattern);
      chrome.storage.sync.set({ customPatterns }, () => {
        sendResponse({ success: true });
      });
    });
    return true;
  }
  
  if (request.action === 'deleteCustomPattern') {
    // Delete a custom pattern
    chrome.storage.sync.get(['customPatterns'], (result) => {
      const customPatterns = (result.customPatterns || []) as any[];
      const filtered = customPatterns.filter((p: any) => p.id !== request.patternId);
      chrome.storage.sync.set({ customPatterns: filtered }, () => {
        sendResponse({ success: true });
      });
    });
    return true;
  }
});

export {};
