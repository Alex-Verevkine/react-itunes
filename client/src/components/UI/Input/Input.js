import React from "react";
import classes from "./Input.scss";
import TextField from "@material-ui/core/TextField";

/**
 * @desc Text Input field View.
 */
const input = props => {
  return (
    <TextField
      id="standard-name"
      label={props.label}
      className={classes.TextField}
      InputProps={{
        className: classes.Input
      }}
      value={props.value}
      onChange={props.changed}
      margin="normal"
    />
  );
};

export default input;
