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
      setFiles(all);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFile = useCallback(async (fileUuid: string) => {
    setLoading(true);
    try {
      await deleteFile(fileUuid);
      setFiles(curr => curr.filter(f => f.fileUuid !== fileUuid));
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