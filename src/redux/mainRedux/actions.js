import * as types from './actionTypes';

export const fetchStart = () => ({
  type: types.FETCH_REQUEST,
});
export const fetchSuccess = (products) => ({
  type: types.FETCH_SUCCESS,
  payload: products,
});
export const fetchFail = (error) => ({
  type: types.FETCH_FAIL,
  payload: error,
});
export const fetchProductStart = (slug) => ({
  type: types.FETCH_PRODUCT_START,
  payload: slug,
});
export const fetchProductSucces = (slug) => ({
  type: types.FETCH_PRODUCT_SUCCESS,
  payload: slug,
});

export const cartAddStart = (product) => ({
  type: types.CARD_ADD_ITEM_START,
  payload: product,
});
export const cartAddSucces = (addChart) => ({
  type: types.CARD_ADD_ITEM_SUCCESS,
  payload: addChart,
});

export const cartAddFail = (error) => ({
  type: types.CARD_ADD_ITEM_FAIL,
  payload: error,
});

export const cartRemoveStart = (item) => ({
  type: types.CARD_REMOVE_ITEM_START,
  payload: item,
});
export const cartRemoveSuccess = (item) => ({
  type: types.CARD_REMOVE_ITEM_SUCCESS,
  payload: item,
});

export const saleStart = (costumerData) => ({
  type: types.SALE_START,
  payload: costumerData,
});

export const saleSuccess = (sale) => ({
  type: types.SALE_SUCCESS,
  payload: sale,
});

export const saleFail = (error) => ({
  type: types.SALE_FAIL,
  payload: error,
});

export const cartRemoveCompletelySuccess = () => ({
  type: types.CART_REMOVE_SUCCESS,
});
