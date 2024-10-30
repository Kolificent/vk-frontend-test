import { getAuthToken } from '@utils/authToken';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

export default apiClient;
