import * as actionTypes from "../actions";

const initialState = {
  content: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET:
      const newState = {
        ...state,
        content: action.result
      };
      return newState;
    default:
      return state;
  }
};

export default reducer;
