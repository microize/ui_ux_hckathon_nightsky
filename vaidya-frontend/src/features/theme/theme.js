import { createTheme } from "@mui/material";

const commonThemeProperties = {
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      paper: "#E7ECEF",
      default: "#FCFCFC",
    },
    text: {
      primary: "#111",
    },
    primary: {
      main: '#1976d2',  
    },
    secondary: {
      main: '#f50057',  
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#222",
      default: "#30393F",
    },
    text: {
      primary: "#fff",
    },
    primary: {
      main: '#90caf9',  
    },
    secondary: {
      main: '#f48fb1',  
    },
  },
});
