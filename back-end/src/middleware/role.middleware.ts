import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interfaces/auth.interface';

export function isAdmin(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado: se requiere rol de admin' });
    }
    next();
}

export function isEmployee(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    if (req.user?.role !== 'employee') {
        return res.status(403).json({ error: 'Acceso denegado: se requiere rol de empleado' });
    }
    next();
}