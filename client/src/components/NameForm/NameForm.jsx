import React from "react";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function NameForm(props) {
  return (
    <form className="welcome">
      <h1>WELCOME TO</h1>
      <img id="viceCard" src="./assets/img/vicecards/back.png"/>
      <h2>Type "/table" to start a game</h2>
      <h2>Once a table is initiated, enter your name from a different device to join!</h2>
      <div className="form-group">
        <label htmlFor="welcome">Player:</label>
        <input
          value={props.playerName}
          onChange={props.handleInputChange}
          name="playerName"
          type="text"
          className="form-control"
          placeholder="Enter Your Name"
          id="nameForm"
        />
      </div>
      <button type="submit" onClick={props.joinBTN} className="btn nameBTN">
          Join
        </button>
    </form>
  );
}

export default NameForm;