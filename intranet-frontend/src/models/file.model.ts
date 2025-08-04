export interface TaskFileWithMeta {
    id: number;
    filename: string;
    original_name: string;
    uploaded_by: number;
    uploaded_by_name: string;
    task_title: string;
}

export interface UseFilesResult {
    files: TaskFileWithMeta[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    removeFile: (id: number) => Promise<void>;
}