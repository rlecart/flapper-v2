import React, { Component, Fragment } from "react";
import gameOptions from "../../ressources/gameOptions";

class Pipe extends Component {
  get borderUp() {
    return (this.props.y);
  }

  get borderDown() {
    let yMax = this.props.y + gameOptions.spaceBetweenPipes > window.innerHeight ? window.innerHeight - gameOptions.spaceBetweenPipes : this.props.y;

    return (window.innerHeight - yMax - gameOptions.spaceBetweenPipes);
  }

  render() {
    return (
      <div className="pipe" style={{ left: this.props.x, minWidth: `${gameOptions.pipesWidth}px` }}>
        <div className="pipeBorder" style={{ height: `${this.borderUp}px` }} />
        <div className="pipeMiddle" style={{ height: `${gameOptions.spaceBetweenPipes}px` }} />
        <div className="pipeBorder" style={{ height: `${this.borderDown}px` }} />
      </div>
    );
  }
}

export default Pipe;