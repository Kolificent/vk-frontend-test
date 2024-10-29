import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { DEFAULT_FILMS_LIST } from '@constants';
import FilmsAPI from '@api/filmsApi';

export const updateFilms = createAsyncThunk(
  'filmsList/updateFilms',
  async (data, { getState }) => {
    const state = getState() as RootState;
    const pagination = state.paginationReducer;

    const filmsData = await FilmsAPI.getAdvertisements(pagination);

    if (!filmsData) return;

    return filmsData.data.results;
  },
);

const filmsListSlice = createSlice({
  name: 'filmsList',
  initialState: DEFAULT_FILMS_LIST,
  reducers: {},
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

const { reducer: filmsReducer } = filmsListSlice;
export default filmsReducer;
