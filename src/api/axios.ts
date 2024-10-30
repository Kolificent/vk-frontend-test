import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

export default apiClient;
