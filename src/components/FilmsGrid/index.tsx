import { Box, Button, CircularProgress, Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import FilmCard from './FilmCard';
import { filmsStore } from '@store';
import { observer } from 'mobx-react-lite';
import useThrottle from '@hooks/useThrottle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const FilmsGrid = observer(() => {
  const sort = filmsStore.sort;
  const isLoading = filmsStore.isLoading;
  const error = filmsStore.error;
  const page = filmsStore.page;
  const isOrderAscending = filmsStore.isOrderAscending;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    filmsStore.fetchFilms();
  }, []);

  useEffect(() => {
    // ! переделать
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sort, isOrderAscending]);

  const films = filmsStore.films;

  const throttledHandleScroll = useThrottle(handleScroll, 40);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function handleScroll() {
    const height = document.documentElement.scrollHeight;
    const top = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    setShowScrollTop(top > 400);

    if (windowHeight + top + 400 >= height) {
      console.log('FETCH!');
      console.log(page);

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
      {showScrollTop && (
        <IconButton
          color="primary"
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000, // Ensures the button is above other elements
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
    </Box>
  );
});

export default FilmsGrid;
