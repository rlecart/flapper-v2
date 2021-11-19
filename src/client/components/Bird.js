import React from "react";

const Bird = ({ pos, rotation }) => (
  <div className="bird" style={{
    marginTop: `${pos}px`,
    transform: `rotate(${rotation}deg)`,
    }}>
  </div>
);

export default Bird;