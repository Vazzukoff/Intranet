import { useFiles } from '../../lib/use.files';
import FileItem from '../../UI/file.item';
import { TaskFileWithMeta } from '../../models/file.model';
import { PiEmptyFill } from "react-icons/pi";

const FilesTab = () => {
  const { files, loading, error, removeFile } = useFiles();

  if (loading) return <p>Cargando archivos...</p>;
  if (error)   return <p className="text-red-600">Error: {error}</p>;

  return (
    <>
      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <section className="flex flex-col items-center justify-center text-center">
            <PiEmptyFill className="w-20 h-20 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No hay archivos subidos
            </h2>
            <p className="text-gray-500 mb-4">¡Ya revisaste todos!</p>
          </section>
        </div>
      ) : (
        <section className="max-w-3xl w-full mx-auto px-4 py-8">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">
            Archivos subidos
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {files.map((file: TaskFileWithMeta) => (
              <FileItem
                key={file.fileUuid}
                file={file}
                onDelete={() => removeFile(file.fileUuid)}
                disabled={loading}
              />
            ))}
          </ul>
        </section>
      )}
    </>
  );  
}

export default FilesTab;