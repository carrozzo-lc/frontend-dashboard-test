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
import { postSchema, postSchemaType } from '@/schemas/post.schema';

// ----------------------------------------------------------------------

interface FormPostProps {
  onSubmit: (data: postSchemaType) => void | Promise<void>;
  errorMessage?: string;
}

const FormPost = ({ onSubmit, errorMessage }: FormPostProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<postSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const handleFormSubmit = async (data: postSchemaType) => {
    try {
      await onSubmit(data);
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Titolo</FormLabel>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.title}
                helperText={errors.title?.message}
                id="title"
                type="title"
                placeholder="Scrivi un titolo"
                fullWidth
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="content">Contenuto</FormLabel>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.content}
                helperText={errors.content?.message}
                id="content"
                type="content"
                placeholder="Scrivi un contenuto"
                fullWidth
                multiline
                rows={4}
              />
            )}
          />
        </FormControl>

        {errorMessage ? (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        ) : null}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Crea post...' : 'Crea post'}
        </Button>
      </Box>
    </form>
  );
};

export default FormPost;
