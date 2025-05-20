import { ClipboardCheck} from "lucide-react";

interface SidebarProps {
  role: string;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export default function Sidebar({ role, onTabChange, activeTab }: SidebarProps) {
  // Definir las tabs (botones) según el rol
  const adminTabs = [
    { label: "Crear tarea", tab: "createTask", icon: <ClipboardCheck /> },
    { label: "Ver tareas", tab: "viewTasks" },
  ];

  const employeeTabs = [
    { label: "Ver tareas", tab: "viewTasks", icon: <ClipboardCheck /> },
  ];

  const tabs = role === "admin" ? adminTabs : employeeTabs;

  return (
    <div className="flex flex-col items-start gap-4 text-white p-5 h-screen w-[250px] z-100 bg-black">
      <h2 className="text-3xl font-bold m-5 z-10">Intranet</h2>

      {tabs.map((tab) => (
        <button
          key={tab.tab}
          onClick={() => onTabChange(tab.tab)}
          className={`flex items-center gap-2.5 bg-transparent border-0 text-white text-base p-2.5 w-full text-left cursor-pointer hover:bg-white/20 focus:outline-none ${
            activeTab === tab.tab ? "bg-white/30 font-bold hover:bg-white/30" : ""
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
}
