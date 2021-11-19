import React, { Fragment } from "react";

const Score = ({ score }) => (
  <div className="score">
    <div className="yourScore">your score</div>
    <div className="scoreNumber">{score}</div>
  </div>
);

export default Score;