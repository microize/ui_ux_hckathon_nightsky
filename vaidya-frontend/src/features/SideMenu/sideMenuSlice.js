import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: true,
};

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    toggleSidebar: (state, param) => {
        const { payload } = param;
        state.isOpen = payload;
    },
  },
});

export const { toggleSidebar } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;