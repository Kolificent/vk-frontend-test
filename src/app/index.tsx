import { Box, Container, CssBaseline } from '@mui/material';
import FilmsGrid from '@components/FilmsGrid';
import FilmsAppBar from '@components/FilmsAppBar';
import AuthDialog from '@components/dialogs/AuthDialog';
import { getAuthToken } from '@utils/authToken';

function App() {
  const isUserAuthenticated = Boolean(getAuthToken());

  const appContent = isUserAuthenticated ? (
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
      height="100vh"
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
        {appContent}
      </Container>
    </Box>
  );
}

export default App;
