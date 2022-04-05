import * as types from './actionTypes';

export const registerStart = () => ({
  type: types.REGISTER_START,
});

export const registerSucces = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

export const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});
