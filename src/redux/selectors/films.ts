import { RootState } from '@store';
const selectFilms = (state: RootState) => state.filmsReducer;

export { selectFilms };
