import { Router } from 'express';
import { createTask, 
         completeTask,
         getTasks,
         getPendingTasks,
         deleteTask,
         updateUserTaskStatus,
         assignTaskToAllEmployees,
         getDueDates } from '../services/tasks.service';
import { AuthenticatedRequest } from '../interfaces/auth.interface';

const router = Router();

router.post('/create-tasks', async (req, res) => {
    try {
      const task = await createTask(req.body);
  
      await assignTaskToAllEmployees(task.id);
  
      res.status(201).json({
        message: 'Tarea creada y asignada a todos los empleados.',
        task,
      });
    } catch (error) {
      console.error('[create-tasks] Error:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
});

router.get('/tasks', async (req: AuthenticatedRequest, res) => {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (error) {
      console.error('[get-tasks] Error:', error);  
      res.status(400).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
});

router.patch('/complete-tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await completeTask(Number(id));
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
});

router.delete('/delete-task/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteTask(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
});

router.patch('/update-tasks/:id', async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  try {
    const task = await updateUserTaskStatus(Number(id), userId, status);
    res.status(200).json(task);
  } catch (error) {
    console.error('[update-tasks] Error:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Ocurrió un error inesperado' });
  }
});


router.get('/pending', async (req: AuthenticatedRequest, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'No autenticado' });
        return;
      }
      console.log('[tasks/pending] Usuario autenticado ID =', req.user!.id);
      const tasks = await getPendingTasks(userId);
      res.status(200).json(tasks);
    } catch (error) {
      console.error('[tasks/pending] Error:', error);
      res.status(500).json({ error: 'Error obteniendo tareas pendientes' });
    }
  });

router.get('/due-dates/:taskId', async (req, res) => {
    const { taskId } = req.params;
    try {
        const dueDates = await getDueDates(Number(taskId));
        res.status(200).json(dueDates);
    } catch (error) {
        console.error('[get-due-dates] Error:', error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  });  

export default router;