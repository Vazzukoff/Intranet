import { AppError } from "@/errors/app.errors";

export class UsernameAlreadyExistsError extends AppError {
  constructor() {
    super("El nombre de usuario ya existe", 409, "USERNAME_EXISTS");
  }
}

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(
      "Nombre de usuario u contraseña inválidos",
      401,
      "INVALID_CREDENTIALS"
    );
  }
}

export class NoTokenError extends AppError {
  constructor() {
    super("No se proporcionó un token", 401, "NO_TOKEN");
  }
}

export class InvalidTokenError extends AppError {
  constructor() {
    super("Token inválido", 401, "INVALID_TOKEN");
  }
}