// src/features/products/productAddSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

interface ProductAddState {
  product: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductAddState = {
  product: null,
  status: 'idle',
  error: null,
};

export const addProduct = createAsyncThunk<Product, Product>(
  'products/addProduct',
  async (newProduct) => {
    const response = await axios.post('https://api.escuelajs.co/api/v1/products/', newProduct);
    return response.data;
  }
);

const productAddSlice = createSlice({
  name: 'productAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add product';
      });
  },
});

export default productAddSlice.reducer;
