import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
  isLoading: false,
  isTopTermsDialogOpened: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_START:
      return { ...state, isLoading: true };

    case actionTypes.LOADING_END:
      return { ...state, isLoading: false };

    case actionTypes.TOP_TERMS_DIALOG_OPEN:
      return { ...state, isTopTermsDialogOpened: true };

    case actionTypes.TOP_TERMS_DIALOG_CLOSE:
      return { ...state, isTopTermsDialogOpened: false };

    case actionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};
