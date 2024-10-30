import { Box, Container, CssBaseline } from '@mui/material';
// import LoginDialog from '@components/dialogs/LoginDialog';
import FilmsGrid from '@components/FilmsGrid';
import FilmsAppBar from '@components/FilmsAppBar';
import AuthDialog from '@components/dialogs/AuthDialog';
import { getAuthToken } from '@utils/authToken';

function App() {
  const isUserAuthenticated = Boolean(getAuthToken());

  const content = isUserAuthenticated ? (
    <FilmsGrid />
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center">
      <i>Необходимо провести аутентификацию (сверху справа)</i>
    </Box>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="column"
      width={1}
      height="100dvh"
    >
      <CssBaseline />
      <AuthDialog />
      <FilmsAppBar />
      <Container
        maxWidth="lg"
        sx={{
          padding: 1,
        }}
      >
        {content}
      </Container>
    </Box>
  );
}

export default App;
