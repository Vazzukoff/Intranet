import { z } from 'zod';

export const CreateTaskSchema = z.object({
    title: z.string().min(1, { message: 'Título es requerido' }),
    description: z.string().min(1, { message: 'Descripción es requerida' }),
    assignedTo: z.number().int().positive("ID de usuario inválido"),
});

export const UpdateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(['pending', 'completed']).optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: 'Al menos un campo debe ser actualizado',
});