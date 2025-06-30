export type Tab = {
    id: string;
    label: string;
    icon?: string;
}

interface TabsByRole {
    [role: string]: Tab[];
}

export const tabsByRole: TabsByRole = {
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'users', label: 'Usuarios', icon: '👥' },
      { id: 'reports', label: 'Reportes', icon: '📑' },
    ],
    employee: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'tasks', label: 'Mis Tareas', icon: '✅' },
    ],
  };
