export type Role = 'admin' | 'employee';

export interface Functionality {
    key: string;
    label: string;
    component: React.ComponentType;
}

export const funcionalidadesPorRol: Record<Role, Funcionalidad[]> = {
    admin: [
        { key: 'dashboard', label: 'Dashboard', component: DashboardComponent},
        { key: 'crearTarea', label: 'Crear Tarea', component: CrearTareaComponent },
    ],
    employee: [
        { key: 'misTareas', label: 'Mis Tareas', component: MisTareasComponent },
        { key: 'perfil', label: 'Perfil', component: PerfilComponent },
    ]
};