import jwt from 'jsonwebtoken';

import { config } from "@/config/environment";

const SECRET_KEY = config.JWT_SECRET;

export function generateToken(payload: object): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token: string): string | jwt.JwtPayload | null{
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}