import { MainContentProps } from "../../models/prop.model";
import CreateTasksTab from "../../tabs/admin/create.task.tab";
import AdminTasksTab from "../../tabs/admin/admin.tasks.tab";
import TasksTab from "../../tabs/employee/tasks.tab";
import FilesTab from "../../tabs/admin/files.tab";

export default function MainContent({ activeTab }: MainContentProps) {

  return (
    <section className="flex-1 overflow-auto p-4 bg-gray-100">
      {activeTab === "create-tasks" && <CreateTasksTab />}
      {activeTab === "admin-tasks" && <AdminTasksTab />}
      {activeTab === "tasks" && <TasksTab />}
      {activeTab === "files" && <FilesTab />}
    </section>
  );
}