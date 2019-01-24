import React from "react";

const TitleBar = props => {

  return (
    <div className="w3-bar title-bar">
        <h1 className="w3-bar-item">Round: {props.round}</h1>
    </div>
  );
};

export default TitleBar;
