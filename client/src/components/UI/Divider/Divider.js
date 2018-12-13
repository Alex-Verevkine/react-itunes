import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const divider = () => {
  const StyledDivider = withStyles({
    root: { margin: "24px 0px" }
  })(Divider);
  return <StyledDivider />;
};

export default divider;
