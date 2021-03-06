import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import * as types from './actionTypes';

export const registerStart = (userdata) => ({
  type: types.REGISTER_START,
  payload: userdata,
});

export const registerSucces = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

export const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});
export const loginStart = () => ({
  type: types.LOGIN_START,
});
export const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});
export const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});
const logoutStart = () => ({
  type: types.LOGOUT_START,
});
const logoutSuccess = (user) => ({
  type: types.LOGOUT_SUCCESS,
  payload: user,
});
const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});
export const persistUser = (user) => ({
  type: types.PERSIST_USER,
  payload: user,
});

export const registerFunc = (userData) => {
  console.log(userData);
  return function (dispatch) {
    const { email, password, displayName } = userData;
    dispatch(registerStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName });

        dispatch(registerSucces(auth, user));
      })
      .catch((error) => dispatch(registerFail(error.message)));
  };
};
export const loginFunc = (userData) => {
  return async function (dispatch) {
    const { email, password } = userData;
    dispatch(loginStart());
    await signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
      })
      .catch((error) => {
        loginFail(error.message);
        dispatch(alert(error.message));
      });
  };
};

export const logoutFunc = () => {
  return function (dispatch) {
    try {
      dispatch(logoutStart());
      signOut(auth);

      dispatch(logoutSuccess(auth));
    } catch (error) {
      dispatch(logoutFail(error.message));
    }
  };
};
