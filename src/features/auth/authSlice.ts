import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the auth slice
interface AuthState {
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('auth'), // Check localStorage for initial auth state
  status: 'idle',
  error: null,
  token: localStorage.getItem('auth') || null, // Load token from localStorage
};

// Define the API endpoint for authentication
const API_URL = 'https://api.escuelajs.co/api/v1/auth/login';

// Create an async thunk for login
export const login = createAsyncThunk<string, { email: string; password: string }, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, { email, password });
      return response.data.access; // Token is in the `access` field
    } catch (error) {
      let errorMessage = 'Login failed';
      if (axios.isAxiosError(error)) {  // Type guard for AxiosError
        errorMessage = error.response?.data?.detail || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      localStorage.removeItem('auth'); // Clear token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.token = action.payload; // Store token in state
        state.error = null;
        localStorage.setItem('auth', action.payload); // Save token to localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed'; // Set error message
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
