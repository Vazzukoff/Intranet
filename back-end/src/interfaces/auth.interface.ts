import { Request } from "express";
import { User } from "@/interfaces/user.interface";

export interface AuthenticatedRequest extends Request {
  user?: Pick<User, 'id' | 'username' | 'role'>;
}

// For API responses (no password)
export type UserResponse = Partial<Pick<User, "id">> &
  Omit<User, "password" | "createdAt" | "updatedAt" | "id">;