import { Role } from './role.model';

export interface User {
    username: string;
    password: string;
    role: Role;
}

export interface AuthResponse {
    user: Omit<User, 'password'>;
    token: string;
}