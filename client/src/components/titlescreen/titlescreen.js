import React from "react";
import "./titlescreen.css";

const Titlescreen = props => {
  return (
    <div>
      <video id="background-video" loop autoPlay>
        <source src={"./assets/vid/21_VICE_INTRO.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div class="box-wrapper loading">
        <div class="box">
          <div class="content">
            <h1 />
            <p>
              <img src="./assets/img/logo.png" alt="21Vice" id="logo" />
            </p>

            <button id="myBtn" onclick="myFunction()">
              <strong>Let's Play</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Titlescreen;
