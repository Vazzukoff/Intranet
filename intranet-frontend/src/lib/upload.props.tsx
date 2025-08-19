import React, { useState } from 'react';
import { uploadTaskFile } from '../services/tasks.service';
import { UploadProps } from '../models/prop.model';

const FileUpload: React.FC<UploadProps> = ({ taskId, onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      setMessage('Por favor selecciona un archivo.');
      return;
    }

    try {
      await uploadTaskFile(taskId, file);
      setMessage('Archivo subido exitosamente.');

      if(onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err: any) {
      setMessage(err.message || 'Error al subir archivo.');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <label className="flex-1 relative cursor-pointer">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="truncate max-w-xs text-sm italic">
              {file ? file.name : 'Seleccionar archivo'}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        </label>
        <button
          onClick={handleUpload}
          disabled={!file}
          className="ml-4 px-4 py-2.5 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Subir
        </button>
      </div>
      {message && <p className="text-xs text-gray-500 px-1">{message}</p>}
    </div>
  );
}

export default FileUpload;