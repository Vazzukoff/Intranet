import { AuthUser } from '../models/auth.model';
import { FaTasks } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { LuFileStack } from "react-icons/lu";

export const getButtonsForRole = (
  user: AuthUser | null,
  activeTab: string,
  onTabChange: (tab: string) => void
) => {

  switch (user?.role) {
  case 'admin':
    return [
      <button 
        key="admin-tasks"
        className={`
          group relative flex items-center justify-center w-[150px] ml-5 px-3 py-4 rounded-md 
          border-2 border-transparent transition-colors transition-shadow duration-400 
          focus:outline-none leading-tight
          ${activeTab === "admin-tasks" 
            ? "bg-black border-white" 
            : "bg-white border-transparent"} 
          hover:bg-black hover:border-white hover:shadow-sm hover:scale-[1.02]
        `}
        onClick={() => onTabChange('admin-tasks')}
      >
        <FaTasks className={`absolute left-3 
          ${activeTab === "admin-tasks" ? "text-white" : "text-black group-hover:text-white"}`} />
        <span className={`${activeTab === "admin-tasks" ? "text-white" : "text-black group-hover:text-white"}`}>
          Tareas
        </span>
      </button>,

      <button 
        key="files"
        className={`
          group relative flex items-center justify-center w-[150px] ml-5 px-3 py-4 rounded-md 
          border-2 border-transparent transition-colors transition-shadow duration-400 
          focus:outline-none leading-tight
          ${activeTab === "files" 
            ? "bg-black border-white" 
            : "bg-white border-transparent"} 
          hover:bg-black hover:border-white hover:shadow-sm hover:scale-[1.02]
        `}
        onClick={() => onTabChange('files')}
      >
        <LuFileStack className={`absolute left-3 
          ${activeTab === "files" ? "text-white" : "text-black group-hover:text-white"}`} />
        <span className={`${activeTab === "files" ? "text-white" : "text-black group-hover:text-white"}`}>
          Archivos
        </span>
      </button>,
      
      <button
        key="create-tasks"
        className={`
          group flex items-center w-[150px] ml-5 px-3 py-4 rounded-md border-2 border-transparent 
          transition-colors transition-shadow duration-400 focus:outline-none leading-tight
          ${activeTab === "create-tasks" 
            ? "bg-black border-white" 
            : "bg-white border-transparent"} 
          hover:bg-black hover:border-white hover:shadow-sm hover:scale-[1.02]
        `}
        onClick={() => onTabChange("create-tasks")}
      >
        <div className={`w-5 flex justify-start 
          ${activeTab === "create-tasks" ? "text-white" : "text-black group-hover:text-white"}`}>
          <IoIosCreate />
        </div>
        <div className={`${activeTab === "create-tasks" ? "text-white" : "text-black group-hover:text-white"} flex-1 text-center`}>
          Crear tareas
        </div>
      </button>
    ];
    
    case 'employee':
      return [
        <button 
          key="tasks"
          className="relative btn flex items-center justify-center w-[150px] ml-5 px-3 py-4 text-black rounded-md 
          border-2 border-transparent transition-colors transition-shadow duration-400 hover:bg-black hover:text-white 
          hover:border-white hover:shadow-sm hover:scale-[1.02] focus:outline-none leading-tight"
          onClick={() => onTabChange('tasks')}
        >
          <FaTasks className="absolute left-3"/>
            Tareas
        </button>,
      ];
  }
}