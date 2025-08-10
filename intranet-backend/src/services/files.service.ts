import fs from "fs";
import path from 'path';
import { deleteFileFromDB, getFileById, getFileByUuid } from "../repositories/file.repository";

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads/');

export async function deleteFile(fileUuid: string): Promise<void> {
  // 1. Buscar el archivo para obtener mime_type
  const fileRecord = await getFileByUuid(fileUuid);
  if (!fileRecord) {
    throw new Error('Archivo no encontrado en base de datos');
  }

  const extension = fileRecord.mime_type.split('/')[1]; // ej: "jpeg"
  const filePath = path.join(UPLOAD_DIR, `${fileUuid}.${extension}`);

  // 2. Eliminar archivo del sistema
  try {
    console.log('[deleteFile] Intentando eliminar archivo en:', filePath);
    await fs.promises.unlink(filePath); 
  } catch (err) {
    console.warn(`[deleteFile] Error al eliminar archivo del sistema: ${filePath}`, err);
  }

  // 3. Eliminar registro de la BD
  const fileDeleted = await deleteFileFromDB(fileUuid);
  if (!fileDeleted) {
    throw new Error('Error al eliminar registro en base de datos');
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