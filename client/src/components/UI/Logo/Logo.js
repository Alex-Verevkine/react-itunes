import React from "react";
import itunesLogo from "../../../assets/itunes_logo.png";
import classes from "./Logo.scss";
const logo = () => (
  <div className={classes.Logo}>
    <img src={itunesLogo} alt="itunes" />
  </div>
);

export default logo;
