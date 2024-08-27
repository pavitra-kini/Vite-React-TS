import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state structure for authentication
interface AuthState {
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('auth'), // Initialize authentication state from localStorage
  status: 'idle', // Represents the current state of the async action
  error: null, // Holds error message in case of failure
  token: localStorage.getItem('auth') || null, // Load token from localStorage if available
};

// API endpoint for user authentication
const API_URL = 'https://api.escuelajs.co/api/v1/auth/login';

// Async thunk for handling login
export const login = createAsyncThunk<string, { email: string; password: string }, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, { email, password });
      return response.data.access; // Extract the token from the response
    } catch (error) {
      // Handle Axios errors and set a user-friendly message
      let errorMessage = 'Login failed';
      if (axios.isAxiosError(error)) { // Check if error is an AxiosError
        errorMessage = error.response?.data?.detail || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Auth slice for managing authentication state and actions
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Handle logout by clearing state and localStorage
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      localStorage.removeItem('auth'); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    // Handle pending state during login process
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });

    // Handle successful login by setting authentication state and storing the token
    builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
      state.status = 'succeeded';
      state.isAuthenticated = true;
      state.token = action.payload; // Save token to state
      state.error = null;
      localStorage.setItem('auth', action.payload); // Save token to localStorage
    });

    // Handle login failure by setting error state
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Login failed'; // Display an error message
    });
  },
});

// Export logout action for use in the UI
export const { logout } = authSlice.actions;

// Export the reducer to be included in the store
export default authSlice.reducer;
