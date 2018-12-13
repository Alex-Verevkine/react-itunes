import * as actionTypes from "../actions";

const initialState = {
  isLogedIn: false,
  userPersonalData: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      const newState = {
        ...state,
        ...action.data
      };
      return newState;
    default:
      return state;
  }
};

export default reducer;
