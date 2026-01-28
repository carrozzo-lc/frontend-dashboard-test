import { useState } from 'react';
import { useNavigate } from 'react-router';
// @mui
import { alpha } from '@mui/material/styles';
import { IconButton } from '@mui/material';
// hooks
import { useAuth } from '@/providers/AuthProvider';
// components
import Avatar from '@mui/material/Avatar';
import PopoverBase from '@/components/ui/PopoverBase';

// ----------------------------------------------------------------------

const AccountPopover = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    logout();
    navigate('/auth/login', { replace: true });
  };

  const firstLetterName = user?.name ? user.name.charAt(0).toUpperCase() : '';

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open
            ? {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                },
              }
            : {}),
        }}
      >
        <Avatar>{firstLetterName}</Avatar>
      </IconButton>

      <PopoverBase
        userName={user?.name || 'User'}
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        onLogout={handleLogout}
      />
    </>
  );
};

export default AccountPopover;
