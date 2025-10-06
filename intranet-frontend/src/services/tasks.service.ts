import { API_URL } from '../config';
import { Task, CreateTaskDTO } from '../models/task.model';
import { apiFetch } from '../lib/api.fetch';

export const createTask = async (task: CreateTaskDTO): Promise<Task> => {
  const data = await apiFetch<{ task: Task }>(`${API_URL}/tasks/create-tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return data.task;
}

export async function deleteTask(id: number): Promise<void> {
  await apiFetch<void>(`${API_URL}/tasks/delete-task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export const getTasks = async (): Promise<Task[]> => {
  return await apiFetch<Task[]>(`${API_URL}/tasks/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function completeTask(taskId: number): Promise<void> {
  await apiFetch<void>(`${API_URL}/tasks/update-tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: 'completed',
    }),
  });
}

export async function getPendingTasks(): Promise<Task[]> {
  return await apiFetch<Task[]>(`${API_URL}/tasks/pending`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function getDueDate(): Promise<Task> {
  return await apiFetch<Task>(`${API_URL}/tasks/due-date`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function uploadTaskFile(
  taskId: number,
  file: File
): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);

  await apiFetch<void>(`${API_URL}/upload/${taskId}`, {
    method: 'POST',
    body: formData,
  });
}