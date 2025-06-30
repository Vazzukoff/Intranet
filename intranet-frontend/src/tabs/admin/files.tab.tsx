import { useEffect, useState } from 'react';
import { deleteFile } from '../../services/files.service';

const FilesTab = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteFile = async (
    fileName: string,
    onSuccess?: () => void,
    onError?: (error: string) => void,
    setLoading?: (value: boolean) => void
  ): Promise<void> => {
    try {
      setLoading?.(true);
      await deleteFile(fileName);
      console.log(`[handleDeleteFile] Archivo ${fileName} eliminado correctamente`);
      onSuccess?.();
    } catch (err) {
      const errorMessage = (err as Error).message || 'Error desconocido al eliminar el archivo';
      console.error('[handleDeleteFile]', errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading?.(false);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        console.log('[FilesTab] Cargando archivos...');
        const response = await fetch('http://localhost:3000/api/files/list', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error al obtener los archivos');
        }
        console.log('[FilesTab] Respuesta recibida:', response);
        const data = await response.json();
        console.log('[FilesTab] Archivos recibidos:', data);

        // Filtramos archivos no válidos (como .ts)
        const filtered = data.filter((file: string) => !file.endsWith('.ts'));
        setFiles(filtered);
      } catch (error) {
        console.error('[FilesTab] Error al obtener archivos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) return <p>Cargando archivos...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-6">
      <h2 className="text-3xl font-medium text-gray-900 mb-6">Archivos subidos</h2>
  
      {files.length === 0 ? (
        <p className="text-gray-500">No hay archivos subidos aún.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {files.map((file, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <a
                href={`http://localhost:3000/uploads/${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline truncate w-full mr-4"
              >
                {file}
              </a>
  
              <button
                onClick={() => handleDeleteFile(file)}
                disabled={loading}
                className="ml-2 px-3 py-1.5 text-sm text-red-600 hover:text-white border border-red-600 hover:bg-red-600 rounded-lg transition-colors"
                title="Eliminar archivo"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilesTab;