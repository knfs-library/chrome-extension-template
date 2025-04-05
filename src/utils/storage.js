export const storage = {
  get: async (key) => {
    const result = await chrome.storage.local.get(key);
    return result[key];
  },

  set: async (key, value) => {
    await chrome.storage.local.set({ [key]: value });
  },

  remove: async (key) => {
    await chrome.storage.local.remove(key);
  }
};
