// src/features/Navigation/navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 'Home', // Default page
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateTo: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { navigateTo } = navigationSlice.actions;

export default navigationSlice.reducer; // Correct default export
