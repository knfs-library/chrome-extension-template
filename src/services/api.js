import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const ApiService = {
  get: async (endpoint) => {
    const response = await api.get(endpoint);
    return response.data;
  },

  post: async (endpoint, data) => {
    const response = await api.post(endpoint, data);
    return response.data;
  },

  // Add interceptor to handle errors
  init: () => {
    api.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }
};
