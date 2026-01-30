// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// react-hook-form
import { useForm, Controller } from 'react-hook-form';
// schemas
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, loginSchemaType } from '@/schemas/login.schema';

// ----------------------------------------------------------------------

interface FormLoginProps {
  isSubmitting: boolean;
  serverError?: string;
  onSubmit: (data: loginSchemaType) => void | Promise<void>;
}

const FormLogin = ({ isSubmitting, serverError, onSubmit }: FormLoginProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                fullWidth
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
                placeholder="••••••"
                type="password"
                autoComplete="current-password"
                fullWidth
              />
            )}
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Login…' : 'Login'}
        </Button>

        {serverError && (
          <Typography color="error" role="alert">
            {serverError}
          </Typography>
        )}
      </Box>
    </form>
  );
};

export default FormLogin;
