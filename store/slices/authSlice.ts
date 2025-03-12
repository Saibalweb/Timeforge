import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup, logout } from '../../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
  user: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: true,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      await AsyncStorage.setItem('token', response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await signup(userData);
      await AsyncStorage.setItem('token', response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      await AsyncStorage.removeItem('token');
      return;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const setToken = createAsyncThunk(
  'auth/setToken',
  async (token: string | null) => {
    return { token };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      })
      .addCase(setToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 