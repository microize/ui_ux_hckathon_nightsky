import './App.css';
import React from 'react';
import { ThemeProvider } from "@mui/material/styles";

import { useSelector, useDispatch } from 'react-redux';
import SideMenu from './features/SideMenu/SideMenu';
import {
  Paper, Box
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { darkTheme, lightTheme } from "./features/theme/theme";


const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme)
  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
    {/* <div className="main-layout"> */}
      <SideMenu />
      <Paper sx={{display: 'flex', flex: 1, margin: 0, padding: 0, height: "inherit"}}>Right content</Paper>
      
      {/* <MainContent /> */}
    {/* </div> */}
    </ThemeProvider>
  );
}

export default App;