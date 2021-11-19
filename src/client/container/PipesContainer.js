import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { refreshGameInfo } from "../actions/gameActions";

import Pipe from "../components/Pipe";

class PipesContainer extends Component {
  get gameReducer() {
    return (this.props.gameReducer);
  }

  set gameReducer(newValue) {
    refreshGameInfo(this.props.dispatch, {
      ...this.props.gameReducer,
      ...newValue
    });
  }

  letRandomChoose(y) {
    const ret = Math.floor(Math.random() * 2);
    const add = Math.floor(Math.random() * 350);

    if (ret === 0) {
      if (y + add < window.innerHeight - 200)
        return (add);
      else
        return (-add);
    }
    else if (ret === 1) {
      if (y - add > 0)
        return (-add);
      else
        return (add);
    }
  }

  createNewPipe() {
    // console.log('state = ', this.gameReducer);
    let stateTmp = this.gameReducer;
    let coordinate = {
      y: window.innerHeight / 2 - 100,
      x: window.innerWidth,
    };
    if (stateTmp.coordinates.length !== 0) {
      coordinate.y = stateTmp.coordinates[stateTmp.coordinates.length - 1].y;
      coordinate.y += this.letRandomChoose(coordinate.y);
    }
    stateTmp.coordinates.push(coordinate);
    this.gameReducer = stateTmp;
  }

  progress() {
    // console.log('haha');
    const lastElem = this.gameReducer.coordinates.length - 1;

    for (let i in this.gameReducer.coordinates) {
      this.gameReducer.coordinates[i].x -= 5;
      if (-(this.gameReducer.coordinates[lastElem].x - window.innerWidth) >= 300)
        this.createNewPipe();
    }
    if (this.gameReducer.coordinates.length && this.gameReducer.coordinates[0].x + 75 <= 0)
      this.gameReducer.coordinates.shift();

  }

  componentDidUpdate() {
    if (this.gameReducer.inGame && !this.gameReducer.gameInterval) {
      this.gameReducer = { gameInterval: setInterval(this.progress.bind(this), 15) };
    }
    else if (!this.gameReducer.inGame && this.gameReducer.gameInterval) {
      clearInterval(this.gameReducer.gameInterval);
      this.gameReducer.gameInterval = undefined;
    }
  }

  createPipesList() {
    let ret = [];

    this.gameReducer.coordinates.forEach(e => ret.push(<Pipe x={e.x} y={e.y} />));
    return (ret);
  }

  render() {
    if (!this.gameReducer.coordinates.length)
      this.createNewPipe();
    return (
      <div className="pipes">
        {this.createPipesList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(PipesContainer);