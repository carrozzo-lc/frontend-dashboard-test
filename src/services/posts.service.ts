import axios from 'axios';
const baseUrl = 'http://localhost:3001/posts';

export interface ApiPost {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
}

type CreatePostObj = Omit<ApiPost, 'id' | 'createdAt'>;

const getPosts = async (): Promise<ApiPost[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createPost = async (newPost: CreatePostObj): Promise<ApiPost> => {
  const response = await axios.post(baseUrl, newPost);
  return response.data;
};

const updatePost = async (
  id: number,
  newPost: CreatePostObj
): Promise<ApiPost> => {
  const response = await axios.put(`${baseUrl}/${id}`, newPost);
  return response.data;
};

const deletePost = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
