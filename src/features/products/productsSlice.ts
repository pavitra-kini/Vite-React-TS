import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the number of items to display per page
const ITEMS_PER_PAGE = 5;

// Define the state structure for the product slice
interface ProductState {
  items: any[]; // Array to hold the product data
  status: string; // Reflects the current status of fetch operations
  error: string | null; // Stores error messages if any occur
  currentPage: number; // Tracks the current page number for pagination
  totalPages: number; // Tracks the total number of pages
}

// Initialize the state with default values
const initialState: ProductState = {
  items: [], // Start with an empty list of products
  status: 'idle', // Initial status is 'idle' (no fetch operation ongoing)
  error: null, // No errors at the start
  currentPage: 1, // Start on the first page
  totalPages: 0, // Total pages will be calculated after fetch
};

// Interface for the arguments passed to the fetchProducts thunk
interface FetchProductsArgs {
  page: number; // Page number to fetch
  title?: string; // Optional filter by product title
  price_min?: string; // Optional filter by minimum price
  price_max?: string; // Optional filter by maximum price
  categoryId?: string; // Optional filter by category ID
}

// Async thunk for fetching products with pagination and filters
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (args: FetchProductsArgs) => {
    const { page, title, price_min, price_max, categoryId } = args;
    const offset = (page - 1) * ITEMS_PER_PAGE; // Calculate offset based on the page number

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
    
    console.log('API Response:', response.data); // Debugging log to check API response
    
    return {
      products: response.data, // Return the fetched products
      totalItems: 50, // Total number of items, adjust this if the API provides it
    };
  }
);

// Async thunk for deleting a product by its ID
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: number) => {
    await axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`);
    return productId; // Return the deleted product's ID to update the state
  }
);

// Create the products slice to manage the products state and reducers
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload; // Update the current page in the state
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state of the fetchProducts thunk
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'; // Set status to 'loading'
      })
      // Handle the successful fetch of products
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to 'succeeded'
        state.items = action.payload.products; // Store the fetched products
        state.totalPages = Math.ceil(action.payload.totalItems / ITEMS_PER_PAGE); // Calculate total pages
      })
      // Handle errors that occur during the fetch
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'; // Set status to 'failed'
        state.error = action.error.message || 'Failed to fetch products'; // Store the error message
      })
      // Handle the successful deletion of a product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload); // Remove the deleted product from the state
      });
  },
});

// Export the setPage action for use in the UI to change pages
export const { setPage } = productsSlice.actions;

// Export the reducer to be included in the Redux store
export default productsSlice.reducer;
