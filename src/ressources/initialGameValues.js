const initialGameValues = {
  inGame: false,
  isPending: false,

  jumpInterval: undefined,
  gameInterval: undefined,

  pos: 0,
  add: 200,
  initialAdd: 200,
  prevPos: 0,
  up: true,
  isInJump: false,
  distance: 0,

  coordinates: [],
};

export default initialGameValues;