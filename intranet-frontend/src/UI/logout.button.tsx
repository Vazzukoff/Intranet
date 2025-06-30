import React from 'react';
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        navigate('/')
      } else {
        console.error('Error al cerrar sesión')
      }
    } catch (error) {
      console.error('Error al hacer logout:', error)
    }
  }

    return (
      <button
      onClick={handleLogout}
      className="w-[130px] justify-self-end p-2 m-[14px_0] mx-8 hover:border-transparent hover:font-bold focus:outline-none transition-all duration-300"
  >
      Cerrar sesión
  </button>
  
    );
};

export default LogoutButton;