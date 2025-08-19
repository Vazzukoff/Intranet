import { useAuth } from '../../context/useAuth';
import { getButtonsForRole } from '../../lib/get.buttons';
import { SidebarProps } from '../../models/prop.model';

export default function Sidebar({ onTabChange, activeTab }: SidebarProps) {
  const { user, loading, error } = useAuth();
  
  if (loading) {
    return (
      <div className="flex flex-col items-start gap-4 text-white p-5 h-screen w-[250px] z-100 bg-black">
        <h2 className="text-3xl font-bold m-5 z-10 ">
          Intranet
        </h2>
        <p>Cargando permisos...</p>
      </div>
    );
  };

  if (error) {
    return (
      <div className="flex flex-col items-start gap-4 text-white p-5 h-screen w-[250px] z-100 bg-black">
        <h2 className="text-3xl font-bold m-5 z-10">
          Intranet
        </h2>
          <p className="text-red-400">Error: {error}</p>
        <button className="sidebar-button text-black">
          Volver a intentar
        </button>
      </div>
    );
  };

  if (!user || !user.role) {
    return (
      <div className="flex flex-col items-start gap-4 text-white p-5 h-screen w-[250px] z-100 bg-black">
        <h2 className="text-3xl font-bold m-5 z-10">
          Intranet
        </h2>
        <p>Cargando usuario...</p>
      </div>
    );
  };

  return (
    <section className="flex flex-col items-start gap-4 text-white p-5 h-screen w-[250px] z-100 bg-black">
      <h2 className="text-3xl font-bold m-5 z-10">
        Intranet
      </h2>
      {getButtonsForRole(user, activeTab, onTabChange)}
    </section>
  );
}