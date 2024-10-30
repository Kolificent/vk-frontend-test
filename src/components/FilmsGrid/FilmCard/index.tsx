import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Input,
  Paper,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '@store';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Film } from '@types';
import { deleteFilm } from '@slices/filmsReducer';
import { useState } from 'react';

function FilmCard({ id, poster_path, vote_average, title }: Film) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedVoteAverage, setEditedVoteAverage] = useState(vote_average);

  function handleDeleteButton() {
    dispatch(deleteFilm(id));
  }

  function handleEditButton() {
    setIsEditing(true);
  }

  function handleConfirmButton() {
    setIsEditing(false);
  }

  function handleCancelButton() {
    setIsEditing(false);
    setEditedTitle(title);
    setEditedVoteAverage(vote_average);
  }

  return (
    <Card sx={{ width: '400px' }}>
      <Paper>
        <CardActionArea>
          <Link to={`../film/${id}`} relative="path">
            <CardMedia
              sx={{ height: '600px' }}
              component="img"
              image={'https://image.tmdb.org/t/p/w400' + poster_path}
              alt={title}
            />
          </Link>
        </CardActionArea>
        <Box display="flex">
          <CardContent sx={{ flexGrow: 1 }}>
            {isEditing ? (
              <>
                <Input
                  value={editedTitle}
                  inputProps={{ 'aria-label': 'description' }}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <Input
                  value={editedVoteAverage}
                  inputProps={{ 'aria-label': 'description' }}
                  onChange={(e) => setEditedVoteAverage(e.target.value)}
                />
              </>
            ) : (
              <>
                <Typography variant="h3" component="h3" fontSize="24px">
                  {title}
                </Typography>
                <Typography fontSize="14px" variant="caption">
                  {vote_average ? `Рейтинг ${vote_average}` : 'Нет оценок'}
                </Typography>
              </>
            )}
          </CardContent>
          <CardActions>
            {isEditing ? (
              <>
                <IconButton onClick={handleConfirmButton} color="primary">
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={handleCancelButton} color="secondary">
                  <ClearIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={handleEditButton}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={handleDeleteButton}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </CardActions>
        </Box>
      </Paper>
    </Card>
  );
}

export default FilmCard;
