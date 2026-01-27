import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './stores/AuthContext';
import { router } from '@/routes/index';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/theme';

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
