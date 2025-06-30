import cron from 'node-cron';
import { pool } from '../db/connection';

// Corre cada hora
cron.schedule('0 * * * *', async () => {
  console.log('🧹 Ejecutando limpieza de tareas vencidas...');
  try {
    const res = await pool.query(`
      DELETE FROM tareas
      WHERE fecha_limite < NOW()
    `);
    console.log(`✅ Tareas vencidas eliminadas: ${res.rowCount}`);
  } catch (err) {
    console.error('❌ Error al eliminar tareas vencidas:', err);
  }
});
