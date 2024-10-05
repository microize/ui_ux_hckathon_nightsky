// src/features/Auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for the login methods

// Login with Google SSO
export const loginWithGoogleSSO = createAsyncThunk(
  'auth/loginWithGoogleSSO',
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://rnp-dev.fractal.ai/astra-auth/auth/google-sso/',
        {
          'access-token': accessToken,
          app_id: 1,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || { message: 'Login failed' });
    }
  }
);

// Login with Microsoft SSO
export const loginWithMicrosoftSSO = createAsyncThunk(
  'auth/loginWithMicrosoftSSO',
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://rnp-dev.fractal.ai/astra-auth/auth/ms-sso/',
        {
          'access-token': accessToken,
          app_id: 1,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || { message: 'Login failed' });
    }
  }
);

// Send OTP
export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://rnp-dev.fractal.ai/astra-auth/auth/sent-otp/',
        {
          user_name: '',
          emai_id: email,
          otp: '',
          app_id: 1,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || { message: 'Failed to send OTP' });
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://rnp-dev.fractal.ai/astra-auth/auth/verify-otp/',
        {
          user_name: '',
          emai_id: email,
          otp: otp,
          app_id: 1,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || { message: 'OTP verification failed' });
    }
  }
);

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  status: 'idle',
  error: null,
};

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login with Google SSO
      .addCase(loginWithGoogleSSO.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginWithGoogleSSO.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = {
          name: action.payload.user_name,
          email: action.payload.email,
        };
        state.accessToken = action.payload['access-token'];
        state.error = null;
      })
      .addCase(loginWithGoogleSSO.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || 'Login with Google SSO failed';
      })
      // Handle login with Microsoft SSO
      .addCase(loginWithMicrosoftSSO.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginWithMicrosoftSSO.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = {
          name: action.payload.user_name,
          email: action.payload.email,
        };
        state.accessToken = action.payload['access-token'];
        state.error = null;
      })
      .addCase(loginWithMicrosoftSSO.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || 'Login with Microsoft SSO failed';
      })
      // Handle send OTP
      .addCase(sendOTP.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.status = 'otpSent';
        state.error = null;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || 'Failed to send OTP';
      })
      // Handle verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = {
          name: action.payload.user_name,
          email: action.payload['emai_id'],
        };
        state.accessToken = action.payload['access-token'];
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || 'OTP verification failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
