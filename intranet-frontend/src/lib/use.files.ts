import { useState, useEffect, useCallback } from 'react';
import { getFiles, deleteFile } from '../services/files.service';
import { UseFilesResult, TaskFileWithMeta } from '../models/file.model';

export function useFiles(): UseFilesResult {
  const [files, setFiles] = useState<TaskFileWithMeta[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const all = await getFiles();
      console.log('[getFiles] Archivos recibidos:', all);
      setFiles(all);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFile = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await deleteFile(id);
      setFiles(curr => curr.filter(f => f.id !== id));
    } catch (err: any) {
      setError(err.message || 'Error al eliminar archivo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { 
    fetchFiles();
  }, [fetchFiles]);

  return {
    files,
    loading,
    error,
    refresh: fetchFiles,
    removeFile,
  };
}