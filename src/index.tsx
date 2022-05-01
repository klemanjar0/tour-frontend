import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store, { persistor } from './features/store';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './features/router/AppRouter';
import GlobalSpinner from './features/spinner/pages/Spinner';
import NotificationProvider from './features/notifications/pages/NotificationProvider';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotificationProvider>
          <BrowserRouter>
            <GlobalSpinner>
              <AppRouter />
            </GlobalSpinner>
          </BrowserRouter>
        </NotificationProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
