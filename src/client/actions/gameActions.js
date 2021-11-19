export const START_GAME = 'START-GAME';
export const REFRESH_GAME_INFO = 'REFRESH_GAME_INFO';
export const RESET_GAME_INFO = 'RESET_GAME_INFO';

const refreshGameInfo = (dispatch, newValues) => {
  const action = {
    type: REFRESH_GAME_INFO,
    value: newValues,
  };
  dispatch(action);
};

const resetGameInfo = (dispatch) => {
  const action = { type: RESET_GAME_INFO };
  dispatch(action);
};

export { refreshGameInfo, resetGameInfo };