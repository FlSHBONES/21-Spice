import React from "react";
// import images from "../../public/assets/img/images"

const images = ["v9KxaP9rQHSl.jpg", "mr-t-animated.jpg", "oh_hai_slimer__by_baron_von_jello-d4nh1qp.jpg", "176d8e7d53ed1ad1e87d0f3adf3c7f4b.jpg"]

const PlayerCard = props => {
    return (
        <button className={`w3-button player-box${props.numPlayers} player${props.playerNum}`}>
            <div className="character-box">
                <img className="character-icon w3-circle" src={`./assets/img/${images[props.playerNum]}`} />
            </div>
            <div className="player-name">
                <p>{props.playerName}</p>
                <div className="player-score">{props.playerTotal}{props.player}</div>
            </div>
        </button>
    );
};

export default PlayerCard;