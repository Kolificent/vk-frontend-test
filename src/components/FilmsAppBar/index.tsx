import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import SelectSort from './SelectSort';
import dialogStore from '@store/dialogStore';
import { deleteAuthToken, getAuthToken } from '@utils/authToken';

function FilmsAppBar() {
  const isUserAuthenticated = Boolean(getAuthToken());

  function handleLoginButton() {
    dialogStore.openDialog();
  }

  function handleLogoutButton() {
    deleteAuthToken();
    window.location.reload();
  }

  const accountButton = isUserAuthenticated ? (
    <IconButton color="inherit" onClick={handleLogoutButton}>
      <LogoutIcon />
    </IconButton>
  ) : (
    <IconButton color="inherit" onClick={handleLoginButton}>
      <AccountCircleIcon />
    </IconButton>
  );

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Typography variant="h6">ВК Фильмы</Typography>
            <Box flexGrow={1} display="flex" justifyContent="center">
              <SelectSort />
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              {accountButton}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Toolbar />
    </>
  );
}

export default FilmsAppBar;
