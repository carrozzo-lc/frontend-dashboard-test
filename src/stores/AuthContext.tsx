import { createContext, useContext, useState } from 'react';
import type { User } from '@/services/auth.service';
import { getAuthenticatedUser, login, logout } from '@/services/auth.service';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getAuthenticatedUser());

  async function handleLogin(email: string, password: string) {
    const user = await login(email, password);
    setUser(user);
  }

  function handleLogout() {
    logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
