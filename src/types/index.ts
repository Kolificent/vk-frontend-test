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

interface Film {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

interface FilmCardProps {
  id: Film['id'];
  title: Film['title'];
  vote_average: Film['vote_average'];
  poster_path: Film['poster_path'];
}

interface FilmsListFetch {
  films: Film[];
  isLoading: boolean;
  error: string | null;
}

export type { SortOption, Film, FilmCardProps, Pagination, FilmsListFetch };
