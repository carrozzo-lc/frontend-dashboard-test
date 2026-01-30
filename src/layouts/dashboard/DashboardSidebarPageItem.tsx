// router
import { Link } from 'react-router';
// mui
import { type Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
// constants
import { MINI_DRAWER_WIDTH } from '@/config/constants';

// ----------------------------------------------------------------------

interface DashboardSidebarPageItemProps {
  title: string;
  icon?: React.ReactNode;
  href: string;
  action?: React.ReactNode;
  mini?: boolean;
  fullyExpanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

const DashboardSidebarPageItem = ({
  title,
  icon,
  href,
  action,
  mini = false,
  fullyExpanded = true,
  selected = false,
  disabled = false,
}: DashboardSidebarPageItemProps) => {
  const hoverBackgroundColor = (theme: Theme) =>
    theme.lighten(theme.palette.primary.light, 0.85);

  const hasExternalHref = href
    ? href.startsWith('http://') || href.startsWith('https://')
    : false;

  const LinkComponent = hasExternalHref ? 'a' : Link;

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          display: 'block',
          py: 0,
          px: 1,
          overflowX: 'hidden',
        }}
      >
        <ListItemButton
          selected={selected}
          disabled={disabled}
          sx={{
            height: mini ? 50 : 'auto',
            borderRadius: 1,
            '&:hover': { backgroundColor: hoverBackgroundColor },
            '&.Mui-selected': {
              backgroundColor: hoverBackgroundColor,
              '&:hover': {
                backgroundColor: hoverBackgroundColor,
              },
            },
            '&.Mui-selected span': {
              fontWeight: 600,
            },
          }}
          component={LinkComponent}
          {...(hasExternalHref
            ? {
                href: href,
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : {
                to: href,
              })}
        >
          {icon || mini ? (
            <Box
              sx={
                mini
                  ? {
                      position: 'absolute',
                      left: '50%',
                      top: 'calc(50% - 6px)',
                      transform: 'translate(-50%, -50%)',
                    }
                  : {}
              }
            >
              <ListItemIcon
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: mini ? 'center' : 'auto',
                }}
              >
                {icon ?? null}
              </ListItemIcon>
              {mini ? (
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    bottom: -18,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: 10,
                    fontWeight: 500,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: MINI_DRAWER_WIDTH - 28,
                  }}
                >
                  {title}
                </Typography>
              ) : null}
            </Box>
          ) : null}
          {!mini ? (
            <ListItemText
              primary={title}
              sx={{
                whiteSpace: 'nowrap',
                zIndex: 1,
              }}
            />
          ) : null}
          {action && !mini && fullyExpanded ? action : null}
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default DashboardSidebarPageItem;
