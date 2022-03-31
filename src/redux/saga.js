import axios from 'axios';
import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { database } from '../firebase/firebaseConfig';
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
} from './actions';
import * as types from './actionTypes';

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
const productSaga = [
  fork(onFetchData),
  fork(onFetchProductData),
  fork(onAddToCart),
  fork(onCardRemoveItem),
];
export default function* rootSaga() {
  yield all([...productSaga]);
}