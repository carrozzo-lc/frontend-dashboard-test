import { redirect } from 'react-router';
import { login } from '@/services/auth.service';

export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Invalid form data' };
  }

  try {
    await login(email, password);
    return redirect('/');
  } catch {
    return {
      error: 'Email o password non corrette',
    };
  }
}
