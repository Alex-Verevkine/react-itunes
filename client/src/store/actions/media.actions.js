import { push } from "connected-react-router";
import * as actionTypes from "../actionTypes";
import { APIAxiosInstance } from "../../http_clients";

export const searchMediaByTerm = term => async (dispatch, getState) => {
  dispatch({ type: actionTypes.LOADING_START });
  dispatch({ type: actionTypes.FETCH_MEDIA_START });

  let response;
  try {
    response = await APIAxiosInstance.get(
      `/itunes/getItune/${encodeURI(term)}`
    );
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_MEDIA_FAIL, payload: error });
    dispatch({ type: actionTypes.LOADING_END });
  }
  try {
    if (response) {
      dispatch({ type: actionTypes.UPDATE_USER_START });
      const user = await APIAxiosInstance.put(
        `/user/updateQueries/${getState().auth.user._id}`,
        {
          searchQuery: term
        }
      );
      dispatch({
        type: actionTypes.UPDATE_USER_SUCCESS,
        payload: { user: user.data }
      });
      dispatch({
        type: actionTypes.FETCH_MEDIA_SUCCESS,
        payload: response.data
      });
    }
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_USER_FAIL, payload: error });
  } finally {
    dispatch({ type: actionTypes.LOADING_END });
  }
};

export const selectMedia = mediaData => async dispatch => {
  dispatch({ type: actionTypes.SELECT_MEDIA_ITEM, payload: mediaData });
  dispatch(push({ pathname: "/media-description" }));
};

export const getTopNTerms = N => async (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_TERMS_START });
  try {
    const response = await APIAxiosInstance.get(
      `/user/terms/${getState().auth.user._id}?termsAmount=${N}`
    );
    if (response) {
      dispatch({
        type: actionTypes.FETCH_TERMS_SUCCESS,
        payload: response.data
      });
      dispatch({ type: actionTypes.TOP_TERMS_DIALOG_OPEN });
    }
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_TERMS_FAIL, payload: error });
  }
};

export const checkIfSelectedMediaItemExists = () => async (
  dispatch,
  getState
) => {
  dispatch({ type: actionTypes.CHECK_IF_SELECT_MEDIA_ITEM_EXISTS });
  if (!getState().media.selectedMediaItem) {
    dispatch(push({ pathname: "/" }));
  }
};
