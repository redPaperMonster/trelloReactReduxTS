import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './Store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Loadscreen from './Components/Loadscreen/Loadscreen';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loadscreen />} persistor={persistor}>
        <App /></PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
