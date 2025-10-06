import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthUser } from '../models/auth.model';
import { fetchUserData } from '../services/auth.service';
import { AuthContext } from '../context/auth.context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await fetchUserData();
      setUser(userData);
    } catch (err) {
      if (err instanceof Error && err.message === 'UNAUTHENTICATED') {
        setUser(null);
      } else {
        console.error(err);
        setError('Error al cargar datos de usuario')
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/register') {
      setLoading(false)
      return;
    }
    fetchUser();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, loading, error, refetchUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}