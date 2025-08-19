import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
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
      className="w-[130px] btn justify-self-end p-2 m-[14px_0] mx-8 border-2 border-transparent 
      rounded-md hover:border-transparent hover:bg-black hover:text-white hover:border-white 
      focus:outline-none transition-all duration-200"
    >
      Cerrar sesión
    </button>
  );
}