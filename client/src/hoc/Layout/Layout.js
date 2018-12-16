import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Layout.scss";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Dialog from "../../components/Dialog/Dialog";
import AxiosDBInstance from "../../axios-orders";
import * as actionTypes from "../../store/actions";
import { withRouter } from "react-router-dom";

/**
 * @desc High Order Component Layout, wrappes all application content.
 */
class Layout extends Component {
  state = {
    modalTypeOpened: ""
  };

  async componentWillMount() {
    try {
      const response = await AxiosDBInstance.get("/user");
      this.props.onStoreResult({
        isLogedIn: true,
        userPersonalData: response.data.obj
      });
    } catch (error) {
      this.props.onStoreResult({ isLogedIn: false });
    }
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
    const response = await AxiosDBInstance.post("/user", userCredentials);
    this.props.onStoreResult({
      isLogedIn: true,
      userPersonalData: response.data.obj
    });
    this.setState({ modalTypeOpened: "" });
  };

  /**
   * @desc Sign In with existing User XHR Request Event Handler
   * @param  {} userCredentials Provided User Credential
   */
  signInHandler = async userCredentials => {
    const response = await AxiosDBInstance.post("/user/login", userCredentials);
    this.props.onStoreResult({
      isLogedIn: true,
      userPersonalData: response.data.obj
    });
    this.setState({ modalTypeOpened: "" });
  };

  /**
   * @desc Log Out XHR Request Event Handler.
   */
  logoutHandler = async () => {
    await AxiosDBInstance.get("/user/logout");
    this.props.onStoreResult({
      isLogedIn: false,
      userPersonalData: []
    });
    this.setState({ modalTypeOpened: "" });
    this.props.onSetResult([]);
    this.props.history.replace("/");
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
          isLogedIn={this.props.userDataStore.isLogedIn}
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
    userDataStore: state.userPersonal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStoreResult: result =>
      dispatch({ type: actionTypes.STORE_RESULT, data: result }),
    onSetResult: result => dispatch({ type: actionTypes.SET, result })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Layout));
