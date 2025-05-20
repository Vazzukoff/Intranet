// context/authProvider.tsx
import React, { useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/authContext';

type Role = 'admin' | 'empleado';

interface AuthUser {
  id: string;
  username: string;
  role: Role;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (username: string, password: string) => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al iniciar sesión');

    const token = data.token;
    Cookies.set('token', token, { expires: 7 });

    const decoded: AuthUser = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded: AuthUser = jwtDecode(token);
        setUser(decoded);
      } catch {
        Cookies.remove('token');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
