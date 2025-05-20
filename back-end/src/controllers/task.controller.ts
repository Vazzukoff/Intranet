import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/interfaces/auth.interface";
//import { TaskService } from "@/services/task.service";
import { CreateTaskDTO, UpdateTaskDTO } from "@/interfaces/task.interface";

export class TaskController {
  // Crear tarea (solo admin)
  public static async createTask(req: AuthenticatedRequest, res: Response) {
    try {
      const taskData: CreateTaskDTO = req.body;
      taskData.createdBy = req.user.id; // ID del admin autenticado
      const newTask = await TaskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: "Error al crear la tarea", error: error.message });
    }
  }

  // Actualizar tarea (solo employee asignado)
  public static async updateTask(req: AuthenticatedRequest, res: Response) {
    try {
      const taskId = parseInt(req.params.id);
      const updateData: UpdateTaskDTO = req.body;
      const employeeId = req.user.id;

      const updatedTask = await TaskService.updateTask(taskId, employeeId, updateData);
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la tarea", error: error.message });
    }
  }

  // Obtener todas las tareas de un employee
  public static async getTasks(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id;
      const tasks = await TaskService.getTasksByUser(userId);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener tareas", error: error.message });
    }
  }
}