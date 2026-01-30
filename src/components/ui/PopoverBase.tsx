// mui
import { Box, Button, Popover, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface PopoverBaseProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  userName: string;
  onLogout: () => void;
}

const PopoverBase = ({
  open,
  anchorEl,
  onClose,
  userName,
  onLogout,
}: PopoverBaseProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          sx: {
            pt: 1,
            pb: 1,
            minWidth: 220,
          },
        },
      }}
    >
      <Stack>
        <Box sx={{ px: 2.5, py: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {userName}
          </Typography>
        </Box>
        <Button
          size="small"
          variant="text"
          color="inherit"
          onClick={onLogout}
          sx={{
            textAlign: 'left',
            px: 2.5,
            py: 1,
            justifyContent: 'flex-start',
            borderRadius: 0,
          }}
        >
          Logout
        </Button>
      </Stack>
    </Popover>
  );
};

export default PopoverBase;
