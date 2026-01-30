import { PATH_DASHBOARD } from '@/routes/paths';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

export const navData = [
  {
    title: 'Dashboard',
    href: PATH_DASHBOARD.root,
    icon: <AnalyticsRoundedIcon />,
  },
  {
    title: 'Posts',
    href: PATH_DASHBOARD.blog.posts,
    icon: <ArticleRoundedIcon />,
  },
  {
    title: 'Users',
    href: PATH_DASHBOARD.user.list,
    icon: <PeopleRoundedIcon />,
  },
];
