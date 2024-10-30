import { DEFAULT_PAGINATION } from '@constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pagination } from '@types';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: DEFAULT_PAGINATION,
  reducers: {
    resetPagination: () => DEFAULT_PAGINATION,
    changeSort: (state, action: PayloadAction<Pagination['sort']>) => {
      return {
        ...state,
        sort: action.payload,
        page: DEFAULT_PAGINATION.page,
      };
    },
    changeOrder: (
      state,
      action: PayloadAction<Pagination['isOrderAscending']>,
    ) => {
      return {
        ...state,
        isOrderAscending: action.payload,
        pages: DEFAULT_PAGINATION.page,
      };
    },
    changeCurrentPage: (state) => {
      return {
        ...state,
        page: state.page + 1,
      };
    },
  },
});

const { actions, reducer: paginationReducer } = paginationSlice;
export const { resetPagination, changeSort, changeOrder, changeCurrentPage } =
  actions;
export default paginationReducer;
