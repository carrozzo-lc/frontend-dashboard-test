// router
import { Link as RouterLink, useLocation } from 'react-router';
// mui
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// ----------------------------------------------------------------------

const RootStyle = styled(MUIBreadcrumbs)(({ theme }) => ({
  marginBottom: 40,
  '& .MuiLink-root': {
    color: theme.palette.text.secondary,
    textTransform: 'capitalize',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiBreadcrumbs-separator': {
    marginLeft: theme.spacing(1.4),
    marginRight: theme.spacing(1.4),
  },
}));

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter((x) => x);

  return (
    <RootStyle
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {pathnames.length > 0 ? (
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
      ) : (
        <Typography sx={{ color: 'text.primary', textTransform: 'capitalize' }}>
          Home
        </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeName = name.trim().replace(/-/g, ' ');
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography
            sx={{ color: 'text.primary', textTransform: 'capitalize' }}
            key={routeTo}
          >
            {routeName}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            color="inherit"
            key={routeTo}
            to={routeTo}
          >
            {routeName}
          </Link>
        );
      })}
    </RootStyle>
  );
};

export default Breadcrumbs;
