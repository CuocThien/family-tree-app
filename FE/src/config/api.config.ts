export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://family-tree.cuocthien.io.vn/api'
  : 'http://localhost:3000/api';

export const ENDPOINTS = {
  USERS: '/users'
}; 