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
    fileUuid: f.file_uuid, // 👈 importante
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