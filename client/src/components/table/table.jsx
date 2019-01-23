import React from "react";
import CardList from "../cardlist";
import GameMessage from "../gamemessage";
import './table.css';

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function Table(props) {
    return (
        <div className='table'>
            <h1>THIS IS THE TABLE SCREEN!!!!!</h1>
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
                <GameMessage msg={props.gameMsg} />
            ) : (
                    false
                )}
        </div>
    );
}

export default Table;
