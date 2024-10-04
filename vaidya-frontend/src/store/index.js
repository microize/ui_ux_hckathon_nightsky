// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import sideMenuSlice from '../features/SideMenu/sideMenuSlice';
import themeSlice from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    counter: counterReducer,
    sideMenu: sideMenuSlice,
  },
});