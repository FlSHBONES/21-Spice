import React from "react";
import Sound from "react-sound";

class Musictitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { position: 0 };
    this.handlePlaying = this.handlePlaying.bind(this);
    this.handleFinishedPlaying = this.handleFinishedPlaying.bind(this);
  }

  handlePlaying(ev) {
    this.setState({ position: ev.position });
  }

  handleFinishedPlaying() {
    this.setState({ position: 0.000000000000001 });
  }

  render() {
    return (
      <Sound
        url="./assets/song/title.mp3"
        playStatus={Sound.status.PLAYING}
        position={this.state.position}
        onPlaying={this.handlePlaying}
        onFinishedPlaying={this.handleFinishedPlaying}
      />
    );
  }
}
export default Musictitle;
