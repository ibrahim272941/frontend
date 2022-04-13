import * as types from './actionTypes';

const initialValue = {
  products: [],
  fetchproduct: [],
  loading: false,
  error: null,
  cart: {
    cartItems: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [],
    cartAddLoading: false,
    cartAddError: null,
  },
  saleProduct: [],
  saleProductError: null,
};

const mainReducer = (state = initialValue, action) => {
  switch (action.type) {
    case types.FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case types.FETCH_PRODUCT_START:
      // console.log(action.payload);
      return {
        ...state,
        fetchproduct: action.payload,
        loading: true,
      };
    case types.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        fetchproduct: action.payload,
        loading: false,
      };
    case types.FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.CARD_ADD_ITEM_START:
      return {
        ...state,
        cart: { ...state.cart, cartAddLoading: true },
      };
    case types.CARD_ADD_ITEM_SUCCESS:
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.productTitle === newItem.productTitle
      );
      console.log(state.cart.cartItems);
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.productTitle === existItem.productTitle ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      return {
        ...state,
        cart: {
          ...state.cart,
          cartAddLoading: false,
          cartItems: cartItems,
        },
      };
    case types.CARD_ADD_ITEM_FAIL:
      return {
        ...state,
        cart: { ...state.cart, cartAddFail: action.payload },
      };
    case types.CARD_REMOVE_ITEM_START:
      const filteredItem = state.cart.cartItems.filter(
        (item) => item.productTitle !== action.payload.productTitle
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          cartAddLoading: false,
          cartItems: filteredItem,
        },
      };
    case types.SALE_START:
      return {
        ...state,
      };
    case types.SALE_SUCCESS:
      return {
        ...state,
        saleProduct: action.payload,
      };
    case types.SALE_FAIL:
      return {
        ...state,
        saleProductError: action.payload,
      };

    case types.CART_REMOVE_SUCCESS:
      return {
        ...state,
        cart: { ...state.cart, cartItems: [] },
      };
    default:
      return state;
  }
};
export default mainReducer;
