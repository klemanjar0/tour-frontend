import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './features/store';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './features/router/AppRouter';
import GlobalSpinner from './features/spinner/pages/Spinner';
import NotificationProvider from './features/notifications/pages/NotificationProvider';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalSpinner>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </GlobalSpinner>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
