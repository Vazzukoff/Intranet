import { Request, Response } from "express";

const COOKIE_NAME = "auth_token";

/** Crea la cookie de sesión con el token */
function createUserSession(res: Response, token: string) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 días en ms
  });
}

/** Extrae el token desde la cookie */
function getUserToken(req: Request): string | null {
  return req.cookies?.[COOKIE_NAME] || null;
}

/** Obliga a que el usuario esté autenticado, o lanza un error 401 */
function requireUserToken(req: Request, res: Response): string {
  const token = getUserToken(req);
  if (!token) {
    res.status(401).json({ error: "No autorizado" });
    throw new Error("No autorizado");
  }
  return token;
}

/** Elimina la cookie de sesión */
function logout(res: Response) {
  res.clearCookie(COOKIE_NAME);
}

export {
  createUserSession,
  getUserToken,
  requireUserToken,
  logout,
};

