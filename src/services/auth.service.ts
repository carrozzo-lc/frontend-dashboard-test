export type User = {
  id: number;
  email: string;
  name: string;
};

const API_URL = 'http://localhost:3001';

export async function login(email: string, password: string): Promise<User> {
  if (!email || !password) {
    throw new Error('Invalid credentials');
  }

  const res = await fetch(
    `${API_URL}/users?email=${email}&password=${password}`
  );

  const users: User[] = await res.json();

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
