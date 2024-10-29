interface SortOption {
  id: number;
  name: string;
  label: string;
}

interface Pagination {
  page: number;
  sort: SortOption['id'];
  isOrderAscending: boolean;
}

interface FilmsListFetch {
  // ! поменять потом
  films: [];
  isLoading: boolean;
  error: string | null;
}

export type { SortOption, Pagination, FilmsListFetch };
