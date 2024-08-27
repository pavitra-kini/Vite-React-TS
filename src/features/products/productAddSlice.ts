// src/features/products/productAddSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Product interface to type the product data
interface Product {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

// Define the initial state structure for adding a product
interface ProductAddState {
  product: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductAddState = {
  product: null, // Will hold the added product data on success
  status: 'idle', // Reflects the current status of the async operation
  error: null, // Stores any error messages encountered during the process
};

// Async thunk to handle the product addition API call
export const addProduct = createAsyncThunk<Product, Product>(
  'products/addProduct',
  async (newProduct) => {
    const response = await axios.post('https://api.escuelajs.co/api/v1/products/', newProduct);
    return response.data; // Return the added product data
  }
);

// Slice for managing the state and actions related to adding a product
const productAddSlice = createSlice({
  name: 'productAdd',
  initialState,
  reducers: {}, // No synchronous reducers are defined for this slice
  extraReducers: (builder) => {
    builder
      // Handle pending state when the add product request is in progress
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading'; // Update status to 'loading'
      })
      // Handle the successful addition of a product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Update status to 'succeeded'
        state.product = action.payload; // Store the added product data in state
      })
      // Handle any errors that occur during the product addition
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed'; // Update status to 'failed'
        state.error = action.error.message || 'Failed to add product'; // Store the error message
      });
  },
});

// Export the reducer to be included in the store
export default productAddSlice.reducer;
