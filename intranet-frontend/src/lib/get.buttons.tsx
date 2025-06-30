import { AuthUser } from '../models/auth.model';

export const getButtonsForRole = (user: AuthUser | null, onTabChange: (tab: string) => void) => {
  console.log('Se está ejecutando getbuttons', user?.role);

  switch (user?.role) {
    case 'admin':
      return [
        <button key="create-tasks" className="sidebar-button w-[110px] text-black ml-5 outline-none hover:border-transparent hover:font-bold focus:outline-none transition-all duration-300"
        onClick={() => onTabChange('create-tasks')}
        >Crear tareas
        </button>,

        <button 
          key="admin-tasks" className="sidebar-button w-[110px] text-black ml-5 outline-none hover:border-transparent hover:font-bold focus:outline-none transition-all duration-300"
          onClick={() => onTabChange('admin-tasks')}
        
        >Tareas
        </button>,

        <button key="files" className="sidebar-button w-[110px] text-black ml-5 outline-none hover:border-transparent hover:font-bold focus:outline-none transition-all duration-300"
        onClick={() => onTabChange('files')}
        >Archivos
        </button>,
      ];
    
      case 'employee':
      return [
        <button key="tasks" className="sidebar-button w-[110px] text-black ml-5 outline-none hover:border-transparent hover:font-bold focus:outline-none transition-all duration-300"
        onClick={() => onTabChange('tasks')}>
          Tareas
        </button>,
      ];
    default:
      return [
        <button key="public" className="sidebar-button text-black">Perfil Público</button>,
      ];
  }
};
