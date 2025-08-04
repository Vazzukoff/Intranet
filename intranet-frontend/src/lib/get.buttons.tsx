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
          className={`relative flex items-center justify-center w-[150px] ml-5 px-3 py-4 text-black rounded-md 
            border-2 border-transparent transition-colors transition-shadow duration-400 hover:bg-black hover:text-white 
            hover:border-white hover:shadow-sm hover:scale-[1.02] focus:outline-none leading-tight ${
            activeTab === "admin-tasks" ? "bg-black text-white border-white" : ""
          }`}
          onClick={() => onTabChange('admin-tasks')}
        >
          <FaTasks className="absolute left-3"/>
            Tareas
        </button>,

        <button 
          key="files"
          className={`relative flex items-center justify-center w-[150px] ml-5 px-3 py-4 text-black rounded-md 
            border-2 border-transparent transition-colors transition-shadow duration-400 hover:bg-black hover:text-white 
            hover:border-white hover:shadow-sm hover:scale-[1.02] focus:outline-none leading-tight ${
            activeTab === "files" ? "bg-black text-white border-white" : ""
          }`}          
          onClick={() => onTabChange('files')}
        >
          <LuFileStack className="absolute left-3"/>
            Archivos
        </button>,
        
        <button
          key="create-tasks"
          className={`flex items-center w-[150px] ml-5 px-3 py-4 rounded-md border-2 border-transparent 
            transition-colors transition-shadow duration-400 hover:bg-black hover:text-white hover:border-white 
            hover:shadow-sm hover:scale-[1.02] focus:outline-none leading-tight text-black ${
            activeTab === "create-tasks" ? "bg-black text-white border-white" : ""
          }`}
          onClick={() => onTabChange("create-tasks")}>
            <div className="w-5 flex justify-start">
              <IoIosCreate />
            </div>
          <div className="flex-1 text-center">
            Crear tareas
          </div>
        </button>
      ];
    
    case 'employee':
      return [
        <button 
          key="tasks"
          className="relative flex items-center justify-center w-[150px] ml-5 px-3 py-4 text-black rounded-md 
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