import * as types from './actionTypes';

const initalValue = {
  user: [],
  loading: false,
  error: null,
};

const authReducer = (state = initalValue, action) => {
  switch (action.type) {
    case types.REGISTER_START:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;