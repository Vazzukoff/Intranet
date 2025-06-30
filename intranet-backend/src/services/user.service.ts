import { pool } from "../db/connection";

export async function getUserById(userId: number) {
    const result = await pool.query('SELECT id, username, role FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
        throw new Error('Usuario no encontrado');
    }
    return result.rows[0];
}