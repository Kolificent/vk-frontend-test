import { getAuthToken } from '@utils/authToken';
import axios from 'axios';

// Для удобства проверки URL вынесен сюда
// Изначально ссылка была в env файле
const API_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

export default apiClient;
