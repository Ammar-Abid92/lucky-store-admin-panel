import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store';
import theme from './constants/muiTheme';

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
