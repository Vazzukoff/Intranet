import fs from "fs";
import path from 'path';
import { deleteFileFromDB, getFileById } from "../repositories/file.repository";

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads/');

export async function deleteFile(
    filename: string,
): Promise<void> {
    const fileDeleted = await deleteFileFromDB(filename);
    
    if (!fileDeleted) {
        throw new Error('Archivo no encontrado en base de datos');
    }

    const filePath = path.join(UPLOAD_DIR, filename);

    try {
        console.log('[deleteFile] Intentando eliminar archivo en:', filePath);
        await fs.promises.unlink(filePath); 
    } catch (err) {
        console.warn(`[deleteFile] Error al eliminar archivo del sistema: ${filePath}`, err);
    }
}

export const getFileDownloadData = async (
    id: number
): Promise<{
    filePath: string,
    originalName: string
}> => {
    const file = await getFileById(id);
  
    if (!file) {
      throw new Error('Archivo no encontrado');
    }
  
    const filePath = path.join(__dirname, '..', 'uploads', file.filename);
  
    return {
      filePath,
      originalName: file.original_name
    };
}