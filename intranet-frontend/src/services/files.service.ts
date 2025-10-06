import { API_URL } from '../config';
import { TaskFileWithMeta } from '../models/file.model';
import { apiFetch } from '../lib/api.fetch';

export async function getFiles(): Promise<TaskFileWithMeta[]> {
  const rawFiles = await apiFetch<any[]>(`${API_URL}/files/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return rawFiles.map(f => ({
    id: f.id,
    fileUuid: f.file_uuid,
    original_name: f.original_name,
    mime_type: f.mime_type,
    uploaded_by: f.uploaded_by,
    uploaded_by_name: f.uploaded_by_name,
    task_title: f.task_title
  }));
}

export const deleteFile = async (fileUuid: string): Promise<void> => {
  await apiFetch<void>(`${API_URL}/files/delete/${fileUuid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export const downloadFile = async (fileUuid: string, fileName: string): Promise<void> => {
  // Hacemos la petición para obtener el archivo como blob
  const response = await fetch(`${API_URL}/files/download/${fileUuid}`, {
    credentials: 'include',
    method: 'GET'
  });

  if (!response.ok) {
    const errorMsg = response.statusText || 'Error al descargar el archivo';
    throw new Error(errorMsg);
  }

  // Convertimos la respuesta a blob
  const blob = await response.blob();
  
  // Creamos un URL temporal para el blob
  const url = window.URL.createObjectURL(blob);
  
  // Creamos un enlace temporal para descargar
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  
  // Agregamos el enlace al DOM, hacemos click y lo removemos
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Liberamos el URL temporal
  window.URL.revokeObjectURL(url);
};