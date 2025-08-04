import { Router } from 'express';
import { getFiles, deleteFileHandler, downloadFile } from '../controllers/file.controller';

const router = Router();

router.get('/list', getFiles);
router.delete('/delete/:filename', deleteFileHandler);
router.get('/download/:id', downloadFile);

export default router;