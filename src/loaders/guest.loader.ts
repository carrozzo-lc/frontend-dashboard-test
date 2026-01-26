import { redirect } from 'react-router';
import { getAuthenticatedUser } from '@/services/auth.service';

export function requireGuest() {
  const user = getAuthenticatedUser();

  if (user) {
    throw redirect('/');
  }

  return null;
}
