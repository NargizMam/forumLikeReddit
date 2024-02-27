import {Container, CssBaseline} from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';

const App = () => {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
