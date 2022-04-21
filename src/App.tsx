import { Container, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppBar from './components/appBar';
import AuthHandler from './components/authHandler';
import Timers from './components/timers';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar />
      <Container sx={{paddingTop: '40px'}}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/timers" />} />
          <Route path="/timers" element={<Timers />} />
          <Route path="/callback" element={<AuthHandler />} />
        </Routes>
      </Container>

    </ThemeProvider>
  );
}

export default App;
