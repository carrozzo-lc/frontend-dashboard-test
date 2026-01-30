import * as ReactDOM from 'react-dom/client';
import { router } from '@/routes/index';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/theme';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from '@mui/material/styles';
import { queryClient } from '@/config/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// ----------------------------------------------------------------------

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
