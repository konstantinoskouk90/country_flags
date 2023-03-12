import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from 'styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function provideTheme(children: React.ReactNode): ReactElement {
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
