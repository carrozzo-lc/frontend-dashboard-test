import Typography, { type TypographyProps } from '@mui/material/Typography';

// ----------------------------------------------------------------------

interface PageTitleProps extends TypographyProps {
  children: React.ReactNode;
}

const PageTitle = ({ children, sx, ...other }: PageTitleProps) => {
  return (
    <Typography variant="h4" component="h1" fontWeight={600} sx={sx} {...other}>
      {children}
    </Typography>
  );
};

export default PageTitle;
