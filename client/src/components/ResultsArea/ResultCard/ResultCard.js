import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import VideoIcon from "@material-ui/icons/Videocam";
import SpeakerIcon from "@material-ui/icons/Speaker";
import classes from "./ResultCard.scss";

/**
 * @desc Itunes Result Card That Contains Short view about itunes object.
 */
const resultCard = props => {
  let contentTypeIcon;
  switch (props.cardData.kind) {
    case "music-video":
      contentTypeIcon = (
        <Avatar color="default">
          <VideoIcon />
        </Avatar>
      );
      break;
    case "song":
      contentTypeIcon = (
        <Avatar color="default">
          <SpeakerIcon />
        </Avatar>
      );
      break;
    default:
      contentTypeIcon = null;
      break;
  }
  return (
    <Card className={classes.ResultCard} raised>
      <CardActionArea
        className={classes.CardActionArea}
        onClick={props.clicked}
      >
        <CardContent>{contentTypeIcon}</CardContent>
        <CardContent>
          <CardMedia
            className={classes.CardMedia}
            image={props.cardData.artworkUrl100}
            title="logo"
          />
          <CardContent>
            <Typography gutterBottom variant="title">
              {props.cardData.artistName}
            </Typography>
            <Typography variant="subtitle1">
              {props.cardData.trackName}
            </Typography>
          </CardContent>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default resultCard;
