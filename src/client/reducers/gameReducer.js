import initialGameValues from "../../ressources/initialGameValues";

import { REFRESH_GAME_INFO, RESET_GAME_INFO } from '../actions/gameActions';

const initialState = {
  ...initialGameValues,
};

const gameReducer = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case REFRESH_GAME_INFO:
      nextState = {
        ...state,
        ...action.value,
      };
      return (nextState);
    case RESET_GAME_INFO:
      nextState = {
        ...state,
        ...initialState,
        coordinates: []
      };
      return (nextState);
    default:
      return (nextState || state);
  }
};

export default gameReducer;