import * as ReactDOM from 'react-dom/client';
import { router } from '@/routes/index';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/theme';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from '@mui/material/styles';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}
