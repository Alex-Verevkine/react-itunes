import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
  media: {},
  error: null,
  selectedMediaItem: null,
  topTerms: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MEDIA_SUCCESS:
      return { ...state, media: action.payload, error: null };

    case actionTypes.FETCH_MEDIA_FAIL:
      return { ...state, media: {}, error: action.payload };

    case actionTypes.SELECT_MEDIA_ITEM:
      return { ...state, selectedMediaItem: action.payload };

    case actionTypes.FETCH_TERMS_SUCCESS:
      return { ...state, topTerms: action.payload };

    case actionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};
