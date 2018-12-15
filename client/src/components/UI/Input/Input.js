import React from "react";
import classes from "./Input.scss";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: "100%"
  },
  "input:after": {
    borderBottom: "2px solid red"
  }
});
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
