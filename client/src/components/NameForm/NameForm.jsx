import React from "react";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function NameForm(props) {
  return (
    <form className="welcome">
      <h1>WELCOME TO 21 VICE</h1>
      <h2>To Get Started, Initialize a table by typing "/table"</h2>
      <h2>Once a table is initiated, join the table by entering your name from a different device!</h2>
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
      <button type="submit" onClick={props.joinBTN} className="btn btn-success nameBTN">
          Join
        </button>
    </form>
  );
}

export default NameForm;