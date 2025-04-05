// Content script runs in the context of web pages
(() => {
  // Initialize content script
  const init = async () => {
    const settings = await chrome.storage.local.get('settings');
    // Add your content script logic here
  };

  // Start the content script
  init().catch(console.error);
})();
