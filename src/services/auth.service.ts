import axios from 'axios';

export type User = {
  id: number;
  email: string;
  name: string;
};

const API_URL = 'http://localhost:3001';
const USERS_URL = `${API_URL}/users`;

export async function login(email: string, password: string): Promise<User> {
  if (!email || !password) {
    throw new Error('Invalid credentials');
  }

  const response = await axios.get(
    `${USERS_URL}?email=${email}&password=${password}`
  );
  const users = response.data;

  if (!users.length) {
    throw new Error('Invalid credentials');
  }

  const user = users[0];
  localStorage.setItem('user', JSON.stringify(user));

  return user;
}

export function getAuthenticatedUser(): User | null {
  const raw = localStorage.getItem('user');

  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem('user');
}
