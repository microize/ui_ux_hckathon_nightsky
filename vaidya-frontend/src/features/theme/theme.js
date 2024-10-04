import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      paper: "#E7ECEF",
      div: "#E7ECEF",
      box: "#E7ECEF",
      docked: "#E7ECEF",
      root: "#FCFCFC",
    },
    text: {
      primary: "#11111",
    },
    primary: {
      main: '#1976d2',  
    },
    secondary: {
      main: '#f50057',  
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#FCFCFC",
          padding: 0,
          margin: 0,
          width: "auto"
        }
      }
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#222",
      nav: "#30393F",
      box: "#30393F",
    },
    text: {
      primary: "#fff",
    },
    primary: {
      main: '#1976d2',  
    },
    secondary: {
      main: '#f50057',  
    },
  },
});