// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_PAGE = {
  page404: '/404',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  user: {
    root: path(ROOTS_DASHBOARD, ''),
    list: path(ROOTS_DASHBOARD, 'user/list'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, ''),
    posts: path(ROOTS_DASHBOARD, 'posts'),
    edit: path(ROOTS_DASHBOARD, 'posts/:id'),
  },
};
