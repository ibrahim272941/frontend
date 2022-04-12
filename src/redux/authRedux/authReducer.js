import * as types from './actionTypes';

const initialState = {
  loading: false,
  currentUser: null,
  isLogin: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_START:
    case types.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        isLogin: true,
      };
    case types.REGISTER_FAIL:
    case types.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isLogin: false,
      };
    case types.PERSIST_USER:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
