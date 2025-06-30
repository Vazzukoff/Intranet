import express from 'express';
import authRoutes from './routes/auth.routes';
import { corsMiddleware } from './middlewares/cors.middleware';
import tasksRoutes from './routes/tasks.routes';
import { requireAuth } from './middlewares/auth.middleware';
import userRoutes from './routes/user.routes';
import cookieParser from "cookie-parser";
import uploadRoutes from './routes/upload.routes';
import filesRoutes from './routes/files.routes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware);

// Rutas públicas (sin autenticación)
app.use("/api/auth", authRoutes);

// Rutas protegidas (con autenticación)
app.use("/api/tasks", requireAuth, tasksRoutes);
app.use("/api/users", requireAuth, userRoutes);
app.use("/api/upload", requireAuth, uploadRoutes);
app.use("/api/files", requireAuth, filesRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default app;