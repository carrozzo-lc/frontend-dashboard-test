import { getPosts, getPost } from '@/services/posts.service';

export const postsQuery = () => ({
  queryKey: ['posts'],
  queryFn: getPosts,
});

export const postQuery = (id: number) => ({
  queryKey: ['posts', id],
  queryFn: () => getPost(id),
});
