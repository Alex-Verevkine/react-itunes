import React from "react";
const videoPlayer = props => {
  return (
    <video width="100%" controls="controls" preload="none">
      <source type="video/mp4" src={props.videoSrc} />

      <source type="video/webm" src={props.videoSrc} />

      <source
        type="video/mp4"
        src="https://video-ssl.itunes.apple.com/apple-assets-us-std-000001/Video125/v4/ae/bb/1a/aebb1a6f-ef27-2e64-89f8-b0c42e98e9b8/mzvf_8249974095355266714.640x360.h264lc.U.p.m4v"
      />

      <source type="video/ogg" src={props.videoSrc} />

      <object
        width="100%"
        height="400"
        type="application/x-shockwave-flash"
        data="flashmediaelement.swf"
      >
        <param name="movie" value="flashmediaelement.swf" />
        <param
          name="flashvars"
          value={`controls=true&file=${props.videoSrc}`}
        />
      </object>
    </video>
  );
};

export default videoPlayer;
