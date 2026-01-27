// router
import { Outlet } from 'react-router';
// mui
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const AuthContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  minHeight: '100dvh',
  flexDirection: 'column',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    backgroundRepeat: 'no-repeat',
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  },
}));

const AuthLayout = () => {
  return (
    <AuthContainer>
      <Outlet />
    </AuthContainer>
  );
};

export default AuthLayout;
