import React from "react";

const DealerSpace = props => {
  const displayTotal = (total, totalAlt) => {
    return total !== totalAlt && totalAlt <= 21
      ? total + "/" + totalAlt
      : total.toString();
  };

  return (
    <div className='dealerSpace'>
        <span className="numDisplay">
          {props.cardDisplay +
            " " +
            displayTotal(props.cardTotal, props.cardTotalAlt)}
        </span>
      <div className="dealersCards">
        {props.cards.map((card, index) => (
          // eslint-disable-next-line
          <img key={card.code} src={card.images.png} className={`Card-${index}`} height="250px" />
        ))}
      </div>
    </div>
  );
};

export default DealerSpace;
