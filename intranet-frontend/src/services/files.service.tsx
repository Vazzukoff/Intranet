
export const deleteFile = async (fileName: string): Promise<void> => {
  const response = await fetch(`http://localhost:3000/api/files/delete/${fileName}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el archivo');
  }

  console.log(`[deleteFile] Archivo ${fileName} eliminado correctamente`);
};