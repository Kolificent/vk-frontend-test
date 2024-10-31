import buildFilmsQueryParams from './buildFilmsQueryParams';
import { SORT_OPTIONS } from '@constants';

describe('Функция buildFilmsQueryParams', () => {
  it('Сборка параметров запроса 1', () => {
    const pagination = { page: 1, sort: 0, isOrderAscending: true };
    const expected = `discover/movie?include_adult=false&include_video=false&page=1&sort_by=${SORT_OPTIONS[0].name}.asc`;
    expect(buildFilmsQueryParams(pagination)).toBe(expected);
  });

  it('Сборка параметров запроса 2', () => {
    const pagination = { page: 2, sort: 1, isOrderAscending: false };
    const expected = `discover/movie?include_adult=false&include_video=false&page=2&sort_by=${SORT_OPTIONS[1].name}.desc&vote_count.gte=200`;
    expect(buildFilmsQueryParams(pagination)).toBe(expected);
  });
});
