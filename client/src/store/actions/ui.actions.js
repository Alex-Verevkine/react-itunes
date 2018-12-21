import * as actionTypes from "../actionTypes";

export const closeTopTermsDialog = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.TOP_TERMS_DIALOG_CLOSE });
};
