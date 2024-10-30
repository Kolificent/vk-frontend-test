import { Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SelectSort from './SelectSort';

function FilmsAppBar() {
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
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Toolbar />
    </Fragment>
  );
}

export default FilmsAppBar;
