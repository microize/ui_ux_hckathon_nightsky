// src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import SideMenu from './features/SideMenu/SideMenu';
import MainContent from './features/MainContent/MainContent';
import { darkTheme, lightTheme } from './features/theme/theme';
import Auth from './features/Auth/Auth';

const App = () => {
  const themeState = useSelector((state) => state.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={themeState.darkTheme ? darkTheme : lightTheme}>
        <Auth />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={themeState.darkTheme ? darkTheme : lightTheme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <SideMenu />
        <MainContent />
      </Box>
    </ThemeProvider>
  );
};

export default App;
