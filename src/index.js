import React from 'react';
import ReactDOM from 'react-dom';
import Converters from "./converters";
import './index.css';
import { Provider } from "react-redux";
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Converters />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
