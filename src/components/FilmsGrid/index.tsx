import { Box, CircularProgress, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store';
import { updateFilms } from '@slices/filmsReducer';
import {
  selectIsOrderAscending,
  selectPage,
  selectSort,
} from '@selectors/pagination';
import { selectFilms } from '@selectors/films';
import FilmCard from './FilmCard';
import { changeCurrentPage } from '@slices/paginationReducer';

function FilmsGrid() {
  const filmsData = useAppSelector(selectFilms);

  const sort = useAppSelector(selectSort);
  const isOrderAscending = useAppSelector(selectIsOrderAscending);
  const page = useAppSelector(selectPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateFilms());
  }, [sort, isOrderAscending, page, dispatch]);

  useEffect(() => {
    // ! переделать
    document.documentElement.scrollTop = 0;
  }, [sort, isOrderAscending, dispatch]);

  const { films, isLoading, error } = filmsData;

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
        dispatch(changeCurrentPage());
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);

  return (
    <Grid container spacing={1}>
      {films.map((film) => (
        <Grid item key={film.id}>
          <FilmCard
            id={film.id}
            title={film.title}
            poster_path={film.poster_path}
            vote_average={film.vote_average}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default FilmsGrid;
