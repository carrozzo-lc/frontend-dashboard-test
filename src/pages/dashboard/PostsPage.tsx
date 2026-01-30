import { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import { postsQuery } from '@/config/queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import BaseTable from '@/components/ui/BaseTable';
import type { MRT_Cell, MRT_ColumnDef } from 'material-react-table';
import type { ApiPost } from '@/services/posts.service';
import { deletePostMutation } from '@/config/mutations';
import BaseDrawer from '@/components/ui/BaseDrawer';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from '@/routes/paths';

// ----------------------------------------------------------------------

const PostsPage = () => {
  const { data: posts, isLoading } = useQuery(postsQuery());
  const mutation = useMutation(deletePostMutation());
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const tableColumns: MRT_ColumnDef<ApiPost>[] = [
    {
      accessorKey: 'id', //access nested data with dot notation
      header: 'Posts ID',
      size: 50,
    },
    {
      accessorKey: 'userId',
      header: 'User ID',
      size: 50,
    },
    {
      accessorKey: 'title', //normal accessorKey
      header: 'Title',
      size: 300,
    },
    {
      accessorKey: 'createdAt',
      header: 'Creation date',
      size: 150,
      Cell: ({ cell }: { cell: MRT_Cell<ApiPost> }) =>
        (cell.getValue() as Date).toLocaleDateString('it-IT'),
      sortingFn: 'datetime',
    },
  ];

  const handelNewPost = () => {
    setOpenDrawer(true);
  };

  const handleEditPost = (id: number) => {
    console.log('Edit row: ', id);
    navigate(`${PATH_DASHBOARD.blog.posts}/${id}`);
  };

  const handleDeletePost = (id: number) => {
    const confirmed = window.confirm('Sei sicuro di voler cancellare il post?');
    if (!confirmed) return;
    mutation.mutate(id);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 6,
        }}
      >
        <PageTitle>Posts</PageTitle>
        <Button variant="contained" color="primary" onClick={handelNewPost}>
          Crea nuovo post
        </Button>
      </Box>

      <BaseTable
        data={posts ?? []}
        loading={isLoading}
        columns={tableColumns}
        onEditRow={handleEditPost}
        onDeleteRow={handleDeletePost}
      />

      <BaseDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        drawerContent={<div>nuovo post</div>}
      />
    </>
  );
};

export default PostsPage;
