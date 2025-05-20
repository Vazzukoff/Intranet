import CreateTasks from "../../components/tabs/admin/createTasks";
import Tasks from "../../components/tabs/admin/tasks";

import EmployeeTasks from "../tabs/employee/employeeTasks";
import styles from "./styles.module.css";

interface Props {
  role: string;
  activeTab: string;
}

export default function MainContent({ role, activeTab }: Props) {
  const renderContent = () => {
    console.log('MainContent - role:', role); // Verificar el rol
    console.log('MainContent - activeTab:', activeTab); // Verificar la tab activa

    if (role === "employee" || role === "") { 
      return (
        <EmployeeTasks />
      );
    }

    switch(activeTab) {
      case "createTask":
        return <CreateTasks />;
      case "tasks":
        return <Tasks />;
        default:
          return (
            <div className="p-4">
              <h2 className="text-2xl font-bold">Selecciona una opción</h2>
              <p className="mt-4">Usa el menú lateral para navegar.</p>
            </div>
          );
      }
    };

  return (
    <div className={styles.mainContent}>
      {renderContent()}
    </div>
  );
}
