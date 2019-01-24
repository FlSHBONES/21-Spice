import React from "react";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function NameForm(props) {
  return (
    <form className="welcome">
      <h1 className='welcomeText'>WELCOME TO 21 VICE</h1>
      <h2 className='welcomeText'>Once a table is initiated, enter your name from a different device to join!</h2>
      <div className="form-group">
        <label htmlFor="welcome">Player: </label>
        <input
          value={props.playerName}
          onChange={props.handleInputChange}
          name="playerName"
          type="text"
          className="form-control"
          placeholder="Enter Your Name"
          id="nameForm"
          maxlength="15"
        />
      </div>
      <button type="submit" onClick={props.joinBTN} id='joinBTN'>
        Join
        </button>
        <button onClick={props.createTableBTN} id='createTableBTN'>
        Create a Table
        </button>
      <button onClick='' id='leaderBoardBTN'>
        Leader Board
        </button>
    </form>
  );
}

export default NameForm;