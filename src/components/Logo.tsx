import { Link as RouterLink } from 'react-router';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import appLogo from '@/assets/logo/logo.svg';

// ----------------------------------------------------------------------

interface LogoProps {
  logoSrc?: string;
  disabledLink?: boolean;
  sx?: SxProps<Theme>;
}

const Logo = ({ logoSrc, disabledLink = false, sx }: LogoProps) => {
  const logo = (
    <Box
      component="img"
      src={logoSrc ? logoSrc : appLogo}
      sx={{ width: 200, height: 'auto', textAlign: 'left', ...sx }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
};

export default Logo;
