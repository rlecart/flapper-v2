import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";

import { refreshGameInfo, resetGameInfo } from '../actions/gameActions';

import Bird from '../components/Bird';
import PipesContainer from './PipesContainer';

class GameContainer extends Component {
  get gameReducer() {
    return (this.props.gameReducer);
  }

  set gameReducer(newValue) {
    // console.log('newVal = ', newValue);
    refreshGameInfo(this.props.dispatch, {
      ...this.props.gameReducer,
      ...newValue
    });
  }

  resetGame() {
    clearInterval(this.gameReducer.jumpInterval);
    clearInterval(this.gameReducer.gameInterval);
    resetGameInfo(this.props.dispatch);
  };

  move() {
    let stateTmp = this.gameReducer;
    // console.log('[move] stateTmp', stateTmp);

    if (stateTmp.up === true) {
      stateTmp.add /= 2;
      if (stateTmp.add <= 2) {
        stateTmp.up = !stateTmp.up;
      }
    }
    else {
      if (stateTmp.add * 2 < stateTmp.initialAdd * 3)
        stateTmp.add *= 2;
      else
        stateTmp.add += stateTmp.initialAdd;
    }
    this.gameReducer = stateTmp;
    const birdPos = -(this.gameReducer.pos + this.gameReducer.add);
    if (birdPos <= -window.innerHeight + 50)
      this.gameOver('down');
    else if (birdPos >= window.innerHeight - 50)
      this.gameOver('up');
    else if (!this.gameReducer.isPending && this.gameReducer.coordinates) {
      console.log('birdPos = ', birdPos, -birdPos + window.innerHeight / 2 - 25);
      this.gameReducer.coordinates.forEach(e => {
        if (e.x <= 100 && e.x >= 50 - 75 &&
          (e.y > -birdPos + window.innerHeight / 2 - 25 || e.y + 200 < -birdPos + window.innerHeight / 2 + 25)) {
            console.log('\n');
            console.log('ca va gameover la', this.gameReducer);
            console.log('\n');
            this.gameOver('pipe');
          }
        });
      }
  };

  gameOver(where) {
    if (where === 'up' || where === 'pipe') {
      clearInterval(this.gameReducer.gameInterval);
      this.gameReducer = { isPending: true, };
    }
    else {
      clearInterval(this.gameReducer.gameInterval);
      clearInterval(this.gameReducer.jumpInterval);
      this.gameReducer = {
        inGame: false,
        isPending: true,
        jumpInterval: undefined,
        gameInterval: undefined,
        pos: where === 'down' ? window.innerHeight - 50 : -window.innerHeight + 50,
        add: 0,
      };
    }
  }

  jump() {
    // console.log('[jump] nique', this.gameReducer);
    if (this.gameReducer.isInJump) {
      clearInterval(this.gameReducer.jumpInterval);
      // console.log('avant');
      this.gameReducer = {
        jumpInterval: undefined,
        pos: this.gameReducer.prevPos + this.gameReducer.add,
        add: this.gameReducer.initialAdd,
        up: true,
      };
    }
    // console.log('apres');
    this.gameReducer = {
      prevPos: this.gameReducer.pos + -this.gameReducer.add,
      isInJump: true,
      jumpInterval: setInterval(this.move.bind(this), 50),
    };
    if (!this.gameReducer.gameInterval) {
      this.gameReducer = {
        gameInterval: setInterval(this.progress.bind(this))
      };
    }
  };

  eventDispatcher(event) {
    if (event.key === ' ') {
      if (!this.gameReducer.inGame) {
        if (this.gameReducer.pos !== 0)
          this.resetGame();
        this.gameReducer = { inGame: true };
      }
      if (!this.gameReducer.isPending)
        this.jump();
    }
    else if (event.key === 'c')
      this.resetGame();
  };

  componentDidMount() {
    window.addEventListener('keypress', this.eventDispatcher.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.eventDispatcher.bind(this));
  }
  //   if(inGame) {
  //     gameInterval = setInterval(() => {
  //       setDistance(distance + 1);
  //     }, 50);
  //   }
  //       else {
  //   clearInterval(gameInterval);
  //   gameInterval = undefined;
  // }

  // finalPos = -(this.state.pos + this.state.add);

  render() {
    // console.log('[render]', this.props);
    return (
      <Fragment>
        <Bird pos={-(this.gameReducer.pos + this.gameReducer.add)} />
        <PipesContainer
          inGame={this.gameReducer.inGame}
          birdPos={-(this.gameReducer.pos + this.gameReducer.add)}
          gameOver={(where) => this.gameOver(where)}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(GameContainer);