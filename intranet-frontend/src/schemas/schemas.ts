import { z } from 'zod';

export const formSchema = z
.object({
  username: z
    .string()
    .min(1, "El nombre de usuario debe tener al menos 4 caracteres")
    .max(20, "El nombre de usuario no puede tener más de 20 caracteres"),
  password: z
    .string()
    .min(1, "La contraseña debe tener al menos 6 caracteres")
    .max(50, "La contraseña no puede tener más de 50 caracteres"),
})

export const taskSchema = z
.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(100, "El título no puede tener más de 100 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede tener más de 500 caracteres"),
  dueDate: z
    .string()
    .min(1, "La fecha de vencimiento es requerida")
})