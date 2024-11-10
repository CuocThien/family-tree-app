import axios from 'axios';
import { API_BASE_URL } from './api.config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          break;
        case 422:
          // Handle validation errors
          break;
        default:
          // Handle other errors
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default api; 