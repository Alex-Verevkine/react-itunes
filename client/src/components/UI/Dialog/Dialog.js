import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
class DialogFrom extends Component {
  state = {
    isFormValid: false,
    inputs: {
      userName: {
        value: "",
        isValid: false,
        tuched: false
      },
      password: {
        value: "",
        isValid: false,
        tuched: false
      }
    }
  };

  onInputChange = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.inputs };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = this.checkValidity(updatedFormElement.value);
    updatedFormElement.tuched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let isFormValid = true;
    for (const key in updatedOrderForm) {
      isFormValid = updatedOrderForm[key].isValid && isFormValid;
    }
    debugger;
    this.setState({ inputs: updatedOrderForm, isFormValid: isFormValid });
  };

  checkValidity(value) {
    let isValid = true;
    isValid = value.trim() !== "" && isValid;
    isValid = value.length > 0 && isValid;
    isValid = !/\s/.test(value) && isValid;

    return isValid;
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {this.props.dialogTitle}
        </DialogTitle>
        <form>
          <DialogContent>
            <TextField
              error={
                !this.state.inputs.userName.isValid &&
                this.state.inputs.userName.tuched
              }
              autoFocus
              margin="dense"
              id="userName"
              label="User Name"
              type="text"
              fullWidth
              value={this.state.inputs.userName.value}
              onChange={event => {
                this.onInputChange(event, "userName");
              }}
            />
            <TextField
              error={
                !this.state.inputs.password.isValid &&
                this.state.inputs.password.tuched
              }
              margin="dense"
              id="password"
              label="Password"
              type="text"
              fullWidth
              value={this.state.inputs.password.value}
              onChange={event => {
                this.onInputChange(event, "password");
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.props.handleSubmit({
                  userName: this.state.inputs.userName.value,
                  password: this.state.inputs.password.value
                });
              }}
              color="primary"
              disabled={!this.state.isFormValid}
            >
              {this.props.submitBtnMsg}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default DialogFrom;
