import { Response, NextFunction } from "express";
import { getUserToken } from "../session.server";
import { SECRET_KEY } from "../utils/security";
import { getUserById } from "../services/user.service";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/auth.interface";

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
      const token = await getUserToken(req);
      if (!token) {
          res.status(401).json({ error: 'No autorizado: token no encontrado' });
          return;
      }

      const decoded = jwt.verify(token, SECRET_KEY as string) as unknown as { id: string };
      const userId = Number(decoded.id);

      const user = await getUserById(userId);
      if (!user) {
          res.status(401).json({ error: 'Usuario no encontrado' });
          return;
      }

      req.user = {
          id: user.id,
          username: user.username,
          role: user.role
        };

        next();
  }   catch (error) {
      res.status(401).json({ error: 'Token inválido o expirado' });
  }};