// stores/combinedStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import FilmsAPI from '@api/filmsApi';
import { DEFAULT_FILMS_LIST, DEFAULT_PAGINATION } from '@constants';
import { Film, Pagination } from '@types';

class FilmsStore {
  films = DEFAULT_FILMS_LIST.films;
  editedFilmIds: number[] = [];
  editedFilmsInfo = DEFAULT_FILMS_LIST.films;
  isLoading = false;
  error: string | null = null;
  sort = DEFAULT_PAGINATION.sort;
  isOrderAscending = DEFAULT_PAGINATION.isOrderAscending;
  page = DEFAULT_PAGINATION.page;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchFilms() {
    this.isLoading = true;
    try {
      const filmsData = await FilmsAPI.getFilms({
        page: this.page,
        sort: this.sort,
        isOrderAscending: this.isOrderAscending,
      });
      if (filmsData) {
        const filmsList = filmsData.data.results.map((film) => ({
          id: film.id,
          poster_path: film.poster_path,
          title: film.title,
          vote_average: film.vote_average,
        }));

        if (this.page === DEFAULT_PAGINATION.page) {
          runInAction(() => {
            this.films = filmsList;
          });
        } else {
          runInAction(() => {
            this.films = [...this.films, ...filmsList];
          });
        }
        this.validateFilms();
      }
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  validateFilms() {
    const localFilmsList = this.films.map((film: Film) =>
      this.editedFilmIds.includes(film.id)
        ? this.editedFilmsInfo.find((editedFilm) => editedFilm.id === film.id)
        : film,
    ) as Film[];
    this.films = localFilmsList;
  }

  deleteFilm(id: Film['id']) {
    this.films = this.films.filter((film) => film.id !== id);
  }
  editFilm(film: Film) {
    this.editedFilmIds = [...this.editedFilmIds, film.id];
    this.editedFilmsInfo = [...this.editedFilmsInfo, film];
  }

  resetPagination() {
    this.sort = DEFAULT_PAGINATION.sort;
    this.isOrderAscending = DEFAULT_PAGINATION.isOrderAscending;
    this.page = DEFAULT_PAGINATION.page;
  }

  changeSort(sort: Pagination['sort']) {
    this.sort = sort;
    this.page = DEFAULT_PAGINATION.page;
    this.fetchFilms();
  }

  changeOrder(isOrderAscending: Pagination['isOrderAscending']) {
    this.isOrderAscending = isOrderAscending;
    this.page = DEFAULT_PAGINATION.page;
    this.fetchFilms();
  }

  changeCurrentPage() {
    this.page += 1;
    this.fetchFilms();
  }
}

export const filmsStore = new FilmsStore();
