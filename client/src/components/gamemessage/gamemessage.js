import React from "react";
import './gamemessage.css';
import Roulette from '../roulette';

const GameMessage = props => {
  return (
    <div className="backdrop">
      <p>{props.msg}

      {props.miniGame ?
        <Roulette options={props.options} baseSize={80} onComplete={props.handleOnComplete} />
        : <div />}
</p>
    </div>
  );
};

export default GameMessage;
