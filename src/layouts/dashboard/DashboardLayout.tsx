import { useState, useCallback } from 'react';
// router
import { Outlet } from 'react-router';
// mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
// components
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

// ----------------------------------------------------------------------

const DashboardLayout = () => {
  const theme = useTheme();

  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] =
    useState(true);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] =
    useState(false);

  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

  const isNavigationExpanded = isOverMdViewport
    ? isDesktopNavigationExpanded
    : isMobileNavigationExpanded;

  const setIsNavigationExpanded = useCallback(
    (newExpanded: boolean) => {
      if (isOverMdViewport) {
        setIsDesktopNavigationExpanded(newExpanded);
      } else {
        setIsMobileNavigationExpanded(newExpanded);
      }
    },
    [
      isOverMdViewport,
      setIsDesktopNavigationExpanded,
      setIsMobileNavigationExpanded,
    ]
  );

  const handleToggleHeaderMenu = useCallback(
    (isExpanded: boolean) => {
      setIsNavigationExpanded(isExpanded);
    },
    [setIsNavigationExpanded]
  );

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        height: '100dvh',
        width: '100%',
      }}
    >
      <DashboardHeader
        menuOpen={isNavigationExpanded}
        onToggleMenu={handleToggleHeaderMenu}
      />

      <DashboardSidebar
        expanded={isNavigationExpanded}
        setExpanded={setIsNavigationExpanded}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ displayPrint: 'none' }} />
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'auto',
            backgroundColor: '#FBFDFF',
          }}
        >
          <Container
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              py: 3,
            }}
          >
            <Breadcrumbs />
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
