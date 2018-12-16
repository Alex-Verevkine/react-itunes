import React from "react";
import itunesLogo from "../../../assets/itunes_logo.png";
import { NavLink } from "react-router-dom";
import classes from "./Logo.scss";

/**
 * @desc Logo Navigation Link View.
 */
const logo = props => (
  <NavLink exact to="/">
    <div className={classes.Logo} onClick={props.clicked}>
      <img src={itunesLogo} alt="itunes" />
    </div>
  </NavLink>
);

export default logo;
