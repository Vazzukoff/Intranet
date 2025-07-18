import React, { useEffect, useState } from 'react';
import { AuthUser } from '../models/auth.model';
import { fetchUserData } from '../services/auth.service';
import { AuthContext } from '../context/auth.context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('[AuthProvider] Montando el contexto');

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    console.log('Fetching user data...');
    setLoading(true);
    setError(null);
    
    try {
      const userData = await fetchUserData();
      setUser(userData);
    } catch (err) {
      setError('Error al cargar datos de usuario');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, refetchUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};