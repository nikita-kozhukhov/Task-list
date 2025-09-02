import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'store/store';
import { App } from './App';

import './assets/styles/index.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Невозможно отобразить страницу. Попробуйте позже.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Загрузка...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
