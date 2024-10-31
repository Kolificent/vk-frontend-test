import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import dialogStore from '@store/dialogStore';
import { setAuthToken } from '@utils/authToken';
import { observer } from 'mobx-react-lite';

const TMDB_AUTH_URL = 'https://developer.themoviedb.org/docs/getting-started';

const AuthDialog = observer(() => {
  const isOpen = dialogStore.isOpen;

  function handleClose() {
    dialogStore.closeDialog();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    const token = formJson.token as string;
    setAuthToken(token);

    dialogStore.closeDialog();
    window.location.reload();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Аутентификация</DialogTitle>
      <DialogContent>
        <DialogContentText>
          В проекте используется известный сервис с базой данных фильмов TMDB.
          <br />
          <br />
          Получить токен аутентификации можно здесь:
          <br />
          <a href={TMDB_AUTH_URL} target="_blank" rel="noopener noreferrer">
            {TMDB_AUTH_URL}
          </a>
          <br />
          <br />
          <b>
            <i>
              Существует вероятность того, что для работы сервиса понадобится
              использовать VPN!
            </i>
          </b>
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          name="token"
          label="Токен"
          aria-label="token"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button aria-label="cancel" onClick={handleClose}>
          Отмена
        </Button>
        <Button type="submit" aria-label="confirm">
          Ок
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AuthDialog;
