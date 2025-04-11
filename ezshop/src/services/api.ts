import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://ezshop-8nsk.onrender.com/api'
    : 'http://localhost:5000/api';

const API = axios.create({
 baseURL,
});

// Add request interceptor to include JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;