import { Task, CreateTaskDTO } from '../models/task.model';

export const createTask = async (task: CreateTaskDTO): Promise<Task> => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks/create-tasks', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('[createTask] Error recibido del backend:', data);
        throw new Error(data.error || 'Error creando la tarea');
      }
  
      console.log('[createTask] Datos recibidos en el backend', data);
      return data.task;
    } catch (error) {
      console.error('Error al enviar la solicitud', error);
      throw error;
    }
};

export async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`http://localhost:3000/api/tasks/delete-task/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
      }
    });

      if (!response.ok) {
          throw new Error('Error eliminando la tarea');
      }

      if (response.status !== 204) {
        const data = await response.json();
        console.log('[deleteTask] Tarea eliminada:', data);
      } else {
          console.log('[deleteTask] Tarea eliminada con éxito');
      };
};

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch('http://localhost:3000/api/tasks/tasks', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error obteniendo las tareas');
        }

        const data = await response.json();
        console.log('[getTasks] Datos recibidos en el backend', data);
        return data;
    } catch (error) {
        console.error('Error al obtener las tareas', error);
        return [];
    }
}

export async function completeTask(id: number): Promise<Task> {
    const response = await fetch(`http://localhost:3000/api/tasks/update-tasks/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: 'completed'})
        });

        if (!response.ok) {
            throw new Error('Error actualizando la tarea');
        }

        const updatedTask = (await response.json()) as Task;
        console.log('[completeTask] Tarea actualizada:', updatedTask);
        return updatedTask;
}

export async function getPendingTasks(): Promise<Task[]> {
    const response = await fetch('http://localhost:3000/api/tasks/pending', {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error obteniendo las tareas pendientes');
    }

    const data = await response.json();
    console.log('[getPendingTasks] Datos recibidos en el backend', data);
    return data;
}

export async function getDueDate(): Promise<Task> {
  const response = await fetch('http://localhost:3000/api/tasks/due-date', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error obteniendo la fecha de vencimiento');
  }

  const data = await response.json();
  console.log('[getDueDate] Datos recibidos en el backend', data);
  return data;
}

export async function uploadTaskFile(taskId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch(`http://localhost:3000/api/upload/${taskId}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
  
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Error al subir el archivo');
    }
  }
  