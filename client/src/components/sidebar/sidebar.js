import React from "react";
import PlayerCard from "../playerCard";

const SideBar = props => {
    return (
        <div id="sidebar-wrapper">
            <nav id="mySidebar" className="w3-bar-block">
                {props.msg}
                {props.playerData.map(player => (
                    <PlayerCard
                        playerNum={player.playerNum}
                        playerName={player.playerName}
                        avatar={player.avatar}
                        chips={player.chips}
                        numPlayers={props.playerData.length}
                    />
                ))}
            </nav>
        </div>
    );
};

export default SideBar;