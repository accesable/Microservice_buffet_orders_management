import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // other reducers...
  },
});

export const { addToCart, clearCart, setLoading, setError } = cartSlice.actions;

export default cartSlice.reducer;
