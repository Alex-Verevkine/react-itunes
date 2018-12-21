import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Layout.scss";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Dialog from "../../components/Dialog/Dialog";
import { fetchUser, register, signIn, logOut } from "../../store/actions";

/**
 * @desc Component Layout, wrappes all application content.
 */
class Layout extends Component {
  state = {
    modalTypeOpened: ""
  };

  async componentWillMount() {
    this.props.fetchUser();
  }

  /**
   * @desc Open Register modal Event Handler
   */
  openRegisterModalHandler = () => {
    this.setState({ modalTypeOpened: "register" });
  };

  /**
   * @desc Open SignIn modal Event Handler
   */
  openSignInModalHandler = () => {
    this.setState({ modalTypeOpened: "logIn" });
  };

  /**
   * @desc Colose opened modal Event Handler
   */
  closeModalHandler = () => {
    this.setState({ modalTypeOpened: "" });
  };

  /**
   * @desc Register new User XHR Request Event Handler
   * @param  {} userCredentials New User Credentials
   */
  registerHandler = async userCredentials => {
    const { userName, password } = userCredentials;
    this.props.register(userName, password);
    this.setState({ modalTypeOpened: "" });
  };

  /**
   * @desc Sign In with existing User XHR Request Event Handler
   * @param  {} userCredentials Provided User Credential
   */
  signInHandler = async userCredentials => {
    const { userName, password } = userCredentials;
    this.props.signIn(userName, password);
    this.setState({ modalTypeOpened: "" });
  };

  /**
   * @desc Log Out XHR Request Event Handler.
   */
  logoutHandler = async () => {
    this.props.logOut();
  };

  render() {
    let dialog;
    switch (this.state.modalTypeOpened) {
      case "logIn":
        dialog = (
          <Dialog
            dialogTitle="Log In"
            submitBtnMsg="Ok"
            open
            handleClose={this.closeModalHandler}
            handleSubmit={this.signInHandler}
          />
        );
        break;
      case "register":
        dialog = (
          <Dialog
            dialogTitle="Register"
            submitBtnMsg="Ok"
            open
            handleClose={this.closeModalHandler}
            handleSubmit={this.registerHandler}
          />
        );
        break;
      default:
        dialog = null;
        break;
    }

    return (
      <>
        <Toolbar
          isLoggedIn={this.props.isLoggedIn}
          showActions={this.props.isAuthChecked}
          onRegister={this.openRegisterModalHandler}
          onSingIn={this.openSignInModalHandler}
          onLogout={this.logoutHandler}
        />
        {dialog}
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isAuthChecked: state.auth.isAuthChecked
  };
};

export default connect(
  mapStateToProps,
  { fetchUser, register, signIn, logOut }
)(Layout);
