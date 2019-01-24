import React from "react";
import CardList from "../cardlist";
import DealerSpace from "../dealerspace";
import GameMessage from "../gamemessage";
import PlayerSpace from "../playerspace";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function Table(props) {
  return (
    <div className="table">

      <div className="fullscreen-bg">
        <video loop muted autoPlay class="fullscreen-bg__video">
          <source src={"./assets/vid/tableloop.mp4"} type="video/mp4" />
        </video>
      </div>
      
      {props.numPlayers > 0 ? (
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
      ) : (
          <div className="empty-table">
            ADD PLAYERS TO BEGIN GAME
        </div>
        )}
    </div>
  );
}

export default Table;
