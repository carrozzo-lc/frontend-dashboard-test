import axios from 'axios';
const baseUrl = 'http://localhost:3001/posts';

export interface ApiPost {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date;
}

type CreatePostObj = Omit<ApiPost, 'id' | 'createdAt'>;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getPosts = async (): Promise<ApiPost[]> => {
  const response = await axios.get<ApiPost[]>(baseUrl);

  await delay(2000);

  return response.data.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
  }));
};

const getPost = async (id: number): Promise<ApiPost[]> => {
  const response = await axios.get(`${baseUrl}/${id}`);
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

export { getPosts, getPost, createPost, updatePost, deletePost };
