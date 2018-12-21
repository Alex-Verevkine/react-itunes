import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
  isLoggedIn: false,
  user: {},
  error: null,
  isAuthChecked: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        isAuthChecked: true,
        error: null
      };

    case actionTypes.UPDATE_USER_SUCCESS:
      return { ...state, ...action.payload, error: null };

    case actionTypes.LOGIN_FAIL:
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        error: _mapErrorToState(action.payload)
      };

    case actionTypes.LOGOUT_FAIL:
      return {
        ...state,
        error: _mapErrorToState(action.payload)
      };

    case actionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;

    case actionTypes.UPDATE_USER_FAIL:
      return { ...INITIAL_STATE, error: _mapErrorToState(action.payload) };

    case actionTypes.FETCH_USER_FAIL:
      return { ...state, isAuthChecked: true, error: null };

    default:
      return state;
  }
};

const _mapErrorToState = err => {
  const { data, status, statusText } = err.response;
  return { data, status, statusText };
};
