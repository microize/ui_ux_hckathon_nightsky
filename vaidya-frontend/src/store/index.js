// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import sideMenuReducer from '../features/SideMenu/sideMenuSlice';
import themeReducer from '../features/theme/themeSlice';
import navigationReducer from '../features/Navigation/navigationSlice';
import conversationReducer from '../features/Conversation/conversationSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    sideMenu: sideMenuReducer,
    navigation: navigationReducer,
    conversation: conversationReducer,
  },
});
