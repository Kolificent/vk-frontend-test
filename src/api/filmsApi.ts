import { Pagination } from '@types';
import apiClient from './axios';

import buildFilmsQueryParams from '@utils/buildFilmsQueryParams';

const FilmsAPI = {
  getFilms: async (pagination: Pagination) => {
    try {
      const response = await apiClient.get(buildFilmsQueryParams(pagination));
      return response;
    } catch (error) {
      console.error('Error fetching films', error);
    }
  },
};

export default FilmsAPI;
