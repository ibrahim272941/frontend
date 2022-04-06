import axios from 'axios';
import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { auth, database } from '../firebase/firebaseConfig';
import {
  onValue,
  push,
  query,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import {
  cartAddSucces,
  cartAddFail,
  fetchFail,
  fetchProduct,
  fetchSuccess,
  cartRemoveStart,
  cartRemoveSuccess,
  fetchProductSucces,
} from './mainRedux/actions';
import * as types from './mainRedux/actionTypes';
import * as type from './authRedux/actionTypes';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { registerFail, registerSucces } from './authRedux/actions';

export function* fetchDataAsync() {
  try {
    const userRef = ref(database, `PVEGcGLnQGaXlK1ISXPm2BOVBTy1/product`);
    const data = yield new Promise((resolve) =>
      onValue(query(userRef), resolve)
    );
    // const products = yield call(async function () {
    //   return await axios.get('/api/products');
    // });

    yield put(fetchSuccess(data.val()));
  } catch (error) {
    yield put(fetchFail(error));
  }
}
export function* onFetchData() {
  yield takeLatest(types.FETCH_REQUEST, fetchDataAsync);
}
export function* fetchProductAsync({ payload }) {
  const slug = payload;

  try {
    const userRef = ref(
      database,
      `PVEGcGLnQGaXlK1ISXPm2BOVBTy1/product/${slug}`
    );
    const data = yield new Promise((resolve) =>
      onValue(query(userRef), resolve)
    );
    // const products = yield call(async function () {
    //   return await axios.get(`/api/products/slug/${slug ? slug : '/'}`);
    // });

    yield put(fetchProductSucces(data.val()));
  } catch (error) {
    yield put(fetchFail(error));
  }
}
export function* onFetchProductData() {
  yield takeLatest(types.FETCH_PRODUCT_START, fetchProductAsync);
}
export function* addToCartAsync({ payload }) {
  try {
    yield put(cartAddSucces(payload));
  } catch (error) {
    cartAddFail(error);
  }
}
export function* onAddToCart() {
  yield takeLatest(types.CARD_ADD_ITEM_START, addToCartAsync);
}

export function* cardRemoveItemAsync({ payload }) {
  console.log(payload);
  try {
    yield put(cartRemoveSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}
export function* onCardRemoveItem() {
  yield takeLatest(types.CARD_REMOVE_ITEM_START, cardRemoveItemAsync);
}

export function* registerAsync({ payload }) {
  try {
    const { name, email, password } = payload;

    yield createUserWithEmailAndPassword(auth, email, password).then(
      ({ user }) => {
        updateProfile(user, { name }).then(registerSucces(auth));
      }
    );
    // yield put(registerSucces(auth, userData));
  } catch (error) {
    yield put(registerFail(error));
  }
}

export function* onRegister() {
  yield takeLatest(type.REGISTER_START, registerAsync);
}
const productSaga = [
  fork(onFetchData),
  fork(onFetchProductData),
  fork(onAddToCart),
  fork(onCardRemoveItem),
  fork(onRegister),
];
export default function* rootSaga() {
  yield all([...productSaga]);
}
