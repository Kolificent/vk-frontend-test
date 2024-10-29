import { Box, CssBaseline } from '@mui/material';

import FilmsAppBar from '../components/FilmsAppBar/FilmsAppBar';
import SignUpDialog from '../components/dialogs/SignUpDialog';
import LoginDialog from '../components/dialogs/LoginDialog';
import ProtectedOutlet from './ProtectedOutlet';

function Root() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="column"
      width={1}
      height="100dvh"
    >
      <CssBaseline />
      <SignUpDialog />
      <LoginDialog />
      <FilmsAppBar />
      <ProtectedOutlet />
    </Box>
  );
}

export default Root;
