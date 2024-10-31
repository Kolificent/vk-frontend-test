import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Input,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import HideImageIcon from '@mui/icons-material/HideImage';
import { CARD_HEIGHT } from '@constants';
import { Film } from '@types';
import { filmsStore } from '@store/filmsStore';
import { useState } from 'react';

function FilmCard({ id, poster_path, vote_average, title }: Film) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempTitle, setTempTitle] = useState<string>(title);
  const [tempVoteAverage, setTempVoteAverage] = useState<number>(vote_average);

  function handleDeleteButton() {
    filmsStore.deleteFilm(id);
  }

  function handleEditButton() {
    setIsEditing(true);
  }

  function handleConfirmButton() {
    filmsStore.editFilm({
      id,
      poster_path,
      title: tempTitle,
      vote_average: tempVoteAverage,
    });
    setIsEditing(false);
  }

  function handleCancelButton() {
    setIsEditing(false);
    setTempTitle(title);
    setTempVoteAverage(vote_average);
  }

  const maxWordLength = 20;
  const isTitleWordsLong = title
    .split(' ')
    .some((word) => word.length > maxWordLength);

  return (
    <Card>
      <Paper>
        {poster_path ? (
          <CardMedia
            sx={{ height: CARD_HEIGHT }}
            component="img"
            image={'https://image.tmdb.org/t/p/w400' + poster_path}
            alt={title}
          />
        ) : (
          <Box
            display="flex"
            width="100%"
            height={CARD_HEIGHT}
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <HideImageIcon />
            Нет изображения
          </Box>
        )}
        <Box display="flex">
          <CardContent sx={{ flexGrow: 1 }}>
            {isEditing ? (
              <>
                <Input
                  value={tempTitle}
                  inputProps={{ 'aria-label': 'tempTitle' }}
                  onChange={(e) => setTempTitle(e.target.value)}
                />
                <Input
                  value={tempVoteAverage}
                  type="number"
                  inputProps={{ 'aria-label': 'tempVoteAverage' }}
                  onChange={(e) => setTempVoteAverage(+e.target.value)}
                />
              </>
            ) : (
              <>
                {isTitleWordsLong ? (
                  <Typography variant="h3" component="h3" fontSize="20px">
                    {title.length > 10 ? title.slice(0, 10) + '...' : title}
                  </Typography>
                ) : (
                  <Typography variant="h3" component="h3" fontSize="20px">
                    {title}
                  </Typography>
                )}
                <Typography fontSize="14px" variant="caption">
                  {vote_average ? `Рейтинг ${vote_average}` : 'Нет оценок'}
                </Typography>
              </>
            )}
          </CardContent>
          <CardActions>
            {isEditing ? (
              <>
                <IconButton
                  onClick={handleConfirmButton}
                  aria-label="confirm"
                  color="primary"
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  onClick={handleCancelButton}
                  aria-label="cancel"
                  color="secondary"
                >
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
