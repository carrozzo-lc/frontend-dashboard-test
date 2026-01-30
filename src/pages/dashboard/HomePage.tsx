import Typography from '@mui/material/Typography';
import { useAuth } from '@/providers/AuthProvider';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link as RouterLink } from 'react-router';
import Button from '@mui/material/Button';
import { PATH_DASHBOARD } from '@/routes/paths';
import PageTitle from '@/components/ui/PageTitle';

// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const HomePage = () => {
  const { user } = useAuth();
  return (
    <>
      <PageTitle>Welcome back 👋 {user?.name}</PageTitle>

      <Grid container spacing={2} sx={{ mt: 8 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Item>
            <Typography
              variant="h6"
              component="h2"
              fontWeight={600}
              sx={{ mb: 3 }}
            >
              Vai alla sezione Blog per gestire i post
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.blog.posts}
            >
              Lista Post
            </Button>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Item>
            <Typography
              variant="h6"
              component="h2"
              fontWeight={600}
              sx={{ mb: 3 }}
            >
              Vai alla sezione Utenti per gestire gli utenti
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.list}
            >
              Lista Utenti
            </Button>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
