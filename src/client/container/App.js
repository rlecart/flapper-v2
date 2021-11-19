import '../../style/App.css';
import React from 'react';
import { connect } from 'react-redux';

import GameContainer from './GameContainer';

const App = ({ gameReducer }) => (
  <div className="App">
    <GameContainer />
  </div>
);

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);