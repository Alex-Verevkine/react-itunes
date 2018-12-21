import React from "react";
import classes from "./Toolbar.scss";
import Logo from "../../UI/Logo/Logo";
import Button from "../../UI/Button/Button";

/**
 * @desc Toolbar Component, that contains all top header elements.
 */
const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.Logo}>
        <Logo clicked={props.redirect} />
      </div>
      {props.showActions ? (
        <div className={classes.Actions}>
          {props.isLoggedIn ? (
            <Button color="secondary" click={props.onLogout}>
              Log Out
            </Button>
          ) : (
            <div className={classes.UnauthorisedBtns}>
              <Button click={props.onSingIn}>Log In</Button>
              <Button click={props.onRegister}>Register</Button>
            </div>
          )}
        </div>
      ) : null}
    </header>
  );
};

export default toolbar;
