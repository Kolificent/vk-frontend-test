import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { CARD_HEIGHT } from '@constants';
import useThrottle from '@hooks/useThrottle';
import { filmsStore } from '@store/filmsStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import FilmCard from './FilmCard';

const FilmsGrid = observer(() => {
  const films = filmsStore.films;
  const isLoading = filmsStore.isLoading;
  const error = filmsStore.error;
  const sort = filmsStore.sort;
  const isOrderAscending = filmsStore.isOrderAscending;
  const [isScrollButtonVisible, setIsScrollButtonVisible] =
    useState<boolean>(false);

  useEffect(() => {
    filmsStore.fetchFilms();
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [sort, isOrderAscending]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleScroll() {
    const height = document.documentElement.scrollHeight;
    const top = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    setIsScrollButtonVisible(top > CARD_HEIGHT);
    if (windowHeight + top + CARD_HEIGHT >= height) {
      filmsStore.changeCurrentPage();
    }
  }

  const throttledHandleScroll = useThrottle(handleScroll, 40);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  const cardsContent = (
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
      {error && (
        <Box display="flex" justifyContent="center">
          <Typography>{error}</Typography>
        </Box>
      )}
      {isLoading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {isScrollButtonVisible && (
        <Button
          variant="contained"
          aria-label="scrollToTopButton"
          startIcon={<ArrowUpwardIcon />}
          color="primary"
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
          }}
        >
          Наверх
        </Button>
      )}
    </Box>
  );
});

export default FilmsGrid;
