import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4A90D9',
      light: '#6BAEE8',
      dark: '#2C6FAC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64B5F6',
      light: '#90CAF9',
      dark: '#42A5F5',
    },
    background: {
      default: '#0A0F1E',
      paper: '#0F1929',
    },
    text: {
      primary: '#E8EAF0',
      secondary: '#9BA3B8',
    },
    divider: 'rgba(74, 144, 217, 0.15)',
    success: {
      main: '#4CAF50',
    },
    info: {
      main: '#29B6F6',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#4A90D9 #0A0F1E',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#0A0F1E',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(180deg, #4A90D9, #64B5F6)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#6BAEE8',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
