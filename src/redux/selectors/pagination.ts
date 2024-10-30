import { RootState } from '@store';

const selectSort = (state: RootState) => state.paginationReducer.sort;
const selectIsOrderAscending = (state: RootState) =>
  state.paginationReducer.isOrderAscending;
const selectPage = (state: RootState) => state.paginationReducer.page;

export { selectSort, selectIsOrderAscending, selectPage };
