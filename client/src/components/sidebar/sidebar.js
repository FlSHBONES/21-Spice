import React from "react";
import PlayerCard from "../playerCard";

const SideBar = props => {
    return (
        <div id="sidebar-wrapper">
            <nav id="mySidebar" className="w3-bar-block">
                {props.playerData.map(player => (
                    <PlayerCard
                        playerNum={player.playerNum}
                        playerName={player.playerName}
                        playerTotal={player.playerTotal}
                        numPlayers={props.playerData.length}
                    />
                ))}
            </nav>
        </div>
    );
};

export default SideBar;