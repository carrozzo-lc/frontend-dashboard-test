import { createPost, deletePost } from '@/services/posts.service';
import { queryClient } from './queryClient';

type CreatePostInput = {
  userId: number;
  title: string;
  content: string;
};

export const createPostMutation = () => ({
  mutationFn: (newPost: CreatePostInput) => createPost(newPost),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
  onSettled: async () => {
    console.log('Post creato!');
  },
});

export const deletePostMutation = () => ({
  mutationFn: (id: number) => deletePost(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
  onSettled: async () => {
    console.log('Post cancellato!');
  },
});
