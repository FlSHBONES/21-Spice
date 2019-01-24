import React from "react";
import "./titlescreen.css";

const Titlescreen = props => {
  return (
    <div>
      <video id="title-video" class="myVideo" loop muted autoPlay>
        <source src={"./assets/vid/21_VICE_INTRO.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="box-wrapper loading">
        <div className="box">
          <div className="content">

              <img src="./assets/img/21_vice_logo.png" alt="21Vice" id="logo" />

            <button id="myBtn" onClick={props.toggle}>
              <strong>Let's Play</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Titlescreen;
