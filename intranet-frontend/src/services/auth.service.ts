import { API_URL } from '../config';
import { AuthUser, AuthFormData } from '../models/auth.model';
import { apiFetch } from '../lib/api.fetch';

export async function registerUser(
  data: AuthFormData
): Promise<void> {
  await apiFetch<void>(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function loginUser(data: AuthFormData): Promise<void> {
  await apiFetch<void>(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export const fetchUserData = async (): Promise<AuthUser> => {
  const data = await apiFetch<{ user: AuthUser }>(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!data.user) {
    throw new Error('UNAUTHENTICATED');
  }

  return {
    id: data.user.id,
    username: data.user.username,
    role: data.user.role,
  };
}