'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type UserDataType = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  user: UserDataType | null;
  isLoggedIn: boolean;
  login: (token: string, userId: UserDataType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = Boolean(token);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedUser = Cookies.get('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, newUser: UserDataType) => {
    setToken(newToken);
    setUser(newUser);
    Cookies.set('token', newToken, { expires: 7 });
    Cookies.set('user', JSON.stringify(newUser), { expires: 7 });
    router.push('/');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove('token');
    Cookies.remove('user');
    router.push('/');
  };

  if (loading) {
    return <></>;
  }

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
