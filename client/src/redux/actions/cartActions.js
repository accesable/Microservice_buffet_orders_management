// src/redux/actions/cartActions.js

// Action Types
export const ADD_TO_CART = "ADD_TO_CART";

// Action Creators
export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};
