import { deletePost } from '@/services/posts.service';
import { queryClient } from './queryClient';

export const deletePostMutation = () => ({
  mutationFn: (id: number) => deletePost(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
  onSettled: async () => {
    console.log('Elemento cancellato!');
  },
});
