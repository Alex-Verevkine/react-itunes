import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";
import classes from "./TopSearchBoard.scss";
const topSearchBoard = props => {
  console.log("top", props.terms);

  return (
    <Dialog open={props.terms.length} onClose={props.dialogClose}>
      <DialogTitle>Choose top</DialogTitle>
      <DialogContent>
        {props.terms.map(term => (
          <Chip
            label={term}
            key={term}
            className={classes.Chip}
            onClick={() => props.clicked(term)}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default topSearchBoard;
