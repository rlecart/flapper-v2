import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
import gameOptions from '../../ressources/gameOptions';

import { refreshGameInfo, resetGameInfo } from '../actions/gameActions';

import Score from '../components/Score';
import Bird from '../components/Bird';
import PipesContainer from './PipesContainer';

class GameContainer extends Component {
  _hasRelease = true;

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

  get hasRelease() {
    return (this._hasRelease);
  }

  set hasRelease(value) {
    this._hasRelease = value;
  }

  resetGame() {
    clearInterval(this.gameReducer.jumpInterval);
    clearInterval(this.gameReducer.gameInterval);
    resetGameInfo(this.props.dispatch);
    this.gameReducer = {
      pos: window.innerHeight / 2 - this.gameReducer.add,
      prevPos: window.innerHeight / 2 - this.gameReducer.add,
    };
  };

  move() {
    let stateTmp = this.gameReducer;
    // console.log('[move] stateTmp', stateTmp);

    if (stateTmp.up === true) {
      stateTmp.add /= 2;
      stateTmp.rotation = ((stateTmp.initialAdd / stateTmp.initialAdd - stateTmp.add / stateTmp.initialAdd)
        * (stateTmp.neutralRotation - stateTmp.maxUpRotation));
      if (stateTmp.add <= 2) {
        stateTmp.up = !stateTmp.up;
      }
    }
    else {
      if (stateTmp.rotation < stateTmp.maxDownRotation) {
        stateTmp.add *= 2;
        stateTmp.rotation = (stateTmp.add / stateTmp.initialAdd
          * (stateTmp.maxDownRotation - stateTmp.maxUpRotation) + stateTmp.maxUpRotation);
      }
      else
        stateTmp.add += stateTmp.initialAdd;
    }
    this.gameReducer = stateTmp;
    const birdPos = (this.gameReducer.pos + this.gameReducer.add);
    console.log(birdPos);
    if (birdPos >= window.innerHeight - 50)
      this.gameOver('down');
    else if (birdPos < 0)
      this.gameOver('up');
    else if (!this.gameReducer.isPending && this.gameReducer.coordinates) {
      // console.log('birdPos = ', birdPos, birdPos + window.innerHeight / 2 - 25);
      this.gameReducer.coordinates.forEach(e => {
        if (e.x <= 100 && e.x >= 50 - gameOptions.pipesWidth &&
          (birdPos < e.y || birdPos + 50 > e.y + gameOptions.spaceBetweenPipes))
          this.gameOver('pipe');
        else if (e.x - gameOptions.pipesWidth / 2 < 75 && !this.gameReducer.scoreAlreadyAdded) {
          this.gameReducer.score++;
          this.gameReducer.scoreAlreadyAdded = true;
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
    console.log('[jump] nique', this.gameReducer);
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
    if (event.key === ' ' && this.hasRelease) {
      this.hasRelease = false;
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
    this.gameReducer = {
      pos: window.innerHeight / 2 - this.gameReducer.add,
      prevPos: window.innerHeight / 2 - this.gameReducer.add,
    };
    window.addEventListener('keydown', this.eventDispatcher.bind(this));
    window.addEventListener('keyup', () => this.hasRelease = true);
    // window.addEventListener('keydown', this.eventDispatcher.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.eventDispatcher.bind(this));
    window.addEventListener('keyup', () => this.hasRelease = true);
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
        <Score score={this.gameReducer.score} />
        <Bird
          pos={(this.gameReducer.pos + this.gameReducer.add)}
          rotation={this.gameReducer.rotation}
        />
        <PipesContainer
          inGame={this.gameReducer.inGame}
          birdPos={(this.gameReducer.pos + this.gameReducer.add)}
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