import FilmsAPI from '@api/filmsApi';
import { DEFAULT_FILMS_LIST, DEFAULT_PAGINATION } from '@constants';
import { Film, Pagination } from '@types';
import { makeAutoObservable, runInAction } from 'mobx';

class FilmsStore {
  films = DEFAULT_FILMS_LIST.films;
  isLoading = DEFAULT_FILMS_LIST.isLoading;
  error = DEFAULT_FILMS_LIST.error;
  sort = DEFAULT_PAGINATION.sort;
  isOrderAscending = DEFAULT_PAGINATION.isOrderAscending;
  editedFilmIds: Array<Film['id']> = [];
  deletedFilmIds: Array<Film['id']> = [];
  editedFilmsInfo = DEFAULT_FILMS_LIST.films;
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

      if (filmsData?.status === 200) {
        const filmsList = filmsData.data.results.map((film) => ({
          id: film.id,
          poster_path: film.poster_path,
          title: film.title,
          vote_average: film.vote_average,
        }));

        runInAction(() => {
          if (this.page === DEFAULT_PAGINATION.page) {
            this.films = filmsList;
          } else {
            this.films = [...this.films, ...filmsList];
          }
        });

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
    const remainingFilms = this.films.filter(
      (film) => !this.deletedFilmIds.includes(film.id),
    );

    const localFilms = remainingFilms.map((film: Film) => {
      const isFilmEdited = this.editedFilmIds.includes(film.id);
      return isFilmEdited
        ? this.editedFilmsInfo.find((editedFilm) => editedFilm.id === film.id)
        : film;
    }) as Array<Film>;
    this.films = localFilms;
  }

  deleteFilm(id: Film['id']) {
    this.deletedFilmIds = [...this.deletedFilmIds, id];
    this.validateFilms();
  }

  editFilm(film: Film) {
    const isFilmEdited = this.editedFilmIds.includes(film.id);
    if (isFilmEdited) {
      this.editedFilmsInfo = [
        ...this.editedFilmsInfo.filter(
          (editedFilm) => editedFilm.id !== film.id,
        ),
        film,
      ];
    } else {
      this.editedFilmIds = [...this.editedFilmIds, film.id];
      this.editedFilmsInfo = [...this.editedFilmsInfo, film];
    }
    this.validateFilms();
  }

  changeSort(sort: Pagination['sort']) {
    this.films = DEFAULT_FILMS_LIST.films;
    this.sort = sort;
    this.page = DEFAULT_PAGINATION.page;
    this.fetchFilms();
  }

  changeOrder(isOrderAscending: Pagination['isOrderAscending']) {
    this.films = DEFAULT_FILMS_LIST.films;
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
