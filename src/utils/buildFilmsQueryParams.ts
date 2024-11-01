import { SORT_OPTIONS } from '@constants';
import { Pagination } from '@types';

function buildFilmsQueryParams(pagination: Pagination) {
  const { page, sort, isOrderAscending } = pagination;
  const order = isOrderAscending ? 'asc' : 'desc';
  const sortOption = SORT_OPTIONS.find((option) => option.id === sort)?.name;

  const queryParameters =
    [
      `include_adult=false`,
      `include_video=false`,
      `page=${page}`,
      `sort_by=${sortOption}.${order}`,
    ].join('&') + (sort === 1 ? '&vote_count.gte=200' : '');

  return `discover/movie?${queryParameters}`;
}

export default buildFilmsQueryParams;
