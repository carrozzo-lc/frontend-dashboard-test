import { useAuth } from '@/store/AuthContext';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    await login(email, password);
    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="email" />
      <input name="password" type="password" />
      <button>Login</button>
    </form>
  );
};
export default LoginPage;
