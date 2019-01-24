import React from "react";
import DealerSpace from "../dealerspace";
import GameMessage from "../gamemessage";
import PlayerSpace from "../playerspace";
import SideBar from "../sidebar";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function Table(props) {
  return (
    <div className="table">

      <div className="fullscreen-bg">
        <video loop muted autoPlay class="fullscreen-bg__video">
          <source src={"./assets/vid/tableloop.mp4"} type="video/mp4" />
        </video>
      </div>

      <img id="bjack-title" className="w3-bar-item w3-left" src="./assets/img/21_vice_logo.png" alt="" onClick={props.nuke} />

      {props.numPlayers > 0 ? (
        <div className="tableScreen">
          <SideBar
            playerData={props.playersInGame}
            numPlayers={props.numPlayers}
          />
          <div className="table-with-players">

            <DealerSpace
              cardDisplay="Dealer: "
              cardTotal={props.dealerTotal}
              cardTotalAlt={props.dealerTotalAlt}
              cards={props.dealerCards}
            />
            <div className="playerSpace">
              {props.playersInGame.map((player, index) => (
                <div className={`playerSpace-${index}`}>
                  <h4>{player.gameMsg}</h4>

                  <PlayerSpace
                    cardDisplay={`${player.playerName}:`}
                    cardTotal={player.playerTotal}
                    cardTotalAlt={player.playerTotalAlt}
                    cards={player.hand}
                    playerIndex={index}
                  />
                </div>
              ))}
            </div>
            {props.gameMsg ? (
              <GameMessage msg={props.gameMsg} resetClicked={props.resetGame} />
            ) : (
                false
              )}
          </div>
        </div>
      ) : (
          <div className="tableScreen">
            <SideBar
              playerData={props.playersInGame}
              numPlayers={props.numPlayers}
              msg={"ADD PLAYERS TO BEGIN GAME"}
            />
            <div className="empty-table">

            </div>
          </div>
        )}
    </div>
  );
}

export default Table;
