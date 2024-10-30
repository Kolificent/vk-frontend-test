import { CircularProgress, Grid } from '@mui/material';
import { useEffect } from 'react';
import FilmCard from './FilmCard';
import { filmsStore } from '@store';
import { observer } from 'mobx-react-lite';

const FilmsGrid = observer(() => {
  const sort = filmsStore.sort;
  const isLoading = filmsStore.isLoading;
  const isOrderAscending = filmsStore.isOrderAscending;
  // const page = filmsStore.page;

  useEffect(() => {
    filmsStore.updateFilms();
  }, []);

  useEffect(() => {
    // ! переделать
    document.documentElement.scrollTop = 0;
  }, [sort, isOrderAscending]);

  const films = filmsStore.films;

  // if (isLoading || error) {
  //   return (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       height={1}
  //       width={1}
  //       gap={3}
  //       flexDirection="column"
  //     >
  //       <CircularProgress />
  //       {error}
  //     </Box>
  //   );
  // }

  useEffect(() => {
    function handleScroll() {
      const height = document.documentElement.scrollHeight;
      const top = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      if (windowHeight + top + 600 >= height) {
        filmsStore.changeCurrentPage();
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Grid container spacing={1}>
      {films.map((film) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={film.id}>
          <FilmCard
            id={film.id}
            title={film.title}
            poster_path={film.poster_path}
            vote_average={film.vote_average}
          />
        </Grid>
      ))}
      {isLoading && <CircularProgress />}
    </Grid>
  );
});

export default FilmsGrid;
