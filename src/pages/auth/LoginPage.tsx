// mui
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
// components
import Logo from '@/components/Logo';
import FormLogin from '@/components/forms/FormLogin';
// router
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';

// ----------------------------------------------------------------------

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>();

  const handleSubmit = async (data: { email: string; password: string }) => {
    setServerError(undefined);
    setIsSubmitting(true);

    try {
      await login(data.email, data.password);
      navigate('/');
    } catch {
      setServerError('Email o password non corrette');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card variant="outlined">
      <Logo />

      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Login
      </Typography>

      <FormLogin
        isSubmitting={isSubmitting}
        serverError={serverError}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default LoginPage;
