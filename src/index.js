import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './client/container/App';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import gameReducer from './client/reducers/gameReducer';

const Store = createStore(combineReducers({
  gameReducer,
}));

const Root = () => (
  <Provider store={Store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
