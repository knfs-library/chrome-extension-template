chrome.runtime.onInstalled.addListener(() => {
  // Initialize extension
  chrome.storage.local.set({
    isEnabled: true,
    settings: {
      // Add default settings here
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle messages from content script and popup
});
