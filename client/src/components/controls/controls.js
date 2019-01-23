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
            onClick={() => props.makeBet(1)}
            className={"bet" + isDisabled()}
            disabled={props.isPlaying}
          >
            1
          </button>
          <button
            onClick={() => props.makeBet(2.5)}
            className={"bet" + isDisabled() + " bet2_5"}
            disabled={props.isPlaying}
          >
            2.5
          </button>
          <button
            onClick={() => props.makeBet(5)}
            className={"bet" + isDisabled() + " bet5"}
            disabled={props.isPlaying}
          >
            5
          </button>
          <button
            onClick={() => props.makeBet(10)}
            className={"bet" + isDisabled() + " bet10"}
            disabled={props.isPlaying}
          >
            10
          </button>

          <button
            onClick={() => props.makeBet(25)}
            className={"bet" + isDisabled() + " bet25"}
            disabled={props.isPlaying}
          >
            25
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
