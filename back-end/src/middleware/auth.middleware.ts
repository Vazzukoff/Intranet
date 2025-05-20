import { NextFunction, Response } from "express";

import { InvalidTokenError, NoTokenError } from "@/errors/auth.errors";
import { AuthenticatedRequest } from "@/interfaces/auth.interface";
import { verifyToken } from "@/utils/jwt";

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    next(new NoTokenError());
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    next(new InvalidTokenError());
    return;
  }

  req.user = typeof decoded === "string" ? JSON.parse(decoded) : decoded;
  next();
}

export function optionalAuthenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1];
  
  // Si no hay token, continuamos sin autenticar (usuario invitado)
  if (!token) {
    next();
    return;
  }

  // Si hay token, verificamos y añadimos la información del usuario
  try {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = typeof decoded === "string" ? JSON.parse(decoded) : decoded;
    }
  } catch (error) {
    // Si hay error en el token, simplemente continuamos sin autenticar
    // No devolvemos error para mantener la experiencia de usuario invitado
  }
  
  next();
}