import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "../UI/Divider/Divider";
import AudioPlayer from "../UI/AudioPlayer/AudioPlayer";
import VideoPlayer from "../UI/VideoPlayer/VideoPlayer";
import classes from "./ItunesElementContent.scss";
/**
 * @desc Component, that contains All data regarding selected itunes object.
 */
const itunesElementContent = props => {
  let player;
  switch (props.content.kind) {
    case "music-video":
      player = <VideoPlayer videoSrc={props.content.previewUrl} />;
      break;
    case "song":
      player = <AudioPlayer audioSrc={props.content.previewUrl} />;
      break;
    default:
      player = null;
      break;
  }
  return (
    <Paper elevation={10} className={classes.Paper}>
      <div className={classes.Top}>
        <Avatar
          alt="Logo"
          src={props.content.artworkUrl100}
          className={classes.Avatar}
        />
        <Typography variant="title" className={classes.Title}>
          <div>{props.content.artistName}</div>
          <div>{props.content.collectionName}</div>
          <div>{props.content.trackCensoredName}</div>
        </Typography>
      </div>
      <Divider />
      <div className={classes.AdditionalData}>
        <Typography variant="title">
          <span>Genere: {props.content.primaryGenreName}</span>
        </Typography>
        <Typography variant="title">
          <span>
            Release date: {new Date(props.content.releaseDate).toDateString()}
          </span>{" "}
        </Typography>
        <Typography variant="title">
          <span>
            Price: {props.content.collectionPrice} {props.content.currency}
          </span>
        </Typography>
      </div>
      <Divider />
      {player}
    </Paper>
  );
};

export default itunesElementContent;
