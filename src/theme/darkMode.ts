import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#16d085",
    },
    secondary: {
      main: "#ff6d00",
    },
    background: {
      default: "#000000",
      paper: "#121212",
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#9e9e9e",
    },
    divider: "#333",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: ".5rem",
          textTransform: "capitalize",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#2a2a2a",
          borderRadius: 8,
          "& .MuiInputBase-input": {
            color: "#e0e0e0",
          },
          "& .MuiInputLabel-root": {
            color: "#9e9e9e",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#444",
          },
        },
      },
    },
  },
});

export default darkTheme;
