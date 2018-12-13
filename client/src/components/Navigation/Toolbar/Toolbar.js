import React from "react";
import classes from "./Toolbar.scss";
import Logo from "../../UI/Logo/Logo";
import Button from "../../UI/Button/Button";

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.Logo}>
        <Logo clicked={props.redirect} />
      </div>
      <div className={classes.Actions}>
        {props.isLogedIn ? (
          <Button color="secondary" click={props.onLogout}>
            Log Out
          </Button>
        ) : (
          <>
            <Button click={props.onSingIn}>Log In</Button>
            <Button click={props.onRegister}>Register</Button>
          </>
        )}
      </div>
    </header>
  );
};

export default toolbar;
