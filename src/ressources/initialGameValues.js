import gameOptions from "./gameOptions";

const initialGameValues = {
  inGame: false,
  isPending: false,

  jumpInterval: undefined,
  gameInterval: undefined,

  pos: 0,
  add: gameOptions.birdJump,
  initialAdd: gameOptions.birdJump,
  prevPos: 0,
  up: true,
  isInJump: false,
  score: 0,

  maxUpRotation: 45,
  neutralRotation: 90,
  maxDownRotation: 160,
  rotation: 0,

  coordinates: [],
  scoreAlreadyAdded: false,

  hasRelease: true,
};

export default initialGameValues;