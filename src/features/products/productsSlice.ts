import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ITEMS_PER_PAGE = 5;

interface ProductState {
  items: any[];
  status: string;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  totalPages: 0,
};

interface FetchProductsArgs {
  page: number;
  title?: string;
  price_min?: string;
  price_max?: string;
  categoryId?: string;
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (args: FetchProductsArgs) => {
    const { page, title, price_min, price_max, categoryId } = args;
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const response = await axios.get(`https://api.escuelajs.co/api/v1/products`, {
      params: {
        offset,
        limit: ITEMS_PER_PAGE,
        title,
        price_min,
        price_max,
        categoryId,
      },
    });
    
    console.log('API Response:', response.data);
    
    return {
      products: response.data,
      totalItems: 50, // Adjust this based on API response
    };
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: number) => {
    await axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`);
    return productId;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products;
        state.totalPages = Math.ceil(action.payload.totalItems / ITEMS_PER_PAGE);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload);
      });
  },
});

export const { setPage } = productsSlice.actions;

export default productsSlice.reducer;
