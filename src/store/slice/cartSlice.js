import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], //{ id, title, price, quantity }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action?.payload;
      const isExisting = state?.products?.find((i) => i?.id === item?.id);
      if (isExisting) {
        isExisting.quantity += item?.quantity;
      } else {
        state?.products?.push({ ...item, quantity: item?.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.products = state?.products?.filter((i) => i?.id !== action?.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action?.payload;
      const item = state?.products?.find((i) => i?.id === id);
      if (item) item.quantity = quantity;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
