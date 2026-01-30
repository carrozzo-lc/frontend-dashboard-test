import PageTitle from '@/components/ui/PageTitle';
import { postsQuery } from '@/config/queries';
import { useQuery } from '@tanstack/react-query';
import BaseTable from '@/components/ui/BaseTable';
import type { MRT_Cell, MRT_ColumnDef } from 'material-react-table';
import type { ApiPost } from '@/services/posts.service';

// ----------------------------------------------------------------------

const PostsPage = () => {
  const { data: posts, isLoading } = useQuery(postsQuery());

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

  return (
    <>
      <PageTitle sx={{ mb: 5 }}>Posts</PageTitle>

      <BaseTable
        data={posts ?? []}
        loading={isLoading}
        columns={tableColumns}
      />
    </>
  );
};

export default PostsPage;
