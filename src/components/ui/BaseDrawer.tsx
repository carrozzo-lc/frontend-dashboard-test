import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

// ----------------------------------------------------------------------

interface BaseDrawerProps {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
  drawerTitle: React.ReactNode;
  drawerContent: React.ReactNode;
}

export default function BaseDrawer({
  openDrawer,
  setOpenDrawer,
  drawerTitle,
  drawerContent,
}: BaseDrawerProps) {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 320, p: 2 }} role="presentation">
      {drawerTitle}
      {drawerContent}
    </Box>
  );

  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={toggleDrawer(false)}
        anchor={'right'}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
