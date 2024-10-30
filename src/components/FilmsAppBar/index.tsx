import { Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SelectSort from './SelectSort';
import LogoutIcon from '@mui/icons-material/Logout';
import dialogStore from '@store/dialogStore';
import { deleteAuthToken, getAuthToken } from '@utils/authToken';

function FilmsAppBar() {
  const isUserAuthenticated = Boolean(getAuthToken());

  function handleLoginButton() {
    console.log('тык');
    dialogStore.openDialog();
  }

  function handleLogoutButton() {
    deleteAuthToken();
    window.location.reload();
  }

  const content = !isUserAuthenticated ? (
    <IconButton color="inherit" onClick={handleLoginButton}>
      <AccountCircleIcon />
    </IconButton>
  ) : (
    <IconButton color="inherit" onClick={handleLogoutButton}>
      <LogoutIcon />
    </IconButton>
  );

  return (
    <Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Typography variant="h6">Фильмы</Typography>
            <Box flexGrow={1} display="flex" justifyContent="center">
              <SelectSort />
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              {content}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Toolbar />
    </Fragment>
  );
}

export default FilmsAppBar;
