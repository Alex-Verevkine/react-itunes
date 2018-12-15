import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Snackbar, IconButton, SnackbarContent } from "@material-ui/core";
import AxiosDBInstance from "../../axios-orders";

class ErrorBoundary extends Component {
  state = {
    isError: false,
    error: null
  };
  componentDidCatch(error, info) {
    clearTimeout(this.timerOneAtTheTimeId);
    this.timerOneAtTheTimeId = setTimeout(() => {
      this.setState({ error: null, isError: false });
    }, 3000);
    this.setState({ error: error, isError: true });
  }
  componentWillMount() {
    this.reqIntercetor = AxiosDBInstance.interceptors.request.use(req => {
      clearTimeout(this.timerOneAtTheTimeId);
      this.setState({ error: null, isError: false });
      return req;
    });
    this.resIntercetor = AxiosDBInstance.interceptors.response.use(
      null,
      error => {
        clearTimeout(this.timerOneAtTheTimeId);
        this.timerOneAtTheTimeId = setTimeout(() => {
          this.setState({ error: null, isError: false });
        }, 3000);
        this.setState({ error: error.response.data, isError: true });
      }
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timerOneAtTheTimeId);
    AxiosDBInstance.interceptors.request.eject(this.reqIntercetor);
    AxiosDBInstance.interceptors.response.eject(this.resIntercetor);
  }

  errorConfirmedHandler = () => {
    this.setState({ error: null, isError: false });
  };

  render() {
    return (
      <>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.isError}
        >
          <SnackbarContent
            aria-describedby="client-snackbar"
            message={
              <span>{this.state.error && this.state.error.message}</span>
            }
            style={{ backgroundColor: "#d32f2f", height: "56px" }}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.errorConfirmedHandler}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
        {this.props.children}
      </>
    );
  }
}
export default ErrorBoundary;
