import { Task, Status } from '../interfaces/task.interface';
import { pool } from '../db/connection';

export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const { title, description, status, dueDate } = task;

    const existingTask = await pool.query('SELECT * FROM tasks WHERE title = $1', [title]   
    );

    if (existingTask.rows.length > 0) {
        throw new Error('La tarea ya existe');
    }

    const result = await pool.query(
        'INSERT INTO tasks (title, description, status, due_date) VALUES ($1, $2, $3, $4) RETURNING id, title, description, status, due_date AS dueDate',
        [title, description, 'pending', dueDate]
    );

    return result.rows[0];
}

export async function completeTask(taskId: number, userId: number): Promise<Task> {
  const result = await pool.query(
      `UPDATE user_tasks
       SET status = 'completed'
       WHERE task_id = $1 AND user_id = $2
       RETURNING task_id`,
      [taskId, userId]
  );

  if (result.rows.length === 0) {
      throw new Error('Tarea no encontrada o ya completada');
  }

  // Obtener y devolver los detalles completos de la tarea desde "tasks"
  const taskResult = await pool.query(
      `SELECT id, title, description FROM tasks WHERE id = $1`,
      [taskId]
  );

  return {
      ...taskResult.rows[0],
      status: 'completed',
  };
}


export async function deleteTask(id: number): Promise<void> {
    const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1',
        [id]
    );

    if (result.rowCount === 0) {
        throw new Error('Tarea no encontrada');
    }
}

export async function getTasks(): Promise<Task[]> {
    const result = await pool.query('SELECT * FROM tasks');
    return result.rows;
}

export async function updateTaskStatus(id: number, status: Status): Promise<Task> {
    const result = await pool.query(
        'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING id, title, description, status',
        [status, id]
    );

    if (result.rows.length === 0) {
        throw new Error('Tarea no encontrada');
    }

    return result.rows[0];
}

export async function assignTaskToUser(userId: number, taskId: number): Promise<void> {
    await pool.query(
      'INSERT INTO user_tasks (user_id, task_id) VALUES ($1, $2)',
      [userId, taskId]
    );
}

export async function assignTaskToAllEmployees(taskId: number): Promise<void> {
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
      console.log(`[assignTaskToAllEmployees] Tarea ${taskId} asignada a ${employeeIds.length} empleados.`);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error asignando tarea a empleados:', error);
      throw error;
    } finally {
      client.release();
    }
}

export async function getPendingTasks(userId: number): Promise<Task[]> {
    const result = await pool.query(
      `SELECT t.id, t.title, t.description, ut.status, t.due_date AS "dueDate"
       FROM tasks t
       JOIN user_tasks ut ON t.id = ut.task_id
       WHERE ut.user_id = $1 AND ut.status = 'pending'`,
      [userId]
    );
    return result.rows;
  }

  export async function updateUserTaskStatus(taskId: number, userId: number, status: string): Promise<Task> {
    const result = await pool.query(
      `UPDATE user_tasks
       SET status = $1
       WHERE task_id = $2 AND user_id = $3
       RETURNING task_id`,
      [status, taskId, userId]
    );
  
    if (result.rows.length === 0) {
      throw new Error('Tarea no encontrada o no asignada a este usuario');
    }
  
    const taskResult = await pool.query(
      `SELECT id, title, description FROM tasks WHERE id = $1`,
      [taskId]
    );
  
    return {
      ...taskResult.rows[0],
      status,
    };
  }

export async function getDueDates(taskId: number): Promise<string[]> {
  const result = await pool.query(
    'SELECT due_date FROM tasks WHERE id = $1',
    [taskId]
  );

  if (result.rows.length === 0) {
    throw new Error('Tarea no encontrada');
  }

  return result.rows.map(row => row.due_date);
}

export async function saveTaskFile(taskId: number, filename: string) {
  const result = await pool.query(
    'INSERT INTO task_files (task_id, filename) VALUES ($1, $2) RETURNING *',
    [taskId, filename]
  );
  return result.rows[0];
}
