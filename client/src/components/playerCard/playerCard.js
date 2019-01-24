import React from "react";
// import images from "../../public/assets/img/images"

const PlayerCard = props => {
    return (
        <button className={`w3-button player-box${props.numPlayers} player${props.playerNum}`}>
            <div className="character-box">
                <img className="character-icon" src={`./assets/img/transparent/${props.avatar}`} />
            </div>
            <div className="player-name">
                <p>{props.playerName}</p>
                <div className="player-score">{`$${props.chips}`}</div>
            </div>
        </button>
    );
};

export default PlayerCard;