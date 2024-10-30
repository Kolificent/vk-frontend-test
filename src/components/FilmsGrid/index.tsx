import { Box, CircularProgress, Grid } from '@mui/material';
import { useEffect } from 'react';
import FilmCard from './FilmCard';
import { filmsStore } from '@store';
import { observer } from 'mobx-react-lite';
import useThrottle from '@hooks/useThrottle';

const FilmsGrid = observer(() => {
  const sort = filmsStore.sort;
  const isLoading = filmsStore.isLoading;
  const error = filmsStore.error;
  const isOrderAscending = filmsStore.isOrderAscending;
  const editedFilmIds = filmsStore.editedFilmIds;
  const editedFilmsInfo = filmsStore.editedFilmsInfo;

  useEffect(() => {
    filmsStore.fetchFilms();
  }, []);

  useEffect(() => {
    filmsStore.validateFilms();
  }, [editedFilmIds, editedFilmsInfo]);

  useEffect(() => {
    // ! переделать
    document.documentElement.scrollTop = 0;
  }, [sort, isOrderAscending]);

  const films = filmsStore.films;

  const throttledHandleScroll = useThrottle(handleScroll, 50);

  function handleScroll() {
    const height = document.documentElement.scrollHeight;
    const top = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    if (windowHeight + top + 600 >= height) {
      filmsStore.changeCurrentPage();
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  const cardsContent = error ? (
    error
  ) : (
    <Grid container spacing={1}>
      {films.map((film) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={film.id}>
            <FilmCard
              id={film.id}
              title={film.title}
              poster_path={film.poster_path}
              vote_average={film.vote_average}
            />
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {cardsContent}
      {isLoading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
});

export default FilmsGrid;
