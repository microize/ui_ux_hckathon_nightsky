// src/App.js
import './App.css';
import React from 'react';
import { ThemeProvider } from "@mui/material/styles";

import { useSelector } from 'react-redux';
import SideMenu from './features/SideMenu/SideMenu';
import MainContent from './features/MainContent/MainContent';
import {
  Box
} from "@mui/material";
import { darkTheme, lightTheme } from "./features/theme/theme";

const App = () => {
  const themeState = useSelector(state => state.theme)
  return (
    <ThemeProvider theme={themeState.darkTheme ? darkTheme : lightTheme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <SideMenu />
        <MainContent />
      </Box>
    </ThemeProvider>
  );
}

export default App;
