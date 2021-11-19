import React, { Component, Fragment } from "react";

class Pipe extends Component {
  get borderUp() {
    return (this.props.y);
  }

  get borderDown() {
    let yMax = this.props.y + 200 > window.innerHeight ? window.innerHeight - 200 : this.props.y;

    return (window.innerHeight - yMax - 200);
  }

  render() {
    return (
      <div className="pipe" style={{ left: this.props.x }}>
        <div className="pipeBorder" style={{ height: `${this.borderUp}px` }} />
        <div className="pipeMiddle" />
        <div className="pipeBorder" style={{ height: `${this.borderDown}px` }} />
      </div>
    );
  }
}

export default Pipe;