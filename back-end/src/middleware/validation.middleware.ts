import { Request, Response, NextFunction } from "express";
import { CreateTaskDTO } from "../interfaces/task.interface";

export function validateCreateTask(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const { title, description, assignedTo }: CreateTaskDTO = req.body;

  if (!title || !description || !assignedTo) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  // Valida tipos de datos (ej: assignedTo debe ser number)
  if (typeof assignedTo !== "number") {
    return res.status(400).json({ message: "assignedTo debe ser un número" });
  }

  next(); // Si todo está bien, pasa al controlador
}