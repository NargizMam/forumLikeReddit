import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import theme from './theme';
import { persist, store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persist}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
