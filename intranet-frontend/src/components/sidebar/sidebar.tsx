import { useAuth } from '../../context/useAuth';
import { getButtonsForRole } from '../../lib/get.buttons';
import { SidebarProps } from '../../models/prop.model';

export default function Sidebar({ onTabChange }: SidebarProps) {
  const { user, loading, error } = useAuth();
  
  if (loading) {
    return (
      <div className="flex flex-col items-start gap-4 text-white p-5 h-screen w-[250px] z-100 bg-black">
        <h2 className="text-3xl font-bold m-5 z-10">Intranet</h2>
        <p>Cargando permisos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-start gap-4 text-white p-5 h-screen w-[250px] z-100 bg-black">
        <h2 className="text-3xl font-bold m-5 z-10">Intranet</h2>
        <p className="text-red-400">Error: {error}</p>
        <button className="sidebar-button text-black">
          Volver a intentar</button>
      </div>
    );
  }

  if (!user || !user.role) {
    return (
      <div className="flex flex-col items-start gap-4 text-white p-5 h-screen w-[250px] z-100 bg-black">
        <h2 className="text-3xl font-bold m-5 z-10">Intranet</h2>
        <p>Cargando usuario...</p>
      </div>
    );
  }

  console.log(user);

  return (
    <div className="flex flex-col items-start gap-4 text-white p-5 h-screen w-[250px] z-100 bg-black">
      <h2 className="text-3xl font-bold m-5 z-10">Intranet</h2>
      {/* Botón de perfil */}      
      {/* Botón de inicio común a todos los roles */}
      {/*<button className="sidebar-button text-black ml-5">
        Inicio
      </button>*/}

      {/* Botones específicos por rol */}
      {getButtonsForRole(user, onTabChange)}
    </div>
  );
}