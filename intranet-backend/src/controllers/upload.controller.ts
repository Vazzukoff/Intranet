import { Request, Response } from 'express';
import { saveTaskFile } from '../services/tasks.service';

export async function uploadTaskFile(req: Request, res: Response): Promise<void> {
  const { taskId } = req.params;
  const file = req.file;

  if (!file) {
    res.status(400).json({ error: 'Archivo no proporcionado' });
    return;
  }

  try {
    const result = await saveTaskFile(Number(taskId), file.filename);
    res.status(200).json({ message: 'Archivo subido correctamente', result });
  } catch (err) {
    console.error('[uploadTaskFile] Error:', err);
    res.status(500).json({ error: 'Error al guardar el archivo' });
  }
}



