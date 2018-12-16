import React from "react";
import Fab from "@material-ui/core/Fab";

/**
 * @desc Button with content View.
 */
const button = props => {
  return (
    <Fab variant="extended" color={props.color} onClick={props.click}>
      {props.children}
    </Fab>
  );
};

export default button;
