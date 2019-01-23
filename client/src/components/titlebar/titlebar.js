import React from "react";

const TitleBar = props => {

  return (
    <div className="w3-bar w3-black w3-large title-bar">
        <img id="bjack-title" className="w3-bar-item w3-left" src="./assets/img/vice.png" alt=""/>
        <img id="bjack-logo" className="w3-bar-item w3-right" src="./assets/img/aces.png" alt=""/>
    </div>
  );
};

export default TitleBar;
