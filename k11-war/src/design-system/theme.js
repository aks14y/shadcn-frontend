import { createTheme } from "@mui/material/styles";
import { designTokens } from "./tokens";

export const theme = createTheme({
  // Extend theme with custom design tokens
  designTokens,
  palette: {
    primary: {
      main: "#667eea",
      light: "#8fa3f0",
      dark: "#4a5fc7",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#764ba2",
      light: "#9574b5",
      dark: "#5a3780",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 24px",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});
