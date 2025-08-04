import { Task } from '../interfaces/task.interface';
import { pool } from '../db/connection';
import { createNewTask, getTaskByTitle, updateTaskStatusFromDB } from '../repositories/task.repository';


export async function createTask(
  task: Omit<Task, 'id'>
): Promise<Task> {
  const { title, description, status, dueDate } = task;

  const existingTask = await getTaskByTitle(title)

  if (existingTask) {
    throw new Error("La tarea ya existe");
  }

  const newTask = await createNewTask({ title, description, status, dueDate });

  return newTask;
}

export async function completeUserTask(
  userId: number,
  taskId: number,
  status: 'pending' | 'completed'
) {
  if (!taskId || !status) {
    throw new Error('Datos incompletos para actualizar la tarea');
  }

  const updatedTask = await updateTaskStatusFromDB(userId, taskId, status);
  if (!updatedTask) {
    throw new Error('Tarea no encontrada o no pertenece al usuario');
  }

  return updatedTask;
}

export async function assignTaskToAllEmployees(
  taskId: number
): Promise<void> {
  const client = await pool.connect();
  console.log('[assignTaskToAllEmployees] Iniciando asignación de tareas…');
  try {
    await client.query('BEGIN');

    // 1. Obtener todos los empleados
    const employeesResult = await client.query(
      'SELECT id FROM users WHERE role = $1',
      ['employee']
    );

    const employeeIds = employeesResult.rows.map((row) => row.id);

    // 2. Insertar una asignación por cada empleado
    for (const userId of employeeIds) {
      await client.query(
        'INSERT INTO user_tasks (user_id, task_id, status) VALUES ($1, $2, $3)',
        [userId, taskId, 'pending']
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error asignando tarea a empleados:', error);
    throw error;
  } finally {
    client.release();
  }
}