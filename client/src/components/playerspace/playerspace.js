import React from "react";

const PlayerSpace = props => {
  const displayTotal = (total, totalAlt) => {
    return total !== totalAlt && totalAlt <= 21
      ? total + "/" + totalAlt
      : total.toString();
  };

  return (
    <div className={`playerSpace-${props.playerIndex}-Sub`}>
        <span className="numDisplay">
          {props.cardDisplay +
            " " +
            displayTotal(props.cardTotal, props.cardTotalAlt)}
        </span>
      <div className="playersCards">
        {props.cards.map((card, index) => (
          // eslint-disable-next-line
          <img key={card.code} src={card.images.png} className={`Card-Num-${index}`} height="200px" />
        ))}
      </div>
    </div>
  );
};

export default PlayerSpace;