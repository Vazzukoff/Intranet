// /routes/tasks.routes.ts
import { Router } from 'express';
import { upload } from '../middlewares/upload.middleware';
import { uploadTaskFile } from '../controllers/upload.controller';

const router = Router();

// Ruta para subir archivo relacionado a una tarea
router.post('/:taskId', upload.single('file'), uploadTaskFile);

export default router;