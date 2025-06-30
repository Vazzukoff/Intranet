import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { deleteFileHandler } from '../controllers/file.controller';

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads/');

const router = Router();

router.get('/list', (req, res) => {
    fs.readdir(UPLOAD_DIR, (err, files) => {
      if (err) {
        console.error('[files/list] Error al leer archivos:', err);
        return res.status(500).json({ error: 'Error al leer archivos' });
      }
      res.json(files);
    });
  });

router.delete('/delete/:filename', deleteFileHandler);

export default router;