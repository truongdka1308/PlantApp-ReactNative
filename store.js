import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import historyReducer from './reducers/historyReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    history:historyReducer
  },
});

export default store;