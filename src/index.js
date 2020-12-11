import React from 'react';
import ReactDOM from 'react-dom';
import Converters from "./converters";
import './index.css';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./store";


const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Converters />
  </Provider>,
  document.getElementById('root')
);
