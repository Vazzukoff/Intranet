// context/authContext.ts
import { createContext } from 'react';

type Role = 'admin' | 'empleado';

interface AuthUser {
  id: string;
  username: string;
  role: Role;
}

interface AuthContextProps {
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

