import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the structure of a product
interface Product {
  id: number; // Unique identifier for the product
  title: string; // Product title
  price: number; // Product price
  description: string; // Product description
  category: {
    id: number; // Category ID
    name: string; // Category name
    image: string; // Category image URL
  };
  images: string[]; // Array of product image URLs
}

// Define the state structure for viewing and updating a product
interface ProductViewState {
  product: Product | null; // The product being viewed or updated
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Status of the async operations
  error: string | null; // Error message if the operation fails
}

// Initialize the state with default values
const initialState: ProductViewState = {
  product: null, // No product initially
  status: 'idle', // Initial status is 'idle'
  error: null, // No errors at the start
};

// Thunk for fetching a product by its ID
export const fetchProductById = createAsyncThunk(
  'productView/fetchProductById',
  async (id: number) => {
    const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
    return response.data; // Return the fetched product data
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
    return response.data; // Return the updated product data
  }
);

// Create the productView slice to manage state and handle async actions
const productViewSlice = createSlice({
  name: 'productView',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state of fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading'; // Set status to 'loading' when request is in progress
      })
      // Handle the successful fetch of a product
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to 'succeeded' when fetch is successful
        state.product = action.payload; // Store the fetched product data
      })
      // Handle errors during product fetch
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed'; // Set status to 'failed' if the fetch fails
        state.error = action.error.message || 'Failed to fetch product'; // Store error message
      })
      // Handle the pending state of updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading'; // Set status to 'loading' when update request is in progress
      })
      // Handle the successful update of a product
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to 'succeeded' when update is successful
        state.product = action.payload; // Update the product data in the state
      })
      // Handle errors during product update
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed'; // Set status to 'failed' if the update fails
        state.error = action.error.message || 'Failed to update product'; // Store error message
      });
  },
});

export default productViewSlice.reducer;
