// mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Stack from '@mui/material/Stack';
// router
import { Link } from 'react-router';
// components
import Logo from '@/components/Logo';
import AuthPopover from '@/components/auth/AuthPopover';

// ----------------------------------------------------------------------

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: 'solid',
  borderColor: (theme.vars ?? theme).palette.divider,
  backgroundColor: theme.lighten(theme.palette.primary.light, 0.95),
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
}));

interface DashboardHeaderProps {
  title?: string;
  menuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
}

export default function DashboardHeader({
  menuOpen,
  onToggleMenu,
}: DashboardHeaderProps) {
  return (
    <AppBar color="inherit" position="absolute" sx={{ displayPrint: 'none' }}>
      <Toolbar sx={{ backgroundColor: 'inherit', mx: { xs: -0.75, sm: -1 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center">
            <Box sx={{ mr: 1 }}>
              <Tooltip
                title={`${menuOpen ? 'Collapse' : 'Expand'} menu`}
                enterDelay={1000}
              >
                <div>
                  <IconButton
                    size="small"
                    aria-label={`${menuOpen ? 'Collapse' : 'Expand'} navigation menu`}
                    onClick={() => onToggleMenu(!menuOpen)}
                  >
                    {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
                  </IconButton>
                </div>
              </Tooltip>
            </Box>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Logo disabledLink sx={{ width: 150 }} />
              </Box>
            </Link>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ marginLeft: 'auto' }}
          >
            <AuthPopover />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
