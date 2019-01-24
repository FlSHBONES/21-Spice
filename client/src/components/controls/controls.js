import React from "react";

const Controls = props => {
  const buttonVisible = checkVal => {
    return props.isPlaying === checkVal ? "hide" : "";
  };

  const isDisabled = () => {
    return props.isPlaying ? "Disabled" : "";
  };

  const isReadyDisabled = () => {
    return props.bet === 0 ? "Disabled" : "";
  };

  return (
    <div>
      <div className="mid">
        <span className="numDisplay">Bet: {props.bet}</span>
      </div>
      <div className="mid">
        <span>
          <button
            onClick={() => props.makeBet(5)}
            className={"chipps" + isDisabled()}
            disabled={props.isPlaying}>
            <img src="./assets/img/chips/5.png" alt="chip5" className='chips' />
          </button>
          <button
            onClick={() => props.makeBet(10)}
            className={"chipps" + isDisabled()}
            disabled={props.isPlaying}>
            <img src="./assets/img/chips/10.png" alt="chip10" className='chips' />
          </button>
          <button
            onClick={() => props.makeBet(25)}
            className={"chipps" + isDisabled()}
            disabled={props.isPlaying}>
            <img src="./assets/img/chips/25.png" alt="chip25" className='chips' />
          </button>
          <button
            onClick={() => props.makeBet(50)}
            className={"chipps" + isDisabled()}
            disabled={props.isPlaying}>
            <img src="./assets/img/chips/50.png" alt="chip50" className='chips' />
          </button>
          <button
            onClick={() => props.makeBet(500)}
            className={"chipps" + isDisabled()}
            disabled={props.isPlaying}>
            <img src="./assets/img/chips/500.png" alt="chip500" className='chips' />
          </button>
        </span>
        <span style={{ paddingLeft: 40 }}>
          <button
            className={"btn" + isReadyDisabled() + " " + buttonVisible(true)}
            onClick={() => props.readyClicked()}
          >
            Ready
          </button>
          <button
            className={"btn " + buttonVisible(false)}
            onClick={() => props.hitClicked()}
          >
            Hit
          </button>
          <button
            className={"btn " + buttonVisible(false)}
            onClick={() => props.stayClicked(props.playerID)}
          >
            Stay
          </button>
          <button
            className={"btn " + buttonVisible(true)}
            onClick={() => props.clearBet()}
          >
            Clear
          </button>
        </span>
        <div style={{ marginTop: 30 }}>
          <span className="totalDisplay">Chips:{props.chips}</span>
        </div>
      </div>
    </div>
  );
};

export default Controls;
