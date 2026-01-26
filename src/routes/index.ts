import { createBrowserRouter, redirect } from 'react-router';
// loaders
import { requireAuth } from '@/loaders/auth.loader';
import { requireGuest } from '@/loaders/guest.loader';
// pages
import LoginPage from '@/pages/auth/LoginPage';
import HomePage from '@/pages/dashboard/HomePage';
import NotFound from '@/pages/errors/NotFound';
import PostsPage from '@/pages/dashboard/PostsPage';
// layouts
import AuthLayout from '@/layouts/auth/AuthLayout';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import AuthLayoutSkeleton from '@/components/ui/skeletons/AuthLayoutSkeleton';
import DashboardLayoutSkeleton from '@/components/ui/skeletons/DashboardLayoutSkeleton';
// paths
import { PATH_DASHBOARD, PATH_AUTH, PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

export const router = createBrowserRouter([
  // ───────────────── AUTH ─────────────────
  {
    path: PATH_AUTH.root,
    loader: requireGuest,
    HydrateFallback: AuthLayoutSkeleton,
    Component: AuthLayout,
    children: [
      {
        index: true,
        loader: () => redirect(PATH_AUTH.login),
      },
      {
        path: PATH_AUTH.login,
        Component: LoginPage,
      },
    ],
  },

  // ──────────────── APP (PROTECTED) ────────────────

  {
    path: PATH_DASHBOARD.root,
    loader: requireAuth,
    HydrateFallback: DashboardLayoutSkeleton,
    Component: DashboardLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: PATH_DASHBOARD.blog.root,
        children: [
          {
            index: true,
            loader: () => redirect(PATH_DASHBOARD.blog.posts),
          },
          {
            path: PATH_DASHBOARD.blog.posts,
            Component: PostsPage,
          },
        ],
      },
      // { path: 'users', Component: UsersPage },
    ],
  },

  // ───────────────── ERRORS ─────────────────
  {
    path: PATH_PAGE.page404,
    Component: NotFound,
  },

  { path: '*', loader: () => redirect(PATH_PAGE.page404) },
]);
