import { redirect } from 'react-router';
import { getAuthenticatedUser } from '@/services/auth.service';

export function requireAuth() {
  const user = getAuthenticatedUser();

  if (!user) {
    throw redirect('/auth/login');
  }

  return user;
}
