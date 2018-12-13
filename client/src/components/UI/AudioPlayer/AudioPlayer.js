import React from "react";
const audioPlayer = props => {
  return (
    <audio controls preload="none" style={{ width: "100%" }}>
      <source src={props.audioSrc} type="audio/mp4" />
      <source src={props.audioSrc} type="audio/ogg" />
      <p>Your browser does not support HTML5 audio.</p>
    </audio>
  );
};

export default audioPlayer;
