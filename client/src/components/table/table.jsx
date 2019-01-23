import React from "react";
import CardList from "../cardlist";
import GameMessage from "../gamemessage";
import './table.css';

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function Table(props) {
    return (
        <div className="table">
            {props.numPlayers>0 ?
            <div className='table-with-players'>
                <CardList
                    cardDisplay="Dealer: "
                    cardTotal={props.dealerTotal}
                    cardTotalAlt={props.dealerTotalAlt}
                    cards={props.dealerCards}
                />
                <div className='row'>
                    {props.playersInGame.map(player => (
                        <div>
                            <h4>{player.gameMsg}</h4>

                            <CardList
                                cardDisplay={`${player.playerName}:`}
                                cardTotal={player.playerTotal}
                                cardTotalAlt={player.playerTotalAlt}
                                cards={player.hand}
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
            :
            <div className='empty-table'>
    <h1>ADD PLAYERS TO BEGIN GAME</h1>
            </div>
            }
        </div>
    );
}

export default Table;
