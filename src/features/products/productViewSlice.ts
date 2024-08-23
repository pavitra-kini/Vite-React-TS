import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

interface ProductViewState {
  product: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductViewState = {
  product: null,
  status: 'idle',
  error: null,
};

// Thunk for fetching a product by ID
export const fetchProductById = createAsyncThunk(
  'productView/fetchProductById',
  async (id: number) => {
    const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
    return response.data;
  }
);

// Thunk for updating a product
export const updateProduct = createAsyncThunk(
  'productView/updateProduct',
  async (product: { id: number; title: string; price: number }) => {
    const response = await axios.put(`https://api.escuelajs.co/api/v1/products/${product.id}`, {
      title: product.title,
      price: product.price,
    });
    return response.data;
  }
);

const productViewSlice = createSlice({
  name: 'productView',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update product';
      });
  },
});

export default productViewSlice.reducer;
