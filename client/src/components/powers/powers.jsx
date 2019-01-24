import React from "react";
import "./powers.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function Powers(props) {
  return (
    <div className='mid'>
      {props.powers.map(power => (
        <button className='power' key={power} onClick={()=>props.usePower(power)}>
          {power}
        </button>
      ))}
    </div>
  );
}

export default Powers;