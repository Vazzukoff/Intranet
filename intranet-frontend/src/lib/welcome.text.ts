import { AuthUser } from "../models/auth.model"

export const welcomeText = (
    username: AuthUser | null
): string => {
    const name = username?.username || "Usuario";

    return (`¡Bienvenido, ${name}!`);
}