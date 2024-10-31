import { Film } from '@types';

export default function removeDuplicateFilms(films: Array<Film>) {
  const uniqueFilms = films.reduce(
    (map, film) => map.set(film.id, film),
    new Map(),
  );
  return [...uniqueFilms.values()];
}
