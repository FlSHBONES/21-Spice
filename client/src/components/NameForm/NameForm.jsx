import React from "react";
import "./NameForm.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function NameForm(props) {
  return (
    <form className="search">
      <div className="form-group col-10">
        <label htmlFor="search">Player:</label>
        <input
          value={props.playerName}
          onChange={props.handleInputChange}
          name="playerName"
          type="text"
          className="form-control"
          placeholder="Enter Your Name"
          id="nameForm"
        />
        <button type="submit" onClick={props.joinBTN} className="btn btn-success nameBTN">
          Join
        </button>
      </div>
    </form>
  );
}

export default NameForm;