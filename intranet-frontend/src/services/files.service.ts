import { API_URL } from '../config';
import { TaskFileWithMeta } from '../models/file.model';
import { apiFetch } from '../lib/api.fetch';

export async function getFiles(): Promise<TaskFileWithMeta[]> {
  return await apiFetch<TaskFileWithMeta[]>(`${API_URL}/files/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export const deleteFile = async (filename: string): Promise<void> => {
  await apiFetch<void>(`${API_URL}/files/delete/${filename}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}