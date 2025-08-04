import { pool } from '../db/connection'

export async function deleteFileFromDB(
  filename: string
): Promise<boolean> {
  let result;
  try {
    console.log('[deleteFileFromDB] Eliminando ID:', filename);
    result = await pool.query(
      'DELETE FROM task_files WHERE id = $1 RETURNING *',
      [filename]
    );
  } catch (dbErr) {
    console.error('[deleteFileFromDB] Error PG:', dbErr);
    throw new Error('Error de base de datos al eliminar el archivo de la tarea');
  }
  return (result?.rowCount ?? 0) > 0;
}

export async function getAllTaskFilesWithMeta() {
  const result = await pool.query(`
    SELECT 
      f.id,
      f.original_name,
      f.file_uuid,
      f.mime_type,
      f.size_bytes,
      f.uploaded_at,
      u.username    AS uploaded_by_name,
      t.title       AS task_title
    FROM task_files f
    JOIN users u ON f.uploaded_by = u.id
    JOIN tasks t ON f.task_id = t.id
    ORDER BY f.id DESC;
  `);
  return result.rows;
}


export const getFileById = async (id: number): Promise<{ filename: string, original_name: string } | null> => {
  const { rows } = await pool.query(
    `SELECT filename, original_name FROM task_files WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}