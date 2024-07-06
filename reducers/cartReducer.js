// reducers/cartReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCartItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    updateCartItemPrice(state, action) {
        const { id, price } = action.payload;
        const item = state.items.find(item => item.id === id);
        if (item) {
          item.price = price;
        }
      },
      clearCart(state) {
        state.items = []; // Xóa tất cả các sản phẩm trong giỏ hàng
      },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity,updateCartItemPrice,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
