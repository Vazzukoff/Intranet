export const {
    PORT = 3000,
    SALT_ROUNDS = 10,
    SECRET_JWT_KEY = 'nadie-sabrá-esto-jajaja-8991'
} = process.env


// BACKUP CONFIG


import 'dotenv/config'

export const {
    PORT = 3000,
    SALT_ROUNDS = 10,
    SECRET_JWT_KEY = 'nadie-sabrá-esto-jajaja-8991',
    // Parámetros de conexión a PostgreSQL:
    PGHOST = 'localhost',         // Host de la base de datos
    PGPORT = 5432,                // Puerto de conexión
    PGDATABASE = 'intranet_db',   // Nombre de la base de datos predeterminado
    PGUSER = 'my_user',           // Usuario de la base de datos
    PGPASSWORD = 'my_password'    // Contraseña de la base de datos
  } = process.env;

  // Opcional: URL de conexión completa (sobrescribe variables PG* si está definido)
  export const DATABASE_URL = process.env.DATABASE_URL ||
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;
  