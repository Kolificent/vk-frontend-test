// stores/combinedStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import FilmsAPI from '@api/filmsApi';
import { DEFAULT_FILMS_LIST, DEFAULT_PAGINATION } from '@constants';
import { Film, Pagination } from '@types';

class FilmsStore {
  films = DEFAULT_FILMS_LIST.films;
  isLoading = false;
  error: string | null = null;
  sort = DEFAULT_PAGINATION.sort;
  isOrderAscending = DEFAULT_PAGINATION.isOrderAscending;
  page = DEFAULT_PAGINATION.page;

  constructor() {
    makeAutoObservable(this);
  }

  async updateFilms() {
    this.isLoading = true;
    try {
      const filmsData = await FilmsAPI.getFilms({
        page: this.page,
        sort: this.sort,
        isOrderAscending: this.isOrderAscending,
      });
      if (filmsData) {
        if (this.page === 1) {
          runInAction(() => {
            this.films = filmsData.data.results;
          });
        } else {
          runInAction(() => {
            this.films = [...this.films, ...filmsData.data.results];
          });
        }
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

  deleteFilm(id: Film['id']) {
    this.films = this.films.filter((film) => film.id !== id);
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.updateFilms(); // Fetch new films when page changes
  }

  resetPagination() {
    this.sort = DEFAULT_PAGINATION.sort;
    this.isOrderAscending = DEFAULT_PAGINATION.isOrderAscending;
    this.page = DEFAULT_PAGINATION.page;
  }

  changeSort(sort: Pagination['sort']) {
    this.sort = sort;
    this.page = DEFAULT_PAGINATION.page;
    this.updateFilms(); // Fetch new films when sort changes
  }

  changeOrder(isOrderAscending: Pagination['isOrderAscending']) {
    this.isOrderAscending = isOrderAscending;
    this.page = DEFAULT_PAGINATION.page;
    this.updateFilms(); // Fetch new films when order changes
  }

  changeCurrentPage() {
    this.page += 1;
    this.updateFilms(); // Fetch new films when page increases
  }
}

export const filmsStore = new FilmsStore();
