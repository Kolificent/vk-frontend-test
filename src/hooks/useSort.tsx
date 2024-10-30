import { filmsStore } from '@store/filmsStore';

function useSort() {
  const sort = filmsStore.sort;
  const isOrderAscending = filmsStore.isOrderAscending;

  const changeSort = (newSort: number) => {
    filmsStore.changeSort(newSort);
  };

  const toggleOrder = () => {
    filmsStore.changeOrder(!isOrderAscending);
  };

  return { sort, isOrderAscending, changeSort, toggleOrder };
}

export default useSort;
