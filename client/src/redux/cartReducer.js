import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { itemId, quantity, itemPrice } = action.payload;
      const existingItem = state.items.find((item) => item.itemId === itemId);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += quantity * itemPrice;
      } else {
        state.items.push(action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    // other reducers...
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
