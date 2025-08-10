export interface TaskFileWithMeta {
    id: number; // si lo quieres mantener para mostrarlo, pero no para operaciones
    fileUuid: string; // <- nuevo
    original_name: string;
    mime_type: string; // <- opcional si quieres reconstruir el nombre físico
    uploaded_by: number;
    uploaded_by_name: string;
    task_title: string;
}

export interface UseFilesResult {
    files: TaskFileWithMeta[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    removeFile: (fileUuid: string) => Promise<void>;
}