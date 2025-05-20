import React from 'react';
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include',
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
            className="w-[130px] justify-self-end p-[10px] m-[20px_30px] hover:border-transparent hover:font-bold focus:outline-none"
        >
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;