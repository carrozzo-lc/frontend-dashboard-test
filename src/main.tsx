import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './store/AuthContext';
import { router } from '@/routes/index';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
