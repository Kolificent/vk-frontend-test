import type { FilmsListFetch, Pagination, SortOption } from '@types';

export const SORT_OPTIONS: Array<SortOption> = [
  { id: 0, name: 'popularity', label: 'популярности' },
  { id: 1, name: 'vote_average', label: 'рейтингу' },
  { id: 2, name: 'revenue', label: 'доходу' },
];

export const DEFAULT_PAGINATION: Pagination = {
  sort: 0,
  isOrderAscending: false,
  page: 1,
};

export const CARD_HEIGHT = 400;

export const DEFAULT_FILMS_LIST: FilmsListFetch = {
  films: [],
  isLoading: false,
  error: null,
};
