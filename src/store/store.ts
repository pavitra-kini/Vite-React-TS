// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice'; // Import products reducer
import authReducer from '../features/auth/authSlice'; // Import auth reducer
import productViewReducer from '../features/products/productViewSlice';  // Import the new slice
import productAddReducer from '../features/products/productAddSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer, // Add products slice
    auth: authReducer, // Include auth slice
    productView: productViewReducer,  // Add it here
    productAdd: productAddReducer, // Add the new slice here

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
