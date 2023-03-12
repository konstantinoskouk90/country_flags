import { createTheme } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    tertiary: {
      main: string;
      dark: string;
    };
    disabled: {
      main: string;
    };
  }

  interface Palette {
    tertiary: {
      main: string;
      dark: string;
    };
    disabled: {
      main: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(200, 15%, 8%)',
    },
    secondary: {
      main: 'hsl(0, 0%, 52%)',
      light: 'hsl(0, 0%, 75%)',
    },
    tertiary: {
      main: 'hsl(0, 0%, 100%)',
      dark: 'hsl(0, 0%, 90%)',
    },
    disabled: {
      main: 'hsl(0, 0%, 83%)',
    },
  },
});
