import { deleteFile } from "../services/files.service";
import { Request, Response } from "express";

export async function deleteFileHandler(req: Request, res: Response): Promise<void> {
    const { filename } = req.params;

    try {
        // Call the service to delete the file
        await deleteFile(filename);
        res.status(204).send();
    } catch (error) {
        console.error('[deleteFile] Error:', error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}