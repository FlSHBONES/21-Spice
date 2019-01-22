import React from "react";
import "./powers.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function Powers(props) {
  return (
    <div>
      {props.powers.map(power => (
        <button key={power} onClick={()=>props.usePower(power)}>
          {power}
        </button>
      ))}
    </div>
  );
}

export default Powers;