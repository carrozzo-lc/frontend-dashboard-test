import PageTitle from '@/components/ui/PageTitle';
import { useParams } from 'react-router';

// ----------------------------------------------------------------------

const EditPostPage = () => {
  const { id } = useParams();

  return (
    <>
      <PageTitle sx={{ mb: 5 }}>Edit Post</PageTitle>
      <div>Editing post: {id ?? 'N/D'}</div>
    </>
  );
};

export default EditPostPage;
