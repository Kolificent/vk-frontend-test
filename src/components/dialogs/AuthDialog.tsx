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

const AuthDialog = observer(() => {
  const isOpen = dialogStore.isOpen;

  function handleClose() {
    dialogStore.closeDialog();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
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
      <DialogTitle>Вход</DialogTitle>
      <DialogContent>
        <DialogContentText>
          В проекте используется известный сервис с базой данных фильмов TMDB.
          Получить токен аутентификации можно здесь:
        </DialogContentText>
        <DialogContentText>
          <a href="https://developer.themoviedb.org/docs/getting-started">
            https://developer.themoviedb.org/docs/getting-started
          </a>
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          name="token"
          label="Токен"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button type="submit">Ок</Button>
      </DialogActions>
    </Dialog>
  );
});

export default AuthDialog;
