import React from "react";
import './gamemessage.css';
import Roulette from '../roulette';

const GameMessage = props => {
  return (
    <div className="backdrop">
      <p>{props.msg}</p>

      {props.miniGame ?
        <Roulette options={props.options} baseSize={80} onComplete={props.handleOnComplete} />
        : <div />}

    </div>
  );
};

export default GameMessage;
