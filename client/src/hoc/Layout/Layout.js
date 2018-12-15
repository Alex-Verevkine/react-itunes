import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Layout.scss";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Dialog from "../../components/UI/Dialog/Dialog";
import AxiosDBInstance from "../../axios-orders";
import * as actionTypes from "../../store/actions";
import { withRouter } from "react-router-dom";
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

  openRegisterModalHandler = () => {
    this.setState({ modalTypeOpened: "register" });
  };

  openSignInModalHandler = () => {
    this.setState({ modalTypeOpened: "logIn" });
  };

  closeModalHandler = () => {
    this.setState({ modalTypeOpened: "" });
  };

  registerHandler = async userCredentials => {
    const response = await AxiosDBInstance.post("/user", userCredentials);
    this.props.onStoreResult({
      isLogedIn: true,
      userPersonalData: response.data.obj
    });
    this.setState({ modalTypeOpened: "" });
  };

  signInHandler = async userCredentials => {
    const response = await AxiosDBInstance.post("/user/login", userCredentials);
    this.props.onStoreResult({
      isLogedIn: true,
      userPersonalData: response.data.obj
    });
    this.setState({ modalTypeOpened: "" });
  };

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
