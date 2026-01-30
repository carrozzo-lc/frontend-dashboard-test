import { useEffect, useState } from 'react';
// mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
// router
import { matchPath, useLocation } from 'react-router';
// constants
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '@/config/constants';
// components
import DashboardSidebarPageItem from './DashboardSidebarPageItem';
// theme mixins
import {
  getDrawerSxTransitionMixin,
  getDrawerWidthTransitionMixin,
} from '@/utils/drawerTransitions';
// config
import { navData } from '../navData';

// ----------------------------------------------------------------------

interface DashboardSidebarProps {
  expanded?: boolean;
  setExpanded: (expanded: boolean) => void;
  disableCollapsibleSidebar?: boolean;
}

const DashboardSidebar = ({
  expanded = true,
  setExpanded,
  disableCollapsibleSidebar = false,
}: DashboardSidebarProps) => {
  const theme = useTheme();

  const { pathname } = useLocation();

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'));
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

  const [isFullyExpanded, setIsFullyExpanded] = useState(expanded);

  useEffect(() => {
    if (expanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyExpanded(false);

    return () => {};
  }, [expanded, theme.transitions.duration.enteringScreen]);

  const mini = !disableCollapsibleSidebar && !expanded;

  const hasDrawerTransitions =
    isOverSmViewport && (!disableCollapsibleSidebar || isOverMdViewport);

  const getDrawerContent = (viewport: 'phone' | 'tablet' | 'desktop') => (
    <>
      <Toolbar />
      <Box
        component="nav"
        aria-label={`${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`}
        sx={{
          height: '100%',
          display: 'flex',
          backgroundColor: theme.lighten(theme.palette.primary.light, 0.95),
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'auto',
          scrollbarGutter: mini ? 'stable' : 'auto',
          overflowX: 'hidden',
          pt: !mini ? 0 : 2,
          ...(hasDrawerTransitions
            ? getDrawerSxTransitionMixin(isFullyExpanded, 'padding')
            : {}),
        }}
      >
        <List
          sx={{
            mt: 2,
            padding: mini ? 0 : 0.5,
            mb: 4,
            width: mini ? MINI_DRAWER_WIDTH : 'auto',
          }}
        >
          {navData.map((item) => (
            <DashboardSidebarPageItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              href={item.href}
              mini={mini}
              fullyExpanded={isFullyExpanded}
              selected={!!matchPath(`${item.href}/*`, pathname)}
            />
          ))}
        </List>
      </Box>
    </>
  );

  const getDrawerSharedSx = (isTemporary: boolean) => {
    const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

    return {
      displayPrint: 'none',
      width: drawerWidth,
      flexShrink: 0,
      ...getDrawerWidthTransitionMixin(expanded),
      ...(isTemporary ? { position: 'absolute' } : {}),
      [`& .MuiDrawer-paper`]: {
        position: 'absolute',
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundImage: 'none',
        ...getDrawerWidthTransitionMixin(expanded),
      },
    };
  };

  return (
    <>
      <Drawer
        variant="temporary"
        open={expanded}
        onClose={() => setExpanded(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: {
            xs: 'block',
            sm: disableCollapsibleSidebar ? 'block' : 'none',
            md: 'none',
          },
          ...getDrawerSharedSx(true),
        }}
      >
        {getDrawerContent('phone')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            sm: disableCollapsibleSidebar ? 'none' : 'block',
            md: 'none',
          },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('tablet')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('desktop')}
      </Drawer>
    </>
  );
};

export default DashboardSidebar;
