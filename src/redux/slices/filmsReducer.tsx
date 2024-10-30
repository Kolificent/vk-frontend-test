import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { DEFAULT_FILMS_LIST } from '@constants';
import FilmsAPI from '@api/filmsApi';
import { Film } from '@types';

export const updateFilms = createAsyncThunk(
  'filmsList/updateFilms',
  async (data, { getState }) => {
    const state = getState() as RootState;
    const pagination = state.paginationReducer;

    const filmsData = await FilmsAPI.getFilms(pagination);

    if (!filmsData) return;
    if (pagination.page === 1) {
      return filmsData.data.results;
    } else {
      return [...state.filmsReducer.films, ...filmsData.data.results];
    }
  },
);

const filmsListSlice = createSlice({
  name: 'filmsList',
  initialState: DEFAULT_FILMS_LIST,
  reducers: {
    deleteFilm: (state, action: PayloadAction<Film['id']>) => {
      return {
        ...state,
        films: state.films.filter((film) => film.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateFilms.fulfilled, (state, action) => {
        return {
          ...state,
          films: action.payload,
          isLoading: false,
          error: null,
        };
      })
      .addCase(updateFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFilms.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});

const { actions, reducer: filmsReducer } = filmsListSlice;
export const { deleteFilm } = actions;
export default filmsReducer;
