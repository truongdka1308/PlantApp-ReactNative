// reducers/cartReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addtoHistory(state, action) {
        const { products, formattedDeliveryTime,totalAmount } = action.payload;
        // Chuyển đổi thành timestamp
        state.items.push({ products, formattedDeliveryTime,totalAmount });
    },
   
  
  },
});

export const { addtoHistory} = historySlice.actions;
export default historySlice.reducer;
