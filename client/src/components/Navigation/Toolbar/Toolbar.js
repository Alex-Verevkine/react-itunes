import React from "react";
import classes from "./Toolbar.scss";
import Logo from "../../UI/Logo/Logo";
const toolbar = props => (
  <header className={classes.Toolbar}>
    <div className={classes.Logo}>
      <Logo />
    </div>
  </header>
);

export default toolbar;
