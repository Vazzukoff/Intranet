import fs from "fs";
import { pool } from '../db/connection';
import path from 'path';

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads/');

export async function deleteFile(filename: string): Promise<void> {
    const result = await pool.query(
        'DELETE FROM task_files WHERE filename = $1 RETURNING *',
        [filename]
    );
    if (result.rows.length === 0) {
        throw new Error('Archivo no encontrado');
    }
    const filePath = path.join(UPLOAD_DIR, filename);
    try {
        await fs.promises.unlink(filePath); 
    } catch (err) {
        console.warn('[deleteFile] Error al eliminar archivo del sistema:', filePath, err);
    }
}