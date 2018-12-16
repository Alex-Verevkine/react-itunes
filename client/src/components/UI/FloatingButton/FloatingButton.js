import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  }
});

/**
 * @desc Floating Search Button View.
 */
const floatingButton = props => {
  const { classes } = props;

  return (
    <Fab
      color="default"
      aria-label="Add"
      className={classes.fab}
      onClick={props.clicked}
    >
      <SearchIcon />
    </Fab>
  );
};

export default withStyles(styles)(floatingButton);
