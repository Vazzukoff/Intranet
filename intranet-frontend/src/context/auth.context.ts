import { AuthContextType } from '../models/auth.model';
import { createContext } from 'react';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  refetchUser: async () => {}
});