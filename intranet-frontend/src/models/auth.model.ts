import { Role } from './role.model';

export interface AuthUser {
  id: string;
  username: string;
  role: Role;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  refetchUser: () => Promise<void>;
}

export interface AuthFormData {
  username: string,
  password: string
}