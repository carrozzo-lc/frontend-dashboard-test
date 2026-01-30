import { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import { postsQuery } from '@/config/queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import BaseTable from '@/components/ui/BaseTable';
import type { MRT_Cell, MRT_ColumnDef } from 'material-react-table';
import type { ApiPost } from '@/services/posts.service';
import { deletePostMutation, createPostMutation } from '@/config/mutations';
import BaseDrawer from '@/components/ui/BaseDrawer';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from '@/routes/paths';
import FormPost from '@/components/forms/FormPost';
import { useAuth } from '@/providers/AuthProvider';

// ----------------------------------------------------------------------

const PostsPage = () => {
  const { data: posts, isLoading } = useQuery(postsQuery());
  const deletPost = useMutation(deletePostMutation());
  const createPost = useMutation(createPostMutation());
  const [openDrawer, setOpenDrawer] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

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
    setCreateError(null);
    setOpenDrawer(true);
  };

  const handleCreatPost = async (data: { title: string; content: string }) => {
    if (!user) {
      setCreateError('Invalid user id');
      return;
    }

    try {
      await createPost.mutateAsync({
        userId: user.id,
        title: data.title,
        content: data.content,
      });
      setCreateError(null);
    } catch (error) {
      setCreateError('Errore durante la creazione del post.');
      console.error(error);
    } finally {
      setOpenDrawer(false);
    }
  };

  const handleEditPost = (id: number) => {
    navigate(`${PATH_DASHBOARD.blog.posts}/${id}`);
  };

  const handleDeletePost = async (id: number) => {
    const confirmed = window.confirm('Sei sicuro di voler cancellare il post?');
    if (!confirmed) return;

    try {
      await deletPost.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
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
        loading={isLoading || deletPost.isPending}
        columns={tableColumns}
        onEditRow={handleEditPost}
        onDeleteRow={handleDeletePost}
      />

      <BaseDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        drawerTitle={
          <Typography
            variant="h4"
            component="h3"
            fontWeight={600}
            marginBottom={3}
          >
            Crea Post
          </Typography>
        }
        drawerContent={
          <FormPost
            onSubmit={handleCreatPost}
            errorMessage={createError ?? undefined}
          />
        }
      />
    </>
  );
};

export default PostsPage;
