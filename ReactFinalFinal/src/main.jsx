import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { HashRouter } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import '@fontsource/rubik/400.css'; // Regular
import '@fontsource/rubik/500.css'; // Medium
import '@fontsource/rubik/600.css'; // Semi-Bold
import '@fontsource/rubik/700.css'; // Bold

  const theme = createTheme({
    typography: {
      fontFamily: 'Rubik',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      body1: {
        fontWeight: 500,
      },
      body2: {
        fontWeight: 400,
      },
      // Can add more variants as needed
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: 'Rubik, Arial, sans-serif',
          },
          '*': {
          fontFamily: 'Rubik, Arial, sans-serif', // Ensure all elements use Rubik
        },
        },
      },
    },
  });


ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
  </HashRouter>
);



