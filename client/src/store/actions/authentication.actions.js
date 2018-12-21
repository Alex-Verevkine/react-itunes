import { push } from "connected-react-router";
import * as actionTypes from "../actionTypes";
import { APIAxiosInstance } from "../../http_clients";

export const fetchUser = () => async dispatch => {
  dispatch({ type: actionTypes.FETCH_USER_START });
  try {
    const response = await APIAxiosInstance.get("/user");
    if (response && response.data.user) {
      dispatch({
        type: actionTypes.FETCH_USER_SUCCESS,
        payload: response.data
      });
    } else {
      throw new Error("Not existing user!");
    }
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_USER_FAIL });
  }
};

export const signIn = (userName, password) => async dispatch => {
  dispatch({ type: actionTypes.LOADING_START });
  dispatch({ type: actionTypes.LOGIN_START });
  try {
    const response = await APIAxiosInstance.post("/user/login", {
      userName,
      password
    });
    if (response && response.data.user) {
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAIL, payload: error });
  } finally {
    dispatch({ type: actionTypes.LOADING_END });
  }
};

export const register = (userName, password) => async dispatch => {
  dispatch({ type: actionTypes.LOADING_START });
  dispatch({ type: actionTypes.REGISTER_START });
  try {
    const response = await APIAxiosInstance.post("/user", {
      userName,
      password
    });
    if (response && response.data.user) {
      dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: response.data });
    } else {
      throw new Error("Not registered user!");
    }
  } catch (error) {
    dispatch({ type: actionTypes.REGISTER_FAIL, payload: error });
  } finally {
    dispatch({ type: actionTypes.LOADING_END });
  }
};

export const checkAuth = () => async (dispatch, getState) => {
  //   if (!getState().auth.isLoggedIn) {
  //     dispatch(push({ pathname: "/" }));
  //   }
};

// $TODO
// const _mapAuthErrorToState = err => {
//   if (err) {
//     const { data } = err.response;
//     return {
//       errors: data.errors,
//       status: data.status,
//       statusText: data.statusText
//     };
//   }
//   return null;
// };

export const logOut = () => async dispatch => {
  dispatch({ type: actionTypes.LOGOUT_START });
  try {
    await APIAxiosInstance.get("/user/logout");
    dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    dispatch(push({ pathname: "/" }));
  } catch (error) {
    dispatch({ type: actionTypes.LOGOUT_FAIL });
  }
};
