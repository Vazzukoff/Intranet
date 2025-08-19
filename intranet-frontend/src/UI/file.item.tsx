import { API_URL } from '../config';
import { FileItemProps } from '../models/prop.model';
import { MdDeleteForever } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";

export default function FileItem({
  file,
  onDelete,
  disabled,
}: FileItemProps) {
  const handleClick = async () => {
    try {
      await onDelete();
    } catch {
      // Aquí podrías mostrar un toast o alerta
    }
  };

  const handleDownload = () => {
    window.open(`${API_URL}/files/download/${file.fileUuid}`, '_blank');
  };

  return (
    <li 
    className="relative flex flex-col p-4 bg-white border-2 border-black 
    rounded-2xl shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <a
          href={`${API_URL}/uploads/${file.fileUuid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-xs font-medium text-black truncate hover:underline"
        >
          {file.original_name}
        </a>
        <button
          onClick={handleDownload}
          className="flex flex-items gap-2 px-3 py-1.5 w-[120px] text-sm text-white bg-black border-2 
          border-black rounded-lg transition-colors hover:bg-white hover:text-black truncate max-w-xs"
          title={`Descargar ${file.original_name}`}
        >
          <IoMdDownload className="text-lg" />
          Descargar
        </button>
      </div>
  
      <p><strong>Subido por:</strong> {file.uploaded_by_name}</p>
      <p><strong>Tarea:</strong> {file.task_title}</p>
  
      <button
        onClick={handleClick}
        disabled={disabled}
        className="flex flex-items gap-3 absolute bottom-4 right-4 px-3 py-1.5 w-[120px] text-sm text-white 
        bg-red-600 border-2 border-red-600 rounded-lg transition-colors hover:bg-white hover:text-red-600"
        title="Eliminar archivo"
      >
        <MdDeleteForever className="text-lg" />
        Eliminar
      </button>
    </li>
  );
}