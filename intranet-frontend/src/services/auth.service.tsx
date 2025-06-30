import { AuthUser } from '../models/auth.model';
  
  export const fetchUserData = async (): Promise<AuthUser> => {
    const response = await fetch('http://localhost:3000/api/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw new Error('Error obteniendo datos de usuario');
    }

    const data = await response.json();

    console.log('[fetchUserData] Datos recibidos en el backend', data);
  
    return {
      id: data.user.id,
      username: data.user.username,
      role: data.user.role,
    };    
  };