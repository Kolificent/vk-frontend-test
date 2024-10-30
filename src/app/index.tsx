import { Box, Container, CssBaseline } from '@mui/material';
// import LoginDialog from '@components/dialogs/LoginDialog';
import FilmsGrid from '@components/FilmsGrid';
import FilmsAppBar from '@components/FilmsAppBar';

function App() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="column"
      width={1}
      height="100dvh"
    >
      <CssBaseline />
      {/*<LoginDialog /> */}
      <FilmsAppBar />
      <Container
        maxWidth="lg"
        sx={{
          padding: 1,
        }}
      >
        <FilmsGrid />
      </Container>
    </Box>
  );
}

export default App;
